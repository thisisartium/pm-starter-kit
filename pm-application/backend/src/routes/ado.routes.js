import express from 'express'
import { sendPrompt, clearPromptHistory } from '../controllers/ado.controller.js'

const router = express.Router()

router.post('/prompt', sendPrompt)
router.delete('/history', clearPromptHistory)

export default router

