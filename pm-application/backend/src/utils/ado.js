/**
 * Parse Azure DevOps repository URL to extract organization, project, and repository name
 * Supports formats:
 * - https://dev.azure.com/{organization}/{project}/_git/{repo}
 * - https://{organization}.visualstudio.com/{project}/_git/{repo}
 * - {organization}/{project}/{repo}
 */
export const parseAdoUrl = (url) => {
  if (!url || !url.trim()) {
    throw new Error('URL is required')
  }

  const trimmedUrl = url.trim()

  // Handle organization/project/repo format
  if (!trimmedUrl.includes('://') && !trimmedUrl.includes('@')) {
    const parts = trimmedUrl.split('/')
    if (parts.length === 3) {
      return {
        organization: parts[0],
        project: parts[1],
        repo: parts[2],
        url: `https://dev.azure.com/${parts[0]}/${parts[1]}/_git/${parts[2]}`,
      }
    }
  }

  // Handle dev.azure.com format: https://dev.azure.com/{org}/{project}/_git/{repo}
  if (trimmedUrl.includes('dev.azure.com')) {
    try {
      const urlObj = new URL(trimmedUrl)
      const pathParts = urlObj.pathname.split('/').filter((p) => p)
      if (pathParts.length >= 3 && pathParts[1] === '_git') {
        return {
          organization: pathParts[0],
          project: pathParts[0], // In ADO, project is often the same as org in URL structure
          repo: pathParts[2],
          url: trimmedUrl,
        }
      }
      // Alternative: /{org}/{project}/_git/{repo}
      if (pathParts.length >= 4 && pathParts[2] === '_git') {
        return {
          organization: pathParts[0],
          project: pathParts[1],
          repo: pathParts[3],
          url: trimmedUrl,
        }
      }
    } catch (e) {
      // Invalid URL format
    }
  }

  // Handle visualstudio.com format: https://{org}.visualstudio.com/{project}/_git/{repo}
  if (trimmedUrl.includes('.visualstudio.com')) {
    try {
      const urlObj = new URL(trimmedUrl)
      const hostnameParts = urlObj.hostname.split('.')
      const organization = hostnameParts[0]
      const pathParts = urlObj.pathname.split('/').filter((p) => p)
      if (pathParts.length >= 2 && pathParts[1] === '_git') {
        return {
          organization,
          project: pathParts[0],
          repo: pathParts[2],
          url: trimmedUrl,
        }
      }
    } catch (e) {
      // Invalid URL format
    }
  }

  throw new Error('Invalid Azure DevOps repository URL format. Expected: https://dev.azure.com/{org}/{project}/_git/{repo} or {org}/{project}/{repo}')
}

/**
 * Validate Azure DevOps Personal Access Token format
 * ADO PATs are base64 encoded strings, typically 52 characters
 */
export const validateAdoToken = (token) => {
  if (!token || !token.trim()) {
    return false
  }
  // Basic validation - ADO tokens are base64 encoded, typically 52 chars
  const trimmed = token.trim()
  return trimmed.length >= 40 && /^[A-Za-z0-9+/=]+$/.test(trimmed)
}

