'use client'

import { useEffect, useRef } from 'react'
import { VenueImage } from '@/components/ui/venue-image'

type HeroSectionProps = {
  variant: 'day' | 'night'
  src?: string
  alt: string
  children: React.ReactNode
}

export function HeroSection({ src, alt, children }: HeroSectionProps) {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = parallaxRef.current
    if (!el) return

    const mq = window.matchMedia(
      '(min-width: 1024px) and (prefers-reduced-motion: no-preference)'
    )
    if (!mq.matches) return

    const handleScroll = () => {
      el.style.transform = `translateY(${window.scrollY * 0.3}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative h-[100dvh] overflow-hidden">
      <div ref={parallaxRef} className="absolute inset-0 will-change-transform">
        <VenueImage
          slot="hero"
          src={src}
          alt={alt}
          className="aspect-auto h-full rounded-none"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="relative z-10 flex h-full flex-col items-center justify-end gap-4 px-[var(--spacing-gutter)] pb-[var(--spacing-lg)] text-center text-white">
        {children}
      </div>
    </section>
  )
}
