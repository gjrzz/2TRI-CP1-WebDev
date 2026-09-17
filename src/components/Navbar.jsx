import { NavLink } from 'react-router-dom'
import { FaFilm, FaHeart, FaUser } from 'react-icons/fa'

const links = [
  { to: '/', label: 'Home', icon: FaFilm, end: true },
  { to: '/perfil', label: 'Perfil', icon: FaUser },
  { to: '/favoritos', label: 'Favoritos', icon: FaHeart },
]

function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-white/10">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <span className="flex items-center gap-2 text-lg font-bold text-white">
          <img src="/favicon.svg" alt="" className="w-6 h-6" aria-hidden="true" />
          logger<span className="text-primary">.mp4</span>
        </span>

        <ul className="flex items-center gap-2">
          {links.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                <Icon aria-hidden="true" />
                <span className="hidden sm:inline">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
