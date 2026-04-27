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

### Zod v4 Patterns (this project uses zod ≥ 4.0.0)

Zod v4 has breaking changes vs v3. Use these patterns:

```ts
// Empty string → undefined (optional number fields from FormData)
// ✅ Correct (v4)
z.preprocess(v => v === '' ? undefined : v, z.coerce.number().int().min(1).optional())
// ❌ Wrong (v3 pattern, broken in v4)
z.coerce.number().int().min(1).optional().or(z.literal(''))

// Enum error message
// ✅ Correct (v4)
z.enum(['a', 'b'], { error: 'Seleccioná una opción' })
// ❌ Wrong (v3 pattern)
z.enum(['a', 'b']).refine(..., { message: '...' })
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

### Tailwind v4 Spacing Token Conflict (CRITICAL)

`--spacing-xl`, `--spacing-lg`, `--spacing-sm`, etc. are defined in `@theme`. In Tailwind v4, `--spacing-*` tokens override the named size scale. This means:
- `max-w-xl` → 80px (our token), NOT 576px (Tailwind default)
- `max-w-lg`, `max-w-sm`, etc. are similarly affected

**Rule:** Never use named size classes for max-width, height, or width in this project. Always use explicit pixel values:
```tsx
// ❌ Wrong
<div className="max-w-xl">

// ✅ Correct
<div className="max-w-[576px]">  // or whatever px value is needed
```

## Animation Rules

- Never import `motion` or `LazyMotion` directly in pages or sections
- Always use `<AnimatedSection>` to animate sections
- Props: `delay`, `yOffset` (default 24px), `duration` (default 0.5s)
- Respects `prefers-reduced-motion`
- Never nest `<AnimatedSection>` inside another
- Delay increments: 0, 0.1, 0.2, 0.3 — never exceed 0.4 on one page

## Form Validation Rules

- Always use `noValidate` on forms that use Server Actions — disables browser native validation in favor of Zod
- **`noValidate` is only valid when the Server Action actively runs Zod `safeParse`**
- A stub action that returns `null` without calling the schema leaves the form with zero validation — never do this
- Correct pattern for partial implementations (e.g. validate now, send email in next story):
  ```ts
  const result = contactSchema.safeParse(Object.fromEntries(formData))
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors as Record<string, string[]> }
  }
  return null // next story adds email sending here
  ```
- Separation of concerns in multi-story forms:
  - Story N = **validates** (Zod safeParse → `{ errors }`)
  - Story N+1 = **sends** (rate limit → external API → `{ success }`)

## Security Rules

- Rate limiting always first in Server Actions
- No PII in `console.log` (names, emails, phones)
- All secrets via environment variables — never in source
- Server-side validation before any external call
- Generic error messages to users — no technical details exposed
