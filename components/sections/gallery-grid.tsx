import { AnimatedSection } from '@/components/ui/animated-section'
import { VenueImage } from '@/components/ui/venue-image'

const GALLERY_ITEMS = [
  { src: '/images/gallery-field-full.webp', alt: 'Cancha de fútbol Break Point — vista general', delay: 0 },
  { src: '/images/gallery-field-night.webp', alt: 'Iluminación nocturna de la cancha', delay: 0.05 },
  { src: '/images/gallery-events-hall.webp', alt: 'Salón para eventos y celebraciones', delay: 0.1 },
  { src: '/images/gallery-grill.webp', alt: 'Área de parrilla y esparcimiento', delay: 0.15 },
  { src: '/images/gallery-kitchen.webp', alt: 'Cocina equipada del complejo', delay: 0.2 },
  { src: '/images/gallery-facilities.webp', alt: 'Instalaciones generales Break Point', delay: 0.25 },
]

export function GalleryGrid() {
  return (
    <section className="w-full bg-dark pb-[var(--spacing-xl)]">
      <div className="mx-auto max-w-[var(--spacing-container)] px-[var(--spacing-gutter)]">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 list-none">
          {GALLERY_ITEMS.map(({ src, alt, delay }, i) => (
            <AnimatedSection key={i} delay={delay} yOffset={16}>
              <li className="overflow-hidden rounded-xl">
                <VenueImage slot="gallery" src={src} alt={alt} />
              </li>
            </AnimatedSection>
          ))}
        </ul>
      </div>
    </section>
  )
}
