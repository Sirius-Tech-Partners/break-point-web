import Image from 'next/image'
import { siteConfig } from '@/config/site'

type LogoProps = {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/brand/breakpoint-logo.png"
      alt={siteConfig.brand.name}
      width={120}
      height={48}
      className={className}
      priority
    />
  )
}
