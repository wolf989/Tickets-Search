import type { SearchResponse, TicketsResponse } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://avs-backend.vercel.app'

async function fetchWithRetry<T>(url: string, maxRetries = 5, delay = 1000): Promise<T> {
  let lastError: Error = new Error('Unknown error')

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          Accept: 'application/json',
        },
      })

      clearTimeout(timeoutId)

      const data = await response.json()

      if (!data || typeof data !== 'object')
        throw new Error('Invalid response')

      return data
    }
    catch (error) {
      lastError = error as Error

      if (attempt < maxRetries) {
        console.warn(`API request failed (attempt ${attempt}/${maxRetries}):`, error)
        await new Promise(resolve => setTimeout(resolve, delay * attempt))
      }
    }
  }

  throw lastError
}

export async function initializeSearch(): Promise<string> {
  try {
    const response = await fetchWithRetry<SearchResponse>(`${API_BASE_URL}/search`)

    if (!response.searchId)
      throw new Error('Failed to get search ID')

    return response.searchId
  }
  catch (error) {
    throw new Error(`Search init failed: ${(error as Error).message}`)
  }
}

export async function fetchTicketsBatch(searchId: string): Promise<TicketsResponse> {
  if (!searchId)
    throw new Error('SearchId is required')

  try {
    const response = await fetchWithRetry<TicketsResponse>(`${API_BASE_URL}/tickets?searchId=${searchId}`)
    return response
  }
  catch (error) {
    throw new Error(`Failed to fetch tickets: ${(error as Error).message}`)
  }
}
