function ErrorMessage({ message = 'Não foi possível carregar. Tente novamente.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 py-16 text-white/60">
      <p className="text-sm">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="px-4 py-2 rounded-md bg-primary text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Tentar novamente
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
