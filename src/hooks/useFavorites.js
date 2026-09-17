import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'

const STORAGE_KEY = 'logger.mp4:favorites'

function toFavoriteEntry(movie) {
  return {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    genres: movie.genres ?? [],
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage(STORAGE_KEY, [])

  const isFavorite = useCallback(
    (movieId) => favorites.some((item) => item.id === movieId),
    [favorites],
  )

  const addFavorite = useCallback(
    (movie) => {
      setFavorites((prev) => {
        if (prev.some((item) => item.id === movie.id)) return prev
        return [...prev, toFavoriteEntry(movie)]
      })
    },
    [setFavorites],
  )

  const removeFavorite = useCallback(
    (movieId) => {
      setFavorites((prev) => prev.filter((item) => item.id !== movieId))
    },
    [setFavorites],
  )

  const toggleFavorite = useCallback(
    (movie) => {
      setFavorites((prev) => {
        const exists = prev.some((item) => item.id === movie.id)
        if (exists) return prev.filter((item) => item.id !== movie.id)
        return [...prev, toFavoriteEntry(movie)]
      })
    },
    [setFavorites],
  )

  return { favorites, isFavorite, addFavorite, removeFavorite, toggleFavorite }
}
