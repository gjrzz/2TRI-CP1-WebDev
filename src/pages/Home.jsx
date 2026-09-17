import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import MovieCard from '../components/MovieCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'
import { useTrendingMovies } from '../hooks/useTrendingMovies'
import { useMovieSearch } from '../hooks/useMovieSearch'
import { useFavorites } from '../hooks/useFavorites'

function Home() {
  const [search, setSearch] = useState('')
  const trending = useTrendingMovies()
  const searchResult = useMovieSearch(search)
  const { isFavorite } = useFavorites()

  const isSearching = searchResult.hasQuery
  const active = isSearching ? searchResult : trending

  const isLoading = isSearching
    ? searchResult.isLoading || searchResult.isDebouncing
    : trending.isLoading

  return (
    <div className="flex flex-col gap-6">
      <SearchBar value={search} onChange={setSearch} />

      <h1 className="text-xl font-semibold">
        {isSearching ? `Resultados para "${search.trim()}"` : 'Em alta'}
      </h1>

      {active.error && active.movies.length === 0 && (
        <ErrorMessage onRetry={isSearching ? searchResult.refetch : trending.refetch} />
      )}

      {!active.error && isLoading && active.movies.length === 0 && <LoadingSpinner />}

      {!active.error && !isLoading && active.movies.length === 0 && (
        <EmptyState
          title={isSearching ? 'Nenhum resultado encontrado' : 'Nada em alta no momento'}
          description={
            isSearching
              ? 'Tente buscar por outro título.'
              : 'Tente novamente mais tarde.'
          }
        />
      )}

      {active.movies.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {active.movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} isFavorite={isFavorite(movie.id)} />
            ))}
          </div>

          {active.error && (
            <p className="text-center text-sm text-white/60">
              Não foi possível carregar mais filmes.
            </p>
          )}

          {active.hasMore && (
            <button
              type="button"
              onClick={active.loadMore}
              disabled={isLoading}
              className="self-center px-5 py-2.5 rounded-md bg-primary text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? 'Carregando...' : active.error ? 'Tentar novamente' : 'Carregar mais'}
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default Home
