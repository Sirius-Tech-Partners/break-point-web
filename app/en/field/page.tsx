import { generateMetadata as buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/config/site'

export const metadata = buildMetadata({
  title: 'The Field — Synthetic Grass with Night Lighting · Break Point',
  description:
    '5-a-side synthetic football field with night lighting in Zona Sur, La Paz. Open 08:00–22:00. Book via WhatsApp.',
  path: '/en/field',
})

export default function EnFieldPage() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-heading text-4xl font-bold text-on-surface">
        {siteConfig.brand.name} — The Field
      </h1>
      <p className="font-body text-lg text-on-surface-var">
        English version coming soon. / Versión en inglés próximamente.
      </p>
    </section>
  )
}
