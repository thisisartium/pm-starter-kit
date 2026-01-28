import { asyncHandler } from '../middleware/asyncHandler.js'
import adoAgentService from '../services/ado-agent.service.js'

/**
 * Send a prompt to the ADO agent service
 */
export const sendPrompt = asyncHandler(async (req, res) => {
  const { prompt, repoId } = req.body

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ error: 'Prompt is required' })
  }

  try {
    const result = await adoAgentService.processPrompt(prompt, repoId)
    res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ 
      error: 'Failed to process prompt',
      message: error.message 
    })
  }
})

/**
 * Clear prompt history
 */
export const clearPromptHistory = asyncHandler(async (req, res) => {
  const { repoId } = req.body
  
  adoAgentService.clearPromptHistory(repoId || null)
  
  res.status(200).json({ message: 'Prompt history cleared successfully' })
})

