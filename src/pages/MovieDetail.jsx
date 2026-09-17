import { useParams } from 'react-router-dom'

function MovieDetail() {
  const { id } = useParams()

  return (
    <div>
      <h1 className="text-2xl font-bold">Detalhe do filme {id}</h1>
    </div>
  )
}

export default MovieDetail
