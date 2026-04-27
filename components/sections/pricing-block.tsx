import { Sun, Moon, Trophy, Flame, Home, Star } from 'lucide-react'
import { siteConfig, type PriceValue } from '@/config/site'

function formatPrice(value: PriceValue): string {
  return value === 'TBD' ? 'A confirmar' : `Bs ${value}`
}

const COMBINATIONS = [
  {
    icon: Trophy,
    title: 'Cancha + Parrilla',
    description: 'Partido y asado — el combo ideal para grupos.',
  },
  {
    icon: Flame,
    title: 'Salón + Parrilla',
    description: 'Celebración bajo techo con parrilla incluida.',
  },
  {
    icon: Home,
    title: 'Salón + Cancha',
    description: 'Espacio cubierto y cancha para toda la jornada.',
  },
  {
    icon: Star,
    title: 'Complejo completo',
    description: 'Salón, parrilla y cancha — todo Break Point para vos.',
  },
]

type PricingBlockProps = {
  variant?: 'cancha' | 'eventos'
}

export function PricingBlock({ variant = 'cancha' }: PricingBlockProps) {
  if (variant === 'eventos') {
    return (
      <section className="w-full bg-surface-low">
        <div className="mx-auto max-w-[var(--spacing-container)] px-[var(--spacing-gutter)] py-[var(--spacing-xl)]">
          <h2 className="mb-[var(--spacing-lg)] text-center font-heading text-3xl font-bold text-on-surface">
            Combinaciones disponibles
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {COMBINATIONS.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex flex-col gap-4 rounded-xl border border-outline/20 bg-white p-8"
              >
                <Icon size={28} className="text-cta" aria-hidden="true" />
                <div>
                  <h3 className="font-heading text-lg font-bold text-on-surface">{title}</h3>
                  <p className="mt-1 font-body text-sm text-on-surface-var">{description}</p>
                </div>
                <p className="font-ui text-sm font-medium text-primary-500">
                  Precio según combinación — cotizá sin compromiso
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center font-ui text-sm text-on-surface-var">
            {siteConfig.pricing.deposit.eventos} de adelanto confirma la fecha.
          </p>
        </div>
      </section>
    )
  }

  const { day, night } = siteConfig.pricing.cancha

  return (
    <section className="w-full bg-surface-low">
      <div className="mx-auto max-w-[var(--spacing-container)] px-[var(--spacing-gutter)] py-[var(--spacing-xl)]">
        <h2 className="mb-[var(--spacing-lg)] text-center font-heading text-3xl font-bold text-on-surface">
          Tarifas
        </h2>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Day */}
          <div className="flex flex-col items-center gap-4 rounded-xl border border-outline/20 bg-white p-8 text-center">
            <Sun size={32} className="text-cta" aria-hidden="true" />
            <span className="font-ui text-sm font-medium uppercase tracking-wide text-on-surface-var">
              Turno diurno
            </span>
            <p className="font-heading text-4xl font-bold text-on-surface">
              {formatPrice(day)}
            </p>
            <span className="font-ui text-sm text-on-surface-var">por hora</span>
          </div>

          {/* Night */}
          <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-primary-500 bg-white p-8 text-center shadow-[0px_8px_24px_rgba(0,71,171,0.12)]">
            <Moon size={32} className="text-primary-500" aria-hidden="true" />
            <span className="font-ui text-sm font-medium uppercase tracking-wide text-on-surface-var">
              Turno nocturno
            </span>
            <p className="font-heading text-4xl font-bold text-on-surface">
              {formatPrice(night)}
            </p>
            <span className="font-ui text-sm text-on-surface-var">por hora · iluminación incluida</span>
          </div>
        </div>

        <p className="mt-8 text-center font-ui text-sm text-on-surface-var">
          Mínimo 1 hora por reserva.
        </p>
      </div>
    </section>
  )
}
