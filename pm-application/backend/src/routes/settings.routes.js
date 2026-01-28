import express from 'express'
import { getLLMConfig, updateLLMConfig } from '../controllers/settings.controller.js'

const router = express.Router()

router.get('/llm', getLLMConfig)
router.put('/llm', updateLLMConfig)

export default router

