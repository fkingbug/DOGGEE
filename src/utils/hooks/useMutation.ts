import React from 'react'

type MutationMetods = 'post' | 'put' | 'delete'

export const useMutation = <T, K>(
  url: string,
  method: MutationMetods,
  body?: T,
  config?: Omit<RequestInit, 'method'>
) => {
  const [status, setStatus] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  const mutation = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch(url, {
        credentials: 'same-origin',
        ...config,
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(!!config?.headers && config.headers),
        },
        ...(!!body && { body: JSON.stringify(body) }),
      })
      setStatus(response.status)
      return (await response.json()) as Promise<K>
    } catch (error) {
      setIsLoading(false)
      setError((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }, [])
  return { mutation, error, isLoading, status }
}
