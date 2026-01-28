# Tools Directory

This directory contains tools that agents can use to interact with external systems and APIs.

## GitHub Tools

The `github-tools.js` file provides a collection of functions for interacting with GitHub repositories:

- `getRepoMetadata(owner, repo, token)` - Get repository metadata
- `getRepoContents(owner, repo, path, token)` - List files and directories
- `getFileContents(owner, repo, path, token)` - Read file contents
- `getRecentCommits(owner, repo, limit, token)` - Get commit history
- `getIssues(owner, repo, state, limit, token)` - Get repository issues
- `getReadme(owner, repo, token)` - Get README file

All tools support optional GitHub Personal Access Token (PAT) for authentication with private repositories.

