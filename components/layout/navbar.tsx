'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import { Logo } from '@/components/ui/logo'

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
          ? 'bg-surface/85 backdrop-blur-md border-b border-outline/20'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-[var(--spacing-container)] px-[var(--spacing-gutter)]">
        {/* Main row — logo + desktop nav + WA button */}
        <nav
          aria-label="Navegación principal"
          className="flex h-16 items-center justify-between"
        >
          <Link href="/" aria-label={siteConfig.brand.name}>
            <Logo />
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
                        ? scrolled ? 'text-primary-500 border-b-2 border-primary-500 pb-0.5' : 'text-white border-b-2 border-white pb-0.5'
                        : scrolled ? 'text-on-surface-var hover:text-on-surface' : 'text-white/80 hover:text-white'
                    )}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Tablet (md–lg): filled orange · Desktop (lg+): outline blue — never two primary CTAs */}
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'hidden md:flex items-center gap-2 rounded-full px-4 py-2 font-ui text-sm font-medium transition-opacity hover:opacity-90',
              'bg-cta text-on-surface',
              'lg:bg-transparent lg:border lg:border-primary-500 lg:text-primary-500'
            )}
          >
            <MessageCircle size={16} aria-hidden="true" />
            <span>WhatsApp</span>
          </a>
        </nav>

        {/* Mobile nav strip — visible only below md, replaces hamburger */}
        <nav
          aria-label="Páginas principales"
          className={cn(
            'flex md:hidden items-center justify-center gap-6 pb-2 border-t',
            scrolled ? 'border-outline/20' : 'border-white/20'
          )}
        >
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'py-3 font-ui text-sm font-medium transition-colors',
                  active
                    ? scrolled ? 'text-primary-500 border-b-2 border-primary-500' : 'text-white border-b-2 border-white'
                    : scrolled ? 'text-on-surface-var hover:text-on-surface' : 'text-white/70 hover:text-white'
                )}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
