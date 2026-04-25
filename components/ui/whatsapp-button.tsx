'use client'

import { usePathname } from 'next/navigation'
import { MessageCircle } from 'lucide-react'
import { siteConfig } from '@/config/site'

type MessagePage = 'home' | 'cancha' | 'eventos'

function getPageFromPath(pathname: string): MessagePage {
  if (pathname.startsWith('/field')) return 'cancha'
  if (pathname.startsWith('/events')) return 'eventos'
  return 'home'
}

type WhatsAppButtonProps = {
  variant: 'floating' | 'inline'
  page?: MessagePage
}

export function WhatsAppButton({ variant, page }: WhatsAppButtonProps) {
  const pathname = usePathname()
  const messagePage = page ?? getPageFromPath(pathname)
  const message = siteConfig.whatsapp.messages[messagePage]
  const href = `https://wa.me/${siteConfig.whatsapp.phone}?text=${encodeURIComponent(message)}`

  if (variant === 'floating') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
        className="lg:hidden fixed right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-cta shadow-lg transition-transform hover:scale-105 will-change-transform"
      >
        <MessageCircle size={24} className="text-white" aria-hidden="true" />
      </a>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="hidden lg:inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3 font-ui font-medium text-white transition-opacity hover:opacity-90"
    >
      <MessageCircle size={20} aria-hidden="true" />
      <span>Contactar por WhatsApp</span>
    </a>
  )
}
