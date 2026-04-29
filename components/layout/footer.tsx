import { siteConfig } from '@/config/site'

export function Footer() {
  return (
    <footer className="border-t border-outline/20 bg-surface-low">
      <div className="mx-auto flex max-w-[var(--spacing-container)] flex-col divide-y divide-outline/20 px-[var(--spacing-gutter)] py-8 text-sm text-on-surface-var md:flex-row md:divide-y-0 md:gap-8">
        <span className="py-2 md:py-0">{siteConfig.contact.address}</span>
        <span className="py-2 md:py-0">{siteConfig.contact.hours}</span>
        <span className="py-2 md:py-0">{siteConfig.contact.phone}</span>
      </div>
    </footer>
  )
}
