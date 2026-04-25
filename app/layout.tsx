import type { Metadata } from 'next'
import { Space_Grotesk, Manrope, Lexend } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/config/site'

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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
