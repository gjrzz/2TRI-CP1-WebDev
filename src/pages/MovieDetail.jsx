import { useParams } from 'react-router-dom'
import { FaHeart, FaRegHeart, FaTrash } from 'react-icons/fa'
import { useMovieDetail } from '../hooks/useMovieDetail'
import { useRatings } from '../hooks/useRatings'
import { useFavorites } from '../hooks/useFavorites'
import { getPosterUrl } from '../services/tmdb'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import RatingStars from '../components/RatingStars'

function MovieDetail() {
  const { id } = useParams()
  const { movie, isLoading, error, refetch } = useMovieDetail(id)
  const { getRating, rateMovie, removeRating } = useRatings()
  const { isFavorite, toggleFavorite } = useFavorites()

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage onRetry={refetch} />
  if (!movie) return null

  const genreNames = movie.genres?.map((genre) => genre.name) ?? []
  const normalizedMovie = {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    genres: genreNames,
  }

  const currentRating = getRating(movie.id)
  const favorited = isFavorite(movie.id)
  const year = movie.release_date ? movie.release_date.slice(0, 4) : null
  const posterUrl = getPosterUrl(movie.poster_path)

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full max-w-[280px] mx-auto md:mx-0 shrink-0">
        <div className="aspect-[2/3] rounded-lg overflow-hidden bg-white/10">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={`Pôster de ${movie.title}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/40 text-sm text-center p-2">
              {movie.title}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        <div>
          <h1 className="text-2xl font-bold">{movie.title}</h1>
          {year && <p className="text-white/50">{year}</p>}
        </div>

        {genreNames.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {genreNames.map((name) => (
              <span
                key={name}
                className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70"
              >
                {name}
              </span>
            ))}
          </div>
        )}

        {movie.overview && <p className="text-white/80 leading-relaxed">{movie.overview}</p>}

        <div className="flex flex-col gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
          <span className="text-sm font-medium text-white/70">
            {currentRating ? 'Sua avaliação' : 'Avalie este filme'}
          </span>
          <RatingStars value={currentRating?.rating ?? 0} onChange={(value) => rateMovie(normalizedMovie, value)} />
          {currentRating && (
            <button
              type="button"
              onClick={() => removeRating(movie.id)}
              className="self-start flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              <FaTrash aria-hidden="true" />
              Remover avaliação
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => toggleFavorite(normalizedMovie)}
          className={`self-start flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
            favorited ? 'bg-primary text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'
          }`}
        >
          {favorited ? <FaHeart aria-hidden="true" /> : <FaRegHeart aria-hidden="true" />}
          {favorited ? 'Favoritado' : 'Favoritar'}
        </button>
      </div>
    </div>
  )
}

export default MovieDetail
