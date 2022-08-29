import React from 'react'

export const useQuery = <T>(url: string, config?: Omit<RequestInit, 'method'>) => {
  const [status, setStatus] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  const mutation = React.useCallback(async (body: T): Promise<ApiResponse<K>> => {
    setIsLoading(true)
    try {
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        ...config,
        headers: {
          'Content-Type': 'application/json',
          ...(!!config?.headers && config.headers),
        },
      })
      setStatus(response.status)
      return await response.json()
    } catch (error) {
      setIsLoading(false)
      setError((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }, [])
  return { mutation, error, isLoading, status }
}
