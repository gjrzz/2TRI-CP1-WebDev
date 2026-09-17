import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function Layout() {
  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 pt-20 pb-10">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
