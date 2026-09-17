# logger.mp4

Projeto do CP1 de Web Dev (FIAP) - uma releitura simplificada do
Letterboxd, feita em React.

**Integrante:** Gabriel Juarez

## O problema

Com o fim do TV Time, faltou um app simples pra quem gosta de manter um
histórico de filmes assistidos - dar nota, favoritar e acompanhar
estatísticas básicas de consumo (quantos filmes já avaliou, qual gênero
mais assiste, etc).

## A solução

O logger.mp4 deixa o usuário buscar filmes, avaliar de 0.5 a 5 estrelas,
favoritar os que quiser guardar, e ver tudo isso resumido num perfil com
estatísticas simples. Sem login, sem cadastro - tudo fica salvo no
navegador (localStorage).

## Funcionalidades

- Home com filmes em alta + busca em tempo real
- Página de detalhe do filme (sinopse, gênero, ano, pôster)
- Avaliar, editar e remover nota (0.5 a 5 estrelas)
- Favoritar filmes, independente da nota
- Página de perfil com lista de avaliados + estatísticas (total, média,
  gênero favorito), com ordenação por nota ou data
- Página de favoritos
- Tema dark fixo

## Tecnologias

- React + Vite (JavaScript)
- React Router
- Tailwind CSS
- react-icons
- API do TMDB (The Movie Database)
- localStorage para persistência

## Uso de IA

O projeto foi construído seguindo Spec Driven Development: primeiro
documentei o que o app deveria fazer (`docs/requirements.md`) e como
seria estruturado (`docs/architecture.md`), e só depois usei o Claude
Code pra implementar em cima dessa especificação, etapa por etapa,
revisando e commitando cada parte manualmente. As decisões de produto,
design e arquitetura foram minhas - a IA ajudou na escrita do código
seguindo o que já tinha sido definido.

## Site online em https://loggermp4.vercel.app
## Documentação

- [`docs/requirements.md`](docs/requirements.md) - objetivo, user
  stories, critérios de aceitação
- [`docs/architecture.md`](docs/architecture.md) - páginas, rotas,
  componentes, hooks
- [`docs/references/references.md`](docs/references/references.md) -
  referências visuais usadas
