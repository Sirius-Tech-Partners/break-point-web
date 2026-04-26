import { HeroSection } from '@/components/sections/hero-section'
import { AvailabilityBadge } from '@/components/ui/availability-badge'
import { WhatsAppButton } from '@/components/ui/whatsapp-button'
import { siteConfig } from '@/config/site'

export default function CanchaPage() {
  return (
    <>
      <HeroSection variant="night" alt="Cancha de fútbol nocturna con iluminación en Break Point">
        <AvailabilityBadge />
        <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
          La Cancha
        </h1>
        <div className="flex w-full justify-center px-4">
          <p className="text-center text-sm md:text-lg text-white/80">
            {siteConfig.brand.canchaSubheadline}
          </p>
        </div>

        <WhatsAppButton variant="inline" page="cancha" />
      </HeroSection>
    </>
  )
}
