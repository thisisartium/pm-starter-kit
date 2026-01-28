import express from 'express'
import agentRoutes from './agents.routes.js'
import adoRoutes from './ado.routes.js'
import reposRoutes from './repos.routes.js'
import settingsRoutes from './settings.routes.js'

const router = express.Router()

// Placeholder route
router.get('/', (req, res) => {
  res.json({ message: 'API routes' })
})

// Mount sub-routes here
router.use('/agents', agentRoutes)
router.use('/ado', adoRoutes)
router.use('/repos', reposRoutes)
router.use('/settings', settingsRoutes)

export default router

