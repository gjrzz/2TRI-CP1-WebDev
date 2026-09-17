import { useCallback, useEffect, useState } from 'react'
import { searchMovies } from '../services/tmdb'

const DEBOUNCE_MS = 450

export function useMovieSearch(query) {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isDebouncing, setIsDebouncing] = useState(false)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  const trimmedQuery = query.trim()

  useEffect(() => {
    if (!trimmedQuery) {
      setMovies([])
      setPage(1)
      setTotalPages(1)
      setIsLoading(false)
      setIsDebouncing(false)
      setError(null)
      return undefined
    }

    setIsDebouncing(true)

    const timer = setTimeout(() => {
      setIsDebouncing(false)
      setIsLoading(true)
      setError(null)

      searchMovies(trimmedQuery, 1)
        .then((data) => {
          setMovies(data.results ?? [])
          setPage(1)
          setTotalPages(data.total_pages ?? 1)
        })
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false))
    }, DEBOUNCE_MS)

    return () => clearTimeout(timer)
  }, [trimmedQuery, reloadKey])

  const refetch = useCallback(() => setReloadKey((key) => key + 1), [])

  const loadMore = useCallback(() => {
    if (!trimmedQuery || isLoading || page >= totalPages) return

    const nextPage = page + 1
    setIsLoading(true)

    searchMovies(trimmedQuery, nextPage)
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
  }, [trimmedQuery, isLoading, page, totalPages])

  return {
    movies,
    isLoading,
    isDebouncing,
    error,
    loadMore,
    hasMore: page < totalPages,
    hasQuery: Boolean(trimmedQuery),
    refetch,
  }
}
