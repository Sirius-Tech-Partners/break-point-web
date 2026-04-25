# Coding Standards — Break Point Web

## Absolute Rules (from AGENTS.md — never violate)

- NO `middleware.ts` — use `proxy.ts` at repo root instead
- NO direct `motion` imports — use `<AnimatedSection>` wrapper
- NO hardcoded hex colors — always use `@theme` variables from `globals.css`
- NO `console.log` with personal data (name, email, phone)
- NO `useFormState` — removed in React 19, use `useActionState` from `'react'`
- NO `WidthType.PERCENTAGE` in tables — always `WidthType.DXA`

## File & Component Conventions

### 'use client' only when:
- State hooks (`useState`, `useReducer`, `useActionState`)
- Browser APIs (`window`, `document`, `localStorage`)
- Root-level event handlers

### Imports
- Internal: always `@/` alias — never `../../`
- Lucide: always individual → `import { Globe } from 'lucide-react'`

### Conditional classes
- Always `cn()` from `lib/utils.ts` — never string concatenation

### Component variants
- Always CVA (`class-variance-authority`)

### Brand strings
- Always from `config/site.ts` — never hardcoded

## Naming Conventions

### Files
- Pages: `page.tsx` (Next.js convention)
- Server Actions: `actions.ts` co-located with route
- Form client components: `[feature]-form.tsx` (e.g. `event-contact-form.tsx`)
- Zod schema: `schema.ts` inside route directory

### Code
- camelCase: functions and variables (`contactAction`, `siteConfig`)
- PascalCase: components and types (`WhatsAppButton`, `PriceValue`, `VenueSlot`)
- `handle` prefix: event handlers (`handleSubmit`, `handleScroll`)
- No abbreviations: `whatsappMessage` not `waMsg`, `eventType` not `evtType`

## Data Flow Patterns

### Forms
```
page.tsx (Server) → [feature]-form.tsx ('use client') → useActionState → actions.ts ('use server')
```

### API routes
```
validate env vars → parse body → call external service → NextResponse.json()
```

### Resend
```ts
const { error } = await resend.emails.send(...)
if (error) { /* handle */ }
// SDK does NOT throw — always guard
```

### Rate limiting
- Always first in Server Actions, before any business logic

## TypeScript Contracts

### ActionResult (Server Action return type)
```ts
type ActionResult =
  | { success: true; message: string }
  | { error: 'rate_limit' | 'validation' | 'server' | 'config' }
  | { errors: Record<string, string[]> }
```

### Zod phone validation (Bolivian mobile)
```ts
/^(\+?591)?[67]\d{7}$/
```

### PriceValue
```ts
type PriceValue = number | 'TBD'
```

## CSS & Tailwind Rules

- All tokens in `@theme` block in `app/globals.css` — no `tailwind.config.js`
- Always `cn()` for conditional classes
- Never hardcode hex values in component files
- Breakpoints: 375 / 768 / 1024 / 1280 / 1440px (defined in `@theme`)

## Animation Rules

- Never import `motion` or `LazyMotion` directly in pages or sections
- Always use `<AnimatedSection>` to animate sections
- Props: `delay`, `yOffset` (default 24px), `duration` (default 0.5s)
- Respects `prefers-reduced-motion`
- Never nest `<AnimatedSection>` inside another
- Delay increments: 0, 0.1, 0.2, 0.3 — never exceed 0.4 on one page

## Security Rules

- Rate limiting always first in Server Actions
- No PII in `console.log` (names, emails, phones)
- All secrets via environment variables — never in source
- Server-side validation before any external call
- Generic error messages to users — no technical details exposed
