import { HeroSection } from '@/components/sections/hero-section'
import { AvailabilityBadge } from '@/components/ui/availability-badge'
import { WhatsAppButton } from '@/components/ui/whatsapp-button'
import { siteConfig } from '@/config/site'

export default function HomePage() {
  return (
    <>
      <HeroSection variant="day" alt="Campo de fútbol de Break Point">
        <AvailabilityBadge />
        <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
          {siteConfig.brand.tagline}
        </h1>
        <p className="max-w-xl font-body text-lg text-white/80">
          Cancha de fútbol y espacio para eventos en Caliri, Zona Sur, La Paz.
        </p>
        <WhatsAppButton variant="inline" page="home" />
      </HeroSection>
    </>
  )
}
