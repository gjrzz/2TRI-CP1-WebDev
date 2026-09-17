import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
import { getPosterUrl } from '../services/tmdb'
import RatingStars from './RatingStars'

function MovieCard({ movie, isFavorite = false, rating }) {
  const posterUrl = getPosterUrl(movie.poster_path)
  const year = movie.release_date ? movie.release_date.slice(0, 4) : null

  return (
    <Link
      to={`/filme/${movie.id}`}
      className="group flex flex-col rounded-lg overflow-hidden bg-white/5 hover:bg-white/10 transition-colors"
    >
      <div className="relative aspect-[2/3] bg-white/10">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`Pôster de ${movie.title}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/40 text-sm text-center p-2">
            {movie.title}
          </div>
        )}

        {isFavorite && (
          <span className="absolute top-2 right-2 text-primary bg-background/80 rounded-full p-1.5 text-sm">
            <FaHeart aria-label="Favoritado" />
          </span>
        )}
      </div>

      <div className="px-2 py-2 flex flex-col gap-1">
        <h3 className="text-sm font-medium text-white line-clamp-2">{movie.title}</h3>
        <div className="flex items-center justify-between gap-2">
          {year && <span className="text-xs text-white/50">{year}</span>}
          {rating != null && <RatingStars value={rating} readOnly size="text-xs" />}
        </div>
      </div>
    </Link>
  )
}

export default MovieCard
