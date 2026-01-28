import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import OpenAI from 'openai'
import dotenv from 'dotenv'
import * as adoTools from '../tools/ado-tools.js'
import configService from '../services/config.service.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Azure DevOps Repository Agent
 * 
 * An AI agent specialized in querying and understanding Azure DevOps repositories.
 * Uses tools to gather repository information and OpenAI to synthesize responses.
 */
class AdoAgent {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
    
    // Load system prompt from file (reuse GitHub prompt structure)
    this.systemPrompt = this.loadSystemPrompt()
    
    // Available tools for the agent
    this.tools = {
      getRepoMetadata: adoTools.getRepoMetadata,
      getRepoContents: adoTools.getRepoContents,
      getFileContents: adoTools.getFileContents,
      getRecentCommits: adoTools.getRecentCommits,
      getBranches: adoTools.getBranches,
      getReadme: adoTools.getReadme,
    }
  }

  /**
   * Load system prompt from prompt.md file
   */
  loadSystemPrompt() {
    try {
      const promptPath = path.join(__dirname, 'prompt.md')
      const basePrompt = fs.readFileSync(promptPath, 'utf-8')
      // Adapt GitHub prompt for Azure DevOps
      return basePrompt.replace(/GitHub/g, 'Azure DevOps').replace(/GitHub/g, 'ADO')
    } catch (error) {
      console.warn('Could not load prompt.md, using default prompt')
      return 'You are a specialized Azure DevOps Repository Agent designed to help users understand and query information about Azure DevOps repositories.'
    }
  }

  /**
   * Execute a tool call
   */
  async executeTool(toolName, params) {
    if (!this.tools[toolName]) {
      throw new Error(`Unknown tool: ${toolName}`)
    }

    try {
      const { organization, project, repo, token, ...toolParams } = params
      
      // Call the appropriate tool with correct parameters
      switch (toolName) {
        case 'getRepoMetadata':
          return await this.tools.getRepoMetadata(organization, project, repo, token)
        
        case 'getRepoContents':
          return await this.tools.getRepoContents(organization, project, repo, toolParams.path || '', toolParams.branch || null, token)
        
        case 'getFileContents':
          if (!toolParams.path) {
            throw new Error('path parameter is required for getFileContents')
          }
          return await this.tools.getFileContents(organization, project, repo, toolParams.path, toolParams.branch || null, token)
        
        case 'getRecentCommits':
          return await this.tools.getRecentCommits(organization, project, repo, toolParams.limit || 10, toolParams.branch || null, token)
        
        case 'getBranches':
          return await this.tools.getBranches(organization, project, repo, toolParams.limit || 30, token)
        
        case 'getReadme':
          return await this.tools.getReadme(organization, project, repo, token)
        
        default:
          throw new Error(`Unknown tool: ${toolName}`)
      }
    } catch (error) {
      return { error: error.message }
    }
  }

  /**
   * Process a user query about a repository
   */
  async processQuery(userPrompt, repoInfo) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured in environment variables')
    }

    // Build context about available tools
    let toolsDescription = `
Available tools:
- getRepoMetadata: Get repository information (name, size, default branch, etc.)
- getRepoContents: List files and directories in the repository
- getFileContents: Read the contents of a specific file
- getRecentCommits: Get recent commit history
- getBranches: Get repository branches
- getReadme: Get the repository README file
`

    let systemMessage = `${this.systemPrompt}\n\n${toolsDescription}`

    if (repoInfo && repoInfo.organization && repoInfo.project && repoInfo.repo) {
      const { organization, project, repo, token } = repoInfo
      systemMessage += `\n\nRepository: ${organization}/${project}/${repo}\n${token ? 'Authentication: Available' : 'Authentication: Not available (public repo only)'}`
    } else {
      systemMessage += '\n\nNote: No specific repository is selected. You can answer general questions about Azure DevOps repositories, but you cannot query specific repository data without a repository being selected.'
    }

    const messages = [
      {
        role: 'system',
        content: systemMessage,
      },
      {
        role: 'user',
        content: userPrompt,
      },
    ]

    if (repoInfo && repoInfo.organization && repoInfo.project && repoInfo.repo) {
      const { organization, project, repo, token } = repoInfo

      const config = configService.getConfig()
      console.log(`Using LLM model: ${config.model} for ADO agent`)
      const completion = await this.openai.chat.completions.create({
        model: config.model,
        messages: messages,
        temperature: 0.7,
        max_tokens: 2000,
        tools: [
          {
            type: 'function',
            function: {
              name: 'getRepoMetadata',
              description: 'Get repository metadata including name, size, default branch, etc.',
              parameters: {
                type: 'object',
                properties: {},
                required: [],
              },
            },
          },
          {
            type: 'function',
            function: {
              name: 'getRepoContents',
              description: 'List files and directories in the repository. Can specify a path.',
              parameters: {
                type: 'object',
                properties: {
                  path: {
                    type: 'string',
                    description: 'Path within repository (empty string for root)',
                  },
                  branch: {
                    type: 'string',
                    description: 'Branch name (optional, defaults to default branch)',
                  },
                },
                required: [],
              },
            },
          },
          {
            type: 'function',
            function: {
              name: 'getFileContents',
              description: 'Read the contents of a specific file from the repository',
              parameters: {
                type: 'object',
                properties: {
                  path: {
                    type: 'string',
                    description: 'Path to the file within the repository',
                  },
                  branch: {
                    type: 'string',
                    description: 'Branch name (optional, defaults to default branch)',
                  },
                },
                required: ['path'],
              },
            },
          },
          {
            type: 'function',
            function: {
              name: 'getRecentCommits',
              description: 'Get recent commit history from the repository',
              parameters: {
                type: 'object',
                properties: {
                  limit: {
                    type: 'number',
                    description: 'Number of commits to fetch (default: 10)',
                  },
                  branch: {
                    type: 'string',
                    description: 'Branch name (optional, defaults to default branch)',
                  },
                },
                required: [],
              },
            },
          },
          {
            type: 'function',
            function: {
              name: 'getBranches',
              description: 'Get repository branches',
              parameters: {
                type: 'object',
                properties: {
                  limit: {
                    type: 'number',
                    description: 'Number of branches to fetch (default: 30)',
                  },
                },
                required: [],
              },
            },
          },
          {
            type: 'function',
            function: {
              name: 'getReadme',
              description: 'Get the repository README file',
              parameters: {
                type: 'object',
                properties: {},
                required: [],
              },
            },
          },
        ],
        tool_choice: 'auto',
      })

      const message = completion.choices[0].message

      if (message.tool_calls && message.tool_calls.length > 0) {
        const toolResults = await Promise.all(
          message.tool_calls.map(async (toolCall) => {
            const functionName = toolCall.function.name
            const functionArgs = JSON.parse(toolCall.function.arguments || '{}')

            const toolParams = {
              ...functionArgs,
              organization,
              project,
              repo,
              token,
            }

            const toolResult = await this.executeTool(functionName, toolParams)
            return {
              tool_call_id: toolCall.id,
              role: 'tool',
              name: functionName,
              content: JSON.stringify(toolResult),
            }
          })
        )

        messages.push(message)
        messages.push(...toolResults)

        const config = configService.getConfig()
        const finalCompletion = await this.openai.chat.completions.create({
          model: config.model,
          messages: messages,
          temperature: 0.7,
          max_tokens: 2000,
        })

        return finalCompletion.choices[0].message.content
      }

      return message.content
    } else {
      const config = configService.getConfig()
      console.log(`Using LLM model: ${config.model} for ADO agent`)
      const completion = await this.openai.chat.completions.create({
        model: config.model,
        messages: messages,
        temperature: 0.7,
        max_tokens: 2000,
      })

      return completion.choices[0].message.content
    }
  }
}

export default AdoAgent

