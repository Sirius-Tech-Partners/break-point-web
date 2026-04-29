import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

type GenerateMetadataParams = {
  title: string
  description: string
  path: string
}

export function generateMetadata({
  title,
  description,
  path,
}: GenerateMetadataParams): Metadata {
  const base = siteConfig.seo.metadataBase
  const canonical = `${base}${path}`

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        es: canonical,
        en: `${base}/en${path}`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: siteConfig.brand.name,
      url: canonical,
      title,
      description,
      locale: siteConfig.brand.locale,
      images: [
        {
          url: `${base}${siteConfig.seo.ogImage}`,
          width: 1200,
          height: 630,
          alt: siteConfig.brand.name,
        },
      ],
    },
  }
}
