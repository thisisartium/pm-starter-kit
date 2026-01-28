import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import GitHubAgent from '../agents/github-agent.js'
import reposService from './repos.service.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Data directory and file path
const DATA_DIR = path.join(__dirname, '../data')
const HISTORY_FILE = path.join(DATA_DIR, 'github-prompt-history.json')

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

/**
 * Load prompt history from JSON file
 */
const loadHistory = () => {
  try {
    if (fs.existsSync(HISTORY_FILE)) {
      const data = fs.readFileSync(HISTORY_FILE, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error loading prompt history from file:', error)
  }
  return []
}

/**
 * Save prompt history to JSON file
 */
const saveHistory = (history) => {
  try {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error saving prompt history to file:', error)
  }
}

/**
 * Agent Service
 * 
 * Service layer that handles requests from the frontend and coordinates
 * with agents and tools to process queries.
 */
class AgentService {
  constructor() {
    this.githubAgent = new GitHubAgent()
    this.promptHistory = loadHistory()
  }

  /**
   * Process a prompt/query from the frontend
   * @param {string} prompt - User's prompt/query
   * @param {string} repoId - Repository ID (optional)
   * @returns {Promise<Object>} Response object with agent's answer
   */
  async processPrompt(prompt, repoId = null) {
    if (!prompt || !prompt.trim()) {
      throw new Error('Prompt is required')
    }

    // Get repository information if repoId is provided
    let repoInfo = null
    if (repoId) {
      const repo = reposService.getRepoById(repoId)
      if (!repo) {
        throw new Error('Repository not found')
      }

      // Parse owner and name from repo
      const parts = repo.fullName.split('/')
      if (parts.length !== 2) {
        throw new Error('Invalid repository format')
      }

      repoInfo = {
        owner: parts[0],
        name: parts[1],
        token: repo.token || null,
      }
    } else {
      // If no repo specified, we can still answer general questions
      repoInfo = null
    }

    try {
      let response

      // Use GitHub agent to process query (with or without repository context)
      response = await this.githubAgent.processQuery(prompt, repoInfo)

      // Create response object
      const result = {
        id: Date.now().toString(),
        prompt,
        repoId: repoId || null,
        repoInfo: repoInfo ? {
          owner: repoInfo.owner,
          name: repoInfo.name,
          fullName: `${repoInfo.owner}/${repoInfo.name}`,
        } : null,
        response,
        timestamp: new Date().toISOString(),
      }

      // Store in history and persist to file
      this.promptHistory.push(result)
      saveHistory(this.promptHistory)

      return result
    } catch (error) {
      console.error('Agent service error:', error)
      throw new Error(`Failed to process prompt: ${error.message}`)
    }
  }

  /**
   * Get prompt history
   * @returns {Array} Array of previous prompts and responses
   */
  getPromptHistory() {
    return this.promptHistory
  }

  /**
   * Get prompt history for a specific repository
   * @param {string} repoId - Repository ID
   * @returns {Array} Filtered prompt history
   */
  getPromptHistoryForRepo(repoId) {
    return this.promptHistory.filter(item => item.repoId === repoId)
  }

  /**
   * Clear prompt history
   * @param {string} repoId - Optional repository ID to clear history for specific repo only
   */
  clearPromptHistory(repoId = null) {
    if (repoId) {
      this.promptHistory = this.promptHistory.filter(item => item.repoId !== repoId)
    } else {
      this.promptHistory = []
    }
    saveHistory(this.promptHistory)
  }
}

export default new AgentService()
