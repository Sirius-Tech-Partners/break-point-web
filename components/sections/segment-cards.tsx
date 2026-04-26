import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/animated-section'
import { VenueImage } from '@/components/ui/venue-image'

const CARDS = [
  {
    href: '/field',
    emoji: '⚽',
    title: 'La Cancha',
    subtitle: 'Alquilá tu cancha por hora',
    alt: 'Cancha de fútbol de Break Point',
    delay: 0,
  },
  {
    href: '/events',
    emoji: '🎉',
    title: 'Eventos',
    subtitle: 'Cumpleaños, corporativos, reuniones',
    alt: 'Espacio para eventos de Break Point',
    delay: 0.1,
  },
]

export function SegmentCards() {
  return (
    <section className="mx-auto w-full max-w-[var(--spacing-container)] px-[var(--spacing-gutter)] py-[var(--spacing-xl)]">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {CARDS.map(({ href, emoji, title, subtitle, alt, delay }) => (
          <AnimatedSection key={href} delay={delay} className="h-full">
            <Link
              href={href}
              className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-xl p-6 transition-shadow duration-400 [@media(hover:hover)]:hover:shadow-[0px_12px_32px_rgba(0,71,171,0.1)]"
            >
              <div className="absolute inset-0 transition-transform duration-400 ease-out [@media(hover:hover)]:group-hover:scale-[1.03]">
                <VenueImage slot="gallery" alt={alt} className="h-full rounded-none" />
              </div>

              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/75 via-black/30 to-black/10" />

              <div className="relative z-10 text-white">
                <span className="text-4xl" aria-hidden="true">{emoji}</span>
                <h3 className="mt-2 font-heading text-2xl font-bold">{title}</h3>
                <p className="mt-1 font-ui text-sm text-white/80">{subtitle}</p>
                <span className="mt-3 inline-flex items-center gap-1 font-ui text-sm font-medium text-cta">
                  Ver más <ArrowRight size={14} aria-hidden="true" />
                </span>
              </div>
            </Link>
          </AnimatedSection>
        ))}
      </div>
    </section>
  )
}
