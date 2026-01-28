import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import AdoAgent from '../agents/ado-agent.js'
import reposService from './repos.service.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Data directory and file path
const DATA_DIR = path.join(__dirname, '../data')
const HISTORY_FILE = path.join(DATA_DIR, 'ado-prompt-history.json')

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
    console.error('Error loading ADO prompt history from file:', error)
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
    console.error('Error saving ADO prompt history to file:', error)
  }
}

/**
 * ADO Agent Service
 * 
 * Service layer that handles requests from the frontend and coordinates
 * with ADO agents and tools to process queries.
 */
class AdoAgentService {
  constructor() {
    this.adoAgent = new AdoAgent()
    this.promptHistory = loadHistory()
  }

  /**
   * Process a prompt/query from the frontend
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

      if (repo.type !== 'ado') {
        throw new Error('Repository is not an Azure DevOps repository')
      }

      repoInfo = {
        organization: repo.organization,
        project: repo.project,
        repo: repo.name,
        token: repo.token || null,
      }
    }

    try {
      let response

      // Use ADO agent to process query (with or without repository context)
      response = await this.adoAgent.processQuery(prompt, repoInfo)

      // Create response object
      const result = {
        id: Date.now().toString(),
        prompt,
        repoId: repoId || null,
        repoInfo: repoInfo ? {
          organization: repoInfo.organization,
          project: repoInfo.project,
          repo: repoInfo.repo,
          fullName: `${repoInfo.organization}/${repoInfo.project}/${repoInfo.repo}`,
        } : null,
        response,
        timestamp: new Date().toISOString(),
      }

      // Store in history and persist to file
      this.promptHistory.push(result)
      saveHistory(this.promptHistory)

      return result
    } catch (error) {
      console.error('ADO Agent service error:', error)
      throw new Error(`Failed to process prompt: ${error.message}`)
    }
  }

  /**
   * Get prompt history
   */
  getPromptHistory() {
    return this.promptHistory
  }

  /**
   * Get prompt history for a specific repository
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

export default new AdoAgentService()
