# References - logger.mp4

Mínimo de 3 referências visuais, cada uma com: o que foi observado, onde
usei no meu app e por que faz sentido pra minha solução.

## 1. Letterboxd - lista de filmes avaliados com estrelas

![Perfil do Letterboxd](Images/LetterBoxs_Profile.png)

**O que observei:** no perfil do usuário, o Letterboxd mostra cada
filme como um pôster pequeno com a nota em estrelas (incluindo meia
estrela) logo abaixo ou sobreposta ao pôster. É um jeito compacto de
ver bastante filme avaliado de uma vez.

**Onde usei:** na página `/perfil`, no `MovieCard` que exibe a nota
junto do pôster, usando o componente `RatingStars`.

**Por que faz sentido:** minha aplicação é literalmente inspirada no
Letterboxd (é o "produto de referência" citado no próprio enunciado
como exemplo de app de avaliação de filmes), e o sistema de nota com
meia estrela é uma decisão de produto que veio direto de lá - copiar
esse padrão deixa a experiência já familiar pra quem usa esse tipo de
app.

## 2. Netflix - grid de descoberta em tela escura

![Home do Netflix](Images/Netflix_Home.png)

**O que observei:** a home do Netflix é um grid de pôsteres em fundo
escuro, sem muito texto, focado na imagem do filme/série. O usuário
escaneia visualmente em vez de ler descrição.

**Onde usei:** na página `/` (Home), no grid de `MovieCard` que lista
os filmes em alta e os resultados de busca.

**Por que faz sentido:** meu app também é sobre descoberta de conteúdo
audiovisual, então o mesmo padrão de "grid escuro, pôster em destaque"
funciona bem aqui - e já encaixa direto com a decisão de tema dark
fixo que defini no requirements.

## 3. Strava - painel de estatísticas pessoais

![Estatísticas do Strava](Images/Strava_Stats.png)

**O que observei:** o Strava resume a atividade do usuário em números
grandes e diretos (distância total, ritmo médio, etc), sem gráfico
complicado - só os números que importam, destacados visualmente.

**Onde usei:** no `StatsPanel` da página `/perfil`, mostrando total de
filmes avaliados, nota média e gênero favorito como blocos de número
grande, em vez de texto corrido.

**Por que faz sentido:** minhas estatísticas (total avaliado, média,
gênero favorito) são simples e não precisam de gráfico - o padrão do
Strava de "números grandes e escaneáveis" comunica isso rápido, sem
poluir a tela de perfil.