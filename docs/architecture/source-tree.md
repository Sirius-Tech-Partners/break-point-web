# Source Tree — Break Point Web

```
break-point-web/
│
├── proxy.ts                          — Edge Runtime: CSP nonce + i18n routing (replaces middleware.ts)
├── next.config.ts                    — Static security headers, image domains
├── .env.example                      — Required env var template (no real values)
│
├── app/
│   ├── globals.css                   — @theme tokens (Warm Industrial design system)
│   ├── layout.tsx                    — Root layout: fonts, JSON-LD schemas, skip link
│   ├── page.tsx                      — Home page (SSG)
│   ├── opengraph-image.tsx           — OG image via next/og (Edge Runtime)
│   ├── robots.ts                     — Robots directive
│   ├── sitemap.ts                    — XML sitemap
│   │
│   ├── cancha/
│   │   ├── page.tsx                  — La Cancha page (SSG)
│   │   └── opengraph-image.tsx
│   │
│   ├── eventos/
│   │   ├── page.tsx                  — Eventos page (Server Component shell)
│   │   ├── actions.ts                — 'use server': Zod → Resend → Upstash
│   │   ├── schema.ts                 — Zod schema (shared client + server)
│   │   ├── event-contact-form.tsx    — 'use client': useActionState form
│   │   └── opengraph-image.tsx
│   │
│   └── en/                           — English subtree (ADR-003 — hreflang from day 1)
│       ├── layout.tsx
│       ├── page.tsx
│       ├── cancha/page.tsx
│       └── eventos/page.tsx
│
├── components/
│   ├── brand/
│   │   └── Logo.tsx
│   ├── layout/
│   │   ├── Navbar.tsx                — Glassmorphism after 60px scroll; mobile: logo+WA only
│   │   └── Footer.tsx                — Address, hours, social icons
│   ├── sections/
│   │   ├── HeroSection.tsx           — Full-bleed hero, variants: day | night
│   │   ├── SegmentCards.tsx          — 2-card bifurcation: La Cancha / Eventos
│   │   ├── AmenitiesGrid.tsx         — 6 amenities on Anthracite background
│   │   ├── PricingBlock.tsx          — variants: cancha | eventos
│   │   ├── HowItWorks.tsx            — 3 steps, variants: cancha | eventos
│   │   ├── LocationSection.tsx       — Google Maps iframe + address block
│   │   ├── FaqSection.tsx            — Accordion FAQ
│   │   ├── GalleryGrid.tsx           — 4-6 VenueImage placeholders
│   │   └── AvailabilityBadge.tsx     — Green dot + "Disponible hoy"
│   └── ui/
│       ├── WhatsAppButton.tsx        — CVA variants: floating | inline
│       ├── AnimatedSection.tsx       — LazyMotion wrapper, respects prefers-reduced-motion
│       └── VenueImage.tsx            — next/image wrapper, slot prop: hero|gallery|card
│
├── config/
│   └── site.ts                       — SiteConfig + PriceValue (single source of truth) ✅
│
├── lib/
│   ├── utils.ts                      — cn() = clsx + tailwind-merge ✅
│   ├── utils.test.ts                 — Vitest unit tests
│   ├── seo.ts                        — generateMetadata() factory
│   ├── seo.test.ts
│   ├── rate-limit.ts                 — contactLimiter (5 req/hr/IP via Upstash)
│   └── rate-limit.test.ts
│
├── e2e/
│   └── smoke.spec.ts                 — Playwright E2E smoke tests ✅ (1/5 — home only)
│
├── public/
│   ├── images/                       — Venue photos (drop-in, no code changes needed)
│   ├── brand/                        — Logo assets
│   ├── llms.txt                      — AI crawler description
│   └── .well-known/
│       └── security.txt              — RFC 9116 security disclosure
│
├── docs/
│   ├── architecture/
│   │   ├── tech-stack.md             ✅ recreated
│   │   ├── coding-standards.md       ✅ recreated
│   │   └── source-tree.md            ✅ this file
│   ├── prd/                          — PRD shards (to be recreated)
│   └── stories/                      — Active story files
│
└── .github/
    └── workflows/
        └── ci.yml                    — 5 gates: tsc → lint → build → audit → playwright ✅
```

## Dependency Graph (what depends on what)

```
config/site.ts → ALL components (brand strings, pricing, WhatsApp messages)
app/globals.css @theme → ALL styled components
lib/utils.ts (cn) → ALL components with conditional classes
proxy.ts → CSP nonce → app/layout.tsx JSON-LD scripts
Zod schema (schema.ts) → event-contact-form.tsx + actions.ts
lib/rate-limit.ts → actions.ts
```

## ✅ = Already implemented
