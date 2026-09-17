const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

async function request(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`)
  url.searchParams.set('api_key', API_KEY)
  url.searchParams.set('language', 'pt-BR')

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value)
    }
  })

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Erro na API do TMDB: ${response.status}`)
  }

  return response.json()
}

export function getTrendingMovies(page = 1) {
  return request('/trending/movie/week', { page })
}

export function searchMovies(query, page = 1) {
  return request('/search/movie', { query, page })
}

export function getMovieDetail(id) {
  return request(`/movie/${id}`)
}

export function getPosterUrl(posterPath, size = 'w500') {
  if (!posterPath) return null
  return `${IMAGE_BASE_URL}/${size}${posterPath}`
}
