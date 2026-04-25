# Tech Stack — Break Point Web

## Active Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js App Router | 16.2.4 |
| UI Library | React | 19.2.4 |
| Language | TypeScript strict | ^5 |
| Styling | Tailwind CSS v4 | ^4 |
| Package manager | pnpm | 9 |
| Deployment | Vercel | — |

## Dependencies

### Runtime
- `next` 16.2.4
- `react` / `react-dom` 19.2.4
- `framer-motion` ^12 — via `<AnimatedSection>` only, never direct imports
- `clsx` ^2 + `tailwind-merge` ^3 — via `cn()` from `lib/utils.ts`
- `class-variance-authority` ^0.7 — CVA for component variants
- `lucide-react` ^0.577 — always individual imports
- `resend` ^6 — does NOT throw, always guard `{ error }` before `.send()`
- `@upstash/ratelimit` ^2.0.8 + `@upstash/redis` ^1.37
- `@base-ui/react` ^1.4

### Dev
- `@playwright/test` ^1.59
- `typescript` ^5
- `eslint` + `eslint-config-next` 16.2.4
- `tailwindcss` ^4 + `@tailwindcss/postcss` ^4
- `shadcn` ^4.4 (CLI only — never imported at runtime)

## Environment Variables (required)

```
RESEND_API_KEY              — Resend email delivery
CONTACT_RECEIVER_EMAIL      — Owner notification address
UPSTASH_REDIS_REST_URL      — Upstash Redis endpoint
UPSTASH_REDIS_REST_TOKEN    — Upstash Redis auth token
```

## Key Architectural Decisions (ADRs)

### ADR-001 — Server Actions over API Routes
- Forms use React 19 Server Actions (`useActionState` from `'react'`)
- Rate limiting via `headers()` in Server Action
- Rejected: API route (more boilerplate), full `'use client'` page (destroys LCP)

### ADR-002 — Google Maps URL Pending
- `mapsUrl` in `config/site.ts` with `'#'` fallback
- `<LocationSection>` renders address always + iframe only when mapsUrl ≠ `'#'`

### ADR-003 — i18n Scaffold from Day 1
- `app/en/` subtree scaffolded from day 1
- Valid hreflang via `lib/seo.ts` alternates on all pages
- Rejected: no EN scaffold (broken hreflang = SEO penalty)

### ADR-004 — config/site.ts as Single Source of Truth
- Typed with namespaces: `brand` · `contact` · `pricing` · `whatsapp` · `seo`
- `PriceValue = number | 'TBD'` for pending owner confirmations
- Rejected: flat object (no type safety), split files (premature)

### ADR-005 — VenueImage Placeholder Strategy
- `<VenueImage slot="hero"|"gallery"|"card">` — TypeScript enforces `alt` + `slot`
- Without `src`: `--color-surface-low` bg + camera icon placeholder
- With `src`: `next/image` fill + `placeholder="blur"`

## Implementation Sequence

1. `proxy.ts` + `next.config.ts` — security foundation
2. `config/site.ts` — everything depends on this ✅ done
3. `app/globals.css` `@theme` tokens — design system ✅ done
4. `lib/utils.ts` + `lib/seo.ts` + `lib/rate-limit.ts` — utilities
5. Core components: `<Navbar>`, `<Footer>`, `<WhatsAppButton>`, `<AnimatedSection>`
6. Home page — static, validates full stack end-to-end
7. La Cancha page — static, validates image strategy
8. Eventos page — Server Action + Zod + Resend + Upstash
9. `app/en/` scaffold — hreflang valid from launch
10. SEO: `llms.txt`, `robots.ts`, `sitemap.ts`, JSON-LD schemas
11. OG images (`next/og`) — one per page
12. Playwright + Vitest test suite
