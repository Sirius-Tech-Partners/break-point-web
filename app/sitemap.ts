import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

const base = siteConfig.seo.metadataBase
const lastModified = new Date()

const routes = ['', '/field', '/events']

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified,
    alternates: {
      languages: {
        es: `${base}${route}`,
        en: `${base}/en${route}`,
      },
    },
  }))
}
