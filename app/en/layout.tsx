import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.brand.name} — Field Rental & Events in La Paz`,
    template: '%s · Break Point',
  },
  description:
    'Rent a synthetic football field or book your event space at Break Point, Zona Sur, La Paz, Bolivia. Instant confirmation via WhatsApp.',
}

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
