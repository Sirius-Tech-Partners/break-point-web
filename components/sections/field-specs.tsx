import { Ruler, Users, Lightbulb, Layers } from 'lucide-react'

const SPECS: { icon: typeof Ruler; label: string; value: string }[] = [
  { icon: Layers,    label: 'Superficie',  value: 'Césped sintético' },
  { icon: Ruler,     label: 'Dimensiones', value: '25 × 45 m' },
  { icon: Users,     label: 'Capacidad',   value: '5 vs 5 (10 jugadores)' },
  { icon: Lightbulb, label: 'Iluminación', value: 'Nocturna incluida en tarifa noche' },
]

export function FieldSpecs() {
  return (
    <section className="w-full bg-surface">
      <div className="mx-auto max-w-[var(--spacing-container)] px-[var(--spacing-gutter)] py-[var(--spacing-xl)]">
        <h2 className="mb-[var(--spacing-lg)] text-center font-heading text-3xl font-bold text-on-surface">
          La cancha
        </h2>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 list-none">
          {SPECS.map(({ icon: Icon, label, value }) => (
            <li
              key={label}
              className="flex flex-col items-center gap-3 rounded-xl border border-outline/20 bg-white p-6 text-center"
            >
              <Icon size={28} className="text-primary-500" aria-hidden="true" />
              <span className="font-ui text-xs font-medium uppercase tracking-wide text-on-surface-var">
                {label}
              </span>
              <span className="font-heading text-base font-bold text-on-surface">{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
