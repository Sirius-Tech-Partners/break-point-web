# Epic 5: SEO & Discoverability

The site appears in local Google searches, social shares generate compelling previews, AI crawlers understand the venue, and hreflang alternates are valid from day 1.

**FRs covered:** FR5 · FR23 · FR24 · FR25 · FR26 · FR27 · FR32
**Includes:** lib/seo.ts (generateMetadata factory), app/sitemap.ts, app/robots.ts, public/llms.txt, OG images via next/og (×3 pages), JSON-LD schemas (Organization + SportsActivityLocation + FAQPage in layout.tsx), app/en/ scaffold (EN layout + 3 pages)

---

## Story 5.1: generateMetadata() Factory & Per-Page Metadata

As a visitor finding Break Point via Google,
I want each page to have unique, descriptive metadata,
So that search results and social previews accurately represent the page content.

**Acceptance Criteria:**

**Given** `lib/seo.ts` exports `generateMetadata()`
**When** called with `{ title, description, path, locale? }`
**Then** it returns a Next.js `Metadata` object with: page title, description, `openGraph` (og:title, og:description, og:image 1200×630, og:locale `es_BO`), hreflang `alternates.languages` for `es` and `en`, and canonical URL from `siteConfig.seo.metadataBase`

**Given** `app/page.tsx`, `app/cancha/page.tsx`, and `app/eventos/page.tsx` each call `generateMetadata()`
**When** the pages are rendered
**Then** each page has a unique title and description — no two pages share the same metadata

**Given** `siteConfig.seo.metadataBase` is updated with the final domain
**When** `pnpm build` runs
**Then** all canonical URLs and OG image URLs update automatically across all pages

**Given** the Home page metadata
**When** shared on WhatsApp or Twitter
**Then** the OG preview shows the venue name, tagline, and the OG image

---

## Story 5.2: JSON-LD Structured Data

As a search engine crawler,
I want machine-readable structured data about the venue,
So that Break Point appears in rich results for sports venues and FAQs.

**Acceptance Criteria:**

**Given** `app/layout.tsx` renders
**When** the page HTML is inspected
**Then** three JSON-LD scripts are present: `Organization`, `SportsActivityLocation` (with amenities, address, hours, phone), and `FAQPage` (matching the FAQ section questions)

**Given** the `SportsActivityLocation` schema
**When** validated by Google's Rich Results Test
**Then** it includes: venue name, address, telephone, openingHours, amenityFeature list, geo coordinates (when available)

**Given** the `FAQPage` schema
**When** validated
**Then** it mirrors the questions and answers in `<FaqSection>` — no divergence between visible FAQ and structured data

**Given** all JSON-LD data
**When** inspected
**Then** all business strings (name, address, phone, hours) are sourced from `siteConfig` — no hardcoded values in schema

---

## Story 5.3: Sitemap, Robots & Crawling Policy

As a search engine,
I want a machine-readable sitemap and robots directive,
So that I can efficiently crawl and index all Break Point pages.

**Acceptance Criteria:**

**Given** `app/sitemap.ts` exists
**When** `/sitemap.xml` is requested
**Then** it returns all 3 ES pages (`/`, `/cancha`, `/eventos`) + 3 EN alternates (`/en/`, `/en/cancha`, `/en/eventos`) with `lastModified` timestamps

**Given** `app/robots.ts` exists
**When** `/robots.txt` is requested
**Then** it allows all crawlers on all paths and points to the sitemap URL

**Given** the robots directive
**When** read by AI crawlers (GPTBot, ClaudeBot, etc.)
**Then** they are allowed to crawl (no disallow for AI agents in V1)

---

## Story 5.4: AI Discoverability — llms.txt & security.txt

As an AI language model,
I want a machine-readable description of Break Point,
So that I can accurately answer questions about the venue when users ask.

**Acceptance Criteria:**

**Given** `public/llms.txt` exists
**When** requested at `/llms.txt`
**Then** it contains: venue name, tagline, address, hours, services (field rental + events), pricing (Bs 120/130), amenities, WhatsApp contact — all sourced from `siteConfig`

**Given** `public/.well-known/security.txt` exists
**When** requested at `/.well-known/security.txt`
**Then** it follows RFC 9116 format with: contact email, expiry date (1 year from launch), preferred languages

---

## Story 5.5: English Subtree Scaffold (app/en/)

As a future English-speaking visitor,
I want the site infrastructure to support English from day 1,
So that hreflang alternates are valid and adding English content requires only copy, not structural changes.

**Acceptance Criteria:**

**Given** `app/en/layout.tsx` exists
**When** any `/en/*` route is accessed
**Then** `lang="en"` is set on the html element and the EN layout renders correctly

**Given** `app/en/page.tsx`, `app/en/cancha/page.tsx`, and `app/en/eventos/page.tsx` exist
**When** accessed
**Then** they render placeholder content (EN copy to be added in V2) without errors

**Given** `lib/seo.ts` `generateMetadata()` is called on ES pages
**When** the metadata is inspected
**Then** `alternates.languages` contains both `es: /[path]` and `en: /en/[path]` — valid hreflang from day 1

**Given** `pnpm tsc --noEmit` runs on the en/ subtree
**When** completed
**Then** zero TypeScript errors — EN pages are type-safe from the start
