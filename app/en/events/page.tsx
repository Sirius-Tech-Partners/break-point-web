import { generateMetadata as buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/config/site'

export const metadata = buildMetadata({
  title: 'Events — Hall, BBQ & Synthetic Field · Break Point',
  description:
    'Book your birthday, corporate event or private celebration at Break Point. Hall, BBQ area and synthetic field in Zona Sur, La Paz.',
  path: '/en/events',
})

export default function EnEventsPage() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-heading text-4xl font-bold text-on-surface">
        {siteConfig.brand.name} — Events
      </h1>
      <p className="font-body text-lg text-on-surface-var">
        English version coming soon. / Versión en inglés próximamente.
      </p>
    </section>
  )
}
