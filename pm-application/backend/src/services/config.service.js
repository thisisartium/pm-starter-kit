import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DATA_DIR = path.join(__dirname, '../data')
const CONFIG_FILE = path.join(DATA_DIR, 'llm-config.json')

// Default configuration
const DEFAULT_CONFIG = {
  provider: 'OpenAI',
  model: 'gpt-3.5-turbo',
}

let config = { ...DEFAULT_CONFIG }

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// Load configuration from file
const loadConfig = () => {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const data = fs.readFileSync(CONFIG_FILE, 'utf-8')
      const fileConfig = JSON.parse(data)
      config = { ...DEFAULT_CONFIG, ...fileConfig }
      console.log(`Loaded LLM config from ${CONFIG_FILE}`)
    } else {
      // Use environment variable if available, otherwise use default
      config = {
        provider: 'OpenAI',
        model: process.env.OPENAI_MODEL || DEFAULT_CONFIG.model,
      }
      saveConfig() // Save initial config
    }
  } catch (error) {
    console.error('Failed to load LLM config:', error)
    config = { ...DEFAULT_CONFIG }
  }
}

// Save configuration to file
const saveConfig = () => {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8')
    console.log(`Saved LLM config to ${CONFIG_FILE}`)
  } catch (error) {
    console.error('Failed to save LLM config:', error)
  }
}

// Initial load
loadConfig()

export const getConfig = () => {
  return {
    ...config,
    hasApiKey: !!process.env.OPENAI_API_KEY,
  }
}

export const updateConfig = (newConfig) => {
  config = { ...config, ...newConfig }
  saveConfig()
  console.log(`LLM configuration updated: ${config.provider} - ${config.model}`)
  return getConfig()
}

export default {
  getConfig,
  updateConfig,
}

