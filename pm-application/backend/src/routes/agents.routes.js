import express from 'express'
import { sendPrompt, getPromptHistory, clearPromptHistory } from '../controllers/agents.controller.js'

const router = express.Router()

router.post('/prompt', sendPrompt)
router.get('/history', getPromptHistory)
router.delete('/history', clearPromptHistory)

export default router

