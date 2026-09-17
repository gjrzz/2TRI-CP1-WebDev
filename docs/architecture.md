# Architecture - logger.mp4

Stack: React + Vite (JS, sem TS), React Router, Tailwind, react-icons,
API do TMDB, e localStorage pra guardar avaliação e favorito (sem
backend mesmo, tudo no navegador).

## Páginas / Rotas

- `/` -> Home. Mostra os filmes em alta quando abre, e tem a busca que
  filtra em tempo real (com debounce pra não ficar batendo na API toda
  hora que digita).
- `/filme/:id` -> Detalhe do filme. Rota dinâmica pelo id. Aqui que dá
  pra avaliar (0.5 a 5 estrelas) e favoritar.
- `/perfil` -> Lista os filmes que eu avaliei + as estatísticas
  (quantos avaliei, média, gênero que mais aparece). Dá pra ordenar por
  nota ou por data.
- `/favoritos` -> Lista dos favoritados.

Tem uma Navbar fixa em cima de tudo (Home / Perfil / Favoritos), fica
num Layout que envolve as rotas no App.jsx.

## Componentes

- `Navbar` - os 3 links
- `SearchBar` - input da busca
- `MovieCard` - card do filme (poster, nome, ano). Usado na Home, no
  Perfil e nos Favoritos. Recebe o filme por prop, e se ele já tá
  favoritado ou não
- `RatingStars` - as estrelinhas. No detalhe é clicável, em outros
  lugares só mostra (prop tipo `readonly`)
- `StatsPanel` - calcula e mostra as estatísticas do perfil
- `EmptyState` - mensagem tipo "você ainda não avaliou nada"
- `LoadingSpinner` / `ErrorMessage` - loading e erro genérico

## Estados e efeitos (por página)

**Home**: `useState` pro texto da busca. `useEffect` busca os filmes
em alta quando a página monta; outro `useEffect` (com debounce) refaz a
busca toda vez que o texto muda.

**Detalhe**: `useEffect` busca os dados do filme quando o id da rota
muda. Não tem estado próprio, usa os hooks de avaliação/favorito
direto.

**Perfil**: não busca nada na API, só lê do localStorage (via hook).
`useState` só pra guardar se tá ordenando por nota ou por data.

**Favoritos**: mesma ideia do perfil, só lê do localStorage.

## Hooks customizados (pra não repetir lógica em cada página)

- `useRatings()` - lida com o localStorage das avaliações. Dá pra
  avaliar, editar, remover e pegar a nota de um filme
- `useFavorites()` - mesma coisa mas pra favoritos (marcar/desmarcar)
- `useTrendingMovies()` - busca os filmes em alta na TMDB
- `useMovieSearch(termo)` - busca por nome (esse tem o debounce)
- `useMovieDetail(id)` - busca o detalhe de um filme específico

## API

Todas as chamadas pro TMDB ficam centralizadas num arquivo só
(`services/tmdb.js`), pra não espalhar fetch pelo código todo. A chave
da API fica no `.env` (`VITE_TMDB_API_KEY`), não vai commitada.

## O que fica salvo no localStorage

- avaliações: id do filme, título, poster, gênero, nota, data que
  avaliei
- favoritos: id do filme, título, poster, gênero

Os hooks (`useRatings` e `useFavorites`) que cuidam de ler/escrever
isso toda vez que algo muda.