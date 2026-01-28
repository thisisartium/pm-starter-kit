import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import OpenAI from 'openai'
import dotenv from 'dotenv'
import * as githubTools from '../tools/github-tools.js'
import configService from '../services/config.service.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * GitHub Repository Agent
 * 
 * An AI agent specialized in querying and understanding GitHub repositories.
 * Uses tools to gather repository information and OpenAI to synthesize responses.
 */
class GitHubAgent {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
    
    // Load system prompt from file
    this.systemPrompt = this.loadSystemPrompt()
    
    // Available tools for the agent
    this.tools = {
      getRepoMetadata: githubTools.getRepoMetadata,
      getRepoContents: githubTools.getRepoContents,
      getFileContents: githubTools.getFileContents,
      getRecentCommits: githubTools.getRecentCommits,
      getIssues: githubTools.getIssues,
      getReadme: githubTools.getReadme,
      getPullRequests: githubTools.getPullRequests,
      getContributors: githubTools.getContributors,
      getReleases: githubTools.getReleases,
      getBranches: githubTools.getBranches,
      getLanguages: githubTools.getLanguages,
    }
  }

  /**
   * Load system prompt from prompt.md file
   */
  loadSystemPrompt() {
    try {
      const promptPath = path.join(__dirname, 'prompt.md')
      return fs.readFileSync(promptPath, 'utf-8')
    } catch (error) {
      console.warn('Could not load prompt.md, using default prompt')
      return 'You are a specialized GitHub Repository Agent designed to help users understand and query information about GitHub repositories.'
    }
  }

  /**
   * Execute a tool call
   * @param {string} toolName - Name of the tool to execute
   * @param {Object} params - Parameters for the tool (includes owner, repo, token, and tool-specific params)
   * @returns {Promise<any>} Tool execution result
   */
  async executeTool(toolName, params) {
    if (!this.tools[toolName]) {
      throw new Error(`Unknown tool: ${toolName}`)
    }

    try {
      const { owner, repo, token, ...toolParams } = params
      
      // Call the appropriate tool with correct parameters
      switch (toolName) {
        case 'getRepoMetadata':
          return await this.tools.getRepoMetadata(owner, repo, token)
        
        case 'getRepoContents':
          return await this.tools.getRepoContents(owner, repo, toolParams.path || '', token)
        
        case 'getFileContents':
          if (!toolParams.path) {
            throw new Error('path parameter is required for getFileContents')
          }
          return await this.tools.getFileContents(owner, repo, toolParams.path, token)
        
        case 'getRecentCommits':
          return await this.tools.getRecentCommits(owner, repo, toolParams.limit || 10, token)
        
        case 'getIssues':
          return await this.tools.getIssues(
            owner,
            repo,
            toolParams.state || 'open',
            toolParams.limit || 10,
            token
          )
        
        case 'getReadme':
          return await this.tools.getReadme(owner, repo, token)
        
        case 'getPullRequests':
          return await this.tools.getPullRequests(
            owner,
            repo,
            toolParams.state || 'open',
            toolParams.limit || 10,
            token
          )
        
        case 'getContributors':
          return await this.tools.getContributors(owner, repo, toolParams.limit || 10, token)
        
        case 'getReleases':
          return await this.tools.getReleases(owner, repo, toolParams.limit || 10, token)
        
        case 'getBranches':
          return await this.tools.getBranches(owner, repo, toolParams.limit || 30, token)
        
        case 'getLanguages':
          return await this.tools.getLanguages(owner, repo, token)
        
        default:
          throw new Error(`Unknown tool: ${toolName}`)
      }
    } catch (error) {
      return { error: error.message }
    }
  }

  /**
   * Process a user query about a repository
   * @param {string} userPrompt - User's question/prompt
   * @param {Object} repoInfo - Repository information { owner, name, token } or null
   * @returns {Promise<string>} Agent's response
   */
  async processQuery(userPrompt, repoInfo) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured in environment variables')
    }

    // Build context about available tools
    let toolsDescription = `
Available tools:
- getRepoMetadata: Get repository information (description, stars, language, etc.)
- getRepoContents: List files and directories in the repository
- getFileContents: Read the contents of a specific file
- getRecentCommits: Get recent commit history
- getIssues: Get repository issues
- getReadme: Get the repository README file
- getPullRequests: Get pull requests (open, closed, or all)
- getContributors: Get repository contributors
- getReleases: Get repository releases
- getBranches: Get repository branches
- getLanguages: Get repository languages with byte counts
`

    // Enhanced system message with repository context
    let systemMessage = `${this.systemPrompt}\n\n${toolsDescription}`

    // If repository info is provided, add it to context
    if (repoInfo && repoInfo.owner && repoInfo.name) {
      const { owner, name, token } = repoInfo
      systemMessage += `\n\nRepository: ${owner}/${name}\n${token ? 'Authentication: Available' : 'Authentication: Not available (public repo only)'}`
    } else {
      systemMessage += '\n\nNote: No specific repository is selected. You can answer general questions about GitHub repositories, but you cannot query specific repository data without a repository being selected.'
    }

    // First, try to understand what the user wants and determine if we need to fetch data
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

    // Only use function calling if we have repository info
    if (repoInfo && repoInfo.owner && repoInfo.name) {
      const { owner, name, token } = repoInfo

      // Use OpenAI with function calling to determine which tools to use
      const config = configService.getConfig()
      console.log(`Using LLM model: ${config.model} for GitHub agent`)
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
              description: 'Get repository metadata including description, stars, language, etc.',
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
                },
                required: [],
              },
            },
          },
          {
            type: 'function',
            function: {
              name: 'getIssues',
              description: 'Get repository issues (open, closed, or all)',
              parameters: {
                type: 'object',
                properties: {
                  state: {
                    type: 'string',
                    enum: ['open', 'closed', 'all'],
                    description: 'Issue state filter',
                  },
                  limit: {
                    type: 'number',
                    description: 'Number of issues to fetch (default: 10)',
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
          {
            type: 'function',
            function: {
              name: 'getPullRequests',
              description: 'Get repository pull requests (open, closed, or all)',
              parameters: {
                type: 'object',
                properties: {
                  state: {
                    type: 'string',
                    enum: ['open', 'closed', 'all'],
                    description: 'PR state filter',
                  },
                  limit: {
                    type: 'number',
                    description: 'Number of PRs to fetch (default: 10)',
                  },
                },
                required: [],
              },
            },
          },
          {
            type: 'function',
            function: {
              name: 'getContributors',
              description: 'Get repository contributors',
              parameters: {
                type: 'object',
                properties: {
                  limit: {
                    type: 'number',
                    description: 'Number of contributors to fetch (default: 10)',
                  },
                },
                required: [],
              },
            },
          },
          {
            type: 'function',
            function: {
              name: 'getReleases',
              description: 'Get repository releases',
              parameters: {
                type: 'object',
                properties: {
                  limit: {
                    type: 'number',
                    description: 'Number of releases to fetch (default: 10)',
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
              name: 'getLanguages',
              description: 'Get repository languages with byte counts',
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

      // If the model wants to call a function, execute it
      if (message.tool_calls && message.tool_calls.length > 0) {
        // Execute all tool calls
        const toolResults = await Promise.all(
          message.tool_calls.map(async (toolCall) => {
            const functionName = toolCall.function.name
            const functionArgs = JSON.parse(toolCall.function.arguments || '{}')

            // Execute the tool with repository context
            const toolParams = {
              ...functionArgs,
              owner,
              repo: name,
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

        // Send the tool results back to the model for final response
        messages.push(message)
        messages.push(...toolResults)

        // Get final response from the model
        const config = configService.getConfig()
        const finalCompletion = await this.openai.chat.completions.create({
          model: config.model,
          messages: messages,
          temperature: 0.7,
          max_tokens: 2000,
        })

        return finalCompletion.choices[0].message.content
      }

      // If no function call, return the direct response
      return message.content
    } else {
      // No repository selected - just answer the question directly
      const config = configService.getConfig()
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

export default GitHubAgent

