import { Clock } from 'lucide-react'

const WINDOWS = [
  { day: 'Lunes a viernes', slots: 'Mañanas — 08:00 a 12:00' },
  { day: 'Lunes a viernes', slots: 'Tarde-noche — 18:00 a 22:00' },
  { day: 'Sábados',         slots: 'Mañana y tarde — 08:00 a 20:00' },
  { day: 'Domingos',        slots: 'Consultar disponibilidad' },
]

export function AvailabilityWindows() {
  return (
    <section className="w-full bg-surface">
      <div className="mx-auto max-w-[var(--spacing-container)] px-[var(--spacing-gutter)] py-[var(--spacing-xl)]">
        <h2 className="mb-[var(--spacing-lg)] text-center font-heading text-3xl font-bold text-on-surface">
          Disponibilidad típica
        </h2>

        <ul className="mx-auto w-full max-w-[36rem] list-none divide-y divide-outline/20 rounded-xl border border-outline/20 bg-white">
          {WINDOWS.map(({ day, slots }) => (
            <li key={`${day}-${slots}`} className="grid grid-cols-[18px_1fr] items-start gap-4 px-6 py-5">
              <Clock size={18} className="mt-0.5 shrink-0 text-primary-500" aria-hidden="true" />
              <div>
                <p className="font-ui text-sm font-medium text-on-surface">{day}</p>
                <p className="font-body text-sm text-on-surface-var">{slots}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-center font-ui text-sm text-on-surface-var">
          Los turnos exactos se confirman por WhatsApp según disponibilidad real.
        </p>
      </div>
    </section>
  )
}
