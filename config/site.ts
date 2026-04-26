export type PriceValue = number | 'TBD'

export type SiteConfig = {
  brand: {
    name: string
    tagline: string
    heroSubheadline: string
    canchaSubheadline: string
    locale: string
  }
  contact: {
    phone: string
    email: string
    address: string
    hours: string
    mapsUrl: string
  }
  pricing: {
    cancha: {
      day: PriceValue
      night: PriceValue
    }
    venue: {
      hourly: PriceValue
      minHours: number
      extra: PriceValue
    }
    birthday: {
      fixed: PriceValue
      hours: PriceValue
    }
    deposit: {
      cancha: string
      eventos: string
    }
  }
  whatsapp: {
    phone: string
    messages: {
      home: string
      cancha: string
      eventos: string
      share: string
    }
  }
  seo: {
    metadataBase: string
    defaultTitle: string
    defaultDescription: string
    ogImage: string
  }
}

export const siteConfig: SiteConfig = {
  brand: {
    name: 'Break Point',
    tagline: 'Juega. Celebra. Disfruta.',
    heroSubheadline: 'Cancha de fútbol y espacio para eventos en Zona Sur, La Paz.',
    canchaSubheadline: 'Césped sintético · Iluminación nocturna · Zona Sur, La Paz',
    locale: 'es_BO',
  },
  contact: {
    phone: '+591 70690685',
    email: 'info@breakpointlapaz.com',
    address: 'Av. Principal (Av. Costanera) esq. Calle 6 Nº18, Caliri, Zona Sur, La Paz',
    hours: '08:00 – 22:00',
    mapsUrl: '#',
  },
  pricing: {
    cancha: {
      day: 120,
      night: 130,
    },
    venue: {
      hourly: 250,
      minHours: 3,
      extra: 'TBD',
    },
    birthday: {
      fixed: 'TBD',
      hours: 'TBD',
    },
    deposit: {
      cancha: '% a confirmar',
      eventos: '50%',
    },
  },
  whatsapp: {
    phone: '59170690685',
    messages: {
      home: 'Hola, me interesa conocer más sobre Break Point.',
      cancha: 'Hola, quiero reservar la cancha. ¿Cuál es la disponibilidad?',
      eventos: 'Hola, quiero cotizar un evento en Break Point.',
      share: 'Te comparto la ubicación de Break Point: Av. Principal esq. Calle 6 Nº18, Caliri, Zona Sur, La Paz.',
    },
  },
  seo: {
    metadataBase: 'https://breakpointlapaz.com',
    defaultTitle: 'Break Point — Cancha y Eventos en La Paz',
    defaultDescription:
      'Alquiler de cancha de fútbol y espacio para eventos en Caliri, Zona Sur, La Paz. Reservá por WhatsApp.',
    ogImage: '/og-image.png',
  },
}
