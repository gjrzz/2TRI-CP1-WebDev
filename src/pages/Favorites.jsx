import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
import MovieCard from '../components/MovieCard'
import EmptyState from '../components/EmptyState'
import { useFavorites } from '../hooks/useFavorites'
import { useRatings } from '../hooks/useRatings'

function Favorites() {
  const { favorites } = useFavorites()
  const { getRating } = useRatings()
  const hasFavorites = favorites.length > 0

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <FaHeart className="text-5xl text-primary" aria-hidden="true" />
        <div>
          <h1 className="text-xl font-semibold">Favoritos</h1>
          <p className="text-sm text-white/60">
            {favorites.length} {favorites.length === 1 ? 'filme favoritado' : 'filmes favoritados'}
          </p>
        </div>
      </div>

      {!hasFavorites ? (
        <EmptyState
          icon={FaHeart}
          title="Você ainda não favoritou nenhum filme"
          description="Favorite um filme na página de detalhe para vê-lo aqui."
        >
          <Link
            to="/"
            className="mt-2 px-4 py-2 rounded-md bg-primary text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Explorar filmes
          </Link>
        </EmptyState>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favorites.map((entry) => (
            <MovieCard
              key={entry.id}
              movie={entry}
              rating={getRating(entry.id)?.rating}
              isFavorite
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites
