import React from 'react'

export const useQuery = <K>(request: <T>() => Promise<any>, deps: React.DependencyList = []) => {
  const [status, setStatus] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [data, setData] = React.useState<K | null>(null)

  React.useEffect(() => {
    setIsLoading(true)
    try {
      request<K>().then(async response => {
        setStatus(response.status)
        setData(response.data)
      })
    } catch (error) {
      setIsLoading(false)
      setError((error as Error).message)
    }
  }, deps)

  return { data, error, isLoading, status }
}
