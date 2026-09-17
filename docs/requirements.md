# Requirements — logger.mp4 (Letterboxd Simplificado)

## Objetivo

Permitir que o usuário descubra filmes, avalie os que já assistiu (com
notas de meia estrela), favorite os que quiser guardar, e visualize um
perfil com estatísticas simples sobre seu histórico de avaliações.

## Público-alvo

Pessoas que assistem filmes e querem manter um registro pessoal de notas,
favoritos e gêneros preferidos, sem precisar de conta ou cadastro.

## User Stories

1. Como usuário, quero **ver filmes em alta na tela inicial** para
   descobrir o que assistir sem precisar buscar nada.
2. Como usuário, quero **buscar um filme pelo nome, em tempo real**, para
   encontrar rapidamente o que procuro.
3. Como usuário, quero **ver os detalhes de um filme** (sinopse, gênero,
   ano, pôster) para decidir se quero avaliá-lo ou favoritá-lo.
4. Como usuário, quero **dar uma nota de 0.5 a 5 estrelas** (com meia
   estrela) para um filme que já assisti, para guardar minha opinião
   sobre ele.
5. Como usuário, quero **editar ou remover uma nota** que já dei, caso eu
   mude de opinião ou tenha avaliado por engano.
6. Como usuário, quero **favoritar um filme**, independente de ter dado
   nota a ele, para guardá-lo numa lista separada.
7. Como usuário, quero **ver uma página só com meus favoritos** para
   acessá-los rapidamente.
8. Como usuário, quero **ver minha lista de filmes avaliados** no meu
   perfil, para acompanhar meu histórico.
9. Como usuário, quero **ordenar minha lista de avaliados por nota ou por
   data de avaliação**, para organizar meu histórico do jeito que eu
   quiser.
10. Como usuário, quero **ver estatísticas simples** (média de notas,
    gênero mais avaliado, total de filmes avaliados) para entender meu
    perfil de consumo.
11. Como usuário, quero que **minhas avaliações e favoritos sejam
    salvos** mesmo se eu fechar o navegador, para não perder meu
    histórico.

## Critérios de Aceitação

- A home deve carregar uma lista de filmes em alta (endpoint de
  populares/trending da TMDB) assim que a página abre.
- A busca deve filtrar/substituir essa lista em tempo real conforme o
  usuário digita (com debounce, para não disparar uma chamada por letra).
- Cada card de filme deve exibir pôster, título e ano.
- A página de detalhe deve ser acessada por uma rota dinâmica (`/filme/:id`).
- O usuário só pode avaliar ou favoritar um filme a partir da tela de
  detalhe.
- A nota deve ser um valor entre 0.5 e 5, em incrementos de 0.5.
- Um filme já avaliado deve permitir **editar** a nota (não duplicar
  entrada) e **remover** a avaliação por completo.
- Favoritar é uma ação independente de avaliar — um filme pode estar
  favoritado sem nota, ter nota sem estar favoritado, ou os dois juntos.
- Avaliações e favoritos devem persistir via `localStorage`.
- A página de perfil deve listar todos os filmes avaliados, com nota, e
  permitir ordenar essa lista por nota ou por data de avaliação.
- A página de favoritos deve listar todos os filmes marcados como
  favorito.
- A página de perfil deve calcular e exibir:
  - total de filmes avaliados
  - média das notas (uma casa decimal)
  - gênero com mais ocorrências entre os filmes avaliados
- Se não houver avaliações, o perfil deve mostrar um estado vazio (ex:
  "Você ainda não avaliou nenhum filme").
- Se não houver favoritos, a página de favoritos deve mostrar um estado
  vazio equivalente.
- Se a chamada à API falhar, exibir uma mensagem genérica de erro (ex:
  "Não foi possível carregar. Tente novamente.").

## Estados da Aplicação

- **Home/Busca**: carregando lista inicial / lista em alta carregada /
  buscando (debounce ativo) / resultados da busca / nenhum resultado
  encontrado / erro na API.
- **Detalhe do filme**: carregando / carregado / filme avaliado (mostra
  nota atual, com opção de editar/remover) / filme não avaliado (mostra
  opção de avaliar) / filme favoritado / filme não favoritado.
- **Perfil**: sem avaliações (estado vazio) / com avaliações (lista +
  estatísticas), ordenado por nota ou por data.
- **Favoritos**: sem favoritos (estado vazio) / com favoritos (lista).

## Regras do Produto

- Não há autenticação — os dados são armazenados localmente no navegador
  de cada usuário.
- Tema visual é **dark fixo** — não há alternância de tema na interface.
- Uma avaliação é composta por: `id do filme`, `título`, `pôster`,
  `ano`, `gênero(s)`, `nota`, `data da avaliação`.
- Um favorito é composto por: `id do filme`, `título`, `pôster`, `ano`,
  `gênero(s)`.
- A média de notas deve ser calculada com uma casa decimal (ex: `4.3`).
- O gênero mais avaliado é aquele que aparece com mais frequência entre
  os filmes avaliados; em caso de empate, exibir o primeiro encontrado.
- A busca em tempo real deve usar debounce (ex: ~400-500ms após o
  usuário parar de digitar) antes de chamar a API.