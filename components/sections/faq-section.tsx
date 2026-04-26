'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AnimatedSection } from '@/components/ui/animated-section'

const FAQS: { question: string; answer: string }[] = [
  {
    question: '¿Cuántas personas entran en la cancha?',
    answer:
      'La cancha está habilitada para partidos de fútbol 5 (5 vs 5) con un máximo de 10 jugadores en cancha. El complejo puede recibir hasta 30 personas entre jugadores y espectadores.',
  },
  {
    question: '¿Qué incluye el alquiler de la cancha?',
    answer:
      'El alquiler incluye uso de cancha con iluminación nocturna, acceso a los baños H/M y agua potable. El área de parrilla y el salón para eventos se contratan por separado.',
  },
  {
    question: '¿Cómo reservo la cancha?',
    answer:
      'Reservás por WhatsApp — te mandamos el link de contacto en esta misma página. Confirmamos disponibilidad y te enviamos los datos de pago para asegurar el turno.',
  },
  {
    question: '¿Hay estacionamiento?',
    answer:
      'No hay estacionamiento propio en el complejo. Hay espacio en la vía pública sobre la calle principal a pocos metros de la entrada.',
  },
  {
    question: '¿Hay vestuarios?',
    answer:
      'No hay vestuarios. El complejo cuenta con baños H/M completos para uso de jugadores y asistentes.',
  },
  {
    question: '¿Se pueden hacer eventos privados?',
    answer:
      'Sí. Disponemos de salón para eventos, área de parrilla y cocina equipada. Ideal para cumpleaños, reuniones corporativas y celebraciones. Consultanos por WhatsApp para cotizar.',
  },
]

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <li className="border-b border-outline/20 last:border-b-0">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left font-ui text-base font-medium text-on-surface transition-colors hover:text-primary-500"
      >
        <span>{question}</span>
        <ChevronDown
          size={20}
          aria-hidden="true"
          className={cn(
            'shrink-0 text-on-surface-var transition-transform duration-300',
            open && 'rotate-180'
          )}
        />
      </button>

      <div
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          open ? 'max-h-96 pb-5' : 'max-h-0'
        )}
      >
        <p className="font-body text-sm leading-relaxed text-on-surface-var">{answer}</p>
      </div>
    </li>
  )
}

export function FaqSection() {
  return (
    <AnimatedSection delay={0.1}>
      <section className="w-full bg-surface">
        <div className="mx-auto max-w-[var(--spacing-container)] px-[var(--spacing-gutter)] py-[var(--spacing-xl)]">
          <h2 className="mb-[var(--spacing-lg)] text-center font-heading text-3xl font-bold text-on-surface">
            Preguntas frecuentes
          </h2>

          <ul className="mx-auto max-w-2xl divide-y-0 list-none rounded-xl border border-outline/20 bg-white px-6">
            {FAQS.map(({ question, answer }) => (
              <FaqItem key={question} question={question} answer={answer} />
            ))}
          </ul>
        </div>
      </section>
    </AnimatedSection>
  )
}
