import { Sun, Lightbulb, Building2, Flame, ChefHat, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const AMENITIES: { icon: LucideIcon; label: string }[] = [
  { icon: Sun,       label: 'Cancha al aire libre' },
  { icon: Lightbulb, label: 'Iluminación nocturna' },
  { icon: Building2, label: 'Salón para eventos' },
  { icon: Flame,     label: 'Área de parrilla' },
  { icon: ChefHat,   label: 'Cocina equipada' },
  { icon: Users,     label: 'Baños H/M' },
]

export function AmenitiesGrid() {
  return (
    <section className="w-full border-t-2 border-available-dark bg-dark">
      <div className="mx-auto max-w-[var(--spacing-container)] px-[var(--spacing-gutter)] py-[var(--spacing-xl)]">
        <h2 className="mb-[var(--spacing-lg)] text-center font-heading text-3xl font-bold text-white">
          Todo lo que necesitás
        </h2>
        <ul className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6 list-none">
          {AMENITIES.map(({ icon: Icon, label }) => (
            <li key={label} className="flex flex-col items-center gap-3 text-center">
              <Icon size={32} className="text-cta" aria-hidden="true" />
              <span className="font-ui text-sm text-white/80">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
