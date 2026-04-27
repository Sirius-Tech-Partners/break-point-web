import { siteConfig } from '@/config/site'
import { FAQS } from '@/lib/faq-data'

const base = siteConfig.seo.metadataBase

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.brand.name,
  url: base,
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.contact.address,
    addressLocality: 'La Paz',
    addressCountry: 'BO',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: siteConfig.contact.phone,
    contactType: 'customer service',
    availableLanguage: 'Spanish',
  },
}

const sportsActivityLocation = {
  '@context': 'https://schema.org',
  '@type': 'SportsActivityLocation',
  name: siteConfig.brand.name,
  url: base,
  telephone: siteConfig.contact.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.contact.address,
    addressLocality: 'La Paz',
    addressCountry: 'BO',
  },
  openingHours: `Mo-Su ${siteConfig.contact.hours}`,
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Césped sintético', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Iluminación nocturna', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Salón para eventos', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Área de parrilla', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Cocina equipada', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Baños H/M', value: true },
  ],
}

const faqPage = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer,
    },
  })),
}

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsActivityLocation) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  )
}
