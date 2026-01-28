/**
 * GitHub Tools
 * 
 * Collection of tools for interacting with GitHub repositories.
 * These tools are used by agents to query repository information.
 */

/**
 * Fetch repository metadata
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @param {string} token - GitHub Personal Access Token (optional)
 * @returns {Promise<Object>} Repository metadata
 */
export const getRepoMetadata = async (owner, repo, token = null) => {
  const url = `https://api.github.com/repos/${owner}/${repo}`
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'PM-Application',
  }

  if (token) {
    headers['Authorization'] = `token ${token}`
  }

  try {
    const response = await fetch(url, { headers })
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Repository ${owner}/${repo} not found`)
      }
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your GitHub token.')
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return {
      id: data.id,
      name: data.name,
      fullName: data.full_name,
      description: data.description,
      url: data.html_url,
      language: data.language,
      stars: data.stargazers_count,
      forks: data.forks_count,
      openIssues: data.open_issues_count,
      defaultBranch: data.default_branch,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      isPrivate: data.private,
    }
  } catch (error) {
    throw new Error(`Failed to fetch repository metadata: ${error.message}`)
  }
}

/**
 * Get repository file tree (contents of root directory)
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @param {string} path - Path within repository (default: root)
 * @param {string} token - GitHub Personal Access Token (optional)
 * @returns {Promise<Array>} Array of file/directory objects
 */
export const getRepoContents = async (owner, repo, path = '', token = null) => {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'PM-Application',
  }

  if (token) {
    headers['Authorization'] = `token ${token}`
  }

  try {
    const response = await fetch(url, { headers })
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Path ${path} not found in repository`)
      }
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your GitHub token.')
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    // Handle both single file and directory responses
    const items = Array.isArray(data) ? data : [data]
    
    return items.map(item => ({
      name: item.name,
      path: item.path,
      type: item.type, // 'file' or 'dir'
      size: item.size,
      sha: item.sha,
      url: item.html_url,
      downloadUrl: item.download_url,
    }))
  } catch (error) {
    throw new Error(`Failed to fetch repository contents: ${error.message}`)
  }
}

/**
 * Read file contents from repository
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @param {string} path - File path within repository
 * @param {string} token - GitHub Personal Access Token (optional)
 * @returns {Promise<string>} File contents
 */
export const getFileContents = async (owner, repo, path, token = null) => {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'PM-Application',
  }

  if (token) {
    headers['Authorization'] = `token ${token}`
  }

  try {
    const response = await fetch(url, { headers })
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`File ${path} not found in repository`)
      }
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your GitHub token.')
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    if (data.type !== 'file') {
      throw new Error(`${path} is not a file`)
    }

    // Decode base64 content
    if (data.encoding === 'base64') {
      return Buffer.from(data.content, 'base64').toString('utf-8')
    }
    
    return data.content
  } catch (error) {
    throw new Error(`Failed to read file contents: ${error.message}`)
  }
}

/**
 * Get recent commits
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @param {number} limit - Number of commits to fetch (default: 10)
 * @param {string} token - GitHub Personal Access Token (optional)
 * @returns {Promise<Array>} Array of commit objects
 */
export const getRecentCommits = async (owner, repo, limit = 10, token = null) => {
  const url = `https://api.github.com/repos/${owner}/${repo}/commits?per_page=${limit}`
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'PM-Application',
  }

  if (token) {
    headers['Authorization'] = `token ${token}`
  }

  try {
    const response = await fetch(url, { headers })
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Repository ${owner}/${repo} not found`)
      }
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your GitHub token.')
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    return data.map(commit => ({
      sha: commit.sha,
      message: commit.commit.message,
      author: {
        name: commit.commit.author.name,
        email: commit.commit.author.email,
        date: commit.commit.author.date,
      },
      url: commit.html_url,
    }))
  } catch (error) {
    throw new Error(`Failed to fetch commits: ${error.message}`)
  }
}

/**
 * Get repository issues
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @param {string} state - Issue state: 'open', 'closed', or 'all' (default: 'open')
 * @param {number} limit - Number of issues to fetch (default: 10)
 * @param {string} token - GitHub Personal Access Token (optional)
 * @returns {Promise<Array>} Array of issue objects
 */
export const getIssues = async (owner, repo, state = 'open', limit = 10, token = null) => {
  const url = `https://api.github.com/repos/${owner}/${repo}/issues?state=${state}&per_page=${limit}`
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'PM-Application',
  }

  if (token) {
    headers['Authorization'] = `token ${token}`
  }

  try {
    const response = await fetch(url, { headers })
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Repository ${owner}/${repo} not found`)
      }
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your GitHub token.')
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    return data
      .filter(item => !item.pull_request) // Filter out pull requests
      .map(issue => ({
        number: issue.number,
        title: issue.title,
        body: issue.body,
        state: issue.state,
        labels: issue.labels.map(label => label.name),
        author: issue.user.login,
        createdAt: issue.created_at,
        updatedAt: issue.updated_at,
        url: issue.html_url,
      }))
  } catch (error) {
    throw new Error(`Failed to fetch issues: ${error.message}`)
  }
}

/**
 * Get repository README
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @param {string} token - GitHub Personal Access Token (optional)
 * @returns {Promise<string>} README content
 */
export const getReadme = async (owner, repo, token = null) => {
  try {
    return await getFileContents(owner, repo, 'README.md', token)
  } catch (error) {
    // Try README variations
    const variations = ['README.txt', 'readme.md', 'Readme.md']
    for (const variant of variations) {
      try {
        return await getFileContents(owner, repo, variant, token)
      } catch (e) {
        continue
      }
    }
    throw new Error(`README not found in repository: ${error.message}`)
  }
}

/**
 * Get pull requests
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @param {string} state - PR state: 'open', 'closed', or 'all' (default: 'open')
 * @param {number} limit - Number of PRs to fetch (default: 10)
 * @param {string} token - GitHub Personal Access Token (optional)
 * @returns {Promise<Array>} Array of pull request objects
 */
export const getPullRequests = async (owner, repo, state = 'open', limit = 10, token = null) => {
  const url = `https://api.github.com/repos/${owner}/${repo}/pulls?state=${state}&per_page=${limit}`
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'PM-Application',
  }

  if (token) {
    headers['Authorization'] = `token ${token}`
  }

  try {
    const response = await fetch(url, { headers })
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Repository ${owner}/${repo} not found`)
      }
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your GitHub token.')
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    return data.map(pr => ({
      number: pr.number,
      title: pr.title,
      body: pr.body,
      state: pr.state,
      author: pr.user.login,
      createdAt: pr.created_at,
      updatedAt: pr.updated_at,
      mergedAt: pr.merged_at,
      mergeable: pr.mergeable,
      url: pr.html_url,
      head: pr.head.ref,
      base: pr.base.ref,
    }))
  } catch (error) {
    throw new Error(`Failed to fetch pull requests: ${error.message}`)
  }
}

/**
 * Get repository contributors
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @param {number} limit - Number of contributors to fetch (default: 10)
 * @param {string} token - GitHub Personal Access Token (optional)
 * @returns {Promise<Array>} Array of contributor objects
 */
export const getContributors = async (owner, repo, limit = 10, token = null) => {
  const url = `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=${limit}`
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'PM-Application',
  }

  if (token) {
    headers['Authorization'] = `token ${token}`
  }

  try {
    const response = await fetch(url, { headers })
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Repository ${owner}/${repo} not found`)
      }
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your GitHub token.')
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    return data.map(contributor => ({
      username: contributor.login,
      contributions: contributor.contributions,
      avatarUrl: contributor.avatar_url,
      profileUrl: contributor.html_url,
    }))
  } catch (error) {
    throw new Error(`Failed to fetch contributors: ${error.message}`)
  }
}

/**
 * Get repository releases
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @param {number} limit - Number of releases to fetch (default: 10)
 * @param {string} token - GitHub Personal Access Token (optional)
 * @returns {Promise<Array>} Array of release objects
 */
export const getReleases = async (owner, repo, limit = 10, token = null) => {
  const url = `https://api.github.com/repos/${owner}/${repo}/releases?per_page=${limit}`
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'PM-Application',
  }

  if (token) {
    headers['Authorization'] = `token ${token}`
  }

  try {
    const response = await fetch(url, { headers })
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Repository ${owner}/${repo} not found`)
      }
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your GitHub token.')
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    return data.map(release => ({
      id: release.id,
      tagName: release.tag_name,
      name: release.name,
      body: release.body,
      author: release.author.login,
      publishedAt: release.published_at,
      isPrerelease: release.prerelease,
      isDraft: release.draft,
      url: release.html_url,
      assets: release.assets.map(asset => ({
        name: asset.name,
        downloadCount: asset.download_count,
        size: asset.size,
        url: asset.browser_download_url,
      })),
    }))
  } catch (error) {
    throw new Error(`Failed to fetch releases: ${error.message}`)
  }
}

/**
 * Get repository branches
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @param {number} limit - Number of branches to fetch (default: 30)
 * @param {string} token - GitHub Personal Access Token (optional)
 * @returns {Promise<Array>} Array of branch objects
 */
export const getBranches = async (owner, repo, limit = 30, token = null) => {
  const url = `https://api.github.com/repos/${owner}/${repo}/branches?per_page=${limit}`
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'PM-Application',
  }

  if (token) {
    headers['Authorization'] = `token ${token}`
  }

  try {
    const response = await fetch(url, { headers })
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Repository ${owner}/${repo} not found`)
      }
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your GitHub token.')
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    return data.map(branch => ({
      name: branch.name,
      sha: branch.commit.sha,
      protected: branch.protected,
    }))
  } catch (error) {
    throw new Error(`Failed to fetch branches: ${error.message}`)
  }
}

/**
 * Get repository languages (with byte counts)
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @param {string} token - GitHub Personal Access Token (optional)
 * @returns {Promise<Object>} Object mapping language names to byte counts
 */
export const getLanguages = async (owner, repo, token = null) => {
  const url = `https://api.github.com/repos/${owner}/${repo}/languages`
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'PM-Application',
  }

  if (token) {
    headers['Authorization'] = `token ${token}`
  }

  try {
    const response = await fetch(url, { headers })
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Repository ${owner}/${repo} not found`)
      }
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your GitHub token.')
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    throw new Error(`Failed to fetch languages: ${error.message}`)
  }
}

export default {
  getRepoMetadata,
  getRepoContents,
  getFileContents,
  getRecentCommits,
  getIssues,
  getReadme,
  getPullRequests,
  getContributors,
  getReleases,
  getBranches,
  getLanguages,
}

