import { useState, useRef, useEffect } from 'react'
import { HiX, HiPaperAirplane, HiTrash } from 'react-icons/hi'
import { agentsApi } from '../services/api'

function ChatPanel({ isOpen, onClose, selectedRepo, repos, apiClient = agentsApi }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Load chat history when panel opens
  useEffect(() => {
    if (isOpen) {
      loadHistory()
    }
  }, [isOpen, selectedRepo])

  const loadHistory = async () => {
    try {
      if (apiClient.getHistory) {
        const history = await apiClient.getHistory(selectedRepo || null)
        // Convert history to message format
        const historyMessages = history.flatMap((item) => [
          {
            id: `${item.id}-user`,
            role: 'user',
            content: item.prompt,
            timestamp: item.timestamp,
          },
          {
            id: `${item.id}-assistant`,
            role: 'assistant',
            content: item.response,
            timestamp: item.timestamp,
          },
        ])
        setMessages(historyMessages)
      }
    } catch (err) {
      // Silently fail - history loading is optional
      console.error('Failed to load history:', err)
    }
  }

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setError(null)

    // Add user message
    const newUserMessage = {
      id: Date.now(),
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, newUserMessage])

    setLoading(true)

    try {
      const result = await apiClient.sendPrompt(userMessage, selectedRepo || null)
      
      // Add assistant response
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: result.response,
        timestamp: result.timestamp,
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      setError(err.message)
      const errorMessage = {
        id: Date.now() + 1,
        role: 'error',
        content: `Error: ${err.message}`,
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleClearHistory = async () => {
    if (!confirm('Are you sure you want to clear all chat history? This cannot be undone.')) {
      return
    }

    try {
      await apiClient.clearHistory(selectedRepo || null)
      setMessages([])
      setError(null)
    } catch (err) {
      setError(`Failed to clear history: ${err.message}`)
    }
  }

  const selectedRepoName = selectedRepo ? repos.find((r) => r.id === selectedRepo)?.fullName : null

  return (
    <>
      {/* Invisible Backdrop - closes chat when clicked */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60]"
          onClick={onClose}
        />
      )}

      {/* Panel Card */}
      <div
        className={`fixed top-4 right-4 bottom-4 w-full max-w-2xl bg-gray-800 rounded-xl border border-gray-700 shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col overflow-hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-800 rounded-t-xl">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white">Chat</h2>
            {selectedRepoName && (
              <p className="text-sm text-gray-400 mt-1">
                Querying: <span className="text-purple-400 font-medium">{selectedRepoName}</span>
              </p>
            )}
            {!selectedRepoName && (
              <p className="text-sm text-gray-400 mt-1">No repository selected</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {messages.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                title="Clear chat history"
              >
                <HiTrash className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              title="Close chat"
            >
              <HiX className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-gray-400 mb-2">Start a conversation</p>
                <p className="text-sm text-gray-500">
                  {selectedRepoName
                    ? `Ask questions about ${selectedRepoName}`
                    : 'Select a repository to start asking questions'}
                </p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
                        : message.role === 'error'
                        ? 'bg-red-900/20 border border-red-700 text-red-300'
                        : 'bg-gray-700 text-gray-100'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                    <p className="text-xs mt-2 opacity-70">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 rounded-lg px-4 py-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="px-6 pb-2">
            <div className="bg-red-900/20 border border-red-700 rounded-lg px-4 py-2">
              <p className="text-sm text-red-300">{error}</p>
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-6 border-t border-gray-700 bg-gray-800 rounded-b-xl">
          <form onSubmit={handleSend} className="flex items-end space-x-3">
            <div className="flex-1">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  selectedRepoName
                    ? `Ask about ${selectedRepoName}...`
                    : 'Select a repository to start asking questions...'
                }
                rows={3}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none bg-gray-700 text-white placeholder-gray-400"
                disabled={loading || !selectedRepoName}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend(e)
                  }
                }}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !input.trim() || !selectedRepoName}
              className="p-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:shadow-lg hover:from-purple-700 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex-shrink-0"
              title="Send message"
            >
              <HiPaperAirplane className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ChatPanel

