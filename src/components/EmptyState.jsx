function EmptyState({ title, description, icon: Icon, children }) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 py-16 text-white/60">
      {Icon && <Icon className="text-5xl text-white/30" aria-hidden="true" />}
      <p className="text-lg font-medium text-white/80">{title}</p>
      {description && <p className="text-sm max-w-sm">{description}</p>}
      {children}
    </div>
  )
}

export default EmptyState
