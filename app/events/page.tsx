import { HeroSection } from '@/components/sections/hero-section'
import { PricingBlock } from '@/components/sections/pricing-block'
import { HowItWorks } from '@/components/sections/how-it-works'
import { LocationSection } from '@/components/sections/location-section'
import { EventContactForm } from '@/components/sections/event-contact-form'
import { WhatsAppButton } from '@/components/ui/whatsapp-button'
import { AnimatedSection } from '@/components/ui/animated-section'
import { siteConfig } from '@/config/site'

export default function EventosPage() {
  return (
    <>
      <HeroSection variant="day" alt="Espacio para eventos en Break Point — salón, parrilla y cancha">
        <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
          Eventos
        </h1>
        <div className="flex w-full justify-center px-4">
          <p className="text-center text-sm md:text-lg text-white/80">
            {siteConfig.brand.eventosSubheadline}
          </p>
        </div>
        <WhatsAppButton variant="inline" page="eventos" />
      </HeroSection>

      <AnimatedSection delay={0}>
        <PricingBlock variant="eventos" />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <HowItWorks variant="eventos" />
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <LocationSection />
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <section className="w-full bg-surface py-[var(--spacing-xl)]">
          <div className="mx-auto max-w-[var(--spacing-container)] px-[var(--spacing-gutter)]">
            <div className="mx-auto max-w-[640px]">
              <EventContactForm />
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <section className="w-full bg-dark py-[var(--spacing-xl)]">
          <div className="mx-auto flex max-w-[var(--spacing-container)] flex-col items-center gap-6 px-[var(--spacing-gutter)] text-center">
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
              ¿Organizás un evento?
            </h2>
            <div className="flex w-full justify-center px-4">
              <p className="text-center font-body text-base text-white/70">
                Escribinos y te armamos una cotización a medida sin compromiso.
              </p>
            </div>
            <WhatsAppButton variant="inline" page="eventos" />
          </div>
        </section>
      </AnimatedSection>
    </>
  )
}
