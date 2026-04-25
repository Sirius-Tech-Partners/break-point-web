---
stepsCompleted: [step-01-validate-prerequisites, step-02-design-epics, step-03-create-stories, step-04-final-validation]
workflowStatus: complete
completedAt: "2026-04-24"
inputDocuments:
  - "_bmad-output/planning-artifacts/prd.md"
  - "_bmad-output/planning-artifacts/architecture.md"
  - "_bmad-output/planning-artifacts/ux-design-specification.md"
---

# break-point-web - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for break-point-web, decomposing the requirements from the PRD, UX Design, and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

**Site Navigation & Structure**
- FR1: Visitors can navigate between Home, La Cancha, and Eventos from any page without losing their position
- FR2: Visitors can reach WhatsApp contact from any page at any scroll position
- FR3: Visitors can identify the venue name, location, and contact method from the footer on any page
- FR4: Visitors on mobile can access the full navigation menu from a compact control
- FR5: Search engines can crawl all three pages via a machine-readable sitemap

**Content & Information Display**
- FR6: Visitors can see the complete list of venue amenities (field, salon, BBQ, kitchen, trampoline, foosball, tables/chairs, carpa, umbrellas, bathrooms) in one place
- FR7: Visitors can see the field specifications (surface type, dimensions, capacity, lighting) on La Cancha
- FR8: Visitors can see all pricing tiers (field day, field night, full venue hourly) with the minimum booking requirement clearly stated
- FR9: Visitors can see event combination options for the Eventos page *(pricing model: price-on-WhatsApp per combination)*
- FR10: Visitors can see the booking conditions (deposit requirement, minimum advance booking, minimum hours) without initiating contact
- FR11: Visitors can see typical availability windows to self-qualify before contacting
- FR12: Visitors can see venue photography across all three pages
- FR13: Visitors can get answers to the most common questions (capacity, what's included, how to book, parking, location) without contacting the owner
- FR14: Visitors on Home can identify which page matches their need (field rental vs. event) and navigate directly to it

**Lead Capture & Contact**
- FR15: Visitors can initiate WhatsApp contact with a pre-composed message relevant to the page they are on (La Cancha vs. Eventos)
- FR16: Visitors on Eventos can submit a structured inquiry including their name, phone number, event date, event type, and estimated guest count
- FR17: Visitors receive on-screen confirmation after submitting the contact form
- FR18: Visitors are offered a WhatsApp alternative after submitting the contact form
- FR19: Visitors who submit invalid or incomplete form data see specific inline error messages per field without losing their other inputs

**Owner Notifications & Lead Management**
- FR20: The owner receives an email notification for every contact form submission containing all submitted fields, formatted for quick WhatsApp follow-up
- FR21: The system prevents automated or excessive form submissions from a single source within a defined time window
- FR22: The owner's contact information (WhatsApp number, email) can be updated site-wide from a single configuration file

**SEO & Discoverability**
- FR23: Each page presents unique, descriptive metadata (title, description) to search engines and social platforms
- FR24: The site presents structured data describing the venue as a sports location with amenities and contact information
- FR25: The site presents structured data for the FAQ content in a format search engines can parse
- FR26: The site declares its crawling policy for search engines and AI agents
- FR27: AI language models can read a machine-readable description of the venue and its services

**Performance & Media**
- FR28: Venue images load progressively — visitors see a placeholder immediately and the full image as it loads, with no layout shift
- FR29: The site meets Core Web Vitals thresholds on mobile devices with typical Bolivian 4G connections
- FR30: All venue images can be replaced with updated assets without requiring code changes

**Localization & Brand Consistency**
- FR31: All visitor-facing copy is in Spanish by default
- FR32: The site infrastructure supports adding an English language variant without structural changes
- FR33: All brand strings (venue name, phone number, address, WhatsApp link) are sourced from a single configuration — changing them once updates the entire site

### NonFunctional Requirements

**Performance**
- NFR-P1: Largest Contentful Paint (LCP) < 2.5s on mobile 4G
- NFR-P2: Cumulative Layout Shift (CLS) < 0.1 — fixed aspect ratios on all images; no late-injected content
- NFR-P3: Interaction to Next Paint (INP) < 200ms — Server Components minimize client JS
- NFR-P4: First Load JS bundle < 80KB — no unnecessary client bundles
- NFR-P5: Google PageSpeed mobile score ≥ 90
- NFR-P6: Google PageSpeed desktop score ≥ 95

**Security**
- NFR-S1: Rate limiting on contact form — 5 submissions/hr/IP via Upstash Redis
- NFR-S2: No PII in server logs (names, phones, email addresses must not appear in console.log or error logs)
- NFR-S3: Server-side form validation — all inputs validated in actions.ts before Resend call
- NFR-S4: No technical error details exposed to users — generic messages on server errors
- NFR-S5: Environment variables for all secrets — Resend API key, Upstash credentials never in source code
- NFR-S6: API routes validate env vars first — before any business logic
- NFR-S7: HTTPS only — enforced by Vercel
- NFR-S8: Content Security Policy via proxy.ts (CSP nonce per request) — mitigates XSS

**Accessibility**
- NFR-A1: Lighthouse Accessibility score ≥ 95
- NFR-A2: Semantic HTML throughout — headings in correct order (h1→h2→h3); landmark regions (main, nav, footer)
- NFR-A3: ARIA labels on all interactive elements — WhatsApp buttons, form inputs, nav toggle in Spanish
- NFR-A4: Color contrast ratio ≥ 4.5:1 for body text; ≥ 3:1 for large text and UI components (WCAG 2.1 AA)
- NFR-A5: Focus management on form submission — on success: focus moves to confirmation; on error: focus moves to first invalid field
- NFR-A6: Touch targets ≥ 44×44px on all buttons and links on mobile
- NFR-A7: Images have descriptive alt text — decorative images use alt=""

**Scalability**
- NFR-SC1: Site deployed to Vercel — scales automatically to traffic spikes without operator intervention
- NFR-SC2: Static pages (Home, La Cancha) statically generated at build time — zero server load
- NFR-SC3: Eventos Server Action is the only live endpoint; Upstash rate limiting caps load
- NFR-SC4: Upstash free tier (10K req/day) sufficient for V1 projected traffic

### Additional Requirements

*(From Architecture document — technical requirements that directly impact implementation)*

- Project scaffold is already initialized (commits 1c950d8 + 5341989); first story begins with folder structure + config/site.ts
- `proxy.ts` at repo root replaces `middleware.ts` — handles CSP nonce generation (per-request) and i18n routing (Edge Runtime)
- `next.config.ts` must configure static security headers per Blueprint §5.2
- `config/site.ts` must implement the full `SiteConfig` typed interface with `PriceValue = number | 'TBD'` — this is the single source of truth for all business data; all components depend on it
- `app/globals.css` must implement the `@theme` block with Warm Industrial tokens — all styled components depend on this
- `lib/utils.ts` implements `cn()` (clsx + tailwind-merge); `lib/seo.ts` implements `generateMetadata()` factory; `lib/rate-limit.ts` implements `contactLimiter`
- Server Action return type is a fixed discriminated union: `ActionResult = { success: true; message: string } | { error: 'rate_limit'|'validation'|'server'|'config' } | { errors: Record<string, string[]> }`
- Zod schema defined in `app/eventos/schema.ts` — shared between client and server; phone validation regex `/^(\+?591)?[67]\d{7}$/`
- OG images via `next/og` (ImageResponse, Edge Runtime) — one file per page: `app/opengraph-image.tsx`, `app/cancha/opengraph-image.tsx`, `app/eventos/opengraph-image.tsx`
- Font loading via `next/font/google` (Space Grotesk weight 700/800, Manrope weight 400, Lexend weight 400/500 — all `subsets: ['latin']`)
- CI/CD via `.github/workflows/ci.yml` — 5 gates: tsc → lint → build → audit → playwright
- Playwright E2E tests in `e2e/`: 5 smoke tests (home load, WhatsApp button, La Cancha pricing, Eventos form success, Eventos form errors)
- Vitest unit tests co-located: `lib/utils.test.ts`, `lib/seo.test.ts`, `lib/rate-limit.test.ts`, `app/eventos/schema.test.ts`
- `app/en/` subtree scaffolded from day 1 (ADR-003) — EN layout + page + cancha/page + eventos/page — hreflang valid from launch
- JSON-LD schemas embedded in `app/layout.tsx`: Organization + SportsActivityLocation + FAQPage
- `public/llms.txt` and `app/robots.ts` required at launch
- `.env.example` required at root (template with required var names, no values)
- `public/.well-known/security.txt` required (RFC 9116 security disclosure)
- Implementation sequence (Architecture §Decision Impact): proxy.ts → config/site.ts → globals.css @theme → lib/ utilities → core components → Home → La Cancha → Eventos → app/en/ → SEO files → OG images → tests

### UX Design Requirements

*(From UX Design Specification — actionable design requirements with implementation scope)*

- UX-DR1: Implement full `@theme` token set in `app/globals.css` — all 13 color tokens, 3 font-family tokens, 6 spacing tokens, 5 radius tokens, 5 breakpoints (375/768/1024/1280/1440px) from the Warm Industrial design system
- UX-DR2: Implement CVA button variants — `primary` (`--color-cta` bg + dark text + rounded-full), `secondary` (`--color-primary-500` bg + white text + rounded-full), `ghost` (transparent + primary-500 border + text) — with 200ms ease transitions
- UX-DR3: `<Navbar>` — transparent at page top → glassmorphism (rgba(250,248,255,0.85) + backdrop-filter:blur(12px)) after 60px scroll; mobile: logo-left + WhatsApp-button-right only; desktop: logo+nav links+WhatsApp; active link gets primary-500 underline + aria-current="page"
- UX-DR4: `<HeroSection>` — full-bleed `<Image priority>` (h-[100dvh]), gradient overlay (dark bottom fade), H1 + subheadline + `<AvailabilityBadge>` + `<WhatsAppButton>`; variants: `day` (Home, Eventos) · `night` (La Cancha); parallax on desktop-only (≥lg), disabled on mobile and prefers-reduced-motion
- UX-DR5: `<AvailabilityBadge>` — green dot (--color-available) + "Disponible hoy" (Lexend 14px) + pill bg (--color-surface-low); V1 static prop `available={true}`; `unavailable` state hidden in V1
- UX-DR6: `<SegmentCards>` — 2-column grid bifurcation (⚽ La Cancha / 🎉 Eventos); 2-col on mobile ≥375px; side-by-side on desktop; card hover: scale(1.03) background image + blue-tinted lift shadow; cards are `<a>` tags
- UX-DR7: `<HowItWorks>` — numbered steps (1–3) per variant; `cancha` variant: WhatsApp → confirmar horario → adelanto asegura espacio; `eventos` variant: consultar combinación → coordinar precio+disponibilidad → 50% adelanto confirma fecha
- UX-DR8: `<PricingBlock cancha>` — single price display (Bs 120/hr day · Bs 130/hr night) from `config/site.ts`; `<PricingBlock eventos>` — 4 combination cards (Cancha+Parrilla · Salón+Parrilla · Salón+Cancha · Complejo completo) with "precio según combinación — cotizá sin compromiso" copy
- UX-DR9: `<AmenitiesGrid>` — icon+label grid on Anthracite (--color-dark) full-bleed background; --color-available-dark 2px top gradient on container; icons aria-hidden + labels always visible; responsive: 2-col mobile → 3-col md → 6-col lg; amenities: Cancha al aire libre · Iluminación nocturna · Salón para eventos · Área de parrilla · Cocina equipada · Baños H/M
- UX-DR10: `<LocationSection>` — Google Maps iframe (conditional: only when mapsUrl !== '#') with `title="Ubicación de Break Point en Google Maps"`; address block always visible; "Ver en Google Maps" link + "Compartir por WhatsApp" button with pre-filled message; responsive: stacked mobile → 60/40 split desktop
- UX-DR11: `<WhatsAppButton>` — CVA variants: `floating` (position:fixed bottom-right, `bottom: calc(1.5rem + env(safe-area-inset-bottom))`, `will-change: transform`) · `inline` (inside hero/section); pre-filled messages per page from siteConfig.whatsapp.messages; `aria-label="Contactar por WhatsApp"`; `target="_blank" rel="noopener noreferrer"` on wa.me link; hover: opacity:0.9 + translateY(-1px)
- UX-DR12: `<ContactForm>` (Eventos only) — fields: Nombre (required) · Teléfono (required, Bolivian format) · Fecha del evento (date picker, required) · Tipo de evento (select: Cumpleaños infantil / Evento corporativo / Reunión social / Otro) · Nro de invitados (optional number) · Mensaje (optional, 300 char max); all states: idle · submitting (button disabled + spinner + "Enviando…") · success (green banner + WhatsApp suggestion) · error:network (red banner) · error:rate_limit (red banner) · error:field (inline below input + aria-describedby); font-size ≥ 16px on all inputs (prevents iOS zoom); isPending from useActionState only — no additional useState
- UX-DR13: `<Footer>` — Logo · Address (Av. Principal esq. Calle 6 Nº18, Caliri, Zona Sur, La Paz) · Hours (08:00–22:00) · Social icons (WhatsApp, TikTok, Instagram) · Copyright; responsive: single-col mobile → 3-col desktop
- UX-DR14: `<AnimatedSection>` — LazyMotion + domAnimation wrapper ('use client'); props: delay · yOffset (default 24px) · duration (default 0.5s); respects prefers-reduced-motion (no movement, only fade when enabled); never nest AnimatedSection inside another AnimatedSection; delay increments: 0, 0.1, 0.2, 0.3 (never exceed 0.4 on one page)
- UX-DR15: `<VenueImage>` — slot prop: 'hero'|'gallery'|'card' (TypeScript required); without src: --color-surface-low bg + camera icon placeholder; with src: next/image fill + blur placeholder; alt always required by TypeScript; sizes prop mandatory on all fill images
- UX-DR16: iOS Safari global fixes applied in app/layout.tsx + app/globals.css — viewport meta with `viewport-fit=cover`; `overflow-x: hidden + max-width: 100vw` on html/body; avoid 100vw for widths (use width:100%); font-size ≥ 16px on all inputs; h-[100dvh] for hero; safe-area-inset-bottom on floating WhatsApp button; -webkit-text-size-adjust: 100%; touch-action: manipulation on all buttons/links
- UX-DR17: In-app browser compatibility (TikTok/WhatsApp WebView) — Navbar glassmorphism fallback to solid --color-surface with opacity when backdrop-filter unavailable; no page transition animations; floating button uses will-change:transform; wa.me links use target="_blank"
- UX-DR18: Tailwind v4 breakpoints in @theme (375/768/1024/1280/1440px) — all responsive layouts use these breakpoints consistently
- UX-DR19: Stagger animations for grid components — `<AmenitiesGrid>`: each item delays `index × 80ms`; `<SegmentCards>`: card 1 at 0ms, card 2 at 100ms; implemented via CSS animation-delay inline style (no JS loop)
- UX-DR20: Accessibility implementation — single skip link `<a href="#main-content">` as first body element (hidden visually, visible on focus); focus rings: 2px solid --color-primary-500 offset 2px on all backgrounds including dark sections; screen reader: icons aria-hidden + visible labels; form labels: htmlFor + aria-describedby on errors; LocationSection iframe title attribute
- UX-DR21: Semantic HTML structure — one h1 per page (hero only); nav with aria-label="Navegación principal"; main wraps all page content; footer element; sections with aria-labelledby; buttons as `<button>`, links as `<a href>` (never `<div onClick>`)
- UX-DR22: Color rule enforcement — --color-cta (orange) used exclusively for WhatsApp CTA buttons, never decorative; dark text (#191b22) on orange background (WCAG AAA 7.0:1 — never white text on orange); form submit button uses --color-primary-500 (blue); section dividers use 1px --color-cta at 20% opacity

### FR Coverage Map

| FR | Epic |
|---|---|
| FR1 | Epic 1 — Navbar presente en todas las páginas |
| FR2 | Epic 1 — WhatsApp flotante en todas las páginas |
| FR3 | Epic 1 — Footer con nombre, dirección, contacto |
| FR4 | Epic 1 — Navbar mobile responsive |
| FR5 | Epic 5 — sitemap.ts |
| FR6 | Epic 2 — AmenitiesGrid en Home |
| FR7 | Epic 3 — Specs del campo en La Cancha |
| FR8 | Epic 3 — PricingBlock cancha (Bs 120/130) |
| FR9 | Epic 4 — PricingBlock eventos (combinaciones) |
| FR10 | Epic 3 + Epic 4 — Condiciones de reserva en ambas páginas |
| FR11 | Epic 3 — Horarios disponibles en La Cancha |
| FR12 | Epic 2 — GalleryGrid + VenueImage placeholders |
| FR13 | Epic 2 — FaqSection con respuestas comunes |
| FR14 | Epic 2 — SegmentCards bifurcación Home |
| FR15 | Epic 3 + Epic 4 — WhatsApp CTA contextual por página |
| FR16 | Epic 4 — ContactForm en Eventos |
| FR17 | Epic 4 — Confirmación on-screen |
| FR18 | Epic 4 — Sugerencia WhatsApp post-submit |
| FR19 | Epic 4 — Errores inline por campo |
| FR20 | Epic 4 — Resend email al dueño |
| FR21 | Epic 4 — Rate limiting Upstash |
| FR22 | Epic 1 — config/site.ts single source of truth |
| FR23 | Epic 5 — generateMetadata() por página |
| FR24 | Epic 5 — JSON-LD Organization + SportsActivityLocation |
| FR25 | Epic 5 — JSON-LD FAQPage |
| FR26 | Epic 5 — robots.ts |
| FR27 | Epic 5 — llms.txt |
| FR28 | Epic 6 — next/image + blur placeholders (VenueImage) |
| FR29 | Epic 6 — Core Web Vitals + Lighthouse CI |
| FR30 | Epic 6 — Swap de imágenes sin cambio de código (public/images/) |
| FR31 | Epic 1 — Spanish copy, config/site.ts locale es_BO |
| FR32 | Epic 5 — app/en/ scaffold + hreflang |
| FR33 | Epic 1 — config/site.ts centraliza strings de marca |

## Epic List

### Epic 1: Site Foundation & Shared Brand Experience

Visitors on every page receive a consistent Break Point brand experience: global navigation, footer with venue info, persistent floating WhatsApp button, and the Warm Industrial design system applied site-wide. All subsequent epics depend on this foundation.

**FRs covered:** FR1 · FR2 · FR3 · FR4 · FR22 · FR31 · FR33
**Includes:** proxy.ts, next.config.ts, config/site.ts (SiteConfig + PriceValue), app/globals.css (@theme tokens), lib/utils.ts (cn), lib/seo.ts (generateMetadata), lib/rate-limit.ts (contactLimiter), `<Navbar>`, `<Footer>`, `<WhatsAppButton>`, `<AnimatedSection>`, `<VenueImage>`, .env.example

---

### Epic 2: Home Page — Discovery & Segment Routing

A visitor who has never heard of Break Point lands on the site, sees the venue, understands what it offers, and navigates to the right page (La Cancha or Eventos) within 5 seconds.

**FRs covered:** FR6 · FR12 · FR13 · FR14
**Includes:** `<HeroSection>` (day variant), `<AvailabilityBadge>`, `<SegmentCards>`, `<AmenitiesGrid>`, `<FaqSection>`, `<GalleryGrid>`, app/page.tsx (Home SSG)

---

### Epic 3: La Cancha Page — Field Booking Conversion

A football group captain sees the field specs, hourly pricing (day/night), typical availability windows, and booking conditions — then converts to WhatsApp with one tap.

**FRs covered:** FR7 · FR8 · FR10 · FR11 · FR15
**Includes:** `<HeroSection>` (night variant), `<PricingBlock cancha>`, `<HowItWorks cancha>`, WhatsApp CTA contextual, app/cancha/page.tsx (SSG)

---

### Epic 4: Eventos Page — Event Inquiry & Lead Capture

Event organizers (birthday parents, corporate coordinators) see space combinations, understand the pricing model, and contact the owner via WhatsApp (primary) or a structured form that delivers a complete lead to the owner's email (secondary).

**FRs covered:** FR9 · FR10 · FR15 · FR16 · FR17 · FR18 · FR19 · FR20 · FR21
**Includes:** `<HeroSection>` (eventos/day), `<PricingBlock eventos>` (4 combinations), `<HowItWorks eventos>`, `<LocationSection>`, `<ContactForm>` (useActionState + Zod + Resend + Upstash), app/eventos/page.tsx + actions.ts + schema.ts

---

### Epic 5: SEO & Discoverability

The site appears in local Google searches, social shares generate compelling previews, AI crawlers understand the venue, and hreflang alternates are valid from day 1.

**FRs covered:** FR5 · FR23 · FR24 · FR25 · FR26 · FR27 · FR32
**Includes:** lib/seo.ts (generateMetadata factory), app/sitemap.ts, app/robots.ts, public/llms.txt, OG images via next/og (×3 pages), JSON-LD schemas (Organization + SportsActivityLocation + FAQPage in layout.tsx), app/en/ scaffold (EN layout + 3 pages)

---

### Epic 6: Performance, Security & Launch Readiness

The site meets Core Web Vitals on Bolivian 4G, passes all 5 CI gates on every PR, and automated tests validate real user experience before each deploy.

**FRs covered:** FR28 · FR29 · FR30
**NFRs covered:** NFR-P1–P6 · NFR-S1–S8 · NFR-A1–A7 · NFR-SC1–SC4
**Includes:** .github/workflows/ci.yml (5 gates: tsc → lint → build → audit → playwright), Playwright E2E (5 smoke tests), Vitest unit tests (co-located), public/.well-known/security.txt, Lighthouse CI performance validation

---

## Epic 1: Site Foundation & Shared Brand Experience

Visitors on every page receive a consistent Break Point brand experience: global navigation, footer with venue info, persistent floating WhatsApp button, and the Warm Industrial design system applied site-wide. All subsequent epics depend on this foundation.

**FRs covered:** FR1 · FR2 · FR3 · FR4 · FR22 · FR31 · FR33

### Story 1.1: Project Folder Structure & TypeScript Contracts

As a developer,
I want the project folder structure and typed configuration module created per the architecture specification,
So that all subsequent development has a type-safe single source of truth for business data and zero ambiguity on file locations.

**Acceptance Criteria:**

**Given** the project scaffold exists
**When** `pnpm tsc --noEmit` is run
**Then** zero TypeScript errors are reported

**Given** `config/site.ts` exists with the `SiteConfig` interface and `PriceValue = number | 'TBD'`
**When** a component imports `siteConfig`
**Then** TypeScript autocompletes all namespaces (`brand`, `contact`, `pricing`, `whatsapp`, `seo`) and enforces `PriceValue` on all pricing fields

**Given** the directory structure is created
**When** compared to the architecture spec
**Then** all required directories exist: `components/{brand,layout,sections,ui}/`, `config/`, `lib/`, `e2e/`, `public/{images/,brand/,.well-known/}`

**Given** `lib/utils.ts` exports `cn()`
**When** called with conflicting Tailwind classes
**Then** `tailwind-merge` resolves the conflict correctly and a single class wins

**Given** `.env.example` exists at the repo root
**When** reviewed by a developer setting up locally
**Then** it contains all 4 required variable names (`RESEND_API_KEY`, `CONTACT_RECEIVER_EMAIL`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`) with placeholder values, no real secrets

---

### Story 1.2: Design System Foundation — Warm Industrial @theme Tokens

As a visitor,
I want the site to render with a consistent visual identity on all devices and browsers,
So that Break Point feels premium and trustworthy from the first paint.

**Acceptance Criteria:**

**Given** `app/globals.css` contains the `@theme` block
**When** any component uses `bg-cta`, `text-primary`, or `bg-dark`
**Then** the correct Warm Industrial colors are applied (`#FF8A00`, `#00327d`, `#363636`) without any hardcoded hex in component files

**Given** three fonts are loaded via `next/font/google` (Space Grotesk, Manrope, Lexend — `subsets: ['latin']` only)
**When** any page loads
**Then** headings use Space Grotesk, body copy uses Manrope, labels/buttons use Lexend — with `display: swap` and zero FOUT

**Given** `html, body { overflow-x: hidden; max-width: 100vw }` and `html { -webkit-text-size-adjust: 100% }` are in globals.css
**When** the site is opened in iOS Safari on any iPhone
**Then** no horizontal overflow occurs and font sizes do not auto-adjust on orientation change

**Given** `touch-action: manipulation` is applied to all `button` and `a` elements
**When** a button is tapped on iOS Safari
**Then** there is no 300ms tap delay

---

### Story 1.3: Security Foundation — proxy.ts & next.config.ts

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

### Story 1.4: Shared Utilities — lib/seo.ts & lib/rate-limit.ts

As a developer,
I want reusable utilities for metadata generation and rate limiting,
So that every page generates consistent SEO metadata and the contact form has a production-ready rate limiter ready to use.

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

### Story 1.5: Root Layout, Navbar & Footer

As a visitor,
I want consistent global navigation and footer on every page,
So that I can reach any section and find the venue's essential contact info from anywhere on the site.

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
**Then** logo is left, nav links (Inicio · La Cancha · Eventos) are center, WhatsApp button is right; the active page link has `--color-primary-500` underline and `aria-current="page"`

**Given** the `<Footer>` renders
**When** a visitor reads it
**Then** it shows: address (Av. Principal esq. Calle 6 Nº18, Caliri, Zona Sur, La Paz), hours (08:00–22:00), and phone — all sourced from `siteConfig`, never hardcoded

**Given** a keyboard user presses Tab on page load
**When** the skip link receives focus
**Then** it becomes visible and skips to `#main-content` when activated

---

### Story 1.6: WhatsApp CTA System

As a visitor,
I want a persistent, tap-friendly WhatsApp button available on every page at every scroll position,
So that I can contact Break Point with one tap without hunting for a contact method.

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

### Story 1.7: AnimatedSection & VenueImage Components

As a visitor,
I want page sections to reveal smoothly as I scroll and venue images to display with correct placeholders before real photos are available,
So that the site feels polished and loads without any layout shift.

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

---

## Epic 2: Home Page — Discovery & Segment Routing

A visitor who has never heard of Break Point lands on the site, sees the venue, understands what it offers, and navigates to the right page (La Cancha or Eventos) within 5 seconds.

**FRs covered:** FR6 · FR12 · FR13 · FR14

### Story 2.1: Home Hero & Availability Badge

As a first-time visitor,
I want to see the Break Point field immediately on load with a clear headline and availability signal,
So that I know the venue is real, inviting, and bookable before I read any copy.

**Acceptance Criteria:**

**Given** a visitor opens the Home page on mobile
**When** the page loads
**Then** a full-viewport (`h-[100dvh]`) field photo (daytime, `priority` prop set) fills the screen with a dark gradient overlay at the bottom for text legibility — no layout shift, no loading spinner

**Given** the hero renders
**When** observed on any device
**Then** H1 headline, a subheadline, and the `<AvailabilityBadge>` ("● Disponible hoy" in green `--color-available`) are visible before the primary CTA

**Given** the hero renders on desktop (`≥ lg`)
**When** the page is scrolled
**Then** the background image moves at 30% scroll speed (parallax effect) — this is disabled on mobile and when `prefers-reduced-motion` is active

**Given** `<VenueImage slot="hero" alt="Campo de fútbol de Break Point" />` is used without a `src`
**When** the placeholder renders
**Then** it fills the full viewport height with `--color-surface-low` background — correct aspect ratio, zero CLS

---

### Story 2.2: Segment Bifurcation Cards

As a visitor,
I want to see two clearly distinct paths (La Cancha and Eventos) immediately below the hero,
So that I can navigate to the right page for my need within one scroll, without reading dense copy.

**Acceptance Criteria:**

**Given** a visitor scrolls past the hero on Home
**When** the `<SegmentCards>` section comes into view
**Then** two cards are displayed: ⚽ La Cancha ("Alquilá tu cancha por hora") and 🎉 Eventos ("Cumpleaños, corporativos, reuniones") — each with a link CTA ("Ver más →")

**Given** viewport is below 375px
**When** `<SegmentCards>` renders
**Then** the two cards stack vertically (single column)

**Given** viewport is 375px or wider
**When** `<SegmentCards>` renders
**Then** the two cards display in a 2-column equal-width grid

**Given** a visitor hovers over a card on desktop
**When** the pointer is over the card
**Then** the background image scales to 1.03 with a blue-tinted lift shadow (`box-shadow: 0px 12px 32px rgba(0, 71, 171, 0.1)`) — no hover state on mobile/touch

**Given** a visitor taps either card
**When** the link activates
**Then** they navigate to `/cancha` or `/eventos` respectively — cards are `<a>` tags, not `<div onClick>`

**Given** the second card enters the viewport
**When** `<AnimatedSection>` reveals it
**Then** it is delayed 100ms relative to the first card (stagger pattern)

---

### Story 2.3: Amenities Grid & Gallery

As a visitor,
I want to see all of Break Point's facilities at a glance in one visual section,
So that I can confirm the venue has everything I need without scrolling through paragraphs.

**Acceptance Criteria:**

**Given** the `<AmenitiesGrid>` section renders
**When** observed on any device
**Then** all 6 amenities are displayed as icon + label pairs on an Anthracite (`--color-dark`) full-bleed background with a `--color-available-dark` 2px top gradient on the content container: Cancha al aire libre · Iluminación nocturna · Salón para eventos · Área de parrilla · Cocina equipada · Baños H/M

**Given** viewport is below 768px
**When** `<AmenitiesGrid>` renders
**Then** the grid is 2 columns

**Given** viewport is 768px–1023px
**When** `<AmenitiesGrid>` renders
**Then** the grid is 3 columns

**Given** viewport is 1024px or wider
**When** `<AmenitiesGrid>` renders
**Then** all 6 amenities appear in a single row (6 columns)

**Given** the amenity icons are SVG/Lucide icons
**When** a screen reader encounters them
**Then** each icon has `aria-hidden="true"` and the visible text label is always present alongside

**Given** the `<GalleryGrid>` section renders (4–6 `<VenueImage>` placeholders)
**When** visible on any device
**Then** all images maintain their designated aspect ratios with no layout shift — placeholders show `--color-surface-low` background until real photos are provided

---

### Story 2.4: FAQ Section & Home Page Assembly

As a visitor with common questions,
I want to find answers to the most frequent questions without needing to contact anyone,
So that I arrive at WhatsApp already informed and ready to confirm — not to discover.

**Acceptance Criteria:**

**Given** the `<FaqSection>` renders on Home
**When** a visitor reads it
**Then** at least 4 questions covering both segments are answered: capacity, what's included, how to book, and whether there is parking (answer: no)

**Given** `<FaqSection>` renders
**When** a visitor taps a question
**Then** the answer expands inline (accordion behavior) — no page navigation required

**Given** the FAQ answers
**When** a visitor reads them
**Then** "No hay estacionamiento" and "No hay vestuarios" are clearly stated — no false expectations set

**Given** `app/page.tsx` (Home SSG) is built
**When** `pnpm build` runs
**Then** the page is statically generated — sections appear in this order: HeroSection → SegmentCards → AmenitiesGrid → GalleryGrid → FaqSection → final WhatsApp CTA

**Given** each major section is wrapped in `<AnimatedSection>`
**When** a visitor scrolls through Home
**Then** sections reveal sequentially with delays 0, 0.1, 0.2, 0.3 — no section is nested inside another `<AnimatedSection>`

---

## Epic 3: La Cancha Page — Field Booking Conversion

A football group captain sees the field specs, hourly pricing (day/night), typical availability windows, and booking conditions — then converts to WhatsApp with one tap.

**FRs covered:** FR7 · FR8 · FR10 · FR11 · FR15

### Story 3.1: La Cancha Hero — Night Field Experience

As a football group captain,
I want to see the field at night with floodlights as the first thing on the La Cancha page,
So that I immediately feel the energy of an evening game and know this is the right venue for my group.

**Acceptance Criteria:**

**Given** a visitor opens `/cancha`
**When** the page loads
**Then** a full-viewport (`h-[100dvh]`) nighttime field photo with floodlights (`priority` prop set) fills the screen — `<HeroSection variant="night">`, dark gradient overlay, H1 "La Cancha", and a positioning subheadline (synthetic grass · lighting · zona sur)

**Given** the `<AvailabilityBadge>` is present in the La Cancha hero
**When** a visitor sees it
**Then** "● Disponible hoy" appears in `--color-available` green — static in V1

**Given** the hero renders on desktop (`≥ lg`)
**When** the page is scrolled
**Then** parallax is active (30% scroll speed) — disabled on mobile and `prefers-reduced-motion`

**Given** `app/cancha/page.tsx` is built
**When** `pnpm build` runs
**Then** the page is statically generated (SSG) — zero server compute at runtime

---

### Story 3.2: Field Specs, Pricing & Availability Windows

As a football group captain,
I want to see the exact field specs, hourly pricing (day and night), and typical availability windows before contacting anyone,
So that I can calculate cost per player and know which slots I can request before opening WhatsApp.

**Acceptance Criteria:**

**Given** a visitor scrolls past the La Cancha hero
**When** the field specs section is visible
**Then** they can read: surface type (césped sintético), capacity (5v5 — 10 players), and lighting type (iluminación LED) — all sourced from `siteConfig`

**Given** the `<PricingBlock cancha>` renders
**When** a visitor reads it
**Then** two tiers are clearly displayed: Bs 120/hr (daytime) and Bs 130/hr (nighttime with lighting) — sourced from `siteConfig.pricing.cancha.day` and `.night`, never hardcoded

**Given** `siteConfig.pricing.cancha.day` or `.night` is `'TBD'` (PriceValue)
**When** `<PricingBlock cancha>` renders
**Then** the affected price displays "Consultar" instead of a number — no broken layout

**Given** the availability windows section renders
**When** a visitor reads it
**Then** typical open slots are shown as static text in V1 — clearly labeled as "horarios típicos disponibles"

**Given** the booking conditions section renders
**When** a visitor reads it
**Then** they can see: minimum 1 hour, advance deposit requirement (% a confirmar), and payment method — all without needing to contact the owner

---

### Story 3.3: HowItWorks, Gallery & WhatsApp CTA

As a football group captain,
I want to understand the 3-step booking process and reach WhatsApp with a pre-filled reservation message,
So that my first WhatsApp message already contains enough context for the owner to respond immediately.

**Acceptance Criteria:**

**Given** the `<HowItWorks cancha>` section renders
**When** a visitor reads it
**Then** exactly 3 steps are shown: (1) Escribinos por WhatsApp → (2) Confirmamos tu horario → (3) Adelanto asegura tu espacio — normalizing the deposit requirement before contact

**Given** the La Cancha gallery renders (2–3 `<VenueImage>` placeholders)
**When** visible on any device
**Then** images maintain correct aspect ratios with `--color-surface-low` placeholders — zero CLS

**Given** a visitor taps the primary CTA button
**When** WhatsApp opens
**Then** the pre-filled message is `siteConfig.whatsapp.messages.cancha` — owner immediately knows the inquiry is about field rental

**Given** the page sections are assembled in `app/cancha/page.tsx`
**When** a visitor scrolls through La Cancha
**Then** sections appear in this order: HeroSection (night) → Field Specs → PricingBlock → Availability Windows → Booking Conditions → HowItWorks → GalleryGrid → WhatsApp CTA — pricing always before the CTA

**Given** each section is wrapped in `<AnimatedSection>`
**When** sections enter the viewport
**Then** they reveal with staggered delays (0, 0.1, 0.2, 0.3) — never nested AnimatedSections

---

## Epic 4: Eventos Page — Event Inquiry & Lead Capture

Event organizers (birthday parents, corporate coordinators) see space combinations, understand the pricing model, and contact the owner via WhatsApp (primary) or a structured form that delivers a complete lead to the owner's email (secondary).

**FRs covered:** FR9 · FR10 · FR15 · FR16 · FR17 · FR18 · FR19 · FR20 · FR21

### Story 4.1: Eventos Hero, Space Combinations & HowItWorks

As an event organizer,
I want to see the full venue in the hero and understand which space combinations are available with their pricing model,
So that I can identify my combination and estimate my cost before contacting anyone.

**Acceptance Criteria:**

**Given** a visitor opens `/eventos`
**When** the page loads
**Then** a full-viewport (`h-[100dvh]`) daytime hero showing the field and event setup (`priority` prop set) fills the screen — H1 "Eventos", subheadline reinforcing exclusivity ("El lugar es tuyo. Solo tu grupo, sin extraños.")

**Given** the `<PricingBlock eventos>` renders
**When** a visitor reads it
**Then** 4 combination cards are displayed in a responsive grid (1-col mobile → 2-col md): ⚽+🔥 Cancha + Parrillero · 🏠+🔥 Salón + Parrillero · 🏠+⚽ Salón + Cancha · 🏠+⚽+🔥 Complejo completo — each with "precio según combinación y duración — cotizá sin compromiso"

**Given** the booking conditions section renders
**When** a visitor reads it
**Then** they can see: 3-hour minimum for full venue, 50% deposit to confirm the date, 72-hour advance booking minimum — all without needing to contact the owner

**Given** the `<HowItWorks eventos>` section renders
**When** a visitor reads it
**Then** exactly 3 steps are shown: (1) Contanos qué combinación necesitás → (2) Coordinamos precio y disponibilidad → (3) 50% adelanto confirma tu fecha

**Given** `app/eventos/page.tsx` is built
**When** `pnpm build` runs
**Then** the page is a Server Component — required for the Server Action on the contact form

---

### Story 4.2: Location Section

As an event organizer,
I want to see where Break Point is on a map and easily share the location with my guests,
So that I can confirm the venue is convenient and send directions without manual copy-paste.

**Acceptance Criteria:**

**Given** `siteConfig.contact.mapsUrl` is a confirmed Google Maps Place URL
**When** `<LocationSection>` renders
**Then** a Google Maps iframe is displayed with `title="Ubicación de Break Point en Google Maps"` — responsive: full-width mobile → 60% left / 40% right desktop

**Given** `siteConfig.contact.mapsUrl` is `'#'` (pending confirmation)
**When** `<LocationSection>` renders
**Then** the iframe is hidden — only the address text block and action buttons are shown (no broken iframe)

**Given** `<LocationSection>` renders in either state
**When** a visitor reads it
**Then** the full address (Av. Principal esq. Calle 6 Nº18, Caliri, Zona Sur, La Paz) is always visible as text alongside a "Ver en Google Maps" link

**Given** a visitor taps "Compartir por WhatsApp"
**When** WhatsApp opens
**Then** the pre-filled message is `siteConfig.whatsapp.messages.share`

---

### Story 4.3: Contact Form UI & Validation

As an event organizer,
I want a structured form to submit my inquiry with all relevant details in one step,
So that the owner receives complete information and can respond with a price and availability without back-and-forth.

**Acceptance Criteria:**

**Given** the `<ContactForm>` renders on the Eventos page
**When** a visitor views it
**Then** the following fields are present: Nombre (required) · Teléfono (required, Bolivian format) · Fecha del evento (required date picker) · Tipo de evento (required select: Cumpleaños infantil / Evento corporativo / Reunión social / Otro) · Nro de invitados (optional number) · Mensaje (optional textarea, 300 char max)

**Given** a visitor focuses any form input on iOS Safari
**When** the input receives focus
**Then** iOS does not zoom in — all inputs have `font-size: 16px` minimum (`text-base`)

**Given** a visitor submits the form with an empty required field
**When** client-side Zod validation runs
**Then** an inline error message appears below the invalid field in Spanish, the field is highlighted, and other inputs retain their values

**Given** the phone field receives input
**When** Zod client validation evaluates it
**Then** only valid Bolivian mobile formats pass (regex `/^(\+?591)?[67]\d{7}$/`) — invalid formats show a specific inline error

**Given** the form is in `submitting` state (`isPending` is `true`)
**When** observed in the UI
**Then** the submit button is disabled and shows "Enviando…" with a spinner icon — the rest of the form remains interactive

**Given** a keyboard user navigates the form
**When** they Tab through all fields
**Then** all inputs are reachable in logical order, each has a visible `<label htmlFor>`, and error messages are linked via `aria-describedby`

---

### Story 4.4: Server Action — Rate Limiting, Validation & Resend

As the Break Point owner,
I want to receive a complete, well-formatted email for every valid form submission,
So that I can respond via WhatsApp immediately with the event date, type, and guest count already in hand.

**Acceptance Criteria:**

**Given** `app/eventos/actions.ts` receives a form submission
**When** the Server Action runs
**Then** it executes in this exact order: (1) check required env vars — return `{ error: 'config' }` if missing; (2) check Upstash rate limit — return `{ error: 'rate_limit' }` if exceeded; (3) Zod server-side validation — return `{ errors: fieldErrors }` if invalid; (4) guard `{ error }` from Resend SDK — return `{ error: 'server' }` if Resend fails; (5) return `{ success: true, message: 'Mensaje enviado.' }` on success

**Given** the rate limit has been exceeded (5 submissions/hr from same IP)
**When** the next submission arrives
**Then** Upstash blocks it and the UI displays "Demasiados intentos. Esperá unos minutos." — no email is sent

**Given** a valid submission passes all gates
**When** Resend sends the email
**Then** the owner receives an email with subject `[Break Point] Evento — {eventType} · {date} · {guests} personas` and body containing all form fields — no PII appears in any `console.log` or server log

**Given** a required env var is missing in the deployment environment
**When** a form is submitted
**Then** the UI displays "Servicio no disponible. Contactanos por WhatsApp." — no technical details exposed

---

### Story 4.5: Form Success, Error States & Page Assembly

As an event organizer,
I want clear feedback after submitting the form and easy access to WhatsApp as a fallback,
So that I always know what happened and have an immediate next step regardless of the outcome.

**Acceptance Criteria:**

**Given** a form submission succeeds
**When** `{ success: true }` is returned
**Then** a green banner (`--color-available` bg) appears with "Mensaje enviado. Te respondemos pronto." and focus moves to the confirmation message

**Given** the success state is shown
**When** a visitor reads it
**Then** a "También puedes escribirnos por WhatsApp" suggestion with an inline WhatsApp link is visible below the success banner

**Given** a server or config error occurs
**When** the error state renders
**Then** a red banner (`--color-error` bg) appears with a generic Spanish message — no technical details visible to the user

**Given** `app/eventos/page.tsx` assembles all sections
**When** a visitor scrolls through Eventos
**Then** sections appear in this order: HeroSection (day) → Amenities included → PricingBlock (combinations) → Booking Conditions → HowItWorks (eventos) → GalleryGrid → WhatsApp CTA (primary) → ContactForm (secondary) → LocationSection

**Given** the Eventos page renders
**When** a visitor sees the two contact options
**Then** the WhatsApp CTA is visually primary (orange) and the contact form is visually secondary — one primary action per viewport

---

## Epic 5: SEO & Discoverability

The site appears in local Google searches, social shares generate compelling previews, AI crawlers understand the venue, and hreflang alternates are valid from day 1.

**FRs covered:** FR5 · FR23 · FR24 · FR25 · FR26 · FR27 · FR32

### Story 5.1: Page Metadata — generateMetadata on All Pages

As a potential visitor,
I want each Break Point page to appear in search results with a unique, descriptive title and description,
So that I can identify the right page from Google search results before clicking.

**Acceptance Criteria:**

**Given** `app/page.tsx`, `app/cancha/page.tsx`, and `app/eventos/page.tsx` each call `generateMetadata()`
**When** Google or a social platform reads the page
**Then** each page has a unique `<title>`, `<meta name="description">`, `og:title`, `og:description`, and `og:locale: es_BO` — no two pages share the same title or description

**Given** `generateMetadata()` is called with a `path` argument
**When** the metadata is generated
**Then** a correct canonical URL is produced using `siteConfig.seo.metadataBase`

**Given** `generateMetadata()` generates hreflang alternates
**When** a search engine reads the `<head>`
**Then** both `es` and `en` hreflang links are present on every page — `x-default` points to the Spanish version

**Given** `og:image` is set on all pages
**When** the URL is shared on WhatsApp or Facebook
**Then** the preview uses the 1200×630px OG image for that specific page

---

### Story 5.2: JSON-LD Structured Data

As a potential visitor using Google,
I want Break Point to appear with rich results (venue info, FAQ snippets) in Google search,
So that I can see the address, phone, and key FAQs directly in search results without clicking.

**Acceptance Criteria:**

**Given** `app/layout.tsx` includes JSON-LD script tags
**When** parsed by Google's Rich Results Test
**Then** the `Organization` schema passes validation with: name, url, address (PostalAddress with Bolivia), telephone, and sameAs (WhatsApp link)

**Given** the `SportsActivityLocation` JSON-LD is present in `app/layout.tsx`
**When** parsed by Google
**Then** it includes: name, address, amenityFeature list (all 6 confirmed amenities), and openingHours (08:00–22:00)

**Given** `<FaqSection>` on Home renders with its question/answer pairs
**When** the `FAQPage` JSON-LD is generated
**Then** it includes all FAQ questions and answers in structured format and passes Google's Rich Results Test

**Given** a JSON-LD script tag uses a CSP nonce
**When** `proxy.ts` generates the CSP header
**Then** the nonce in the script tag matches the nonce in the header — no CSP violations in browser console

---

### Story 5.3: Sitemap, robots.ts & llms.txt

As a search engine or AI crawler,
I want a machine-readable map of all Break Point pages and clear crawling permissions,
So that I can index the site correctly and AI models can understand what Break Point offers.

**Acceptance Criteria:**

**Given** `app/sitemap.ts` is present
**When** accessed at `/sitemap.xml`
**Then** it lists all 6 URLs: `/`, `/cancha`, `/eventos`, `/en`, `/en/cancha`, `/en/eventos` — with correct `lastModified` and `changeFrequency`

**Given** `app/robots.ts` is present
**When** accessed at `/robots.txt`
**Then** it allows standard crawlers (Googlebot, Bingbot) and known AI crawlers (GPTBot, ClaudeBot), blocks CCBot, and disallows `/api/`

**Given** `public/llms.txt` is present
**When** accessed at `/llms.txt`
**Then** it contains a plain-text description of Break Point (name, location, services, pricing, contact method) formatted for AI language model consumption

---

### Story 5.4: OG Images — next/og Dynamic Per Page

As a potential visitor,
I want a compelling visual preview when someone shares a Break Point page link on social media,
So that the preview communicates the venue's value before I even click the link.

**Acceptance Criteria:**

**Given** `app/opengraph-image.tsx` exists (Home OG)
**When** generated by `next/og` at build time
**Then** a 1200×630px image is produced showing: field (daytime) + Break Point logo + tagline + address — Edge Runtime

**Given** `app/cancha/opengraph-image.tsx` exists (La Cancha OG)
**When** generated
**Then** a 1200×630px image shows: nighttime field + pricing text (Bs 120/hr day · Bs 130/hr night)

**Given** `app/eventos/opengraph-image.tsx` exists (Eventos OG)
**When** generated
**Then** a 1200×630px image shows: field + salon + exclusivity message ("El lugar es tuyo")

**Given** all 3 OG images are generated
**When** any page URL is shared on WhatsApp
**Then** the preview shows the page-specific OG image — not the generic `public/og-image.png` fallback

---

### Story 5.5: i18n Scaffold — app/en/ & hreflang

As a future English-speaking visitor,
I want the site infrastructure to support an English version from day 1,
So that enabling English content in V2 requires only adding copy — no routing or structural changes.

**Acceptance Criteria:**

**Given** `app/en/layout.tsx`, `app/en/page.tsx`, `app/en/cancha/page.tsx`, and `app/en/eventos/page.tsx` exist
**When** `/en`, `/en/cancha`, and `/en/eventos` are accessed
**Then** each page renders correctly with EN-specific metadata — Spanish copy is acceptable as V1 placeholder

**Given** `proxy.ts` has `SUPPORTED_LOCALES = ['es', 'en']`
**When** a request to `/en/cancha` arrives
**Then** `x-next-locale: en` is set and the correct EN page is served

**Given** all 6 pages (ES + EN) are in the sitemap
**When** search engines read the hreflang alternates
**Then** each ES page links to its EN counterpart and vice versa — no orphaned hreflang references, no 404s on alternates

**Given** `app/en/layout.tsx` exists
**When** reviewed
**Then** it contains only EN metadata overrides — no duplicate `<html>` or `<body>` tags

---

## Epic 6: Performance, Security & Launch Readiness

The site meets Core Web Vitals on Bolivian 4G, passes all 5 CI gates on every PR, and automated tests validate real user experience before each deploy.

**FRs covered:** FR28 · FR29 · FR30
**NFRs covered:** NFR-P1–P6 · NFR-S1–S8 · NFR-A1–A7 · NFR-SC1–SC4

### Story 6.1: Image Performance — next/image Optimization

As a visitor on a Bolivian 4G connection,
I want venue images to load progressively with no layout shift and the hero to be visible fast,
So that I can see the field and tap WhatsApp even before all images finish loading.

**Acceptance Criteria:**

**Given** the hero `<VenueImage slot="hero">` on any page
**When** rendered
**Then** `next/image` uses the `priority` prop (preloaded, never lazy-loaded) and `sizes="100vw"` — no missing sizes warning in console

**Given** all gallery and card `<VenueImage>` components
**When** rendered
**Then** they use `loading="lazy"` with `placeholder="blur"` and correct `sizes` props: `(max-width: 768px) 100vw, 50vw` for gallery · `(max-width: 768px) 100vw, 33vw` for cards

**Given** venue photos are placed in `public/images/` as WebP files
**When** served by Next.js
**Then** they are optimized and delivered in the appropriate responsive size for the requesting device

**Given** all images (placeholder and real) have defined aspect ratios
**When** the page loads or images swap
**Then** CLS is 0 — no layout shift occurs at any point during load or after image replacement

**Given** `pnpm build` completes
**When** Lighthouse mobile audit runs
**Then** LCP < 2.5s, CLS < 0.1, INP < 200ms, and PageSpeed ≥ 90 on mobile

---

### Story 6.2: CI/CD Pipeline — GitHub Actions 5-Gate Workflow

As a developer,
I want every pull request automatically validated through 5 quality gates before it can merge,
So that broken TypeScript, lint errors, failed builds, or broken E2E tests never reach the main branch.

**Acceptance Criteria:**

**Given** `.github/workflows/ci.yml` exists
**When** a pull request is opened or updated
**Then** the workflow runs these 5 gates in sequence: (1) `pnpm tsc --noEmit`; (2) `pnpm lint`; (3) `pnpm build`; (4) `pnpm audit --audit-level=high || true` (non-blocking); (5) `pnpm test:e2e` against the Vercel preview URL

**Given** Gate 1 (TypeScript) fails
**When** the CI result is reported
**Then** the PR is blocked from merging — no exceptions

**Given** Gate 4 (CVE audit) finds a high-severity vulnerability
**When** the CI result is reported
**Then** the gate is non-blocking but the vulnerability is visible in the CI log for human review

**Given** all 5 gates pass
**When** CI reports results
**Then** the PR is eligible to merge to `main` for auto-deploy to Vercel

---

### Story 6.3: Playwright E2E Smoke Tests

As a developer,
I want 5 automated smoke tests covering the critical user journeys to run on every deploy,
So that any regression that breaks a real visitor's path is caught before the change goes live.

**Acceptance Criteria:**

**Given** `e2e/home.spec.ts` exists
**When** Playwright runs it against the deployed URL
**Then** it verifies: Home loads with status 200, the field hero is visible, and the floating WhatsApp button is visible on a 375px mobile viewport

**Given** `e2e/cancha.spec.ts` exists
**When** Playwright runs it
**Then** it verifies `/cancha` loads and pricing text "Bs 120" and "Bs 130" are visible on the page

**Given** `e2e/eventos.spec.ts` runs the form success scenario
**When** all required fields are filled with valid data and the form is submitted
**Then** the success banner "Mensaje enviado" appears

**Given** `e2e/eventos.spec.ts` runs the form error scenario
**When** the form is submitted with an empty required field
**Then** an inline error message appears below the invalid field — not a generic browser alert

**Given** all 5 smoke tests pass
**When** CI reports results
**Then** the complete user journey for both primary segments is validated without manual testing

---

### Story 6.4: Vitest Unit Tests

As a developer,
I want co-located unit tests for all shared utilities and the Zod schema,
So that regressions in utility logic or form validation are caught instantly without running a browser.

**Acceptance Criteria:**

**Given** `lib/utils.test.ts` exists
**When** `pnpm test` runs
**Then** it verifies `cn()` correctly merges conflicting Tailwind classes (e.g., `cn('px-4', 'px-6')` → `'px-6'`)

**Given** `lib/seo.test.ts` exists
**When** `pnpm test` runs
**Then** it verifies `generateMetadata()` returns the correct `title`, `description`, `openGraph.locale`, and `alternates.languages` for a given path

**Given** `lib/rate-limit.test.ts` exists
**When** `pnpm test` runs
**Then** it verifies `contactLimiter` is configured with limit 5 and window 1 hour

**Given** `app/eventos/schema.test.ts` exists
**When** `pnpm test` runs
**Then** it verifies: valid Bolivian phone numbers pass (e.g., `+59170690685`, `76543210`), invalid formats fail, required fields reject empty values, and Mensaje respects the 300 char limit

**Given** all Vitest tests pass
**When** `pnpm test` exits
**Then** exit code is 0 — suitable for CI gate integration

---

### Story 6.5: Security, Accessibility Audit & Launch Checklist

As the site owner and developer,
I want the site to pass a pre-launch security and accessibility audit and have a responsible disclosure policy in place,
So that the site launches meeting all defined quality standards.

**Acceptance Criteria:**

**Given** `public/.well-known/security.txt` exists
**When** accessed at `/.well-known/security.txt`
**Then** it contains a contact email for security disclosures and an Expires date set to 1 year from launch — following RFC 9116

**Given** Lighthouse Accessibility audit runs on all 3 pages
**When** results are reviewed
**Then** Accessibility score ≥ 95 on Home, La Cancha, and Eventos — no critical WCAG AA violations

**Given** all form inputs on Eventos have visible labels
**When** a screen reader (VoiceOver iOS) navigates the form
**Then** each field is announced correctly with its label and error messages are announced when validation fails

**Given** all color combinations are reviewed against the UX spec contrast table
**When** any text is rendered over any background
**Then** body text achieves ≥ 4.5:1 ratio; dark text (`#191b22`) is always used on orange (`--color-cta`) backgrounds, never white

**Given** the pre-launch checklist is reviewed
**When** all items are confirmed
**Then** zero TypeScript errors, zero lint errors, `pnpm build` succeeds, all env vars are set in Vercel Dashboard, and Resend domain verification is confirmed
