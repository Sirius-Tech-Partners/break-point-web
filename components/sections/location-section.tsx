import { MapPin, Clock, ExternalLink, MessageCircle } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export function LocationSection() {
  const hasMap = siteConfig.contact.mapsUrl !== '#'
  const shareHref = `https://wa.me/?text=${encodeURIComponent(siteConfig.whatsapp.messages.share)}`

  return (
    <section className="w-full bg-surface-low">
      <div className="mx-auto max-w-[var(--spacing-container)] px-[var(--spacing-gutter)] py-[var(--spacing-xl)]">
        <h2 className="mb-[var(--spacing-lg)] text-center font-heading text-3xl font-bold text-on-surface">
          ¿Dónde estamos?
        </h2>

        <div
          className={cn(
            'flex flex-col gap-8',
            hasMap && 'lg:grid lg:grid-cols-[3fr_2fr] lg:items-start lg:gap-12'
          )}
        >
          {hasMap && (
            <div className="overflow-hidden rounded-xl border border-outline/20">
              <iframe
                src={siteConfig.contact.mapsUrl}
                title="Ubicación de Break Point en Google Maps"
                width="100%"
                height="400"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full border-0"
              />
            </div>
          )}

          <div className={cn('flex flex-col gap-6', !hasMap && 'mx-auto max-w-[600px]')}>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 shrink-0 text-cta" aria-hidden="true" />
                <div>
                  <p className="font-ui text-sm font-medium text-on-surface-var uppercase tracking-wide">
                    Dirección
                  </p>
                  <p className="mt-1 font-body text-base text-on-surface">
                    {siteConfig.contact.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock size={20} className="mt-0.5 shrink-0 text-cta" aria-hidden="true" />
                <div>
                  <p className="font-ui text-sm font-medium text-on-surface-var uppercase tracking-wide">
                    Horarios
                  </p>
                  <p className="mt-1 font-body text-base text-on-surface">
                    {siteConfig.contact.hours}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {hasMap && (
                <a
                  href={siteConfig.contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ver Break Point en Google Maps"
                  className="inline-flex items-center gap-2 rounded-full border border-outline/30 bg-white px-5 py-2.5 font-ui text-sm font-medium text-on-surface transition-colors hover:border-primary-500 hover:text-primary-500"
                >
                  <ExternalLink size={16} aria-hidden="true" />
                  Ver en Google Maps
                </a>
              )}

              <a
                href={shareHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Compartir ubicación de Break Point por WhatsApp"
                className="inline-flex items-center gap-2 rounded-full bg-cta px-5 py-2.5 font-ui text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                <MessageCircle size={16} aria-hidden="true" />
                Compartir por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
