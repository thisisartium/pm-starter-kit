const API_BASE_URL = '/api'

export const agentsApi = {
  sendPrompt: async (prompt, repoId) => {
    const response = await fetch(`${API_BASE_URL}/agents/prompt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, repoId }),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to send prompt')
    }
    return response.json()
  },
  getHistory: async (repoId = null) => {
    const url = repoId ? `${API_BASE_URL}/agents/history?repoId=${repoId}` : `${API_BASE_URL}/agents/history`
    const response = await fetch(url)
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to get history')
    }
    return response.json()
  },
  clearHistory: async (repoId = null) => {
    const response = await fetch(`${API_BASE_URL}/agents/history`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ repoId }),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to clear history')
    }
    return response.json()
  },
}

export const adoApi = {
  sendPrompt: async (prompt, repoId) => {
    const response = await fetch(`${API_BASE_URL}/ado/prompt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, repoId }),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to send prompt')
    }
    return response.json()
  },
  getHistory: async (repoId = null) => {
    // ADO doesn't have getHistory endpoint yet, return empty for now
    return []
  },
  clearHistory: async (repoId = null) => {
    const response = await fetch(`${API_BASE_URL}/ado/history`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ repoId }),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to clear history')
    }
    return response.json()
  },
}

export const reposApi = {
  getRepos: async (type = null) => {
    const url = type ? `${API_BASE_URL}/repos?type=${type}` : `${API_BASE_URL}/repos`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch repos')
    }
    return response.json()
  },

  addRepo: async (url, token, type = 'github') => {
    const response = await fetch(`${API_BASE_URL}/repos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, token, type }),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to add repo')
    }
    return response.json()
  },

  deleteRepo: async (id) => {
    const response = await fetch(`${API_BASE_URL}/repos/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to delete repo')
    }
    return response.json()
  },
}

export const settingsApi = {
  getLLMConfig: async () => {
    const response = await fetch(`${API_BASE_URL}/settings/llm`)
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to get LLM configuration')
    }
    return response.json()
  },
  updateLLMConfig: async (provider, model) => {
    const response = await fetch(`${API_BASE_URL}/settings/llm`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ provider, model }),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to update LLM configuration')
    }
    return response.json()
  },
}

