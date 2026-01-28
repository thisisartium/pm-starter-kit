import { asyncHandler } from '../middleware/asyncHandler.js'
import reposService from '../services/repos.service.js'
import { parseGitHubUrl, validateGitHubToken } from '../utils/github.js'
import { parseAdoUrl, validateAdoToken } from '../utils/ado.js'

export const getRepos = asyncHandler(async (req, res) => {
  const { type } = req.query
  let repos = reposService.getAllRepos()
  
  // Filter by type if provided
  if (type) {
    repos = repos.filter((r) => r.type === type)
  }
  
  // Don't send token in response for security
  const safeRepos = repos.map(({ token, ...repo }) => ({
    ...repo,
    hasToken: !!token,
  }))
  res.status(200).json(safeRepos)
})

export const addRepo = asyncHandler(async (req, res) => {
  const { url, token, type = 'github' } = req.body

  if (!url || !url.trim()) {
    return res.status(400).json({ error: 'Repository URL is required' })
  }

  if (type !== 'github' && type !== 'ado') {
    return res.status(400).json({ error: 'Invalid repository type. Must be "github" or "ado"' })
  }

  let repoInfo
  let fullName

  if (type === 'github') {
    // Parse the GitHub URL
    try {
      repoInfo = parseGitHubUrl(url.trim())
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }

    // Validate token if provided
    if (token && !validateGitHubToken(token)) {
      return res.status(400).json({ 
        error: 'Invalid GitHub token format. Token should start with "ghp_" or "github_pat_"' 
      })
    }

    fullName = `${repoInfo.owner}/${repoInfo.name}`
  } else {
    // Parse the ADO URL
    try {
      repoInfo = parseAdoUrl(url.trim())
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }

    // Validate token if provided
    if (token && !validateAdoToken(token)) {
      return res.status(400).json({ 
        error: 'Invalid Azure DevOps token format' 
      })
    }

    fullName = `${repoInfo.organization}/${repoInfo.project}/${repoInfo.repo}`
  }

  // Check if repo already exists
  const existingRepo = reposService.getAllRepos().find((r) => r.fullName === fullName && r.type === type)
  if (existingRepo) {
    return res.status(409).json({ error: 'Repository already connected' })
  }

  const newRepo = type === 'github' ? {
    id: Date.now().toString(),
    type: 'github',
    owner: repoInfo.owner,
    name: repoInfo.name,
    fullName,
    url: repoInfo.url,
    token: token ? token.trim() : null,
    connectedAt: new Date().toISOString(),
  } : {
    id: Date.now().toString(),
    type: 'ado',
    organization: repoInfo.organization,
    project: repoInfo.project,
    name: repoInfo.repo,
    fullName,
    url: repoInfo.url,
    token: token ? token.trim() : null,
    connectedAt: new Date().toISOString(),
  }

  reposService.addRepo(newRepo)

  // Don't send token in response
  const { token: _, ...safeRepo } = newRepo
  res.status(201).json({ ...safeRepo, hasToken: !!newRepo.token })
})

export const deleteRepo = asyncHandler(async (req, res) => {
  const { id } = req.params

  const deleted = reposService.deleteRepo(id)
  if (!deleted) {
    return res.status(404).json({ error: 'Repository not found' })
  }

  res.status(200).json({ message: 'Repository disconnected successfully' })
})

