import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Data directory and file path
const DATA_DIR = path.join(__dirname, '../data')
const REPOS_FILE = path.join(DATA_DIR, 'repos.json')

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

/**
 * Load repositories from JSON file
 */
const loadRepos = () => {
  try {
    if (fs.existsSync(REPOS_FILE)) {
      const data = fs.readFileSync(REPOS_FILE, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error loading repos from file:', error)
  }
  // Return default empty array if file doesn't exist or error
  return []
}

/**
 * Save repositories to JSON file
 */
const saveRepos = (repos) => {
  try {
    fs.writeFileSync(REPOS_FILE, JSON.stringify(repos, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error saving repos to file:', error)
    throw new Error('Failed to save repositories')
  }
}

// Initialize repos from file
let repos = loadRepos()

export const getAllRepos = () => repos

export const getRepoById = (id) => repos.find((r) => r.id === id)

export const getRepoToken = (id) => {
  const repo = repos.find((r) => r.id === id)
  return repo ? repo.token : null
}

export const addRepo = (repo) => {
  repos.push(repo)
  saveRepos(repos)
  return repo
}

export const deleteRepo = (id) => {
  const index = repos.findIndex((r) => r.id === id)
  if (index === -1) return false
  repos.splice(index, 1)
  saveRepos(repos)
  return true
}

export default {
  getAllRepos,
  getRepoById,
  getRepoToken,
  addRepo,
  deleteRepo,
}
