import React from 'react'

export const useQuery = <K>(request: () => Promise<K>, deps: React.DependencyList = []) => {
  const [status, setStatus] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [data, setData] = React.useState<K | null>(null)

  React.useEffect(() => {
    setIsLoading(true)
    try {
      fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        ...config,
        headers: {
          'Content-Type': 'application/json',
          ...(!!config?.headers && config.headers),
        },
      }).then(async response => {
        const responseData = (await response.json()) as K
        setStatus(response.status)
        setData(responseData)
      })
    } catch (error) {
      setIsLoading(false)
      setError((error as Error).message)
    }
  }, deps)

  return { data, error, isLoading, status }
}
