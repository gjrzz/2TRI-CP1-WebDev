import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'

const STORAGE_KEY = 'logger.mp4:ratings'

function clampRating(value) {
  const rounded = Math.round(value * 2) / 2
  return Math.min(5, Math.max(0.5, rounded))
}

export function useRatings() {
  const [ratings, setRatings] = useLocalStorage(STORAGE_KEY, [])

  const getRating = useCallback(
    (movieId) => ratings.find((entry) => entry.id === movieId),
    [ratings],
  )

  const rateMovie = useCallback(
    (movie, rating) => {
      const entry = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        genres: movie.genres ?? [],
        rating: clampRating(rating),
        ratedAt: new Date().toISOString(),
      }

      setRatings((prev) => {
        const exists = prev.some((item) => item.id === movie.id)
        if (exists) {
          return prev.map((item) => (item.id === movie.id ? entry : item))
        }
        return [...prev, entry]
      })
    },
    [setRatings],
  )

  const removeRating = useCallback(
    (movieId) => {
      setRatings((prev) => prev.filter((item) => item.id !== movieId))
    },
    [setRatings],
  )

  return { ratings, getRating, rateMovie, removeRating }
}
