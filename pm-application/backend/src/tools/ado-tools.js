/**
 * Azure DevOps Tools
 * 
 * Collection of tools for interacting with Azure DevOps repositories.
 * These tools are used by agents to query repository information.
 */

/**
 * Build ADO API base URL
 */
const getAdoApiUrl = (organization, project, repo) => {
  return `https://dev.azure.com/${organization}/${project}/_apis/git/repositories/${repo}`
}

/**
 * Get ADO API headers with authentication
 */
const getAdoHeaders = (token = null) => {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  if (token) {
    // ADO uses Basic auth with PAT
    const auth = Buffer.from(`:${token}`).toString('base64')
    headers['Authorization'] = `Basic ${auth}`
  }

  return headers
}

/**
 * Fetch repository metadata
 * @param {string} organization - ADO organization
 * @param {string} project - ADO project
 * @param {string} repo - Repository name
 * @param {string} token - Azure DevOps Personal Access Token (optional)
 * @returns {Promise<Object>} Repository metadata
 */
export const getRepoMetadata = async (organization, project, repo, token = null) => {
  const url = `${getAdoApiUrl(organization, project, repo)}?api-version=7.1`
  const headers = getAdoHeaders(token)

  try {
    const response = await fetch(url, { headers })
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Repository ${organization}/${project}/${repo} not found`)
      }
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your Azure DevOps token.')
      }
      throw new Error(`Azure DevOps API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return {
      id: data.id,
      name: data.name,
      url: data.webUrl,
      defaultBranch: data.defaultBranch,
      size: data.size,
      remoteUrl: data.remoteUrl,
      isPrivate: data.isPrivate || true, // ADO repos are typically private
      project: data.project?.name,
    }
  } catch (error) {
    throw new Error(`Failed to fetch repository metadata: ${error.message}`)
  }
}

/**
 * Get repository file tree (contents of root directory)
 * @param {string} organization - ADO organization
 * @param {string} project - ADO project
 * @param {string} repo - Repository name
 * @param {string} path - Path within repository (default: root)
 * @param {string} branch - Branch name (default: default branch)
 * @param {string} token - Azure DevOps Personal Access Token (optional)
 * @returns {Promise<Array>} Array of file/directory objects
 */
export const getRepoContents = async (organization, project, repo, path = '', branch = null, token = null) => {
  // First get default branch if not provided
  if (!branch) {
    const metadata = await getRepoMetadata(organization, project, repo, token)
    branch = metadata.defaultBranch?.replace('refs/heads/', '') || 'main'
  }

  const url = `${getAdoApiUrl(organization, project, repo)}/items?api-version=7.1&scopePath=${encodeURIComponent(path)}&versionDescriptor.version=${branch}&recursionLevel=OneLevel`
  const headers = getAdoHeaders(token)

  try {
    const response = await fetch(url, { headers })
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Path ${path} not found in repository`)
      }
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your Azure DevOps token.')
      }
      throw new Error(`Azure DevOps API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    const items = data.value || []
    
    return items.map(item => ({
      name: item.path.split('/').pop(),
      path: item.path,
      type: item.isFolder ? 'dir' : 'file',
      size: item.size,
      objectId: item.objectId,
      url: item.url,
    }))
  } catch (error) {
    throw new Error(`Failed to fetch repository contents: ${error.message}`)
  }
}

/**
 * Read file contents from repository
 * @param {string} organization - ADO organization
 * @param {string} project - ADO project
 * @param {string} repo - Repository name
 * @param {string} path - File path within repository
 * @param {string} branch - Branch name (default: default branch)
 * @param {string} token - Azure DevOps Personal Access Token (optional)
 * @returns {Promise<string>} File contents
 */
export const getFileContents = async (organization, project, repo, path, branch = null, token = null) => {
  // First get default branch if not provided
  if (!branch) {
    const metadata = await getRepoMetadata(organization, project, repo, token)
    branch = metadata.defaultBranch?.replace('refs/heads/', '') || 'main'
  }

  const url = `${getAdoApiUrl(organization, project, repo)}/items?api-version=7.1&scopePath=${encodeURIComponent(path)}&versionDescriptor.version=${branch}&includeContent=true`
  const headers = getAdoHeaders(token)

  try {
    const response = await fetch(url, { headers })
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`File ${path} not found in repository`)
      }
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your Azure DevOps token.')
      }
      throw new Error(`Azure DevOps API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    if (data.isFolder) {
      throw new Error(`${path} is a directory, not a file`)
    }

    // ADO returns content as base64 or text
    if (data.content) {
      // Try to decode if it's base64
      try {
        return Buffer.from(data.content, 'base64').toString('utf-8')
      } catch (e) {
        return data.content
      }
    }
    
    return ''
  } catch (error) {
    throw new Error(`Failed to read file contents: ${error.message}`)
  }
}

/**
 * Get recent commits
 * @param {string} organization - ADO organization
 * @param {string} project - ADO project
 * @param {string} repo - Repository name
 * @param {number} limit - Number of commits to fetch (default: 10)
 * @param {string} branch - Branch name (default: default branch)
 * @param {string} token - Azure DevOps Personal Access Token (optional)
 * @returns {Promise<Array>} Array of commit objects
 */
export const getRecentCommits = async (organization, project, repo, limit = 10, branch = null, token = null) => {
  // First get default branch if not provided
  if (!branch) {
    const metadata = await getRepoMetadata(organization, project, repo, token)
    branch = metadata.defaultBranch?.replace('refs/heads/', '') || 'main'
  }

  const url = `${getAdoApiUrl(organization, project, repo)}/commits?api-version=7.1&$top=${limit}&searchCriteria.itemVersion.version=${branch}`
  const headers = getAdoHeaders(token)

  try {
    const response = await fetch(url, { headers })
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Repository ${organization}/${project}/${repo} not found`)
      }
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your Azure DevOps token.')
      }
      throw new Error(`Azure DevOps API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    const commits = data.value || []
    
    return commits.map(commit => ({
      commitId: commit.commitId,
      message: commit.comment,
      author: {
        name: commit.author.name,
        email: commit.author.email,
        date: commit.author.date,
      },
      url: commit.url,
    }))
  } catch (error) {
    throw new Error(`Failed to fetch commits: ${error.message}`)
  }
}

/**
 * Get repository branches
 * @param {string} organization - ADO organization
 * @param {string} project - ADO project
 * @param {string} repo - Repository name
 * @param {number} limit - Number of branches to fetch (default: 30)
 * @param {string} token - Azure DevOps Personal Access Token (optional)
 * @returns {Promise<Array>} Array of branch objects
 */
export const getBranches = async (organization, project, repo, limit = 30, token = null) => {
  const url = `${getAdoApiUrl(organization, project, repo)}/refs?api-version=7.1&filter=heads&$top=${limit}`
  const headers = getAdoHeaders(token)

  try {
    const response = await fetch(url, { headers })
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Repository ${organization}/${project}/${repo} not found`)
      }
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your Azure DevOps token.')
      }
      throw new Error(`Azure DevOps API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    const branches = data.value || []
    
    return branches.map(branch => ({
      name: branch.name.replace('refs/heads/', ''),
      objectId: branch.objectId,
    }))
  } catch (error) {
    throw new Error(`Failed to fetch branches: ${error.message}`)
  }
}

/**
 * Get repository README
 * @param {string} organization - ADO organization
 * @param {string} project - ADO project
 * @param {string} repo - Repository name
 * @param {string} token - Azure DevOps Personal Access Token (optional)
 * @returns {Promise<string>} README content
 */
export const getReadme = async (organization, project, repo, token = null) => {
  try {
    return await getFileContents(organization, project, repo, 'README.md', null, token)
  } catch (error) {
    // Try README variations
    const variations = ['README.txt', 'readme.md', 'Readme.md', 'README']
    for (const variant of variations) {
      try {
        return await getFileContents(organization, project, repo, variant, null, token)
      } catch (e) {
        continue
      }
    }
    throw new Error(`README not found in repository: ${error.message}`)
  }
}

export default {
  getRepoMetadata,
  getRepoContents,
  getFileContents,
  getRecentCommits,
  getBranches,
  getReadme,
}

