# Epic 1: Site Foundation & Shared Brand Experience

Visitors on every page receive a consistent Break Point brand experience: global navigation, footer with venue info, persistent floating WhatsApp button, and the Warm Industrial design system applied site-wide.

**FRs covered:** FR1 · FR2 · FR3 · FR4 · FR22 · FR31 · FR33

---

## Story 1.1 ✅ COMPLETE
Folder structure + config/site.ts + lib/utils.ts + .env.example

---

## Story 1.2 ✅ COMPLETE
Design system @theme tokens + fonts (Space Grotesk, Manrope, Lexend) + iOS Safari fixes

---

## Story 1.3: Security Foundation — proxy.ts & next.config.ts

As a site owner,
I want the site protected by CSP nonce headers and correct security configuration,
So that XSS attacks are mitigated and i18n routing is handled from day 1.

**Acceptance Criteria:**

**Given** `proxy.ts` runs as an Edge Runtime function
**When** any request arrives
**Then** a unique CSP nonce is generated per request and injected into response headers

**Given** `proxy.ts` handles locale detection
**When** a request arrives without `/en/` prefix
**Then** `x-next-locale: es` is set; when `/en/` prefix is present, `x-next-locale: en` is set

**Given** `next.config.ts` configures static security headers
**When** the site responds to any request
**Then** `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Referrer-Policy: strict-origin-when-cross-origin` are present

**Given** the AGENTS.md absolute rule
**When** the project is audited for middleware
**Then** no `middleware.ts` file exists — only `proxy.ts` handles request interception

---

## Story 1.4: Shared Utilities — lib/seo.ts & lib/rate-limit.ts

As a developer,
I want reusable utilities for metadata generation and rate limiting,
So that every page generates consistent SEO metadata and the contact form has a production-ready rate limiter.

**Acceptance Criteria:**

**Given** `lib/seo.ts` exports `generateMetadata()`
**When** called with `{ title, description, path }`
**Then** it returns a Next.js `Metadata` object containing: page title, description, `openGraph` (og:title, og:description, og:image 1200×630, og:locale `es_BO`), hreflang `alternates.languages` for `es` and `en`, and a canonical URL built from `siteConfig.seo.metadataBase`

**Given** `siteConfig.seo.metadataBase` is updated
**When** any page's metadata is regenerated
**Then** all canonical URLs and OG image URLs update automatically without changes to page files

**Given** `lib/rate-limit.ts` exports `contactLimiter`
**When** the limiter is checked
**Then** it uses Upstash Redis and allows a maximum of 5 requests per hour per IP, reading credentials from environment variables (never hardcoded)

---

## Story 1.5: Root Layout, Navbar & Footer

As a visitor,
I want consistent global navigation and footer on every page,
So that I can reach any section and find the venue's essential contact info from anywhere.

**Acceptance Criteria:**

**Given** `app/layout.tsx` renders
**When** any page is loaded
**Then** the `<Navbar>` appears at the top, `<Footer>` at the bottom, and a visually-hidden skip link (`<a href="#main-content">`) is the first focusable element

**Given** the `<Navbar>` renders and a visitor scrolls past 60px
**When** observed in any viewport
**Then** the navbar transitions from transparent to glassmorphism (`rgba(250,248,255,0.85)` + `backdrop-filter: blur(12px)` + bottom border) in 200ms

**Given** viewport is below 768px
**When** the `<Navbar>` renders
**Then** only the logo (left) and WhatsApp button (right) are visible — no nav links in the top bar

**Given** viewport is 768px or wider
**When** the `<Navbar>` renders
**Then** logo is left, nav links (Inicio · La Cancha · Eventos) are center, WhatsApp button is right; active page link has `--color-primary-500` underline and `aria-current="page"`

**Given** the `<Footer>` renders
**When** a visitor reads it
**Then** it shows: address, hours (08:00–22:00), and phone — all sourced from `siteConfig`, never hardcoded

**Given** a keyboard user presses Tab on page load
**When** the skip link receives focus
**Then** it becomes visible and skips to `#main-content` when activated

---

## Story 1.6: WhatsApp CTA System

As a visitor,
I want a persistent, tap-friendly WhatsApp button on every page at every scroll position,
So that I can contact Break Point with one tap without hunting for contact info.

**Acceptance Criteria:**

**Given** the floating `<WhatsAppButton>` renders on mobile/tablet (`< lg`)
**When** a visitor scrolls down any page
**Then** the orange button stays fixed at bottom-right with `bottom: calc(1.5rem + env(safe-area-inset-bottom))` — clearing the iPhone home indicator

**Given** the inline `<WhatsAppButton>` is present inside a hero section on desktop (`≥ lg`)
**When** the page renders
**Then** the floating variant does not appear simultaneously on the same page

**Given** any WhatsApp button is tapped
**When** WhatsApp opens
**Then** the pre-filled message from `siteConfig.whatsapp.messages[page]` is in the compose field — Home, La Cancha, and Eventos each have a distinct contextual message

**Given** the `<WhatsAppButton>` component
**When** rendered in any variant
**Then** it has `aria-label="Contactar por WhatsApp"`, opens via `target="_blank" rel="noopener noreferrer"`, and `will-change: transform` is set on the floating variant

---

## Story 1.7: AnimatedSection & VenueImage Components

As a visitor,
I want page sections to reveal smoothly as I scroll and venue images to display with correct placeholders,
So that the site feels polished and loads without layout shift.

**Acceptance Criteria:**

**Given** `<AnimatedSection>` wraps a section
**When** the section enters the viewport
**Then** it fades in with a 24px upward slide over 0.5s

**Given** the user has `prefers-reduced-motion: reduce` enabled
**When** `<AnimatedSection>` would animate
**Then** only an opacity fade occurs — no positional movement

**Given** `<VenueImage slot="hero" alt="..." />` is rendered without a `src` prop
**When** the component mounts
**Then** it renders a `--color-surface-low` background with a camera icon — correct aspect ratio maintained, zero layout shift

**Given** `<VenueImage slot="gallery" alt="..." src="/images/field.webp" />` is rendered with a `src` prop
**When** the image loads
**Then** `next/image` renders with `placeholder="blur"` active and zero layout shift

**Given** `<VenueImage>` is used without an `alt` prop
**When** `pnpm tsc --noEmit` is run
**Then** a TypeScript error is reported — `alt` is required at compile time
