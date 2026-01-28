import { asyncHandler } from '../middleware/asyncHandler.js'
import configService from '../services/config.service.js'

/**
 * Get LLM configuration
 */
export const getLLMConfig = asyncHandler(async (req, res) => {
  const config = configService.getConfig()
  res.status(200).json(config)
})

/**
 * Update LLM configuration
 */
export const updateLLMConfig = asyncHandler(async (req, res) => {
  const { provider, model } = req.body

  if (!provider || !model) {
    return res.status(400).json({ error: 'Provider and model are required' })
  }

  const updatedConfig = configService.updateConfig({ provider, model })
  res.status(200).json(updatedConfig)
})

