import { AnimatedSection } from '@/components/ui/animated-section'
import { VenueImage } from '@/components/ui/venue-image'

const GALLERY_ITEMS = [
  { alt: 'Cancha de fútbol Break Point — vista general', delay: 0 },
  { alt: 'Iluminación nocturna de la cancha', delay: 0.05 },
  { alt: 'Salón para eventos y celebraciones', delay: 0.1 },
  { alt: 'Área de parrilla y esparcimiento', delay: 0.15 },
  { alt: 'Cocina equipada del complejo', delay: 0.2 },
  { alt: 'Instalaciones generales Break Point', delay: 0.25 },
]

export function GalleryGrid() {
  return (
    <section className="w-full bg-dark pb-[var(--spacing-xl)]">
      <div className="mx-auto max-w-[var(--spacing-container)] px-[var(--spacing-gutter)]">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 list-none">
          {GALLERY_ITEMS.map(({ alt, delay }, i) => (
            <AnimatedSection key={i} delay={delay} yOffset={16}>
              <li className="overflow-hidden rounded-xl">
                <VenueImage slot="gallery" alt={alt} />
              </li>
            </AnimatedSection>
          ))}
        </ul>
      </div>
    </section>
  )
}
