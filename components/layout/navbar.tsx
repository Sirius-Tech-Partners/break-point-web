'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'

const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/field', label: 'La Cancha' },
  { href: '/events', label: 'Eventos' },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const waHref = `https://wa.me/${siteConfig.whatsapp.phone}?text=${encodeURIComponent(siteConfig.whatsapp.messages.home)}`

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-200',
        scrolled
          ? 'bg-surface/85 backdrop-blur-[12px] border-b border-outline/20'
          : 'bg-transparent'
      )}
    >
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-16 max-w-[var(--spacing-container)] items-center justify-between px-[var(--spacing-gutter)]"
      >
        <Link
          href="/"
          className="font-heading text-lg font-bold text-primary"
        >
          {siteConfig.brand.name}
        </Link>

        <ul className="hidden md:flex items-center gap-8 list-none">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'font-ui text-sm transition-colors',
                    active
                      ? 'text-primary-500 border-b-2 border-primary-500 pb-0.5'
                      : 'text-on-surface-var hover:text-on-surface'
                  )}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-cta px-4 py-2 font-ui text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          <MessageCircle size={16} aria-hidden="true" />
          <span>WhatsApp</span>
        </a>
      </nav>
    </header>
  )
}
