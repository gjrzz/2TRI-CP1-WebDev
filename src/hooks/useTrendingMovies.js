import { useCallback, useEffect, useState } from 'react'
import { getTrendingMovies } from '../services/tmdb'

export function useTrendingMovies() {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    setError(null)

    getTrendingMovies(1)
      .then((data) => {
        if (cancelled) return
        setMovies(data.results ?? [])
        setPage(1)
        setTotalPages(data.total_pages ?? 1)
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
  }, [reloadKey])

  const refetch = useCallback(() => setReloadKey((key) => key + 1), [])

  const loadMore = useCallback(() => {
    if (isLoading || page >= totalPages) return

    const nextPage = page + 1
    setIsLoading(true)
    setError(null)

    getTrendingMovies(nextPage)
      .then((data) => {
        setMovies((prev) => {
          const existingIds = new Set(prev.map((movie) => movie.id))
          const newMovies = (data.results ?? []).filter((movie) => !existingIds.has(movie.id))
          return [...prev, ...newMovies]
        })
        setPage(nextPage)
        setTotalPages(data.total_pages ?? nextPage)
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false))
  }, [isLoading, page, totalPages])

  return {
    movies,
    isLoading,
    error,
    loadMore,
    hasMore: page < totalPages,
    refetch,
  }
}
