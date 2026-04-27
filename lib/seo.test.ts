import { describe, it, expect } from 'vitest'
import { generateMetadata } from '@/lib/seo'
import { siteConfig } from '@/config/site'

describe('generateMetadata()', () => {
  const base = siteConfig.seo.metadataBase

  it('sets title and description', () => {
    const meta = generateMetadata({ title: 'Test Title', description: 'Test desc', path: '/' })
    expect(meta.title).toBe('Test Title')
    expect(meta.description).toBe('Test desc')
  })

  it('builds a correct canonical URL from metadataBase + path', () => {
    const meta = generateMetadata({ title: 'T', description: 'D', path: '/field' })
    expect(meta.alternates?.canonical).toBe(`${base}/field`)
  })

  it('includes hreflang alternates for es and en', () => {
    const meta = generateMetadata({ title: 'T', description: 'D', path: '/field' })
    const langs = meta.alternates?.languages as Record<string, string>
    expect(langs).toBeDefined()
    expect(langs['es']).toBe(`${base}/field`)
    expect(langs['en']).toBe(`${base}/en/field`)
  })

  it('sets og:locale to es_BO', () => {
    const meta = generateMetadata({ title: 'T', description: 'D', path: '/' })
    const og = meta.openGraph as { locale: string }
    expect(og.locale).toBe('es_BO')
  })

  it('sets og:image with 1200x630 dimensions', () => {
    const meta = generateMetadata({ title: 'T', description: 'D', path: '/' })
    const images = (meta.openGraph as { images: { width: number; height: number }[] }).images
    expect(images[0].width).toBe(1200)
    expect(images[0].height).toBe(630)
  })
})
