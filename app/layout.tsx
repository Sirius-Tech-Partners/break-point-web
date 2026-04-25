import type { Metadata } from 'next'
import { Space_Grotesk, Manrope, Lexend } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/config/site'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { WhatsAppButton } from '@/components/ui/whatsapp-button'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-heading',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-body',
  display: 'swap',
})

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ui',
  display: 'swap',
})

export const metadata: Metadata = {
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.seo.defaultDescription,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${manrope.variable} ${lexend.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:outline-none"
        >
          Ir al contenido principal
        </a>
        <Navbar />
        <main id="main-content" className="flex flex-col flex-1 pt-16">
          {children}
        </main>
        <Footer />
        <WhatsAppButton variant="floating" />
      </body>
    </html>
  )
}
