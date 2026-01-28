import { asyncHandler } from '../middleware/asyncHandler.js'
import agentService from '../services/agent.service.js'

/**
 * Send a prompt to the agent service
 */
export const sendPrompt = asyncHandler(async (req, res) => {
  const { prompt, repoId } = req.body

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ error: 'Prompt is required' })
  }

  try {
    const result = await agentService.processPrompt(prompt, repoId)
    res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ 
      error: 'Failed to process prompt',
      message: error.message 
    })
  }
})

/**
 * Get prompt history
 */
export const getPromptHistory = asyncHandler(async (req, res) => {
  const { repoId } = req.query
  
  let history
  if (repoId) {
    history = agentService.getPromptHistoryForRepo(repoId)
  } else {
    history = agentService.getPromptHistory()
  }
  
  res.status(200).json(history)
})

/**
 * Clear prompt history
 */
export const clearPromptHistory = asyncHandler(async (req, res) => {
  const { repoId } = req.body
  
  agentService.clearPromptHistory(repoId || null)
  
  res.status(200).json({ message: 'Prompt history cleared successfully' })
})

