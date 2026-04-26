import { HeroSection } from '@/components/sections/hero-section'
import { SegmentCards } from '@/components/sections/segment-cards'
import { AvailabilityBadge } from '@/components/ui/availability-badge'
import { WhatsAppButton } from '@/components/ui/whatsapp-button'
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
      <SegmentCards />
    </>
  )
}
