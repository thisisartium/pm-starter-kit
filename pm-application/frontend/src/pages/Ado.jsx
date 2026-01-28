import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiPlus, HiTrash, HiChevronDown, HiChevronUp, HiChat, HiArrowLeft } from 'react-icons/hi'
import { reposApi, adoApi } from '../services/api'
import ChatPanel from '../components/ChatPanel'

function Ado() {
  const navigate = useNavigate()
  const [selectedRepo, setSelectedRepo] = useState('')
  const [error, setError] = useState(null)
  
  const [repos, setRepos] = useState([])
  const [showAddRepo, setShowAddRepo] = useState(false)
  const [newRepoUrl, setNewRepoUrl] = useState('')
  const [newRepoToken, setNewRepoToken] = useState('')
  const [addingRepo, setAddingRepo] = useState(false)
  const [isReposCollapsed, setIsReposCollapsed] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  useEffect(() => {
    loadRepos()
  }, [])

  const loadRepos = async () => {
    try {
      const data = await reposApi.getRepos('ado')
      setRepos(data)
      if (data.length > 0 && !selectedRepo) {
        setSelectedRepo(data[0].id)
      }
    } catch (err) {
      setError(err.message)
    }
  }

  const handleAddRepo = async (e) => {
    e.preventDefault()
    if (!newRepoUrl.trim()) {
      setError('Repository URL is required')
      return
    }

    setAddingRepo(true)
    setError(null)

    try {
      const newRepo = await reposApi.addRepo(
        newRepoUrl.trim(),
        newRepoToken.trim() || undefined,
        'ado'
      )
      setRepos([...repos, newRepo])
      setSelectedRepo(newRepo.id)
      setNewRepoUrl('')
      setNewRepoToken('')
      setShowAddRepo(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setAddingRepo(false)
    }
  }

  const handleDeleteRepo = async (id) => {
    if (!confirm('Are you sure you want to disconnect this repository?')) {
      return
    }

    try {
      await reposApi.deleteRepo(id)
      setRepos(repos.filter((r) => r.id !== id))
      if (selectedRepo === id) {
        setSelectedRepo(repos.length > 1 ? repos[0].id : '')
      }
    } catch (err) {
      setError(err.message)
    }
  }

      return (
        <div className="space-y-8">
          {/* Back Button */}
          <button
            onClick={() => navigate('/client-engagements')}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <HiArrowLeft className="w-5 h-5" />
            <span>Back to Client Engagements</span>
          </button>

          <div className="bg-gray-800 rounded-xl border border-gray-700 p-8">
            <h2 className="text-3xl font-bold text-white mb-8">Azure DevOps</h2>

        {/* Connected Repository Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setIsReposCollapsed(!isReposCollapsed)}
              className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
            >
              <h3 className="text-lg font-bold">Connected Repository</h3>
              {isReposCollapsed ? (
                <HiChevronDown className="w-5 h-5" />
              ) : (
                <HiChevronUp className="w-5 h-5" />
              )}
            </button>
            {!isReposCollapsed && (
              <button
                onClick={() => setShowAddRepo(!showAddRepo)}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:shadow-lg hover:from-purple-700 hover:to-pink-600 transition-all font-medium"
              >
                <HiPlus className="w-5 h-5" />
                <span>Add Repository</span>
              </button>
            )}
          </div>

          {/* Add Repo Form */}
          {!isReposCollapsed && showAddRepo && (
            <div className="mb-6 p-6 bg-gray-700/50 rounded-xl border border-gray-600">
              <form onSubmit={handleAddRepo} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Repository URL <span className="text-pink-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={newRepoUrl}
                    onChange={(e) => setNewRepoUrl(e.target.value)}
                    placeholder="https://dev.azure.com/{org}/{project}/_git/{repo} or {org}/{project}/{repo}"
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-800 text-white placeholder-gray-400"
                    required
                  />
                  <p className="mt-2 text-xs text-gray-400">
                    Examples: https://dev.azure.com/myorg/myproject/_git/myrepo or myorg/myproject/myrepo
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Azure DevOps Personal Access Token (optional)
                  </label>
                  <input
                    type="password"
                    value={newRepoToken}
                    onChange={(e) => setNewRepoToken(e.target.value)}
                    placeholder="Base64 encoded token"
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-800 text-white placeholder-gray-400"
                  />
                  <p className="mt-2 text-xs text-gray-400">
                    Required for private repos. Get one at{' '}
                    <a 
                      href="https://dev.azure.com/_usersSettings/tokens" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:underline font-medium"
                    >
                      dev.azure.com/_usersSettings/tokens
                    </a>
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    type="submit"
                    disabled={addingRepo}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:shadow-lg hover:from-purple-700 hover:to-pink-600 disabled:opacity-50 transition-all font-medium"
                  >
                    {addingRepo ? 'Adding...' : 'Add Repository'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddRepo(false)
                      setNewRepoUrl('')
                      setNewRepoToken('')
                    }}
                    className="px-6 py-3 bg-gray-700 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-600 hover:text-white transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Repos List */}
          {!isReposCollapsed && (
            <>
              {repos.length === 0 ? (
                <p className="text-gray-400 text-sm">No repositories connected. Add one to get started.</p>
              ) : (
                <div className="space-y-3">
                  {repos.map((repo) => (
                    <div
                      key={repo.id}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                        selectedRepo === repo.id
                          ? 'bg-purple-600/20 border-purple-500'
                          : 'bg-gray-700/30 border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <input
                          type="radio"
                          id={repo.id}
                          name="repo"
                          value={repo.id}
                          checked={selectedRepo === repo.id}
                          onChange={(e) => setSelectedRepo(e.target.value)}
                          className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                        />
                        <label htmlFor={repo.id} className="cursor-pointer flex-1">
                          <div className="font-semibold text-white">{repo.fullName}</div>
                          <div className="text-sm text-gray-400">{repo.url}</div>
                          {repo.hasToken && (
                            <div className="text-xs text-green-400 mt-1 font-medium">✓ Authenticated</div>
                          )}
                        </label>
                      </div>
                      <button
                        onClick={() => handleDeleteRepo(repo.id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Disconnect repository"
                      >
                        <HiTrash className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Chat Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Ask Questions</h3>
            <button
              onClick={() => setIsChatOpen(true)}
              disabled={!selectedRepo || repos.length === 0}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:shadow-lg hover:from-purple-700 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
              <HiChat className="w-5 h-5" />
              <span>Open Chat</span>
            </button>
          </div>
          {!selectedRepo && repos.length > 0 && (
            <p className="text-sm text-gray-400 mb-4">
              Please select a repository to start asking questions.
            </p>
          )}
          {repos.length === 0 && (
            <p className="text-sm text-gray-400 mb-4">
              Please add a repository first before asking questions.
            </p>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-6 p-4 bg-red-900/20 border border-red-700 rounded-xl">
            <p className="text-sm text-red-300 font-medium">{error}</p>
          </div>
        )}
      </div>

      {/* Chat Panel */}
      <ChatPanel
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        selectedRepo={selectedRepo}
        repos={repos}
        apiClient={adoApi}
      />
    </div>
  )
}

export default Ado

