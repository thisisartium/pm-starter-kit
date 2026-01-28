# Agents Directory

This directory contains AI agents that can interact with external systems and tools.

## Structure

- `github-agent.js` - GitHub Repository Agent that can query repository information
- `prompt.md` - System prompt for the GitHub agent

## GitHub Agent

The GitHub Agent is specialized in querying and understanding GitHub repositories. It uses tools from the `tools/` directory to gather repository information and OpenAI to synthesize responses.

### Features

- Fetches repository metadata (description, stars, language, etc.)
- Lists repository files and directory structure
- Reads file contents from repositories
- Gets commit history
- Retrieves issues and pull requests
- Analyzes code structure

### Usage

The agent is used through the `agent.service.js` service layer, which handles requests from the frontend.

