import { generateMetadata as buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/config/site'

export const metadata = buildMetadata({
  title: `${siteConfig.brand.name} — Football Field & Event Space in La Paz`,
  description:
    'Private synthetic football field and event venue in Zona Sur, La Paz, Bolivia. Book via WhatsApp.',
  path: '/en',
})

export default function EnHomePage() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-heading text-4xl font-bold text-on-surface">
        {siteConfig.brand.name}
      </h1>
      <p className="font-body text-lg text-on-surface-var">
        English version coming soon. / Versión en inglés próximamente.
      </p>
    </section>
  )
}
