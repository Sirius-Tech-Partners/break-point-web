export function AvailabilityBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 px-3 py-1 font-ui text-sm font-medium text-white">
      <span className="h-2 w-2 rounded-full bg-available" aria-hidden="true" />
      Disponible hoy
    </span>
  )
}
