import Image from 'next/image'
import { Camera } from 'lucide-react'
import { cn } from '@/lib/utils'

const SLOT_ASPECT: Record<'hero' | 'gallery', string> = {
  hero: 'aspect-video',
  gallery: 'aspect-[4/3]',
}

const SLOT_SIZES: Record<'hero' | 'gallery', string> = {
  hero: '100vw',
  gallery: '(max-width: 768px) 100vw, 50vw',
}

const BLUR_PLACEHOLDER =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k='

type VenueImageProps = {
  alt: string
  slot: 'hero' | 'gallery'
  src?: string
  className?: string
}

export function VenueImage({ alt, slot, src, className }: VenueImageProps) {
  const aspect = SLOT_ASPECT[slot]

  if (!src) {
    return (
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-lg bg-surface-low flex items-center justify-center',
          aspect,
          className
        )}
        role="img"
        aria-label={alt}
      >
        <Camera size={48} className="text-outline" aria-hidden="true" />
      </div>
    )
  }

  return (
    <div className={cn('relative w-full overflow-hidden rounded-lg', aspect, className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        placeholder="blur"
        blurDataURL={BLUR_PLACEHOLDER}
        sizes={SLOT_SIZES[slot]}
        priority={slot === 'hero'}
      />
    </div>
  )
}
