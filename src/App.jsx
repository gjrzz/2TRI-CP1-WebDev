import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'
import Profile from './pages/Profile'
import Favorites from './pages/Favorites'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/filme/:id" element={<MovieDetail />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/favoritos" element={<Favorites />} />
      </Route>
    </Routes>
  )
}

export default App
