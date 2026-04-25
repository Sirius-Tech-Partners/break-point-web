import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const nonce = crypto.randomUUID()
  const locale =
    request.nextUrl.pathname.startsWith('/en/') ||
    request.nextUrl.pathname === '/en'
      ? 'en'
      : 'es'

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('x-next-locale', locale)

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })

  response.headers.set('x-nonce', nonce)
  response.headers.set('x-next-locale', locale)

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
