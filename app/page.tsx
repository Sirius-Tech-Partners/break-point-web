import { generateMetadata as buildMetadata } from '@/lib/seo'
import { HeroSection } from '@/components/sections/hero-section'

export const metadata = buildMetadata({
  title: 'Break Point — Cancha de Fútbol y Eventos en Zona Sur, La Paz',
  description:
    'Alquilá la cancha de fútbol sintético o reservá el espacio para tu evento en Caliri, Zona Sur, La Paz. Confirmación inmediata por WhatsApp.',
  path: '/',
})
import { SegmentCards } from '@/components/sections/segment-cards'
import { AmenitiesGrid } from '@/components/sections/amenities-grid'
import { GalleryGrid } from '@/components/sections/gallery-grid'
import { FaqSection } from '@/components/sections/faq-section'
import { AvailabilityBadge } from '@/components/ui/availability-badge'
import { WhatsAppButton } from '@/components/ui/whatsapp-button'
import { AnimatedSection } from '@/components/ui/animated-section'
import { siteConfig } from '@/config/site'

export default function HomePage() {
  return (
    <>
      <HeroSection variant="day" src="/images/field-day.webp" alt="Campo de fútbol de Break Point">
        <AvailabilityBadge />
        <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
          {siteConfig.brand.tagline}
        </h1>
        <div className="flex w-full justify-center px-4">
          <p className="text-center text-sm md:text-lg text-white/80">
            {siteConfig.brand.heroSubheadline}
          </p>
        </div>

        <WhatsAppButton variant="inline" page="home" />
      </HeroSection>

      <AnimatedSection delay={0}>
        <SegmentCards />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <AmenitiesGrid />
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <GalleryGrid />
      </AnimatedSection>

      <FaqSection />

      <AnimatedSection delay={0.3}>
        <section className="w-full bg-dark py-[var(--spacing-xl)]">
          <div className="mx-auto w-full flex max-w-(--spacing-container) flex-col items-center gap-6 px-(--spacing-gutter) text-center">
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
              ¿Listo para reservar?
            </h2>
            <div className="flex w-full justify-center px-4">
              <p className="text-center font-body text-base text-white/70">
                Escribinos por WhatsApp y te confirmamos disponibilidad en minutos.
              </p>
            </div>
            <WhatsAppButton variant="inline" page="home" />
          </div>
        </section>
      </AnimatedSection>
    </>
  )
}
