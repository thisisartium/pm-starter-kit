import express from 'express'
import { getRepos, addRepo, deleteRepo } from '../controllers/repos.controller.js'

const router = express.Router()

router.get('/', getRepos)
router.post('/', addRepo)
router.delete('/:id', deleteRepo)

export default router

