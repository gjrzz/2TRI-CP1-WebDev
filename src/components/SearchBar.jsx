import { FaSearch } from 'react-icons/fa'

function SearchBar({ value, onChange, placeholder = 'Buscar filme pelo nome...' }) {
  return (
    <div className="relative">
      <FaSearch
        className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Buscar filme"
        className="w-full rounded-md bg-white/5 border border-white/10 pl-10 pr-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  )
}

export default SearchBar
