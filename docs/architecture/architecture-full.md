---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
lastStep: 8
status: 'complete'
completedAt: '2026-04-24'
inputDocuments:
  - BLUEPRINT.md
  - _bmad-output/planning-artifacts/product-brief-break-point-web.md
  - _bmad-output/planning-artifacts/product-brief-break-point-web-distillate.md
  - _bmad-output/planning-artifacts/research/market-break-point-bolivia-research-2026-04-24.md
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
workflowType: 'architecture'
project_name: 'break-point-web'
user_name: 'Mauricio'
date: '2026-04-24'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
33 FRs across 6 categories: Site Navigation & Structure (FR1–5),
Content & Information Display (FR6–14), Lead Capture & Contact (FR15–19),
Owner Notifications & Lead Management (FR20–22), SEO & Discoverability
(FR23–27), Performance & Media (FR28–30), Localization & Brand Consistency
(FR31–33).

Architecturally, these collapse to three categories:
- **Static content delivery** (FR1–14, 23–27, 31–33): 2 fully static pages
  (Home, La Cancha) + partially static Eventos — served by Next.js SSG.
  Zero server compute under any traffic load for these pages.
- **Lead capture** (FR15–22): One Server Action on Eventos page. Rate-limited
  (Upstash Redis). Email delivery via Resend. No database write.
- **Performance + media** (FR28–30): next/image with priority on hero images
  + WebP + blur placeholders. All other images lazy-loaded.

**Non-Functional Requirements:**
- Performance: LCP < 2.5s · CLS < 0.1 · INP < 200ms · PageSpeed ≥ 90 on
  mobile 4G Bolivia. First Load JS < 80KB.
- Security: Rate limiting (5 req/hr/IP) · No PII in logs · Server-side
  validation · Env vars for all secrets · CSP headers via proxy.ts.
- Accessibility: WCAG 2.1 AA · Lighthouse Accessibility ≥ 95 · Semantic HTML ·
  All interactive elements keyboard-reachable · prefers-reduced-motion honored.
- Scalability: Static pages at Vercel CDN edge — zero-scale concern. Only live
  endpoint is the Eventos Server Action, capped by Upstash rate limiter.

**Scale & Complexity:**
- Primary domain: Static marketing site with a single lead-capture endpoint
- Complexity level: Low–Medium
- Estimated architectural components: 12 UI components, 3 pages, 1 Server
  Action, 2 external integrations (Resend, Upstash)

### Technical Constraints & Dependencies

Constraints inherited from Sirius Blueprint (non-negotiable):
- Next.js 16.2.4 App Router only — no Pages Router, no middleware.ts
- React 19 — useActionState from 'react', not react-dom
- Tailwind v4 — all tokens in @theme block, no tailwind.config.js
- No direct motion imports — always via `<AnimatedSection>`
- pnpm 9 — frozen-lockfile in CI

Project-specific constraints:
- No online booking — WhatsApp is the reservation channel
- No database — contact form leads go to owner's email only (Resend)
- No CMS — Starter tier: cms_enabled: false
- No analytics — analytics_enabled: false (deferred to V2)
- Photography V1 — structured placeholder components (`<VenueImage>`), real
  photos dropped in post-launch with zero code changes
- Two pricing TBDs pending owner confirmation:
  1. Full-venue hourly rate for hours 4+ (launches with PriceValue = 'TBD')
  2. Birthday package fixed price + included hours

External dependencies:
- Resend SDK v6+ (does not throw — must guard `{ error }` before `.send()`)
- Upstash Redis (`@upstash/ratelimit` + `@upstash/redis`)
- wa.me deep links — WhatsApp CTAs (no API key required)
- Google Maps iframe embed — URL pending owner confirmation
- next/font/google — Space Grotesk + Manrope + Lexend

### Cross-Cutting Concerns Identified

1. **config/site.ts as single source of truth** — Typed with semantic namespaces
   (brand, contact, pricing, whatsapp, seo). `PriceValue = number | 'TBD'` handles
   pending prices. One change updates the entire site.

2. **WhatsApp CTA consistency** — `<WhatsAppButton>` on every page in two variants
   (floating mobile + inline desktop). Pre-filled message contextually different
   per page. All sourced from `siteConfig.whatsapp.messages`.

3. **Mobile-first performance** — Every component evaluated against 4G Bolivia
   LCP budget. No client JS without justification. No third-party scripts in V1.

4. **AnimatedSection boundary** — ALL scroll-reveal animations via `<AnimatedSection>`.
   No direct motion imports. Respects `prefers-reduced-motion` globally.

5. **SEO + AEO metadata** — `generateMetadata()` from `lib/seo.ts` on all pages.
   JSON-LD (Organization + SportsActivityLocation + FAQPage) in `app/layout.tsx`.
   `llms.txt` and `robots.ts` at root. `sitemap.ts` covers all 3 pages.

6. **iOS Safari compatibility** — 6 fixes applied globally: viewport meta with
   `viewport-fit=cover`, `overflow-x: hidden`, `100dvh` hero, `safe-area-inset`
   on floating WhatsApp button, `font-size ≥ 16px` on all inputs,
   `touch-action: manipulation` on all interactive elements.

### Architecture Decision Records

**ADR-001 — Rendering Strategy: /eventos**
- Decision: Server Component page + `'use client'` form child + `useActionState` +
  Server Action
- Rationale: Minimal client JS; rate limiting via `headers()` in Server Action;
  native React 19 form state management
- Rejected: API route (more boilerplate); full `'use client'` page (destroys LCP)

**ADR-002 — Google Maps URL Pending**
- Decision: `mapsUrl` in `config/site.ts` with generic search URL fallback.
  `<LocationSection>` renders address text always + iframe conditionally when
  `mapsUrl` is a confirmed Place URL
- Rationale: Address info never blocked; single config change activates exact embed
- Rejected: Approximate coordinates (credibility risk); omit section (conversion-critical)

**ADR-003 — i18n Scaffolding**
- Decision: `app/en/layout.tsx` + `app/en/page.tsx` scaffolded from day 1.
  `proxy.ts` SUPPORTED_LOCALES = ['es', 'en']. hreflang alternates generated for
  both locales on all pages via `lib/seo.ts`
- Rationale: Valid hreflang from day 1; V2 English activation requires only
  adding copy, not new routing
- Rejected: No `/en/*` scaffold (broken hreflang = active SEO penalty)

**ADR-004 — config/site.ts Structure**
- Decision: Typed with namespaces: `brand` · `contact` · `pricing` · `whatsapp` · `seo`.
  `PriceValue = number | 'TBD'` for pending owner confirmations
- Rationale: TypeScript compile error if field missing; autocomplete in all
  components; single file change updates entire site
- Rejected: Flat object (no type safety); split site.ts + pages.ts (premature)

**ADR-005 — `<VenueImage>` Placeholder Strategy**
- Decision: `<VenueImage slot="hero|gallery|card" alt="..." src?={string} />`.
  Without `src`: `--color-surface-low` bg + camera icon. With `src`: `next/image`
  fill + blur placeholder. `alt` always required by TypeScript.
- Rationale: Zero CLS in both states; photo swap = add `src` prop only;
  alt text enforced at compile time
- Rejected: CSS background-color (no next/image optimization); stock photography
  (prohibited by UX spec)

## Starter Template Evaluation

### Primary Technology Domain

Next.js App Router (web marketing site) — mandated by Sirius Blueprint v1.0.

### Starter Selected: create-next-app@16.2.4 (already initialized)

**Status:** Project scaffold committed in commits `1c950d8` + `5341989`.
No new initialization required. All Blueprint dependencies installed.

**Initialization command used:**
```bash
pnpm dlx create-next-app@16.2.4 break-point-web \
  --typescript --tailwind --eslint --app \
  --no-src-dir --import-alias '@/*'
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
- TypeScript strict mode — `tsconfig.json` with `strict: true`, `noEmit: true`
- Node 20 LTS target (matches GitHub Actions runner)
- ES2017 output target, ESM module resolution (`moduleResolution: bundler`)

**Styling Solution:**
- Tailwind v4 with `@tailwindcss/postcss` — no `tailwind.config.js`
- `tw-animate-css` for animation utility classes
- All brand tokens in `@theme` block in `app/globals.css`

**Build Tooling:**
- Next.js 16.2.4 App Router — SSG by default, Server Actions for mutations
- `"dev": "next dev"` — Turbopack is the default bundler in Next.js 16 (no flag needed)
- **Note:** Blueprint §7.3 shows `next dev --turbopack` — this is outdated for v16.
  In Next.js 16, Turbopack activates automatically. Current `package.json` is correct.
- Next.js 16.2.4 Turbopack: 400% faster dev than Next.js 15, 87% faster startup than 16.1

**UI Component Foundation:**
- `@base-ui/react` for headless primitives (requires `'use client'` on wrappers)
- `framer-motion` via `<AnimatedSection>` wrapper only — never imported directly
- `lucide-react` — tree-shaken, individual imports only
- CVA + clsx + tailwind-merge via `cn()` in `lib/utils.ts`

**Integrations Pre-installed:**
- `resend ^6.12.2` — email delivery (guard `{ error }`, does not throw)
- `@upstash/ratelimit ^2.0.8` + `@upstash/redis ^1.37.0` — rate limiting
- `shadcn ^4.4.0` (devDep only — CLI scaffolding, never imported at runtime)

**Code Organization (to be built per Blueprint §2.2):**
- `components/{brand,layout,sections,ui}/`
- `config/site.ts` — typed with namespaces, `PriceValue = number | 'TBD'` (ADR-004)
- `lib/utils.ts` — `cn()` function
- `lib/seo.ts` — `generateMetadata()` factory
- `lib/rate-limit.ts` — `contactLimiter` (5 req/hr/IP via Upstash)
- `proxy.ts` — replaces `middleware.ts`, CSP nonce generation, i18n routing
- `app/en/` — English subtree scaffolded from day 1 (ADR-003)
- `app/cancha/page.tsx` + `app/eventos/page.tsx` + `app/eventos/actions.ts`
- `public/llms.txt`, `public/.well-known/security.txt`

**Note:** Project initialization is complete. First implementation story
begins with folder structure setup and `config/site.ts` creation.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Form validation: Zod — required before Eventos form dev begins
- Font subsets: latin only — required before `app/layout.tsx` setup

**Important Decisions (Shape Architecture):**
- Testing: Playwright E2E + Vitest — set up before first story ships
- OG Image: `next/og` dynamic — one file per page, Edge Runtime

**Deferred Decisions (Post-MVP):**
- Analytics: Vercel Analytics — V2 (`analytics_enabled: false` in V1)
- CMS: Not applicable — Starter tier (`cms_enabled: false`)
- Booking calendar: V2 trigger when WhatsApp volume justifies it

### Data Architecture

No database in V1. Data flow:
- Contact form → Zod validation → Server Action → Resend email to owner
- Rate limiting state → Upstash Redis (serverless, edge-compatible)
- All business data → `config/site.ts` (static, typed, zero runtime cost)

Validation strategy (Zod):
- Schema defined in `app/eventos/schema.ts` — shared between client and server
- Phone validation regex: `/^(\+?591)?[67]\d{7}$/` — covers Bolivian mobile formats
- `PriceValue = number | 'TBD'` — handles pending owner confirmations
- Zod errors mapped to field-level messages in Spanish

### Authentication & Security

No authentication in V1 (Starter tier — `auth_enabled: false`).

Security measures active:
- CSP with per-request nonce — generated in `proxy.ts` (Blueprint §5.1)
- Static security headers — `next.config.ts` (Blueprint §5.2)
- Rate limiting — `contactLimiter`: 5 req/hr/IP via Upstash Redis
- No PII in logs — enforced by AGENTS.md absolute rule
- Server-side Zod validation — only defense against malformed input
- Env vars for all secrets — `RESEND_API_KEY`, `UPSTASH_*` never `NEXT_PUBLIC_`
- HTTPS enforced by Vercel — no opt-out

### API & Communication Patterns

Single active endpoint: Eventos contact form Server Action.

Pattern (Blueprint §2.3):
```
eventos/page.tsx (Server Component)
  └── event-contact-form.tsx ('use client')
        └── useActionState(contactAction, initialState)
              └── app/eventos/actions.ts ('use server')
                    ├── 1. Upstash rate limit check (IP from headers())
                    ├── 2. Zod schema validation
                    ├── 3. Guard { error } from Resend
                    └── 4. resend.emails.send(...)
```

WhatsApp CTAs: `wa.me` deep links with pre-filled messages — no API,
no key, no rate limiting needed. Sourced from `siteConfig.whatsapp.messages`.

Error handling standards:
- Rate limit exceeded → `{ error: 'rate_limit' }` → Spanish UI message
- Zod validation failure → `{ errors: fieldErrors }` → inline field errors
- Resend `{ error }` → `{ error: 'server' }` → generic UI message (no details)
- Missing env vars → `{ error: 'config' }` → 503-equivalent message

### Frontend Architecture

Rendering strategy:
- Home (`/`): fully static (SSG) — zero server compute
- La Cancha (`/cancha`): fully static (SSG) — zero server compute
- Eventos (`/eventos`): Server Component page + `'use client'` form child
- `app/en/*`: static, mirrors ES pages with EN metadata

Client boundary (`'use client'` components only):
- `<Navbar>` — scroll state for glassmorphism effect
- `<WhatsAppButton>` — opens `wa.me` link (browser API)
- `<ContactForm>` — `useActionState` hook

State management: None. No `useState` beyond form state (`useActionState`).
No Zustand, no Redux, no Context — not needed for this scope.

Component architecture:
- All variants via CVA (`class-variance-authority`)
- All conditional classes via `cn()` from `lib/utils.ts`
- All brand strings from `siteConfig` — never hardcoded
- `<AnimatedSection>` wraps all scroll-reveal sections

OG Image — `next/og` dynamic (`ImageResponse`, Edge Runtime):
- `app/opengraph-image.tsx` → Home: field day + logo + tagline + address
- `app/cancha/opengraph-image.tsx` → field night + pricing (Bs 120/130)
- `app/eventos/opengraph-image.tsx` → field + salon + exclusivity message

Font loading (`next/font/google` — zero runtime requests):
- Space Grotesk: `subsets: ['latin']`, `weight: ['700', '800']` → `--font-heading`
- Manrope: `subsets: ['latin']`, `weight: ['400']` → `--font-body`
- Lexend: `subsets: ['latin']`, `weight: ['400', '500']` → `--font-ui`

### Infrastructure & Deployment

Platform: Vercel — automatic deploy from `main` branch on merge.
Runtime: Edge for `proxy.ts` · Node.js for Server Actions and API routes.

CI/CD (GitHub Actions — `.github/workflows/ci.yml`):
```
Gate 1: pnpm tsc --noEmit       (type safety)
Gate 2: pnpm lint                (code style)
Gate 3: pnpm build               (production build)
Gate 4: pnpm audit --audit-level=high || true  (CVE — non-blocking)
Gate 5: pnpm test:e2e            (Playwright — runs against preview URL)
```

Testing setup:
- Playwright: 5 E2E smoke tests (home load, WhatsApp button,
  La Cancha pricing, Eventos form success, Eventos form errors)
- Vitest: unit tests for `lib/utils.ts`, Zod schema, `config/site.ts`,
  `<VenueImage>` placeholder behavior, rate-limit config

Environment variables (Vercel Dashboard only — never in source):
```
RESEND_API_KEY              — Resend email delivery
CONTACT_RECEIVER_EMAIL      — Owner email (during domain verification)
UPSTASH_REDIS_REST_URL      — Rate limiting
UPSTASH_REDIS_REST_TOKEN    — Rate limiting auth
```
`NEXT_PUBLIC_` prefix — not used for any secret in this project.

### Decision Impact Analysis

**Implementation Sequence:**
1. `proxy.ts` + `next.config.ts` — security foundation
2. `config/site.ts` typed structure — everything depends on this
3. `app/globals.css` `@theme` tokens — design system foundation
4. `lib/utils.ts` + `lib/seo.ts` + `lib/rate-limit.ts` — shared utilities
5. Core components: `<Navbar>`, `<Footer>`, `<WhatsAppButton>`, `<AnimatedSection>`
6. Home page — static, validates full stack end-to-end
7. La Cancha page — static, validates image strategy
8. Eventos page — form + Server Action + Zod + Resend
9. `app/en/*` scaffold + hreflang
10. SEO: `llms.txt`, `robots.ts`, `sitemap.ts`, JSON-LD schemas
11. OG images (`next/og`) — one per page
12. Playwright + Vitest test setup

**Cross-Component Dependencies:**
- `config/site.ts` → all components (`<WhatsAppButton>`, `<PricingBlock>`, `<Footer>`)
- `app/globals.css @theme` → all styled components
- `lib/utils.ts` (`cn`) → all components with conditional classes
- `proxy.ts` → CSP nonce → `app/layout.tsx` JSON-LD scripts
- Zod schema → `event-contact-form.tsx` (client) + `actions.ts` (server)
- `lib/rate-limit.ts` → `actions.ts` (`contactLimiter`)

## Implementation Patterns & Consistency Rules

### Critical Conflict Points Identified

8 areas where AI agents could make inconsistent decisions if not explicitly specified.

### Naming Patterns

**Component files:**
- PascalCase for component files: `WhatsAppButton.tsx`, `VenueImage.tsx`
- kebab-case for directories: `components/brand/`, `components/layout/`
- Server Action file: always `actions.ts` inside the route directory
- Form client component: always `[feature]-form.tsx` (e.g. `event-contact-form.tsx`)
- Zod schema file: always `schema.ts` inside the route directory

**Functions & variables:**
- camelCase for functions and variables: `contactAction`, `siteConfig`, `venueSlot`
- PascalCase for components and types: `WhatsAppButton`, `PriceValue`, `VenueSlot`
- `handle` prefix for event handlers: `handleSubmit`, `handleScroll`
- No ambiguous abbreviations: `whatsappMessage` not `waMsg`, `eventType` not `evtType`

**CSS & Tailwind:**
- Always `cn()` from `lib/utils.ts` — never string concatenation
- Never arbitrary Tailwind color values: `bg-[#FF8A00]` → `bg-cta`
- Never `style={{ color: '#...' }}` inline — always `@theme` utility class

**Tests:**
- Playwright: `e2e/` directory at project root
- Vitest: co-located with the tested file (`lib/utils.test.ts`, `schema.test.ts`)
- Naming: `[filename].test.ts` for unit tests, `[feature].spec.ts` for E2E

### Structure Patterns

**File location rules:**
```
app/
  layout.tsx              — Global JSON-LD, fonts, Navbar, Footer
  page.tsx                — Home (Server Component)
  opengraph-image.tsx     — OG image Home (next/og, Edge Runtime)
  globals.css             — @theme tokens ONLY
  robots.ts               — AI crawler policy
  sitemap.ts              — 3 pages + /en variants
  cancha/
    page.tsx              — La Cancha (Server Component)
    opengraph-image.tsx
  eventos/
    page.tsx              — Eventos (Server Component)
    event-contact-form.tsx    — 'use client'
    actions.ts                — 'use server'
    schema.ts                 — Zod schema (shared client + server)
    opengraph-image.tsx
  en/
    layout.tsx            — EN metadata only (no <html>)
    page.tsx              — EN Home
    cancha/page.tsx
    eventos/page.tsx
  api/                    — Empty in V1

components/
  brand/                  — Logo SVG, decorative elements (Server)
  layout/                 — Navbar ('use client'), Footer (Server)
  sections/               — Page sections (Server by default)
  ui/                     — Design system primitives

config/
  site.ts                 — SINGLE source of truth

lib/
  utils.ts                — cn() only
  seo.ts                  — generateMetadata() factory
  rate-limit.ts           — contactLimiter

e2e/                      — Playwright tests
public/
  images/                 — WebP only, <500KB each
  brand/                  — SVG logo assets
  .well-known/security.txt
  llms.txt
```

**Rule:** When in doubt about file location, consult Blueprint §2.2 first.

### Format Patterns

**Server Action return type — fixed contract:**
```ts
type ActionResult =
  | { success: true; message: string }
  | { error: 'rate_limit' | 'validation' | 'server' | 'config' }
  | { errors: Record<string, string[]> }  // Zod field errors
```
Never return `null`, `undefined`, or different shapes — `useActionState`
requires a consistent type from the initial state.

**Form initial state:**
```ts
const initialState: ActionResult = { success: false, message: '' }
```

**User-facing error messages — always in Spanish:**
```ts
const ERROR_MESSAGES = {
  rate_limit: 'Demasiados intentos. Esperá unos minutos.',
  server:     'Algo salió mal. Intentá de nuevo.',
  config:     'Servicio no disponible. Contactanos por WhatsApp.',
} as const
```

**Zod error mapping — always field-level:**
```ts
if (!result.success) {
  return { errors: result.error.flatten().fieldErrors }
}
```

### Communication Patterns

**Props vs config:**
- Business data (price, phone, WhatsApp messages) → always from `siteConfig`
- Presentation data (slot, variant, delay) → always as component props
- Never pass business data as hardcoded JSX props

**AnimatedSection — consistent usage:**
```tsx
// Delay increments: 0, 0.1, 0.2, 0.3 (never exceed 0.4 on one page)
// yOffset default: 24 (do not change without reason)
// duration default: 0.5 (do not change without reason)
<AnimatedSection delay={0.1}>
  <SectionComponent />
</AnimatedSection>
// NEVER nest <AnimatedSection> inside another <AnimatedSection>
```

**WhatsApp links — always via siteConfig:**
```tsx
// ✅ Correct
const { phone, messages } = siteConfig.whatsapp
href={`https://wa.me/${phone}?text=${encodeURIComponent(messages.cancha)}`}

// ❌ Wrong — hardcoded number
href="https://wa.me/59170690685?text=Hola"
```

### Process Patterns

**Form loading state:**
- Use `isPending` from `useActionState` — do not create additional `useState`
- Submit button: `disabled={isPending}` + change label to "Enviando…"
- Never disable the entire form — only the submit button

**next/image — sizes prop mandatory:**
```tsx
// Hero (full viewport):
<Image fill sizes="100vw" priority ... />

// Gallery (grid column):
<Image fill sizes="(max-width: 768px) 100vw, 50vw" ... />

// Card (small component):
<Image fill sizes="(max-width: 768px) 100vw, 33vw" ... />

// NEVER omit sizes on fill images — Next.js warning + LCP degradation
```

**VenueImage — slot always explicit:**
```tsx
// ✅ Correct
<VenueImage slot="hero" alt="Campo de fútbol de Break Point iluminado" />

// ❌ Wrong — missing slot and alt
<VenueImage />
```

**'use client' — verify before adding:**
Before adding `'use client'` to any component, check:
1. Uses `useState`, `useEffect`, `useRef`? → OK
2. Uses browser APIs (`window`, `document`)? → OK
3. Has event handlers at component root? → OK
4. Only needs animation? → Use `<AnimatedSection>`, do NOT add `'use client'`

### Enforcement Guidelines

**All AI agents MUST:**
- Read `AGENTS.md` completely before writing any line of code
- Read `config/site.ts` before coding any component with business data
- Verify `cn()` is used for ALL conditional classes
- Never import `motion` directly — always `<AnimatedSection>`
- Never use `useFormState` (removed in React 19) — always `useActionState` from `'react'`
- Never hardcode hex colors — always `@theme` tokens

**Critical anti-patterns:**
```tsx
// ❌ Direct motion import
import { motion } from 'framer-motion'
<motion.div animate={{ opacity: 1 }}>...</motion.div>

// ✅ AnimatedSection
<AnimatedSection delay={0.1}><div>...</div></AnimatedSection>

// ❌ Hardcoded color
<button style={{ backgroundColor: '#FF8A00' }}>

// ✅ Theme token
<button className="bg-cta">

// ❌ useFormState (React 18 — removed in React 19)
const [state, action] = useFormState(contactAction, initialState)

// ✅ useActionState (React 19)
import { useActionState } from 'react'
const [state, action, isPending] = useActionState(contactAction, initialState)

// ❌ Lucide barrel import
import * as Icons from 'lucide-react'

// ✅ Individual import
import { Phone, MapPin, Clock } from 'lucide-react'
```

## Project Structure & Boundaries

### Complete Project Directory Structure

```
break-point-web/
├── .github/
│   └── workflows/
│       └── ci.yml                    — 5 gates: tsc, lint, build, audit, playwright
├── .env.local                        — Never committed (gitignored)
├── .env.example                      — Template with required var names, no values
├── .gitignore
├── AGENTS.md                         — AI agent rules (non-negotiable)
├── BLUEPRINT.md                      — Sirius institutional architecture reference
├── next.config.ts                    — Static security headers (Blueprint §5.2)
├── proxy.ts                          — Replaces middleware.ts: CSP nonce + i18n routing
├── tsconfig.json                     — strict: true, paths: { "@/*": ["./*"] }
├── eslint.config.mjs                 — next/core-web-vitals + next/typescript
├── postcss.config.mjs                — @tailwindcss/postcss
├── pnpm-lock.yaml                    — Committed, never gitignored
├── package.json
│
├── app/
│   ├── globals.css                   — @theme tokens ONLY (colors, fonts, spacing, breakpoints)
│   ├── layout.tsx                    — Root: fonts, JSON-LD (Organization + SportsActivityLocation), Navbar, Footer
│   ├── page.tsx                      — Home / (Server Component) — FR1, FR6, FR14
│   ├── opengraph-image.tsx           — OG: field day + logo + tagline + address
│   ├── robots.ts                     — Allow GPTBot/ClaudeBot, block CCBot — FR26
│   ├── sitemap.ts                    — 3 ES pages + 3 EN pages — FR5
│   │
│   ├── cancha/
│   │   ├── page.tsx                  — La Cancha (Server Component) — FR7, FR8, FR11
│   │   └── opengraph-image.tsx       — OG: field night + pricing Bs 120/130
│   │
│   ├── eventos/
│   │   ├── page.tsx                  — Eventos (Server Component) — FR9, FR10, FR16
│   │   ├── event-contact-form.tsx    — 'use client': useActionState + Zod client validation
│   │   ├── actions.ts                — 'use server': rate limit → Zod → Resend — FR20, FR21
│   │   ├── schema.ts                 — Zod schema shared client + server
│   │   ├── schema.test.ts            — Vitest: phone regex, field validation
│   │   └── opengraph-image.tsx       — OG: field + salon + exclusivity message
│   │
│   └── en/
│       ├── layout.tsx                — EN metadata only (no <html>) — FR32
│       ├── page.tsx                  — EN Home (mirrors ES with EN metadata)
│       ├── cancha/
│       │   └── page.tsx
│       └── eventos/
│           └── page.tsx
│
├── components/
│   ├── brand/
│   │   └── Logo.tsx                  — SVG logo (Server) — FR33
│   │
│   ├── layout/
│   │   ├── Navbar.tsx                — 'use client': scroll glassmorphism — FR1, FR4
│   │   └── Footer.tsx                — Address, hours, phone, WhatsApp (Server) — FR3
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx           — Full-bleed field image + H1 + badge + CTA (Server)
│   │   ├── SegmentCards.tsx          — La Cancha / Eventos bifurcation (Server) — FR14
│   │   ├── AmenitiesGrid.tsx         — Icon + label grid on Anthracite bg (Server) — FR6
│   │   ├── HowItWorks.tsx            — 3-step booking process (Server) — FR10
│   │   ├── PricingBlock.tsx          — CVA variants: cancha | eventos (Server) — FR8, FR9
│   │   ├── GalleryGrid.tsx           — VenueImage grid (Server) — FR12
│   │   ├── FaqSection.tsx            — Accordion + FAQPage JSON-LD (Server) — FR13, FR25
│   │   └── LocationSection.tsx       — Maps iframe (conditional) + address (Server) — FR3
│   │
│   └── ui/
│       ├── AnimatedSection.tsx       — LazyMotion + domAnimation wrapper ('use client')
│       ├── WhatsAppButton.tsx        — CVA variants: floating | inline ('use client') — FR15
│       ├── AvailabilityBadge.tsx     — Green dot + "Disponible hoy" (Server) — FR11
│       └── VenueImage.tsx            — next/image wrapper, slot prop (Server) — FR12, FR28
│
├── config/
│   └── site.ts                       — Typed namespaces: brand, contact, pricing,
│                                        whatsapp, seo — PriceValue = number | 'TBD'
│
├── lib/
│   ├── utils.ts                      — cn() = clsx + tailwind-merge
│   ├── utils.test.ts                 — Vitest: cn() class merging
│   ├── seo.ts                        — generateMetadata() factory — FR23, FR24
│   ├── seo.test.ts                   — Vitest: metadata generation
│   ├── rate-limit.ts                 — contactLimiter: 5 req/hr/IP (Upstash) — FR21
│   └── rate-limit.test.ts            — Vitest: limiter config
│
├── e2e/
│   ├── home.spec.ts                  — Home loads, WhatsApp button visible on mobile
│   ├── cancha.spec.ts                — La Cancha pricing visible (Bs 120/130)
│   └── eventos.spec.ts               — Form success + inline field errors
│
└── public/
    ├── llms.txt                      — AI crawler map — FR27
    ├── og-image.png                  — Fallback OG (1200×630px) — FR23
    ├── images/                       — WebP only, <500KB each — FR12, FR30
    │   └── .gitkeep
    ├── brand/
    │   └── logo.svg
    └── .well-known/
        └── security.txt              — RFC 9116 security disclosure
```

### Architectural Boundaries

**Client/Server boundary:**
```
Server (SSG/RSC)                │  Client ('use client')
────────────────────────────────────────────────────────
app/layout.tsx                  │  components/layout/Navbar.tsx
app/page.tsx                    │  components/ui/WhatsAppButton.tsx
app/cancha/page.tsx             │  components/ui/AnimatedSection.tsx
app/eventos/page.tsx            │  app/eventos/event-contact-form.tsx
All components/sections/*       │
components/ui/VenueImage.tsx    │
components/ui/AvailabilityBadge │
```

**Data boundary — config/site.ts:**
```
config/site.ts (static, typed)
  └── All components read from here via import
  └── No component holds business data as inline constants
  └── Changes propagate everywhere at compile time
```

**Form data boundary — Eventos only:**
```
Browser input
  → event-contact-form.tsx (Zod client — UX feedback)
      → actions.ts (Server Action)
            → Upstash rate limit (first — blocks spam)
            → Zod server validation (security gate)
            → Resend email to owner
            → ActionResult → useActionState → UI state
```

**i18n boundary — proxy.ts (Edge Runtime):**
```
Request URL
  └── proxy.ts
        ├── Detects /en/ prefix → sets x-next-locale: en
        ├── Default → sets x-next-locale: es
        ├── Generates CSP nonce per request
        └── Forwards to Next.js router
```

### Requirements to Structure Mapping

| FR Category | Primary files |
|---|---|
| Navigation & structure (FR1–5) | `Navbar.tsx`, `Footer.tsx`, `sitemap.ts`, `robots.ts` |
| Content display (FR6–14) | `components/sections/*.tsx`, `config/site.ts` |
| Lead capture (FR15–19) | `WhatsAppButton.tsx`, `event-contact-form.tsx` |
| Owner notifications (FR20–22) | `actions.ts`, `rate-limit.ts`, `config/site.ts` |
| SEO & AEO (FR23–27) | `lib/seo.ts`, `robots.ts`, `sitemap.ts`, `llms.txt`, `layout.tsx` JSON-LD |
| Performance & media (FR28–30) | `VenueImage.tsx`, `HeroSection.tsx` (`priority` image) |
| Localization (FR31–33) | `proxy.ts`, `app/en/`, `config/site.ts` |

### Integration Points

**External services:**

| Service | Integration point | Direction |
|---|---|---|
| Resend | `app/eventos/actions.ts` | Outbound — email to owner |
| Upstash Redis | `lib/rate-limit.ts` → `actions.ts` | Outbound — atomic counter |
| WhatsApp (wa.me) | `components/ui/WhatsAppButton.tsx` | Outbound — deep link |
| Google Maps | `components/sections/LocationSection.tsx` | Embedded iframe (conditional) |
| Google Fonts | `app/layout.tsx` via `next/font/google` | Build-time — zero runtime |
| Vercel | `proxy.ts` (Edge) + page routes (Node.js) | Deploy target |

**Data flow — contact form:**
```
Visitor fills form
  → Zod client validation (immediate inline feedback)
  → Server Action called
  → Upstash: rate limit check (5/hr/IP)
  → Zod server validation
  → Resend: email to owner with all fields
  → ActionResult returned
  → UI: success banner + WhatsApp suggestion
      OR error banner / inline field errors
```

**Data flow — static pages:**
```
Build time:
  → Next.js SSG generates HTML from Server Components
  → config/site.ts values baked in at build
  → next/image generates WebP variants + blur placeholders
  → JSON-LD schemas embedded in layout.tsx
Runtime:
  → Served from Vercel CDN edge (zero server compute)
  → proxy.ts Edge Function runs for CSP nonce + i18n only
```

### Development Workflow

```bash
# Local dev
pnpm dev                    # Turbopack default (Next.js 16)

# CI gates (in order)
pnpm tsc --noEmit           # Gate 1: type safety
pnpm lint                   # Gate 2: code style
pnpm build                  # Gate 3: production build
pnpm audit --audit-level=high || true   # Gate 4: CVE (non-blocking)
pnpm test:e2e               # Gate 5: Playwright smoke tests

# Unit tests (local + CI)
pnpm test                   # Vitest: lib/ + schema.ts
```

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
All technology choices verified compatible: Next.js 16.2.4 + React 19.2.4 +
Tailwind v4 + Zod + @upstash/ratelimit + Resend SDK v6. No version conflicts.
Turbopack is the default bundler in Next.js 16 — no flag required (verified).

**Pattern Consistency:**
- `useActionState` from `'react'` (not `react-dom`) — React 19 confirmed
- `proxy.ts` replaces `middleware.ts` — Next.js 16 confirmed
- `@theme` block without `tailwind.config.js` — Tailwind v4 confirmed
- `<AnimatedSection>` wrapper pattern — no direct motion imports enforced
- All brand strings via `config/site.ts` — zero hardcoding enforced

**Structure Alignment:**
Project structure directly reflects architectural decisions: Server Components
in `sections/`, `'use client'` isolated to 3 components, `actions.ts`
co-located with route, Zod schema shared between client and server via `schema.ts`.

### Requirements Coverage Validation ✅

**Functional Requirements: 33/33 covered**
All FR categories mapped to specific files in Project Structure section.

**Non-Functional Requirements:**
- NFR-P1–P6 (Performance): `next/image priority` + WebP + blur placeholders +
  SSG for static pages + Server Components by default
- NFR-S1–S8 (Security): CSP nonce in `proxy.ts` + rate limiting + Zod server
  validation + env vars in Vercel Dashboard only + HTTPS via Vercel
- NFR-A1–A7 (Accessibility): WCAG AA via `@theme` contrast ratios + semantic
  HTML + aria labels + `prefers-reduced-motion` in `<AnimatedSection>`
- NFR-SC1–SC4 (Scalability): SSG for Home + La Cancha at Vercel CDN edge;
  Eventos Server Action capped by Upstash rate limiter

### Gap Analysis & Resolutions

**Important gaps resolved in this section:**

#### Interface: config/site.ts (complete TypeScript contract)

```ts
export type PriceValue = number | 'TBD'

export type SiteConfig = {
  brand: {
    name:    string   // "Break Point"
    tagline: string   // "Juega. Celebra. Disfruta."
    locale:  string   // "es_BO"
  }
  contact: {
    phone:   string   // "+59170690685"
    address: string   // Full address string
    hours:   string   // "08:00 – 22:00"
    mapsUrl: string   // Google Maps Place URL or generic search fallback
  }
  pricing: {
    cancha: {
      day:   PriceValue   // 120
      night: PriceValue   // 130
    }
    venue: {
      hourly:   PriceValue   // 250
      minHours: number       // 3
      extra:    PriceValue   // 'TBD' — hour 4+ rate pending owner confirmation
    }
    birthday: {
      fixed: PriceValue   // 'TBD'
      hours: PriceValue   // 'TBD'
    }
    deposit: {
      cancha:  string   // "% a confirmar"
      eventos: string   // "50%"
    }
  }
  whatsapp: {
    phone: string   // "59170690685" (no + for wa.me links)
    messages: {
      home:    string
      cancha:  string
      eventos: string
      share:   string   // LocationSection share button
    }
  }
  seo: {
    metadataBase:       string   // "https://breakpointlapaz.com" (TBD)
    defaultTitle:       string
    defaultDescription: string
    ogImage:            string   // "/og-image.png"
  }
}

export const siteConfig: SiteConfig = { ... }
```

#### Interface: lib/seo.ts (generateMetadata contract)

```ts
import type { Metadata } from 'next'

type MetadataParams = {
  title:       string
  description: string
  path:        string        // e.g. '/cancha'
  locale?:     'es' | 'en'  // defaults to 'es'
  noIndex?:    boolean       // defaults to false
}

export function generateMetadata(params: MetadataParams): Metadata
// Returns: title, description, openGraph, twitter,
//          alternates.languages (es + en hreflang),
//          canonical URL, robots directive
```

**Minor gaps (deferred — non-blocking):**
- `llms.txt` content: draft after professional photography arrives
- FAQ questions: defined during content writing (Home page section)
- `security.txt` expiry: set to 1 year from launch date
- `siteConfig.seo.metadataBase`: pending domain confirmation from owner

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] 33 Functional Requirements analyzed and categorized
- [x] 8 NFR groups addressed (Performance, Security, Accessibility, Scalability)
- [x] Scale assessed: Low–Medium complexity, 1 active endpoint
- [x] 6 cross-cutting concerns mapped

**✅ Architectural Decisions**
- [x] 5 ADRs documented with rationale and rejected alternatives
- [x] 4 open decisions resolved collaboratively (Zod, Testing, OG Image, Font subsets)
- [x] Technology stack fully specified with verified versions
- [x] Implementation sequence defined (12 steps)

**✅ Implementation Patterns**
- [x] 8 conflict points identified and addressed
- [x] Naming conventions: components, files, functions, tests
- [x] Structure patterns: file location rules
- [x] Format patterns: `ActionResult` type, error messages, Zod mapping
- [x] Communication patterns: props vs config, `<AnimatedSection>`, WhatsApp links
- [x] Process patterns: loading state, `next/image` sizes, `'use client'` checklist
- [x] Critical anti-patterns documented with ✅/❌ examples

**✅ Project Structure**
- [x] Complete directory tree with all files (45+ files defined)
- [x] Client/Server boundary explicitly mapped
- [x] All 7 FR categories mapped to specific files
- [x] All 6 external integration points defined
- [x] Data flows documented (form + static pages)

**✅ TypeScript Contracts**
- [x] `SiteConfig` interface with `PriceValue = number | 'TBD'`
- [x] `ActionResult` discriminated union type
- [x] `generateMetadata()` parameter and return contract
- [x] `VenueImage` slot types: `'hero' | 'gallery' | 'card'`

### Architecture Readiness Assessment

**Overall Status: READY FOR IMPLEMENTATION**

**Confidence Level: High**
- Blueprint mandates the stack — zero ambiguity on technology choices
- All 33 FRs have a designated file
- ADRs document the non-obvious decisions with rationale
- TypeScript contracts defined for the two most-used shared interfaces
- Implementation sequence provides a clear starting point

**Key Strengths:**
- Zero database eliminates the largest source of architectural complexity
- SSG for 2/3 pages means near-zero operational concern at V1 traffic levels
- `config/site.ts` as single source of truth prevents drift between components
- Zod schema shared between client and server — one definition, two validation gates
- `PriceValue = number | 'TBD'` allows launch without blocking on owner confirmations

**Areas for V2 Enhancement:**
- Google Calendar iframe → `<AvailabilityGrid>` with API (V1.5)
- Vercel Analytics activation (`analytics_enabled` flag)
- Professional photography swap (zero code change — replace `public/images/`)
- Booking calendar with WhatsApp pre-fill (trigger: 3+ bookings/month from site)

### Implementation Handoff

**First story: Foundation setup**
1. Create folder structure per Project Structure section
2. Implement `config/site.ts` with `SiteConfig` interface
3. Implement `app/globals.css` `@theme` block (Warm Industrial tokens)
4. Implement `lib/utils.ts` (`cn`), `lib/seo.ts` (`generateMetadata`), `lib/rate-limit.ts`
5. Implement `proxy.ts` (CSP nonce + i18n routing)
6. Implement `next.config.ts` (static security headers per Blueprint §5.2)

**Reference priority for dev agents:**
1. `AGENTS.md` — absolute rules (non-negotiable)
2. This architecture document — all decisions and contracts
3. `BLUEPRINT.md` §2.2 — folder structure canonical reference
4. UX Design Specification — component behavior and design tokens
5. PRD — functional requirements per page
