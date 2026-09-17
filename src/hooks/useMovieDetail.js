import { useCallback, useEffect, useState } from 'react'
import { getMovieDetail } from '../services/tmdb'

export function useMovieDetail(id) {
  const [movie, setMovie] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    if (!id) return undefined

    let cancelled = false
    setIsLoading(true)
    setError(null)
    setMovie(null)

    getMovieDetail(id)
      .then((data) => {
        if (!cancelled) setMovie(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id, reloadKey])

  const refetch = useCallback(() => setReloadKey((key) => key + 1), [])

  return { movie, isLoading, error, refetch }
}
