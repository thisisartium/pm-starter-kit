/**
 * Parse GitHub repository URL to extract owner and repository name
 * Supports formats:
 * - https://github.com/owner/repo
 * - https://github.com/owner/repo.git
 * - git@github.com:owner/repo.git
 * - owner/repo
 */
export const parseGitHubUrl = (url) => {
  if (!url || !url.trim()) {
    throw new Error('URL is required')
  }

  const trimmedUrl = url.trim()

  // Handle owner/repo format
  if (!trimmedUrl.includes('://') && !trimmedUrl.includes('@')) {
    const parts = trimmedUrl.split('/')
    if (parts.length === 2) {
      return {
        owner: parts[0],
        name: parts[1].replace('.git', ''),
        url: `https://github.com/${trimmedUrl}`,
      }
    }
  }

  // Handle SSH format: git@github.com:owner/repo.git
  if (trimmedUrl.startsWith('git@')) {
    const match = trimmedUrl.match(/git@github\.com:(.+?)\/(.+?)(?:\.git)?$/)
    if (match) {
      return {
        owner: match[1],
        name: match[2],
        url: `https://github.com/${match[1]}/${match[2]}`,
      }
    }
  }

  // Handle HTTPS format: https://github.com/owner/repo or https://github.com/owner/repo.git
  try {
    const urlObj = new URL(trimmedUrl)
    if (urlObj.hostname === 'github.com' || urlObj.hostname === 'www.github.com') {
      const pathParts = urlObj.pathname.split('/').filter((p) => p)
      if (pathParts.length >= 2) {
        return {
          owner: pathParts[0],
          name: pathParts[1].replace('.git', ''),
          url: `https://github.com/${pathParts[0]}/${pathParts[1].replace('.git', '')}`,
        }
      }
    }
  } catch (e) {
    // Invalid URL format
  }

  throw new Error('Invalid GitHub repository URL format. Expected: https://github.com/owner/repo or owner/repo')
}

/**
 * Validate GitHub Personal Access Token format
 * GitHub PATs typically start with 'ghp_' for classic tokens or 'github_pat_' for fine-grained tokens
 */
export const validateGitHubToken = (token) => {
  if (!token || !token.trim()) {
    return false
  }
  // Basic validation - GitHub tokens can start with ghp_ or github_pat_
  return token.trim().startsWith('ghp_') || token.trim().startsWith('github_pat_')
}

