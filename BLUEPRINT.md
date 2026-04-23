# Sirius Tech Partners — Project Blueprint v1.0

> **Greenfield Scaffolding Specification — Institutional Architecture Reference**
> Confidential · Engineering Division · La Paz, Bolivia · 2026
>
> **How to use this document:**
> - For Claude Code: place this file at the repo root as `BLUEPRINT.md`. Claude Code reads it automatically as project context.
> - For Notion: import via "Import → Markdown & CSV".
> - For new projects: read completely before writing a single line of code. Every architectural decision here has a reason. Deviating requires explicit CTO approval and must be documented in the project's `AGENTS.md`.

---

## Table of Contents

1. [Core Tech Stack](#1-core-tech-stack)
2. [System Design & Patterns](#2-system-design--patterns)
3. [UI/UX Framework](#3-uiux-framework)
4. [Infrastructure & CI/CD Pipeline](#4-infrastructure--cicd-pipeline)
5. [Security Protocol](#5-security-protocol)
6. [Agentic Integration](#6-agentic-integration)
7. [Dependency Baseline](#7-dependency-baseline-packagejson)
8. [CLI Setup Guide](#8-cli-setup-guide)
9. [Coding Rules (Non-Negotiable)](#9-coding-rules-non-negotiable)
10. [SEO & LLM Optimization (AEO)](#10-seo--llm-optimization-aeo)
11. [Business Model & Tier Architecture](#11-business-model--tier-architecture)

---

## 1. Core Tech Stack

Every Sirius project starts from this exact dependency baseline, reverse-engineered from the production website and codified as the institutional standard. Deviating from these versions requires explicit CTO approval and must be documented in the project's `AGENTS.md`.

### 1.1 Runtime & Framework

| Package | Version | Notes |
|---|---|---|
| `next` | `16.2.0` | App Router only. No Pages Router. `middleware.ts` is deprecated — use `proxy.ts`. |
| `react` | `19.2.4` | Concurrent features enabled. `useActionState` from `react` (not `react-dom`). |
| `react-dom` | `19.2.4` | `useFormStatus` still lives here. Not in `react`. |
| `typescript` | `^5` | Strict mode mandatory. All code and variable names in English. |
| `node` | `20.x (LTS)` | Matches GitHub Actions runner. Never pin below 20. |

> **⚠ Breaking change from React 18:** `useFormState` is removed in React 19. Use `useActionState` from `'react'`. This is non-negotiable.

### 1.2 Styling

| Package | Version | Notes |
|---|---|---|
| `tailwindcss` | `^4` | No `tailwind.config.js`. All tokens live in `@theme` block in `globals.css`. |
| `tw-animate-css` | `^1.4.0` | Animation utility classes. Import after `tailwindcss` in `globals.css`. |
| `shadcn/tailwind.css` | — | Component base styles. Import third in `globals.css`. |

### 1.3 UI Components

| Package | Version | Notes |
|---|---|---|
| `@base-ui/react` | `^1.3.0` | Headless primitives (Button, Separator, etc.). Requires `'use client'` on wrappers. |
| `shadcn` | `^4.1.2` | **devDependency only** — CLI tool, never import at runtime. |
| `framer-motion` | `^12.38.0` | Always via `LazyMotion + domAnimation + m` — never import `motion` directly. |
| `lucide-react` | `^0.577.0` | Tree-shaken. Always import individually: `import { Globe } from 'lucide-react'`. |
| `class-variance-authority` | `^0.7.1` | CVA for variant management in UI primitives. |
| `clsx` | `latest` | Combined with `tailwind-merge` via `cn()` in `lib/utils.ts`. |
| `tailwind-merge` | `latest` | Resolves conflicting Tailwind classes. Always use `cn()`, never string concat. |

### 1.4 Integrations & Infrastructure

| Package | Version | Notes |
|---|---|---|
| `resend` | `^6.10.0` | SDK v2+. Returns `{ error }` — does **NOT** throw. Guard before calling `.send()`. |
| `next/font/google` | — | Loaded at build time. Zero runtime font requests. Zero layout shift. |
| `eslint` | `16.2.0` | `eslint-config-next`. Matches Next.js version exactly. |
| `pnpm` | `9` | Package manager. Lockfile must be committed. Use `--frozen-lockfile` in CI. |

---

## 2. System Design & Patterns

### 2.1 Rendering Strategy

The default is **Server Components**. `'use client'` is added only when a component explicitly requires:

- Browser APIs (`window`, `document`, `navigator`)
- React hooks with state (`useState`, `useEffect`, `useRef`)
- Event handlers attached at the component root
- Third-party libraries that access the DOM (e.g. Framer Motion's `motion.*`)

If a section only needs animation, wrap it in `<AnimatedSection>` and keep the section itself as a Server Component. This preserves SSR benefits while containing the client boundary.

### 2.2 Folder Architecture (Canonical)

```
/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root: fonts, JSON-LD, Navbar, Footer
│   ├── page.tsx                  # Home (ES default)
│   ├── globals.css               # @theme tokens + keyframes
│   ├── robots.ts                 # Robots meta + AI crawler policy
│   ├── sitemap.ts                # Sitemap generation
│   ├── en/                       # English sub-tree
│   │   ├── layout.tsx            # EN metadata (no <html> — root owns it)
│   │   └── page.tsx
│   ├── [route]/
│   │   ├── page.tsx              # Server Component (layout + static content)
│   │   ├── [route]-form.tsx      # 'use client' — form + useActionState
│   │   └── actions.ts            # 'use server' — mutations
│   └── api/
│       └── [endpoint]/route.ts   # API routes (NextRequest/NextResponse)
│
├── components/
│   ├── brand/                    # Logo, decorative SVGs (Server)
│   ├── layout/                   # Navbar ('use client'), Footer (Server)
│   ├── sections/                 # Page sections — Server by default
│   └── ui/                       # Design system primitives
│
├── config/
│   ├── site.ts                   # SINGLE SOURCE OF TRUTH — brand + i18n dicts
│   └── pages.ts                  # Inner page copy (ES + EN)
│
├── lib/
│   ├── seo.ts                    # generateMetadata() factory
│   └── utils.ts                  # cn() = clsx + tailwind-merge
│
├── prompts/                      # AI agent system prompts (versioned markdown)
├── n8n/                          # n8n workflow JSON exports
├── public/
│   ├── llms.txt                  # AI crawler map (see §10.1)
│   ├── og-image.png              # 1200×630 exactly
│   ├── images/                   # WebP only, <500 KB each
│   └── brand/                    # SVG logo assets
│
├── proxy.ts                      # Replaces middleware.ts (Next.js 16)
├── next.config.ts                # Static security headers
└── .env.local                    # Never committed — see §6.4 for required vars
```

### 2.3 Data Flow Patterns

**Server Action Pattern** (contact forms, mutations):

```
page.tsx (Server Component)
  └── [feature]-form.tsx ('use client')
        └── useActionState(serverAction, initialState)
              └── actions.ts ('use server')
                    └── External API (Resend, n8n webhook, etc.)
```

**API Route Pattern** (chat widget, webhooks):

```
app/api/[endpoint]/route.ts
  ├── Validates env vars        → 503 if missing
  ├── Parses + validates body   → 400 if malformed
  ├── Calls upstream service
  └── Returns NextResponse.json()
```

### 2.4 i18n Strategy

Sub-path routing with no automatic redirects. `es` is the default locale at `/`. `en` lives under `/en/*`.

| Aspect | Implementation |
|---|---|
| Locale detection | `proxy.ts` reads first path segment. Sets `x-next-locale` header. |
| Layout binding | Root layout reads `x-next-locale` via `headers()`. Sets `<html lang>`. |
| Dictionary access | `import { dictionaries } from '@/config/site'`. Use locale key. |
| hreflang | `lib/seo.ts` generates `alternates.languages` for every page. |
| Adding a locale | 1) `SUPPORTED_LOCALES` in `proxy.ts` · 2) `Locale` type in `site.ts` · 3) Dict block · 4) `app/[locale]/` subtree |

### 2.5 SEO Standards

Every page must export metadata via `generateMetadata()` from `lib/seo.ts`. `metadataBase` is set **once only** in `app/layout.tsx`. Thank-you pages and admin routes must pass `noIndex: true`.

```ts
// Standard page metadata
export const metadata = generateMetadata({
  title: 'Services',
  path:  '/services',
  locale: 'es', // or read dynamically from x-next-locale header
});
```

---

## 3. UI/UX Framework

### 3.1 Brand Color Tokens

> **Color tokens are NOT defined in this Blueprint.** They are sourced from the project's dedicated **Design Tokens file**, maintained separately and versioned alongside the codebase as a companion input to this Blueprint.

**Format:** CSS custom properties inside a Tailwind v4 `@theme` block in `app/globals.css`. Tailwind auto-generates `bg-X`, `text-X`, `border-X`, `ring-X` utility classes from every `--color-X` token defined there.

**Rule:** Never hardcode hex values inline (`style={{ color: '#...' }}`). Always use the generated utility class. The only exception is hex strings concatenated for alpha overlays in config files (e.g. `'#XXXXXX18'`).

**Minimum required token slots** every project Design Tokens file must define:

| Token Slot | Value | Semantic Usage |
|---|---|---|
| `--color-brand-primary` | [from tokens file] | CTA buttons, links, active states |
| `--color-brand-secondary` | [from tokens file] | Hover states, gradients |
| `--color-brand-dark` | [from tokens file] | Page background, hero sections |
| `--color-brand-dark-alt` | [from tokens file] | Cards, panels, form backgrounds |
| `--color-brand-light` | [from tokens file] | Primary text on dark backgrounds |
| `--color-brand-gray` | [from tokens file] | Body text on white sections |
| `--color-brand-gray-dark` | [from tokens file] | Headings on white sections |
| `--color-brand-accent` | [from tokens file] | Highlights, stats, icon accents |

### 3.2 Typography System

> **Font families are NOT defined in this Blueprint.** They are specified in the project's Design Tokens file alongside the color palette.

The design tokens file defines:

```css
/* app/globals.css @theme block */
--font-display: var(--font-[client-heading-font]);  /* used via font-display class */
--font-sans:    var(--font-[client-body-font]);     /* used via font-sans class    */
```

**Loading strategy:** `next/font/google` (or `next/font/local` for custom fonts). Font variables are injected into `<html>` in `app/layout.tsx` and bound to `--font-display` / `--font-sans` in the `@theme` block.

**Constraints:**
- Zero external font requests at runtime
- Zero layout shift (CLS = 0)
- All fonts must be preloaded at build time via `next/font`

WCAG AA contrast ratios must be validated against the actual font + color combination in each project's tokens file. Minimum: **4.5:1** for body text, **3:1** for large headings (18px+ bold).

### 3.3 Animation System

Never import `motion` or `LazyMotion` directly in page-level components. Use `AnimatedSection`:

```tsx
// ✅ Correct — section stays Server Component
import { AnimatedSection } from '@/components/ui/animated-section';

export default function ServicesSection() {  // no 'use client'
  return (
    <AnimatedSection delay={0.1}>
      <h2>Our Services</h2>
    </AnimatedSection>
  );
}

// AnimatedSection props: yOffset=24, duration=0.6, delay=0, margin='-80px'
// Uses LazyMotion + domAnimation + m → ~18 KB gz vs ~34 KB gz for full motion import
```

Custom animations are registered in `@theme` as `--animate-*` tokens, then used as `animate-*` utility classes. No arbitrary values.

### 3.4 Component Authoring Rules

- `@base-ui/react` for headless primitives — button, separator, dialog
- CVA (`class-variance-authority`) for variant management in all UI primitives
- `cn()` from `lib/utils.ts` for all conditional class strings — never string concatenation
- `shadcn` CLI for scaffolding only — never import at runtime

### 3.5 Image Standards

| Rule | Standard |
|---|---|
| Format | WebP only in `/public/images/`. PNG only for `/public/og-image.png`. |
| Size limit | < 500 KB per image. Service cards: target 35–50 KB. |
| OG image | Exactly **1200×630 px**. |
| Usage | Always `next/image` with `fill` + `sizes` props. |
| SVGs | Complex SVGs → `/public/brand/`. Simple decorative → `components/brand/`. |

### 3.6 WCAG AA Contract

| Context | Minimum Standard |
|---|---|
| Body / content text | Minimum `/65` opacity on brand-light (4.5:1 ratio) |
| Labels, eyebrows | Minimum `/70` opacity on brand-light |
| Interactive elements | `text-brand-accent` — verify ratio vs project dark background in tokens file |
| Decorative (`aria-hidden`) | Exempt from contrast rules |

---

## 4. Infrastructure & CI/CD Pipeline

### 4.1 CI Pipeline (GitHub Actions)

Every pull request targeting `main` must pass all three gates before merge. No exceptions.

```yaml
# .github/workflows/ci.yml
name: CI
on:
  pull_request:
    branches: [main]

jobs:
  check:
    name: Type check, lint & build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: pnpm install --frozen-lockfile
      - run: pnpm tsc --noEmit          # Gate 1: Type safety
      - run: pnpm lint                  # Gate 2: Code style
      - run: pnpm build                 # Gate 3: Production build
        env:
          RESEND_API_KEY: dummy_resend_key
          NEXT_PUBLIC_CHAT_ENABLED: "false"
          N8N_CHAT_WEBHOOK_URL: https://example.com/webhook
      - run: pnpm audit --audit-level=high || true   # Gate 4: CVE audit (non-blocking)
```

> **CI env vars:** Dummy values for build-time vars that don't affect CI logic. Real values are set in Vercel Dashboard only — never in the CI file.

### 4.2 Package Manager Rules

| Rule | Standard |
|---|---|
| Package manager | `pnpm 9` — non-negotiable. Never `npm` or `yarn`. |
| Install in CI | `pnpm install --frozen-lockfile` — fails if lockfile is stale. |
| Lockfile | `pnpm-lock.yaml` must be committed. Never gitignored. |
| New dependency | `pnpm add [pkg]`. Commit both `package.json` and lockfile. |

### 4.3 Deployment (Vercel)

| Aspect | Standard |
|---|---|
| Platform | Vercel — automatic from `main` branch on merge. |
| Runtime | Edge Runtime for `proxy.ts`. Node.js Runtime for API routes. |
| Env vars | Set in Vercel Dashboard → Settings → Environment Variables. |
| `NEXT_PUBLIC_` prefix | Only for vars that must be browser-accessible. Never for secrets. |
| Preview deployments | Every PR gets a preview URL automatically. |

### 4.4 TypeScript Configuration

```jsonc
// tsconfig.json — minimum required settings
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 4.5 ESLint Configuration

```js
// eslint.config.mjs (flat config)
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

export default [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      'no-console': ['warn', { allow: ['error'] }],
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
];
```

---

## 5. Security Protocol

### 5.1 Dynamic CSP with Per-Request Nonce

Content Security Policy is **not** set in `next.config.ts` (static headers cannot embed a cryptographic nonce). It is generated per-request in `proxy.ts` and injected as a response header.

```ts
// proxy.ts — nonce generation + hardened CSP
const nonceBytes = new Uint8Array(16);
crypto.getRandomValues(nonceBytes);
const nonce = btoa(String.fromCharCode(...Array.from(nonceBytes)));

const isDev = process.env.NODE_ENV === 'development';

const csp = [
  "default-src 'self'",
  [
    "script-src 'self'",
    `'nonce-${nonce}'`,
    isDev ? "'unsafe-eval'" : '', // HMR only — never in production
    "https://vercel.live",
    "https://*.vercel-scripts.com",
  ].filter(Boolean).join(' '),
  "style-src 'self'",            // No unsafe-inline (see §5.6)
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://vitals.vercel-insights.com https://vercel.live",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join('; ');
```

> **⚠ `'unsafe-eval'`** is added only in development for HMR and React fast-refresh. It is **never** present in production.

### 5.2 Static Security Headers (`next.config.ts`)

| Header | Value |
|---|---|
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `Referrer-Policy` | `origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=(), usb=()` |

### 5.3 Inline Script Protection (JSON-LD)

Three defenses for inline `<script>` tags carrying structured data:

1. **Nonce attribute** — matches the per-request nonce from `x-nonce` header
2. **`suppressHydrationWarning`** — prevents React hydration mismatch (nonce changes per request)
3. **HTML escape** — `JSON.stringify(data).replace(/</g, '\u003c')` prevents `</script>` tag-breakout XSS

### 5.4 Server Action Security

| Rule | Implementation |
|---|---|
| API key guard | Check env var at top of action. Return error immediately if missing. |
| User input escaping | All user input rendered as HTML must be escaped: `.replace(/</g, '&lt;').replace(/>/g, '&gt;')` |
| PII logging | No `console.log` with name, email, or phone. `console.error` acceptable for error paths. |
| Server-only env vars | Never use `NEXT_PUBLIC_` prefix for secrets. |
| Debug mode | `CONTACT_DEBUG=1` exposes raw errors in UI. **Never enable in production.** |
| No dangerous patterns | No SQL interpolation. No `eval()`. No user input in shell commands. |

### 5.5 Subresource Integrity (SRI)

Any third-party script loaded via `<script src>` must include an `integrity` attribute. If the CDN delivers a modified file, the browser blocks execution before it reaches the JavaScript engine.

```ts
// next.config.ts — enable automatic SRI generation
const nextConfig = {
  experimental: {
    sri: { algorithm: 'sha256' },
  },
};

// For manually-added third-party scripts:
// 1. Compute hash: openssl dgst -sha256 -binary script.js | openssl base64 -A
// 2. Add to the <Script> tag:
// <Script src="https://cdn.example.com/lib.js"
//   integrity="sha256-[hash]"
//   crossOrigin="anonymous" />
```

### 5.6 Removing `unsafe-inline`

Both `script-src` and `style-src` are hardened. This is a two-phase migration:

| Phase | Directive | Steps |
|---|---|---|
| Phase 1 — script-src | Remove `'unsafe-inline'` | Confirm Next.js 16 nonce propagation to all hydration scripts via DevTools → Network → CSP. Zero violations required. |
| Phase 2 — style-src | Remove `'unsafe-inline'` | Audit all components for `style={{ ... }}` props. Migrate to Tailwind utility classes or CSS custom properties. |
| Validation | Both phases | Run `npx csp-evaluator --url https://[project-url]` to score the policy. |

The CSP template in §5.1 already reflects the **target state** (no `unsafe-inline` in either directive).

### 5.7 Explicit CSRF Validation in Server Actions

Next.js 16 validates the `Origin` header automatically for all Server Actions. For high-value actions (payment triggers, account mutations, admin operations), add an explicit secondary check:

```ts
// app/[feature]/actions.ts — explicit CSRF guard for high-value actions
'use server';
import { headers } from 'next/headers';

export async function sensitiveAction(formData: FormData) {
  const headersList = await headers();
  const origin = headersList.get('origin');
  const host   = headersList.get('host');

  if (!origin || !origin.endsWith(host ?? '')) {
    return { error: 'Invalid request origin' };
  }

  // ... proceed with action logic
}
```

> This guard is **mandatory** for any Server Action that: (a) triggers a financial transaction, (b) modifies user account data, or (c) is exposed in an admin panel. Public contact form actions are covered by Next.js built-in protection.

### 5.8 security.txt (RFC 9116)

```bash
# public/.well-known/security.txt
Contact: mailto:security@[project-domain]
Expires: [YYYY-MM-DD]T23:59:00.000Z
Preferred-Languages: es, en
Policy: https://[project-domain]/security-policy
Canonical: https://[project-domain]/.well-known/security.txt
```

| Field | Rule |
|---|---|
| `Contact` | Dedicated `security@` alias routing to the engineering lead. |
| `Expires` | Maximum 1 year from creation. Must be refreshed before expiry. |
| `Policy` | Link to a `/security-policy` page describing the disclosure process. |
| Validation | Paste URL at [securitytxt.org](https://securitytxt.org) to verify formatting. |

### 5.9 Dependency Auditing in CI

`pnpm audit` runs on every PR as a non-blocking warning. It surfaces known CVEs without failing the build.

```yaml
# Added to ci.yml after the build step (see §4.1)
- name: Dependency audit (non-blocking)
  run: pnpm audit --audit-level=high || true
  # Remove '|| true' for projects under compliance requirements (SOC 2, ISO 27001)
```

| Setting | Detail |
|---|---|
| Audit level | `--audit-level=high` — flags High and Critical CVEs only. Avoids Low/Moderate noise. |
| Non-blocking | `\|\| true` prevents CI failure. Promotes awareness without blocking shipping. |
| Hard block | Remove `\|\| true` for compliance-regulated projects. |
| Remediation | `pnpm audit --fix` locally to auto-upgrade non-breaking vulnerable packages. |

### 5.10 Rate Limiting (Upstash Redis)

Every API route that calls an external paid service must be protected by a rate limiter. Without it, a single malicious script can exhaust client quotas (OpenRouter, Resend, n8n) in minutes — directly damaging billable add-on revenue.

**Why Upstash Redis and not Supabase or in-memory:**
Vercel runs multiple serverless instances in parallel. An in-memory counter lives in one instance's RAM — requests hitting other instances start from zero, making the limit ineffective. Supabase is a relational DB optimized for data, not for high-frequency atomic increments. Upstash Redis is serverless, edge-compatible, and purpose-built for counters. Free tier: 10,000 requests/day per database.

**Install:**

```bash
pnpm add @upstash/ratelimit @upstash/redis
```

**Shared rate limiter utility (`lib/rate-limit.ts`):**

```ts
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv(); // reads UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN

// Chat: 20 requests per IP per hour
export const chatLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, '1 h'),
  analytics: true,
  prefix: 'rl:chat',
});

// Contact: 5 requests per IP per hour
export const contactLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 h'),
  analytics: true,
  prefix: 'rl:contact',
});

// Generic factory for future endpoints
export function createLimiter(prefix: string, requests: number, window: string) {
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(requests, window as Parameters<typeof Ratelimit.slidingWindow>[1]),
    analytics: true,
    prefix: `rl:${prefix}`,
  });
}
```

**Usage in `/api/chat/route.ts`:**

```ts
// app/api/chat/route.ts
import { chatLimiter } from '@/lib/rate-limit';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // 1. Rate limit check — first, before any DB or external call
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1';
  const { success, limit, remaining, reset } = await chatLimiter.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait before trying again.' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit':     String(limit),
          'X-RateLimit-Remaining': String(remaining),
          'X-RateLimit-Reset':     String(reset),
          'Retry-After':           String(Math.ceil((reset - Date.now()) / 1000)),
        },
      }
    );
  }

  // 2. Feature flag check — only after rate limit passes
  // ... rest of route logic
}
```

**Usage in `/api/contact` (Server Action alternative):**

```ts
// app/contact/actions.ts — rate limit at the top of the Server Action
'use server';
import { headers } from 'next/headers';
import { contactLimiter } from '@/lib/rate-limit';

export async function contactAction(formData: FormData) {
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1';
  const { success } = await contactLimiter.limit(ip);

  if (!success) {
    return { error: 'Too many submissions. Please wait before trying again.' };
  }

  // ... rest of action logic
}
```

**Adding rate limiting to a new endpoint:**

```ts
// Any new API route that calls a paid external service:
import { createLimiter } from '@/lib/rate-limit';

const myLimiter = createLimiter('my-endpoint', 10, '1 h');
// 10 requests per IP per hour — adjust to match the external service's cost profile
```

| Setting | Rule |
|---|---|
| Order | Rate limit check **always first** — before DB reads, before feature flag checks, before any external call. |
| IP extraction | Use `x-forwarded-for` header (Vercel sets this). Never trust `req.ip` directly. |
| 429 headers | Always return `Retry-After` and `X-RateLimit-*` headers so clients can back off gracefully. |
| Limits | Chat: 20/hour · Contact: 5/hour · New endpoints: set based on external service cost profile. |
| When to add | Any route calling a paid external service (n8n, Resend, OpenRouter, Stripe, Calendly). |
| When NOT to add | Public static routes, internal health checks, Stripe webhook receiver (Stripe retries on 429, causing loops — use signature validation instead). |

> **⚠ Never rate-limit the Stripe webhook endpoint** (`/api/webhooks/stripe`). Stripe interprets a 429 as a failure and retries — creating a loop that can trigger your limiter repeatedly and delay payment processing. The Stripe webhook is already protected by signature validation (§5.7).

**New environment variables required:**

```bash
UPSTASH_REDIS_REST_URL=https://[your-db].upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token_here
```

Add both to Vercel Dashboard → Settings → Environment Variables. Never `NEXT_PUBLIC_`.


---

## 6. Agentic Integration

> Every agentic feature in a Sirius project — whether chat, WhatsApp agent, or future AI modules — follows the same pattern: a Next.js API route that (1) checks the rate limiter, (2) verifies the feature flag in DB, then (3) forwards to n8n. This sequence is non-negotiable and applies to every new agentic endpoint added to any project.

### 6.1 Architecture Overview

```
Client (web widget / WhatsApp / email)
         │
         ▼
app/api/[addon]/route.ts
  ├── 1. Rate limit check     → 429 if exceeded      (§5.10)
  ├── 2. Feature flag in DB   → 402 if disabled       (§11)
  └── 3. Forward to n8n       → 502 if unreachable
         │
         ▼
n8n Webhook                   ← orchestration, session, routing
         │
         ├── OpenRouter / Claude    ← AI inference
         ├── Resend                 ← email delivery
         ├── Calendly / Cal.com     ← scheduling
         ├── CRM                    ← lead storage
         └── WhatsApp (Twilio)      ← channel expansion
```

The three-step sequence in every API route:

```ts
// Pattern — every agentic API route follows this exact order
export async function POST(req: NextRequest) {
  // Step 1 — Rate limit (protect external service quota)
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1';
  const { success } = await myLimiter.limit(ip);
  if (!success) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

  // Step 2 — Feature flag (ensure add-on is active and paid)
  const client = await db.clientProjects.findUnique({ where: { domain: req.headers.get('host') } });
  if (!client?.myFeatureEnabled || (client.validUntil && client.validUntil < new Date())) {
    return NextResponse.json({ error: 'Add-on not active' }, { status: 402 });
  }

  // Step 3 — Forward to n8n
  const upstream = await fetch(process.env.N8N_WEBHOOK_URL!, { ... });
  // ...
}
```

### 6.2 Web Chat API Route

The `/api/chat/route.ts` acts as a secure proxy between the client widget and n8n.

| Aspect | Implementation |
|---|---|
| Rate limit | 20 requests per IP per hour via `chatLimiter` (§5.10). First check in the route. |
| Feature flag | `ai_agent_enabled = true` AND `ai_agent_valid_until > NOW()` in `client_projects`. |
| Required fields | `message` (string), `sessionId` (string). |
| Optional fields | `locale` (string, default: `'es'`). |
| Channel tag | `channel: 'web'` always injected — n8n uses this to route correctly. |
| 402 response | Returned when add-on is disabled or expired. Client widget shows "service unavailable". |
| 503 response | Returned when `N8N_CHAT_WEBHOOK_URL` env var is missing. |
| 502 response | Returned when n8n is unreachable or returns non-2xx. |
| Session continuity | `sessionId` passed through to n8n for conversation memory. |

### 6.3 n8n Workflow Standards

n8n workflow JSON files are stored in `/n8n/` and committed to the repository. This enables version control and reproducible deployments of all automation logic.

| Rule | Standard |
|---|---|
| File naming | Kebab-case describing the workflow: `web-chat-main.json`. One file per workflow. |
| Export format | n8n native JSON export. Include all nodes and connections. |
| System prompt | Stored in `/prompts/system-prompt-v[N].md`. Versioned. Copied into n8n Function node — never hardcoded in webhook URL. |
| Language detection | Agent detects user's first message language and responds in same language. Default: ES. |
| Pricing guard | Agent says "approximately" or "starting from". Never commits to a fixed price in any language. |
| Escalation path | Agent collects name + need + contact info → routes to human via WhatsApp/email. |
| Error handling | Every n8n workflow must have an Error Trigger node that notifies Sirius on failure. |

### 6.4 System Prompt Versioning

- Written in **English** — LLMs follow English instructions more precisely than Spanish
- Versioned in `/prompts/` with version number in filename: `system-prompt-v1.md`
- Each client gets their own prompt file — never share prompts between clients
- Reviewed by CTO before any client-facing deployment
- Tested against adversarial inputs before going live: prompt injection, off-topic requests, pricing extraction attempts
- When updating a prompt, increment the version number — never overwrite `v1` with `v2` content

### 6.5 Add-on Catalog

All agentic features are monthly subscriptions independent of the construction tier. Any add-on is available on any tier (Starter, Business, Advanced). Activation is controlled exclusively by feature flags in the DB — not by env vars.

| Add-on | Flag | Price | Activation |
|---|---|---|---|
| Cerebro IA (web chat) | `ai_agent_enabled` | from $600/mo | Stripe webhook |
| Cerebro IA (WhatsApp) | `whatsapp_agent_enabled` | from $600/mo | Stripe webhook |
| Monthly maintenance | `maintenance_plan` | from $80/mo | Stripe webhook |
| Monthly SEO | `seo_reports_enabled` | from $150/mo | Stripe webhook |
| Tier upgrade | `tier` field | price delta | Manual (one-time) |
| Custom module | `custom_modules` JSONB | custom contract | Manual |

### 6.6 Activation Sources

Every feature flag has exactly one activation source. Never mix sources for the same flag — it creates state conflicts that are impossible to debug.

| Flag | Source | Behaviour |
|---|---|---|
| `cms_enabled` | Tier (one-time) | Set to `true` at project delivery. Never turned off — the client paid for it permanently as part of their tier. |
| `ai_agent_enabled` | Stripe webhook | `invoice.paid` → `true`. `invoice.payment_failed` after grace period → `false`. Fully automatic. |
| `seo_reports_enabled` | Stripe webhook | Same pattern as `ai_agent`. Independent monthly subscription. |
| `maintenance_plan` | Stripe webhook | Set to `'basic'` or `'pro'` on payment. Set to `null` on cancellation. |
| `custom_modules` | Manual (contract) | JSONB column written manually after custom contract is signed. Stripe does not control this. |

> **Never route a tier-included feature through Stripe.** If the client paid for Business tier, `cms_enabled` is permanently `true` — no subscription, no renewal, no webhook. Mixing tier features with subscription logic creates support nightmares.

### 6.7 Bonus & Manual Overrides

When granting a bonus or manually activating a feature outside the payment flow, always set `valid_until` and record the source for audit purposes.

```sql
-- Bonus: 30-day free trial of Cerebro IA
UPDATE client_projects
SET
  ai_agent_enabled     = true,
  ai_agent_valid_until = NOW() + INTERVAL '30 days',
  ai_agent_source      = 'bonus_pilot_2026'  -- audit trail
WHERE domain = 'client.com';

-- Lifetime deal (permanent)
UPDATE client_projects
SET
  ai_agent_enabled     = true,
  ai_agent_valid_until = NOW() + INTERVAL '99 years',
  ai_agent_source      = 'lifetime_deal_2026'
WHERE domain = 'client.com';

-- Revoking a bonus early (relationship changed, etc.)
UPDATE client_projects
SET
  ai_agent_enabled     = false,
  ai_agent_valid_until = NOW(),
  ai_agent_source      = 'revoked_2026'
WHERE domain = 'client.com';
```

> **Always set `valid_until`** — even for "permanent" bonuses, use 99 years. A flag with `NULL` expiry is an undocumented eternal commitment that cannot be selectively revoked without a code change.

### 6.8 Adding New Agentic Features

When a client requests an agentic feature not in the current catalog, apply this decision framework:

| Question | Yes → | No → |
|---|---|---|
| Will 3+ different clients need this? | Add to catalog: new DB column, Stripe product, document in §6.5 | Build as `custom_modules` entry, price as custom contract |
| Does it fit the n8n + webhook pattern? | Follow §6.3 standards. New workflow in `/n8n/`, new prompt in `/prompts/` | Evaluate if a dedicated API route or background job is needed |
| Is it a site feature or a recurring service? | Site feature → belongs in the tier (one-time, permanent) | Recurring service → add-on with Stripe subscription |
| Does it call a paid external API? | Add rate limiting via `createLimiter()` from `lib/rate-limit.ts` (§5.10) | Rate limiting optional but recommended |

### 6.9 Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Yes | Resend API key. Server-only. Never `NEXT_PUBLIC_`. |
| `CONTACT_RECEIVER_EMAIL` | While unverified | Override contact recipient during Resend domain verification. |
| `CONTACT_DEBUG` | Never in prod | Set to `"1"` to surface raw Resend errors in form UI. |
| `N8N_CHAT_WEBHOOK_URL` | If chat active | n8n endpoint for web chat agent. Server-only. |
| `N8N_WHATSAPP_WEBHOOK_URL` | If WhatsApp active | n8n endpoint for WhatsApp agent. Server-only. |
| `NEXT_PUBLIC_CHAT_ENABLED` | Yes | Controls widget visibility in UI **only**. The real gate is the DB flag — this just hides/shows the widget on the client side. |
| `SUPABASE_URL` | Yes | Supabase project URL. Server-only. |
| `SUPABASE_SERVICE_KEY` | Yes | Service role key for DB flag reads in API routes. Server-only. Never `NEXT_PUBLIC_`. |
| `STRIPE_WEBHOOK_SECRET` | If add-ons active | Validates Stripe webhook signatures. Server-only. |
| `UPSTASH_REDIS_REST_URL` | Yes | Upstash Redis endpoint for rate limiting (§5.10). Server-only. |
| `UPSTASH_REDIS_REST_TOKEN` | Yes | Upstash Redis auth token. Server-only. Never `NEXT_PUBLIC_`. |


---

## 7. Dependency Baseline (`package.json`)

### 7.1 Production Dependencies

```json
{
  "dependencies": {
    "next":                       "16.2.0",
    "react":                      "19.2.4",
    "react-dom":                  "19.2.4",
    "@base-ui/react":             "^1.3.0",
    "framer-motion":              "^12.38.0",
    "lucide-react":               "^0.577.0",
    "clsx":                       "^2.1.1",
    "tailwind-merge":             "^2.5.4",
    "class-variance-authority":   "^0.7.1",
    "resend":                     "^6.10.0",
    "tw-animate-css":             "^1.4.0"
  }
}
```

### 7.2 Development Dependencies

```json
{
  "devDependencies": {
    "typescript":                 "^5",
    "@types/node":                "^20",
    "@types/react":               "^19",
    "@types/react-dom":           "^19",
    "tailwindcss":                "^4",
    "eslint":                     "^9",
    "eslint-config-next":         "16.2.0",
    "shadcn":                     "^4.1.2"
  }
}
```

### 7.3 Scripts

```json
{
  "scripts": {
    "dev":   "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint":  "next lint"
  },
  "packageManager": "pnpm@9.0.0"
}
```

---

## 8. CLI Setup Guide

Run these commands sequentially to scaffold a new Sirius project. Replace `[project-name]` with the client's slug.

### Step 1 — Bootstrap

```bash
pnpm dlx create-next-app@16.2.0 [project-name] \
  --typescript --tailwind --eslint --app \
  --no-src-dir --import-alias '@/*'

cd [project-name]
```

### Step 2 — Install Production Dependencies

```bash
pnpm add @base-ui/react framer-motion lucide-react \
  clsx tailwind-merge class-variance-authority \
  resend tw-animate-css
```

### Step 3 — Install Dev Dependencies

```bash
pnpm add -D shadcn
```

### Step 4 — Scaffold `lib/utils.ts`

```bash
mkdir -p lib
cat > lib/utils.ts << 'EOF'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
EOF
```

### Step 5 — Configure Environment Variables

```bash
cat > .env.local << 'EOF'
RESEND_API_KEY=re_your_key_here
CONTACT_RECEIVER_EMAIL=your@email.com
N8N_CHAT_WEBHOOK_URL=https://your-n8n.domain/webhook/xxx
NEXT_PUBLIC_CHAT_ENABLED=false
EOF

echo '.env.local' >> .gitignore
```

### Step 6 — Create `proxy.ts`

```bash
# Copy proxy.ts from the Sirius reference repo
# Adjust SUPPORTED_LOCALES as needed for the project
cp ../siriusweb-reference/proxy.ts ./proxy.ts
```

### Step 7 — Initialize Folder Structure

```bash
mkdir -p components/{brand,layout,sections,ui}
mkdir -p config lib prompts n8n
mkdir -p public/{images,brand,.well-known}
mkdir -p .github/workflows

# Seed AGENTS.md for this project
cp ../siriusweb-reference/AGENTS.md ./AGENTS.md
# ← Edit brand/stack/routes sections for this specific project
```

### Step 8 — Create `public/llms.txt`

```bash
cat > public/llms.txt << 'EOF'
# [Client Company Name]
> [One-line value proposition]
> [City, Country]. [Key differentiator].

## Services
- [Service 1](/services): brief description
- [Service 2](/services#x): brief description

## Key pages
- [About](/about): team and methodology
- [Portfolio](/portfolio): case studies
- [Contact](/contact): start a project
EOF
```

### Step 9 — Create `public/.well-known/security.txt`

```bash
cat > public/.well-known/security.txt << 'EOF'
Contact: mailto:security@[project-domain]
Expires: [YYYY-MM-DD]T23:59:00.000Z
Preferred-Languages: es, en
Policy: https://[project-domain]/security-policy
Canonical: https://[project-domain]/.well-known/security.txt
EOF
```

### Step 10 — CI/CD

```bash
cp ../siriusweb-reference/.github/workflows/ci.yml \
  .github/workflows/ci.yml

git add .
git commit -m 'chore: scaffold sirius project blueprint'
git push
# → Connect repo to Vercel, set env vars in Dashboard
```

### Validation Checklist

- [ ] `pnpm tsc --noEmit` passes with zero errors
- [ ] `pnpm lint` passes with zero errors
- [ ] `pnpm build` completes successfully
- [ ] `proxy.ts` is present at root (replaces `middleware.ts`)
- [ ] `AGENTS.md` is customized for this project
- [ ] All env vars are set in Vercel Dashboard before first deploy
- [ ] `.env.local` is in `.gitignore`
- [ ] `public/llms.txt` is present and structured
- [ ] `public/.well-known/security.txt` is present and dated
- [ ] OG image is exactly **1200×630 px**
- [ ] All content images are WebP and under **500 KB**

---

## 9. Coding Rules (Non-Negotiable)

### 9.1 Language & Naming

| Rule | Detail |
|---|---|
| Code language | All code, comments, variable names, commit messages → **English**. |
| Communication | Team chat and client communication may be in Spanish. |
| PR enforcement | English-only code is checked on every PR. No exceptions. |
| Brand strings | Never hardcode. Always pull from `config/site.ts` or `config/pages.ts`. |

### 9.2 Component Authoring

- Default to Server Components. Add `'use client'` only when justified (see §2.1).
- Never add docstrings, type annotations, or comments to code you didn't change.
- No speculative abstractions. Three similar lines of code beats a premature helper.
- No backwards-compatibility shims for removed APIs.
- `@base-ui/react` wrappers typically require `'use client'` — Base UI handles focus, ARIA, and keyboard events.

### 9.3 Imports

```ts
// ✅ Correct — @/ alias for all internal imports
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';

// ✅ Correct — individual Lucide icon import
import { Globe } from 'lucide-react';

// ❌ Wrong — barrel import (breaks tree-shaking)
import * as Icons from 'lucide-react';

// ❌ Wrong — motion in Server Component or page file
import { motion } from 'framer-motion';
// → Use <AnimatedSection> instead
```

### 9.4 Security Rules

- No `console.log` with user PII (name, email, phone) in Server Actions.
- `console.error` is acceptable for error-path monitoring (Vercel logs).
- All user input rendered as HTML must be escaped.
- Environment variables accessed server-side must **never** have `NEXT_PUBLIC_` prefix.

### 9.5 Git Discipline

| Rule | Standard |
|---|---|
| Branch naming | `feature/[ticket]-short-description` · `fix/[ticket]-description` |
| Commit format | Conventional Commits: `feat:` · `fix:` · `chore:` · `docs:` · `refactor:` |
| PR size | Max ~400 lines of meaningful change per PR. |
| Merge strategy | Squash merge to `main`. No merge commits. |

---

## 10. SEO & LLM Optimization (AEO)

> **This section is a core competitive advantage.** Traditional SEO gets you ranked on Google. AEO (Answer Engine Optimization) gets you cited by ChatGPT, Claude, Perplexity, and every AI-powered search surface. Both are mandatory on every Sirius project.

### The Fundamental Difference

| | Traditional SEO | LLM / AEO |
|---|---|---|
| Target | Google, Bing algorithms | ChatGPT, Claude, Perplexity |
| Ranking signal | Backlinks, Core Web Vitals, keywords | Semantic authority, entity consistency, direct answers |
| Discovery | User searches on Google | User asks an AI a question |
| Format | Keywords in headings, meta tags | Structured content that answers specific questions |
| Entry point | `robots.txt`, `sitemap.xml` | `llms.txt`, JSON-LD schemas, semantic HTML |

### 10.1 `llms.txt` — Machine-Readable Site Map

`llms.txt` is to AI crawlers what `robots.txt` is to search crawlers. It tells GPTBot, ClaudeBot, PerplexityBot, and GoogleOther exactly what the site is about and which pages contain the most valuable content. Without it, the crawler decides alone — and often gets it wrong.

```text
# /public/llms.txt

# [Client Company Name]
> [One-sentence value proposition — be specific, not corporate]
> [City, Country]. [Key differentiator in concrete terms].

## Services
- [Service Name](/services): [what it does, who it's for, concrete outcome]
- [Service Name](/services#agents): [same — specific, not vague]
- [Service Name](/services#saas): [same]

## Key pages
- [About](/about): team background, methodology, track record with numbers
- [Portfolio](/portfolio): case studies with measurable results
- [Contact](/contact): start a project, response time, what to expect

## What we are best at
- [3–5 specific competencies stated as facts, not marketing copy]

## Location & market
- Based in [City, Country]
- Serving [regions/markets]
- Languages: [ES, EN, etc.]
```

**Rules:**
- Prose must be factual and specific. "We deliver innovative solutions" tells an LLM nothing. "We build Next.js applications with sub-2s LCP and AI-agent integrations starting at $600/month" tells it everything.
- Update `llms.txt` every time a new service or case study is added.
- Validate at [llmstxt.org](https://llmstxt.org).

### 10.2 AI Crawler Policy (`app/robots.ts`)

```ts
// app/robots.ts — explicit policy for AI crawlers
export default function robots() {
  return {
    rules: [
      { userAgent: '*',             allow: '/' },
      // LLM inference crawlers — allow so we appear in AI answers
      { userAgent: 'GPTBot',        allow: '/' },   // ChatGPT index
      { userAgent: 'ClaudeBot',     allow: '/' },   // Claude index
      { userAgent: 'PerplexityBot', allow: '/' },   // Perplexity index
      { userAgent: 'GoogleOther',   allow: '/' },   // Gemini / SGE index
      // Training data scrapers — block (we want to be cited, not trained on)
      { userAgent: 'CCBot',         disallow: '/' },
      { userAgent: 'omgili',        disallow: '/' },
      { userAgent: 'Diffbot',       disallow: '/' },
    ],
    sitemap: 'https://[domain]/sitemap.xml',
  };
}
```

> **Key distinction:** `GPTBot` crawls to index content for ChatGPT answers. `CCBot` crawls to collect training data for future models. Allowing the first and blocking the second is the standard policy for commercial sites that want AI visibility without ceding their IP for training.

### 10.3 JSON-LD Schemas for LLM Entity Authority

LLMs verify entities by cross-referencing multiple sources. The more external signals confirm that your client is a real, specific entity, the more likely they are to be cited.

**Schema stack (cumulative — add in this order):**

#### Organization + `sameAs` (app/layout.tsx — root, every page)

```ts
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "[Client Company Name]",
  "url": "https://[domain]",
  "logo": "https://[domain]/brand/logo.svg",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "[phone]",
    "contactType": "customer service",
    "availableLanguage": ["Spanish", "English"]
  },
  "sameAs": [
    "https://linkedin.com/company/[slug]",
    "https://github.com/[org]",
    // Add Crunchbase, G2, Clutch profiles when available
  ],
  "areaServed": ["BO", "US", "LATAM"],
  "knowsAbout": [
    // List the 5–8 specific technical domains the company works in
    // Be precise: "Next.js development" not "web development"
  ]
};
```

> `sameAs` is the most impactful field for LLM entity verification. Every verified external profile link increases the probability of being cited. Add LinkedIn, GitHub, and any industry directory profiles the client has.

#### FAQPage (service pages and about page)

```ts
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Exact question a potential client asks an AI]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Direct, specific answer. Include numbers, timeframes, concrete details.]"
      }
    }
    // 3–7 questions per page
  ]
};
```

**How to choose the questions:** Ask yourself "what would someone type into ChatGPT when looking for a company like this?" Those are the questions. Not the questions you wish they asked — the questions they actually ask.

#### HowTo (process/methodology page)

```ts
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How [Company] delivers a [service] project",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Step name",
      "text": "Specific description of what happens, who does it, and what the output is."
    }
    // One entry per methodology phase
  ]
};
```

#### Service schema (one per service line)

```ts
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "[Service Name]",
  "description": "[Specific description with concrete deliverables]",
  "provider": { "@type": "Organization", "name": "[Company]" },
  "areaServed": ["BO", "US", "LATAM"],
  "offers": {
    "@type": "Offer",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "priceCurrency": "USD",
      "description": "Starting from [price range]"
    }
  }
};
```

### 10.4 Citeable Content Strategy

LLMs cite sources that answer questions better than any other source. Each page should be the best possible answer to one specific question a potential client would ask an AI.

**Content rules for every page:**

| Rule | Bad example | Good example |
|---|---|---|
| Direct answer first | "We're passionate about technology..." | "An AI agent for WhatsApp costs between $600–$1,200/month including setup and ongoing support." |
| Entity consistency | Vary company name across pages | Same name, city, and specialties on every page — exact repetition builds entity signals |
| Specific over generic | "Advanced web solutions" | "Next.js sites with sub-2s LCP, 100 Lighthouse score, and AI-indexable semantic structure" |
| Comparative framing | Never compare | "Unlike traditional chatbots, our AI agents maintain conversation context, integrate with your CRM, and escalate to a human automatically." |
| Verifiable data | "We deliver quality work" | "100% on-time delivery rate across 20+ projects, 5+ years operating in LATAM" |

**Identify each page's "target question"** before writing a single word. The page exists to be the best answer to that question. Write it at the top of the page file as a comment:

```tsx
// app/services/page.tsx
// Target question: "What does a software consultancy in Bolivia offer for AI and web development?"
// Secondary: "How much does a custom AI agent cost in Latin America?"
```

### 10.5 Setup Checklist for Every New Project

```bash
# Files to create at project init (see §8 for full CLI guide)
public/llms.txt                     # AI crawler map — §10.1
public/.well-known/security.txt     # RFC 9116 — §5.8
app/robots.ts                       # AI crawler policy — §10.2
```

**Schemas to implement (priority order):**

- [ ] `Organization` + `sameAs` → `app/layout.tsx` (root, every page)
- [ ] `ProfessionalService` → `app/layout.tsx`
- [ ] `FAQPage` → service pages and about page
- [ ] `HowTo` → process/methodology page
- [ ] `Service` (one per line) → `/services` page
- [ ] `BreadcrumbList` → all interior pages

**Content audit before launch:**

- [ ] Every page has a "target question" comment at the top
- [ ] First paragraph of every section answers the target question directly
- [ ] `llms.txt` lists all services with specific, factual descriptions
- [ ] `sameAs` in Organization schema has at least LinkedIn + one other verified profile
- [ ] `robots.ts` explicitly allows GPTBot, ClaudeBot, PerplexityBot
- [ ] FAQ schemas use questions people actually ask, not hypothetical ones
- [ ] No page relies only on vague marketing language — every claim has a specific detail

---

*Last updated: 2026-04-21 · Maintained by Sirius Tech Partners Engineering Division*
*For questions or amendments: contact@siriustech.partners*

---

## 11. Business Model & Tier Architecture

> This section defines how Sirius structures, prices, and delivers projects — and how that business logic is reflected in the codebase. Claude Code reads this section when scaffolding a new project to generate the correct `AGENTS.md`, activate the right feature flags, and scaffold only the components the client's tier includes.

### 11.1 The Core Principle

Every Sirius project is built on the same technical base (this Blueprint). What changes between tiers is **not** the code base — it is the feature flags that activate or deactivate capabilities. When a client upgrades tiers, you activate flags and add pages. You do not rewrite.

```
Starter  → cms=false  · analytics=false · auth=false
Business → cms=true   · analytics=true  · auth=false
Advanced → cms=true   · analytics=true  · auth=true · custom APIs
```

### 11.2 Tier Definitions

| | Starter | Business | Advanced |
|---|---|---|---|
| Pages | 1–3 sections | 5–9 pages | 10+ pages |
| Payment | One-time | One-time | One-time |
| CMS (self-edit) | — | ✓ | ✓ |
| Analytics / heatmaps | — | ✓ | ✓ |
| Scheduling integration | — | ✓ | ✓ |
| Auth / user accounts | — | — | ✓ |
| Custom API integrations | — | — | ✓ |
| Support included | 15 days | 30 days | 60 days |
| Domain gift | — | ✓ (1 year) | ✓ (1 year) |

> **Support days are a service commitment, not a DB flag.** They are tracked in the project record (`support_until` date field) and managed manually by Sirius. When they expire, the client moves to a paid maintenance add-on.

### 11.3 Add-on Catalog (Recurring Revenue)

Add-ons are monthly subscriptions available on any tier. They are the primary source of Sirius recurring revenue and are controlled entirely by Stripe + DB flags.

| Add-on | Monthly price | Flag | Available on |
|---|---|---|---|
| Cerebro IA (web + WhatsApp) | from $600 | `ai_agent_enabled` | All tiers |
| Maintenance Basic | from $80 | `maintenance_plan = 'basic'` | All tiers |
| Maintenance Pro | from $150 | `maintenance_plan = 'pro'` | All tiers |
| Monthly SEO | from $150 | `seo_reports_enabled` | Business, Advanced |
| Tier upgrade | price delta | `tier` field update | Starter → Business → Advanced |

### 11.4 Database Schema

```sql
-- One record per client project
CREATE TABLE client_projects (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name   TEXT NOT NULL,
  domain        TEXT UNIQUE NOT NULL,

  -- Construction tier (one-time, permanent)
  tier          TEXT NOT NULL CHECK (tier IN ('starter', 'business', 'advanced')),

  -- Tier-included features (set at delivery, never turned off)
  cms_enabled       BOOLEAN NOT NULL DEFAULT false,
  analytics_enabled BOOLEAN NOT NULL DEFAULT false,
  auth_enabled      BOOLEAN NOT NULL DEFAULT false,

  -- Service commitment (manual tracking)
  support_until     TIMESTAMPTZ,

  -- Add-ons (Stripe-controlled, recurring)
  ai_agent_enabled     BOOLEAN NOT NULL DEFAULT false,
  ai_agent_valid_until TIMESTAMPTZ,
  ai_agent_source      TEXT,           -- 'stripe' | 'bonus_[reason]' | 'lifetime_deal'

  whatsapp_agent_enabled     BOOLEAN NOT NULL DEFAULT false,
  whatsapp_agent_valid_until TIMESTAMPTZ,

  seo_reports_enabled  BOOLEAN NOT NULL DEFAULT false,
  seo_reports_valid_until TIMESTAMPTZ,

  maintenance_plan     TEXT CHECK (maintenance_plan IN ('basic', 'pro')),
  maintenance_valid_until TIMESTAMPTZ,

  -- Custom modules (one-off contract features)
  custom_modules JSONB NOT NULL DEFAULT '{}',
  -- Example: { "matching_algorithm": true, "erp_sync": "v2" }

  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for the most common lookup (domain → flags on every API request)
CREATE INDEX idx_client_projects_domain ON client_projects (domain);
```

### 11.5 Stripe Webhook Handler

```ts
// app/api/webhooks/stripe/route.ts
// NOTE: Never rate-limit this endpoint (see §5.10)
import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig  = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const obj     = event.data.object as Stripe.Invoice;
  const domain  = obj.metadata?.domain;           // set this in Stripe metadata
  const addon   = obj.metadata?.addon;            // 'ai_agent' | 'seo_reports' | 'maintenance'
  const plan    = obj.metadata?.plan ?? null;      // 'basic' | 'pro' for maintenance

  if (!domain || !addon) {
    return NextResponse.json({ error: 'Missing metadata' }, { status: 400 });
  }

  if (event.type === 'invoice.paid') {
    await db.clientProjects.update({
      where: { domain },
      data: {
        [`${addon}_enabled`]:     true,
        [`${addon}_valid_until`]: getNextMonth(),
        [`${addon}_source`]:      'stripe',
        ...(addon === 'maintenance' && plan ? { maintenance_plan: plan } : {}),
      },
    });
  }

  if (event.type === 'invoice.payment_failed') {
    // Grace period: 7 days before cutting off
    await db.clientProjects.update({
      where: { domain },
      data: {
        [`${addon}_valid_until`]: getGracePeriodEnd(), // NOW() + 7 days
      },
    });
  }

  if (event.type === 'customer.subscription.deleted') {
    await db.clientProjects.update({
      where: { domain },
      data: {
        [`${addon}_enabled`]:     false,
        [`${addon}_valid_until`]: new Date(),
        ...(addon === 'maintenance' ? { maintenance_plan: null } : {}),
      },
    });
  }

  return NextResponse.json({ received: true });
}

function getNextMonth() {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  return d;
}

function getGracePeriodEnd() {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d;
}
```

### 11.6 Tier Upgrade Path

When a client wants to upgrade, the process is a PR — not a new project.

```sql
-- Starter → Business upgrade
UPDATE client_projects
SET
  tier              = 'business',
  cms_enabled       = true,
  analytics_enabled = true,
  support_until     = NOW() + INTERVAL '30 days',
  updated_at        = NOW()
WHERE domain = 'client.com';
```

Then in the repo:
1. Add the new pages (5–9 total)
2. Integrate Calendly or Cal.com for scheduling
3. Enable the CMS component (`cms_enabled` flag check in layout)
4. PR reviewed → merged → Vercel deploys automatically

**The client pays the price delta** (Business price minus what they already paid for Starter). This is invoiced manually or via a Stripe one-time payment link.

### 11.7 Feature Request Decision Framework

When a client requests something not in the catalog, apply this framework before writing any code:

| Question | Yes | No |
|---|---|---|
| Will 3+ different clients need this? | Add to catalog — new DB column, Stripe product, update §6.5 and §11.3 | Build as `custom_modules` entry, custom contract, isolated module |
| Is it a site feature or a recurring service? | Site feature → include in tier (permanent, one-time) | Recurring service → add-on with Stripe subscription |
| Does it call a paid external API? | Add rate limiting via `createLimiter()` (§5.10) | Rate limiting optional |
| Is it truly unique to this one client? | Custom contract. Isolate in `/modules/[feature]/`. Never merge into Blueprint core | — |

### 11.8 How Claude Code Uses This Section

When scaffolding a new project, Claude Code reads the tier from the project brief and generates:

**`AGENTS.md` for a Starter project:**
```markdown
## Active features
- cms_enabled: false — do NOT scaffold CMS components
- analytics_enabled: false — no heatmap integration
- auth_enabled: false — no login/session logic
## Add-ons
- None active at launch
```

**`AGENTS.md` for a Business project:**
```markdown
## Active features
- cms_enabled: true — scaffold CMS with Sanity or Contentlayer
- analytics_enabled: true — integrate Vercel Analytics + heatmap script
- auth_enabled: false — no auth needed
## Add-ons
- ai_agent_enabled: [check with client] — Cerebro IA available as add-on
```

**Rule for Claude Code:** Never scaffold a feature whose flag is `false` in the project's tier. Never assume a feature is needed because it exists in the Blueprint. Read the tier → activate only what applies → document the rest as "available on upgrade".

### 11.9 Separation of Concerns

The most important business rule in this model:

| | Construction tier | Add-on |
|---|---|---|
| What it is | What Sirius builds | What Sirius operates monthly |
| Payment | One-time | Recurring |
| Activation | At project delivery | Via Stripe webhook |
| Can it be turned off? | No — client owns it permanently | Yes — stops on payment failure |
| Example | CMS panel, 9 pages, scheduling | Cerebro IA, SEO reports, maintenance |

> **Never mix these two in a proposal or in the DB.** If a feature was paid as part of the tier, it belongs to the client forever — it is never a subscription. If it is a service Sirius provides monthly, it is always a subscription controlled by Stripe.

*Last updated: 2026-04-21 · Maintained by Sirius Tech Partners Engineering Division*
