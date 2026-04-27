import { MessageCircle, CalendarCheck, ShieldCheck } from 'lucide-react'
import { siteConfig } from '@/config/site'

const STEPS_CANCHA = [
  {
    icon: MessageCircle,
    title: 'Contactar por WhatsApp',
    description: 'Escribinos con la fecha y hora que necesitás. Te respondemos rápido.',
  },
  {
    icon: CalendarCheck,
    title: 'Confirmar horario disponible',
    description: 'Te informamos la disponibilidad en el momento y acordamos el turno.',
  },
  {
    icon: ShieldCheck,
    title: 'Adelanto asegura el espacio',
    description: `Un adelanto de ${siteConfig.pricing.deposit.cancha} reserva tu turno. El saldo se abona al llegar.`,
  },
]

const STEPS_EVENTOS = [
  {
    icon: MessageCircle,
    title: 'Consultar combinación por WhatsApp',
    description: 'Contanos qué tipo de evento es y cuántos invitados esperás. Te asesoramos.',
  },
  {
    icon: CalendarCheck,
    title: 'Coordinar precio y disponibilidad',
    description: 'Te informamos la disponibilidad y acordamos el precio según la combinación elegida.',
  },
  {
    icon: ShieldCheck,
    title: '50% adelanto confirma la fecha',
    description: `Un adelanto del ${siteConfig.pricing.deposit.eventos} bloquea la fecha. El saldo se abona el día del evento.`,
  },
]

type HowItWorksProps = {
  variant?: 'cancha' | 'eventos'
}

export function HowItWorks({ variant = 'cancha' }: HowItWorksProps) {
  const steps = variant === 'eventos' ? STEPS_EVENTOS : STEPS_CANCHA
  const title = variant === 'eventos' ? '¿Cómo organizamos tu evento?' : '¿Cómo reservar?'

  return (
    <section className="w-full bg-dark">
      <div className="mx-auto max-w-[var(--spacing-container)] px-[var(--spacing-gutter)] py-[var(--spacing-xl)]">
        <h2 className="mb-[var(--spacing-lg)] text-center font-heading text-3xl font-bold text-white">
          {title}
        </h2>

        <ol className="grid list-none grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map(({ icon: Icon, title: stepTitle, description }, i) => (
            <li key={stepTitle} className="flex flex-col items-center gap-4 text-center">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary-500">
                <Icon size={24} className="text-white" aria-hidden="true" />
                <span
                  aria-hidden="true"
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-cta font-ui text-xs font-bold text-white"
                >
                  {i + 1}
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold text-white">{stepTitle}</h3>
              <p className="font-body text-sm leading-relaxed text-white/70">{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
