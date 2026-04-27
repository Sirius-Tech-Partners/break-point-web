# ADR: Multilingual Architecture Patterns (Next.js App Router)

**Status:** Active  
**Date:** 2026-04-27  
**Author:** Sirius Tech Partners  
**Context:** Derived from Break Point Web (E5.5) — first project to encounter i18n routing decisions in the Sirius stack.

---

## Problem

Next.js App Router requires the root layout (`app/layout.tsx`) to define `<html>` and `<body>`. This creates a constraint: how do you serve `<html lang="es">` for Spanish routes and `<html lang="en">` for English routes without duplicating the entire layout tree?

Three patterns exist. Each has different tradeoffs depending on **how real the multilingual need is**.

---

## Decision Tree

```
Does the site have real multilingual users (>5% of traffic in a second language)?
│
├── NO → Scaffold only (hreflang validity, no real EN users)
│         └── Use: Nested layout — app/en/layout.tsx (metadata only, no <html>)
│               See: Pattern A — Scaffold Only
│
└── YES → Does the site need type-safe translations + Accept-Language auto-redirect?
          │
          ├── YES (production multilingual — nanny service, e-commerce, SaaS)
          │     └── Use: app/[lang]/ + next-intl
          │           See: Pattern C — next-intl (Recommended)
          │
          └── NO (simple bilingual, copy managed manually)
                └── Use: app/[lang]/ + custom proxy.ts
                      See: Pattern B — Dynamic Segment
```

---

## Pattern A — Scaffold Only (Break Point case)

**When to use:** The site is Spanish-first (or any single language). A second language is added as SEO infrastructure (valid hreflang) but has no real user traffic.

**What it solves:** Broken hreflang = active Google SEO penalty. Without `/en/*` routes, hreflang alternates point to 404s.

**Structure:**
```
app/
  layout.tsx          ← root: <html lang="es"> — always Spanish
  page.tsx
  field/page.tsx
  events/page.tsx
  en/
    layout.tsx        ← nested: metadata only, NO <html> tag
    page.tsx          ← placeholder — EN copy added in V2
    field/page.tsx
    events/page.tsx
```

**`app/en/layout.tsx`:**
```tsx
import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.brand.name} — Field Rental & Events in La Paz`,
    template: '%s · Break Point',
  },
  description: 'Rent a synthetic football field or book your event space at Break Point, Zona Sur, La Paz.',
}

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
```

**Known limitation:** `<html lang>` stays `es` for `/en/*` routes. Acceptable because:
- Google uses hreflang (already correct) — not html lang — for language targeting
- Screen readers in the target market default to Spanish
- Zero real English-speaking users in this market segment

**hreflang:** Already handled in `lib/seo.ts` `generateMetadata()` — `alternates.languages` with `es` and `en` keys.

---

## Pattern B — Dynamic Segment (simple bilingual, no i18n library)

**When to use:** Real bilingual traffic, copy managed manually (no translation keys), team is comfortable with params threading.

**Structure:**
```
app/
  layout.tsx              ← minimal root (fonts + globals only, NO html/body)
  [lang]/
    layout.tsx            ← <html lang={params.lang}> + Navbar + Footer
    page.tsx
    field/page.tsx
    events/page.tsx
```

> ⚠️ **Critical:** `app/layout.tsx` must NOT have `<html>` and `<body>` if `[lang]/layout.tsx` defines them. In Next.js App Router, only one layout per route path can define the html/body shell. Move the root layout's shell into `[lang]/layout.tsx`.

**`app/[lang]/layout.tsx`:**
```tsx
import { Space_Grotesk } from 'next/font/google'

const font = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading' })

export function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }]  // SSG both at build time
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: 'es' | 'en' }
}) {
  return (
    <html lang={params.lang} className={font.variable}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

**proxy.ts — Accept-Language redirect:**
```ts
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const SUPPORTED = ['es', 'en']
const DEFAULT = 'es'

function getLocale(request: NextRequest): string {
  const headers = { 'accept-language': request.headers.get('accept-language') ?? 'es' }
  const languages = new Negotiator({ headers }).languages()
  return match(languages, SUPPORTED, DEFAULT)
}

// In proxy():
const locale = getLocale(request)
const pathname = request.nextUrl.pathname
const pathnameHasLocale = SUPPORTED.some(l => pathname.startsWith(`/${l}/`) || pathname === `/${l}`)

if (!pathnameHasLocale) {
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
}
```

**Packages needed:** `@formatjs/intl-localematcher` + `negotiator` (+ `@types/negotiator`)

**Tradeoff vs Pattern C:** No type-safe translation keys — all copy is hardcoded per page. Fine for small sites, painful at scale.

---

## Pattern C — next-intl (Recommended for production multilingual)

**When to use:** Real multilingual product where copy changes independently from code. Nanny service, SaaS, e-commerce with ES + EN markets.

**Why next-intl over vanilla `[lang]`:**
- Type-safe translation keys — TypeScript error if a key is missing
- Built-in Accept-Language detection + redirect in proxy/middleware
- SSG support with `setRequestLocale()` (no SSR overhead)
- Automatic hreflang/canonical via `next-intl/navigation`
- `<Link>` component that preserves locale context automatically
- 2KB bundle, actively maintained

**Structure:**
```
app/
  layout.tsx              ← truly minimal (only globals.css import if needed)
  [locale]/
    layout.tsx            ← <html lang={locale}> + Navbar + Footer + NextIntlClientProvider
    page.tsx
    field/page.tsx
    events/page.tsx

messages/
  es.json                 ← { "home": { "title": "Juega. Celebra. Disfruta." } }
  en.json                 ← { "home": { "title": "Play. Celebrate. Enjoy." } }

i18n/
  routing.ts              ← locales config
  request.ts              ← getRequestConfig()
  navigation.ts           ← typed Link, redirect, usePathname
```

**Setup summary:**
```bash
pnpm add next-intl
```

```ts
// i18n/routing.ts
import { defineRouting } from 'next-intl/routing'
export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
})
```

```ts
// i18n/request.ts
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? routing.defaultLocale
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
```

```tsx
// app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params
  setRequestLocale(locale)  // enables SSG (no SSR overhead)
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
```

```tsx
// proxy.ts — replace with next-intl's createMiddleware
import createMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'

export default createMiddleware(routing)  // handles Accept-Language + redirects

// Keep CSP nonce logic alongside it
```

**In components:**
```tsx
import { useTranslations } from 'next-intl'

export function HeroSection() {
  const t = useTranslations('home')
  return <h1>{t('title')}</h1>  // TypeScript error if 'title' key missing
}
```

---

## Anti-pattern: Route Groups for i18n

**`app/(es)/layout.tsx` + `app/(en)/layout.tsx`**

Do NOT use this for i18n. Critical problems:

1. **Full page reload on locale switch** — navigating between route groups forces a new root layout mount. This is visually jarring and slow.
2. **Font duplication** — each group's layout loads fonts independently → extra network requests.
3. **No client-side navigation** — React state resets, scroll jumps, layout flash.
4. **Complex metadata** — hreflang must be manually synchronized across both trees.

Route groups are designed for **organizational grouping** (e.g., `(marketing)` vs `(dashboard)`), not for language switching.

---

## Summary Table

| | Pattern A (Scaffold) | Pattern B (`[lang]`) | Pattern C (next-intl) |
|---|---|---|---|
| Real multilingual users | No | Yes | Yes |
| `<html lang>` correct | No (acceptable) | Yes | Yes |
| SSG | Yes | Yes | Yes |
| Accept-Language redirect | No | Manual | Automatic |
| Type-safe translations | No | No | Yes |
| Extra dependencies | None | 2 small packages | next-intl |
| Setup effort | Minimal | Medium | Medium-high |
| **Use when** | SEO scaffold only | Small bilingual site | Production multilingual |

---

## Project Reference

| Project | Pattern | Reason |
|---|---|---|
| Break Point Web | **A — Scaffold** | EN market = 0% of users; hreflang validity only |
| Nanny Service (planned) | **C — next-intl** | ES + EN real user segments; Accept-Language detection needed |
