import { useState, useEffect } from 'react'
import { settingsApi } from '../services/api'
import { HiCheckCircle, HiXCircle } from 'react-icons/hi'

function Settings() {
  const [llmConfig, setLlmConfig] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadLLMConfig()
  }, [])

  const loadLLMConfig = async () => {
    try {
      setLoading(true)
      const config = await settingsApi.getLLMConfig()
      setLlmConfig(config)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-8">
        <h2 className="text-3xl font-bold text-white mb-8">Settings</h2>
        
        {/* LLM Configuration Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">LLM Configuration</h3>
          
          {loading && (
            <div className="text-gray-400">Loading LLM configuration...</div>
          )}
          
          {error && (
            <div className="bg-red-900/20 border border-red-700 rounded-lg px-4 py-3 mb-4">
              <p className="text-sm text-red-300">Error: {error}</p>
            </div>
          )}
          
          {llmConfig && (
            <div className="bg-gray-700/50 rounded-xl border border-gray-600 p-6 space-y-6">
              {/* API Key Status */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-600">
                <div>
                  <p className="text-sm text-gray-400 mb-1">API Key Status</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {llmConfig.hasApiKey ? (
                      <>
                        <HiCheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-sm text-green-400 font-medium">Configured</span>
                      </>
                    ) : (
                      <>
                        <HiXCircle className="w-5 h-5 text-red-400" />
                        <span className="text-sm text-red-400 font-medium">Not Configured</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Provider Display */}
              <div>
                <p className="text-sm text-gray-400 mb-1">Provider</p>
                <div className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white">
                  {llmConfig.provider}
                </div>
                <p className="mt-2 text-xs text-gray-400">
                  Currently only OpenAI is supported
                </p>
              </div>

              {/* Model Display */}
              <div>
                <p className="text-sm text-gray-400 mb-1">Model</p>
                <div className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white">
                  {llmConfig.model}
                </div>
                <p className="mt-2 text-xs text-gray-400">
                  Configure the model via OPENAI_MODEL environment variable or llm-config.json file
                </p>
              </div>

              {/* API Key Warning */}
              {!llmConfig.hasApiKey && (
                <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg px-4 py-3">
                  <p className="text-sm text-yellow-300">
                    <strong>Warning:</strong> OpenAI API key is not configured. Please set OPENAI_API_KEY in your .env file.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings

