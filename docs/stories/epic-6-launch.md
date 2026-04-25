# Epic 6: Performance, Security & Launch Readiness

The site meets Core Web Vitals on Bolivian 4G, passes all 5 CI gates on every PR, and automated tests validate real user experience before each deploy.

**FRs covered:** FR28 · FR29 · FR30
**NFRs covered:** NFR-P1–P6 · NFR-S1–S8 · NFR-A1–A7 · NFR-SC1–SC4
**Includes:** .github/workflows/ci.yml, Playwright E2E (5 smoke tests), Vitest unit tests, public/.well-known/security.txt, Lighthouse CI

---

## Story 6.1: Image Performance — next/image Optimization

As a visitor on a Bolivian 4G connection,
I want venue images to load progressively with no layout shift and the hero to be visible fast,
So that the site feels fast even on slow connections.

**Acceptance Criteria:**

**Given** `<VenueImage slot="hero">` renders with a real `src`
**When** the page loads
**Then** `next/image` renders with `priority` prop, `placeholder="blur"`, and a `sizes` prop — zero CLS, LCP image starts loading immediately

**Given** `<VenueImage slot="gallery">` renders with a real `src`
**When** the image enters the viewport
**Then** it lazy-loads with `placeholder="blur"` — no layout shift as it loads

**Given** real photos are placed in `public/images/`
**When** `<VenueImage src="/images/field-night.webp">` is set
**Then** the image displays without any code changes to components — drop-in replacement (FR30)

**Given** `pnpm build` runs with real images
**When** Next.js optimizes them
**Then** WebP variants are generated automatically — no manual conversion needed

---

## Story 6.2: CI/CD Pipeline — GitHub Actions 5-Gate Workflow ✅ COMPLETE (done early)

**Branch:** `feat/E6.2-ci-pipeline`

**What was implemented:**
- `.github/workflows/ci.yml` with 5 gates: tsc → lint → build → audit (non-blocking) → playwright
- `playwright.config.ts` with Chromium + mobile Chrome projects
- `e2e/smoke.spec.ts` — home page smoke test (1 of 5, remainder added in Story 6.3)
- `test:e2e` script in package.json

---

## Story 6.3: Playwright E2E Smoke Tests (5 tests)

As a developer,
I want 5 automated smoke tests covering the critical user journeys,
So that every deploy is validated against real browser behavior before going live.

**Acceptance Criteria:**

**Given** `e2e/smoke.spec.ts` contains all 5 smoke tests
**When** `pnpm test:e2e` runs
**Then** all 5 pass: (1) home page loads with correct title; (2) floating WhatsApp button is visible and has correct href; (3) La Cancha page shows Bs 120 and Bs 130 pricing; (4) Eventos contact form submits successfully (mocked Resend); (5) Eventos form shows inline errors on invalid submission

**Given** the WhatsApp button smoke test runs
**When** the button is located
**Then** its `href` matches `https://wa.me/59170690685*` and `aria-label` is "Contactar por WhatsApp"

**Given** the Eventos form error test runs
**When** the form is submitted empty
**Then** error messages appear for all required fields (Nombre, Teléfono, Fecha del evento)

**Given** tests run in CI
**When** any test fails
**Then** the CI gate blocks the merge and the Playwright report artifact is uploaded to GitHub Actions

---

## Story 6.4: Vitest Unit Tests

As a developer,
I want co-located unit tests for all shared utilities and the Zod schema,
So that regressions in utility functions are caught before they affect the UI.

**Acceptance Criteria:**

**Given** `lib/utils.test.ts` exists
**When** `pnpm test` runs
**Then** `cn()` is tested with: conflicting Tailwind classes (tailwind-merge wins), empty input, falsy values (clsx handles), multiple class arrays

**Given** `lib/seo.test.ts` exists
**When** `pnpm test` runs
**Then** `generateMetadata()` is tested with: correct canonical URL construction, hreflang alternates present for both `es` and `en`, og:locale is `es_BO`

**Given** `lib/rate-limit.test.ts` exists
**When** `pnpm test` runs
**Then** `contactLimiter` config is tested: max 5 requests, window 1 hour, uses env vars (not hardcoded)

**Given** `app/eventos/schema.test.ts` exists
**When** `pnpm test` runs
**Then** Zod schema is tested with: valid Bolivian phone formats (`70690685`, `+591 70690685`), invalid phone rejected, required field missing = error, message over 300 chars = error

---

## Story 6.5: Lighthouse CI & Core Web Vitals Validation

As the venue owner,
I want the site to score ≥ 90 on Google PageSpeed mobile,
So that Break Point ranks well in local searches and loads fast for visitors on Bolivian 4G.

**Acceptance Criteria:**

**Given** Lighthouse CI runs against the production build
**When** measured on mobile (simulated 4G)
**Then** LCP < 2.5s · CLS < 0.1 · INP < 200ms · Performance score ≥ 90 · Accessibility score ≥ 95

**Given** Lighthouse desktop audit runs
**When** completed
**Then** Performance score ≥ 95

**Given** the First Load JS bundle is measured
**When** `pnpm build` output is inspected
**Then** First Load JS < 80KB for all pages — no unnecessary client bundles

**Given** the site is audited for accessibility
**When** Lighthouse Accessibility runs
**Then** score ≥ 95 — all NFR-A1 through NFR-A7 are passing
