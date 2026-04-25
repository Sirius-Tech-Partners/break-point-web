import { siteConfig } from '@/config/site'

export function Footer() {
  return (
    <footer className="border-t border-outline/20 bg-surface-low">
      <div className="mx-auto flex max-w-[var(--spacing-container)] flex-col gap-1 px-[var(--spacing-gutter)] py-8 text-sm text-on-surface-var md:flex-row md:gap-8">
        <span>{siteConfig.contact.address}</span>
        <span>{siteConfig.contact.hours}</span>
        <span>{siteConfig.contact.phone}</span>
      </div>
    </footer>
  )
}
