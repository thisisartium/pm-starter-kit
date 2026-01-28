import OpenAI from 'openai'
import dotenv from 'dotenv'
import configService from './config.service.js'

dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const sendPromptToOpenAI = async (prompt, repoInfo = null) => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured in environment variables')
  }

  // Build the system message with context about GitHub repository if provided
  let systemMessage = 'You are a helpful assistant that can answer questions about GitHub repositories and codebases.'
  
  if (repoInfo) {
    systemMessage += ` The user is asking about the GitHub repository: ${repoInfo.fullName} (${repoInfo.url}).`
  }

  const messages = [
    {
      role: 'system',
      content: systemMessage,
    },
    {
      role: 'user',
      content: prompt,
    },
  ]

  try {
    const config = configService.getConfig()
    const completion = await openai.chat.completions.create({
      model: config.model,
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
    })

    return completion.choices[0].message.content
  } catch (error) {
    console.error('OpenAI API Error:', error)
    throw new Error(`Failed to get response from OpenAI: ${error.message}`)
  }
}

