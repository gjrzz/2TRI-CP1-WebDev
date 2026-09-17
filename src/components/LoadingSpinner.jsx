function LoadingSpinner({ label = 'Carregando...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-white/60">
      <span
        className="w-8 h-8 rounded-full border-2 border-white/20 border-t-primary animate-spin"
        aria-hidden="true"
      />
      <span className="text-sm">{label}</span>
    </div>
  )
}

export default LoadingSpinner
