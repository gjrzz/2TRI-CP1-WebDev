import { useMemo, useState } from 'react'
import MovieCard from '../components/MovieCard'
import StatsPanel from '../components/StatsPanel'
import EmptyState from '../components/EmptyState'
import { useRatings } from '../hooks/useRatings'
import { useFavorites } from '../hooks/useFavorites'

const SORT_OPTIONS = [
  { key: 'date', label: 'Data' },
  { key: 'rating', label: 'Nota' },
]

function Profile() {
  const { ratings } = useRatings()
  const { isFavorite } = useFavorites()
  const [sortBy, setSortBy] = useState('date')

  const sortedRatings = useMemo(() => {
    const copy = [...ratings]
    if (sortBy === 'rating') {
      copy.sort((a, b) => b.rating - a.rating)
    } else {
      copy.sort((a, b) => new Date(b.ratedAt) - new Date(a.ratedAt))
    }
    return copy
  }, [ratings, sortBy])

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">Perfil</h1>

      {ratings.length === 0 ? (
        <EmptyState
          title="Você ainda não avaliou nenhum filme"
          description="Avalie um filme na página de detalhe para vê-lo aqui."
        />
      ) : (
        <>
          <StatsPanel ratings={ratings} />

          <div className="flex items-center gap-2">
            <span className="text-sm text-white/60">Ordenar por:</span>
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setSortBy(option.key)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  sortBy === option.key
                    ? 'bg-primary text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {sortedRatings.map((entry) => (
              <MovieCard
                key={entry.id}
                movie={entry}
                rating={entry.rating}
                isFavorite={isFavorite(entry.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Profile
