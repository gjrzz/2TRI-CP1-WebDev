function getTopGenre(ratings) {
  const counts = new Map()
  const order = []

  for (const rating of ratings) {
    for (const genre of rating.genres ?? []) {
      if (!counts.has(genre)) {
        counts.set(genre, 0)
        order.push(genre)
      }
      counts.set(genre, counts.get(genre) + 1)
    }
  }

  if (order.length === 0) return null

  let top = order[0]
  for (const genre of order) {
    if (counts.get(genre) > counts.get(top)) top = genre
  }
  return top
}

function StatsPanel({ ratings }) {
  const total = ratings.length
  const average = total > 0
    ? (ratings.reduce((sum, item) => sum + item.rating, 0) / total).toFixed(1)
    : '0.0'
  const topGenre = getTopGenre(ratings)

  const stats = [
    { label: 'Filmes avaliados', value: total },
    { label: 'Média das notas', value: average },
    { label: 'Gênero favorito', value: topGenre ?? '—' },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col gap-1 p-4 rounded-lg bg-white/5 border border-white/10"
        >
          <span className="text-sm text-white/60">{stat.label}</span>
          <span className="text-2xl font-semibold text-primary">{stat.value}</span>
        </div>
      ))}
    </div>
  )
}

export default StatsPanel
