'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AnimatedSection } from '@/components/ui/animated-section'
import { FAQS } from '@/lib/faq-data'

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
