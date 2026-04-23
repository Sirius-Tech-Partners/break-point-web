<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Break Point Web — Sirius Tech Partners

## Active stack
- Next.js 16.2.4 — App Router only, no Pages Router
- React 19.2.4 — `useActionState` comes from `'react'`, not from `react-dom`
- TypeScript strict mode — all code, variables and comments in English
- Tailwind v4 — tokens in `@theme` block inside `app/globals.css`, no `tailwind.config.js`
- pnpm 9 — always `--frozen-lockfile` in CI

## Active tier: Starter
- `cms_enabled: false` — do NOT scaffold CMS components
- `analytics_enabled: false` — do NOT integrate heatmaps or external analytics
- `ai_agent_enabled: false` — do NOT scaffold chat widget yet

## Absolute rules — never violate
- NO `middleware.ts` — use `proxy.ts` at the repo root instead
- NO direct `motion` imports — use `<AnimatedSection>` wrapper component
- NO hardcoded hex colors inline — always use `@theme` variables from `globals.css`
- NO `console.log` with personal data (name, email, phone)
- NO `useFormState` — removed in React 19, use `useActionState` from `'react'`
- NO `WidthType.PERCENTAGE` in tables — always use `WidthType.DXA`

## Code conventions
- `'use client'` only when: state hooks, browser APIs, or root-level event handlers
- Internal imports always use `@/` alias — never relative paths like `../../`
- Lucide: always import individually → `import { Globe } from 'lucide-react'`
- Conditional classes: always `cn()` from `lib/utils.ts`, never string concatenation
- Component variants: always CVA (`class-variance-authority`)
- All brand strings come from `config/site.ts`, never hardcoded

## Animation rules
- Never import `motion` or `LazyMotion` directly in pages or section components
- Always use `<AnimatedSection>` to animate sections (props: `delay`, `yOffset`, `duration`)
- Custom animations: register in `@theme` as `--animate-*`, consume as `animate-*` utility class

## Data flow patterns
- Forms: `page.tsx` (Server) → `[feature]-form.tsx` ('use client') → `useActionState` → `actions.ts` ('use server')
- API routes: validate env vars first → parse body → call external service → `NextResponse.json()`
- Resend: always check `{ error }` before calling `.send()` — the SDK does not throw exceptions
- Rate limiting: always first in API routes, before any business logic

## BMAD documentation structure
- Sharded PRD: `docs/prd/`
- Sharded architecture: `docs/architecture/`
- Active stories: `docs/stories/`
- Brief and brainstorming outputs: `docs/`
- Files in `docs/architecture/` (coding-standards, tech-stack, source-tree) are always loaded by the dev agent