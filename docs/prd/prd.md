---
stepsCompleted: [step-01-init, step-02-discovery, step-02b-vision, step-02c-executive-summary, step-03-success, step-04-journeys, step-05-domain-skipped, step-06-innovation-skipped, step-07-project-type, step-08-scoping, step-09-functional, step-10-nonfunctional, step-11-polish, step-12-complete]
workflowStatus: complete
completedAt: "2026-04-24"
inputDocuments:
  - "_bmad-output/planning-artifacts/product-brief-break-point-web.md"
  - "_bmad-output/planning-artifacts/product-brief-break-point-web-distillate.md"
  - "_bmad-output/planning-artifacts/research/market-break-point-bolivia-research-2026-04-24.md"
  - "sirius_product_os_v1.md"
workflowType: 'prd'
briefCount: 2
researchCount: 1
projectDocsCount: 1
classification:
  projectType: 'marketing-informational-website'
  domain: 'local-services-sports-events'
  complexity: 'low-medium'
  projectContext: 'greenfield'
---

# Product Requirements Document - Break Point Web

**Author:** Mauricio
**Date:** 2026-04-24

---

## Executive Summary

Break Point is a private, all-inclusive sports and events complex located in Barrio Caliri, La Paz's zona sur — a sunny, residential neighborhood with a concentrated upper-middle-class family demographic and no comparable public-access venue. The complex offers a single synthetic-grass 5v5 football field paired with a full event suite: a salon (70–100 guests), BBQ area, kitchen, and bathrooms. The defining business model is exclusivity-by-default: when a group books, they have the entire space to themselves for the duration of the reservation. No shared fields, no overlapping parties, no strangers.

Break Point currently operates without any digital presence. All bookings arrive through personal referral and WhatsApp — evidence that market demand is real and validated, but growth is capped by zero discoverability. The V1 product is a three-page informational landing site (Home · La Cancha · Eventos) whose sole conversion goal is to turn anonymous local search traffic into WhatsApp conversations. Every architectural and content decision follows from this single conversion objective.

**Primary users:**
- Recreational football groups (5v5, weekday evenings and weekend mornings) seeking a quality private field with no booking friction
- Families in zona sur planning children's birthday parties who need field + event space + food setup in a single venue, under one booking, for one predictable price

**Secondary users:** Corporate and social groups organizing team-building or confraternization events.

### What Makes This Special

The Bolivian sports venue market in La Paz is fragmented: municipal and neighborhood fields offer courts at Bs 80–100/hr with no event infrastructure; premium club venues (La Paz Golf Club, Complejo de Achumani) offer complete facilities but require paid membership. There is no public-access venue in zona sur that combines a football field with a functioning event space under an all-inclusive, exclusive rental model at a mid-market price point.

Break Point's core insight is that its all-or-nothing rental model — commonly perceived as a constraint — is the product's primary feature. The privacy and group ownership it creates is exactly what the birthday-party and confraternization segments are willing to pay a premium for. At Bs 250/hr for the full venue (≈ Bs 1,000 for a 4-hour event), Break Point is cheaper than assembling equivalent facilities from separate providers while delivering a categorically superior experience.

A professionally executed landing site immediately makes Break Point the highest-visibility private sports venue in its local segment. No direct competitor has a standalone website with transparent pricing, real venue photography, and a direct WhatsApp CTA. The first-mover digital advantage is available today, at zero marginal cost to operations.

## Project Classification

| Attribute | Value |
|---|---|
| **Project Type** | Marketing / Informational Website (lead generation) |
| **Domain** | Local Services — Sports & Events, SMB Web Presence |
| **Complexity** | Low–Medium (3 pages, 1 contact form, SEO, no auth/payments/CMS) |
| **Project Context** | Greenfield — no existing digital presence |
| **Stack** | Next.js 16.2.4 · React 19 · TypeScript strict · Tailwind v4 · Resend · Vercel |
| **Tier** | Starter (cms_enabled: false · analytics_enabled: false · ai_agent_enabled: false) |

---

## Success Criteria

### User Success

- A visitor who has never heard of Break Point lands on the site and can answer these three questions within 60 seconds: *What does the place look like? How much does it cost? How do I contact you?* — without scrolling back or guessing.
- A parent planning a birthday party finds a fixed-price event package on the Pricing page and initiates a WhatsApp conversation without needing to ask for a quote.
- A football group captain can share the site URL with teammates as a credibility signal — the site functions as the "business card" that replaces explaining Break Point by voice.

### Business Success

| Metric | Target | Timeline | Tracking Method |
|---|---|---|---|
| First WhatsApp inquiry via site | ≥ 1 | Within 30 days of launch | Owner asks "how did you find us?" |
| WhatsApp-attributable bookings | ≥ 3/month | By end of month 2 | Same verbal tracking |
| Contact form submission rate | ≥ 5% of unique visitors | Ongoing baseline | Vercel Analytics (V2 adds detailed tracking) |
| Google Maps visibility | Appears for "cancha fútbol 5 La Paz zona sur" | Within 30 days of GBP setup | Manual search check |
| Organic search indexing | Site indexed and appearing for local queries | Within 60 days of launch | Google Search Console |
| Google PageSpeed (mobile) | ≥ 90 | At launch | Lighthouse CI |

### Technical Success

- Core Web Vitals pass on mobile: LCP < 2.5s, CLS < 0.1, INP < 200ms
- Lighthouse Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95 on all 3 pages
- JSON-LD valid: Organization + Service + FAQPage schemas pass Google Rich Results Test
- `llms.txt` and `robots.ts` correctly configured
- Contact form: rate limiting active (≤ 5 submissions/hr/IP), Resend delivery confirmed, no PII in logs
- Zero TypeScript errors (`pnpm tsc --noEmit`), zero lint errors, build passes CI on every PR
- All Playwright smoke tests pass post-deploy

### Measurable Outcomes

**V2 trigger signals** (data that justifies building the next layer):
- Contact form submissions growing month-over-month → justifies CRM / lead database
- Repeat bookings from site-sourced customers → justifies loyalty or calendar management features
- Off-peak inquiries appearing → justifies dedicated pricing section for dead-hour slots
- Any customer asks "can I book online?" → justifies lightweight booking calendar

---

## Product Scope

### MVP — V1 Landing Site

**In scope:**
- 3 pages: **Home** (`/`) · **La Cancha** (`/cancha`) · **Eventos** (`/eventos`) — no standalone Contact page
- WhatsApp CTA as primary conversion action on all pages (floating button + inline CTAs per section)
- Transparent pricing tiers:
  - Bs 120/hr — field only, daytime
  - Bs 130/hr — field only, nighttime
  - Bs 250/hr — full venue (all spaces), **minimum 3 hours** (= Bs 750 base)
  - ⚠️ **TBD:** rate for hours 4+ of a full-venue booking (owner to confirm before dev of Pricing page)
- Full venue amenities to be displayed on site (Home facilities section + Pricing page):
  - Synthetic grass 5v5 football field with lighting
  - Salon (70–100 guests capacity)
  - BBQ area
  - Kitchen: counters (mesones), microwave, refrigerator
  - Tables and chairs (included)
  - Tent/canopy (carpa) and umbrellas (sombrillas)
  - Foosball table (futbolín)
  - Trampoline (cama elástica)
  - Bathrooms
- Contact form on Eventos page only: name, phone, event date, event type, estimated guests → Resend email to owner
- Rate limiting on contact form (5 req/hr/IP via Upstash Redis)
- SEO: meta tags, Open Graph, JSON-LD (Organization + Service + FAQPage), `llms.txt`, `robots.ts`, sitemap
- Mobile-first, Spanish-first copy; English i18n infrastructure scaffolded but inactive in V1
- **Photography strategy:** Launch with structured placeholder components (`<VenueImage>`) at correct aspect ratios. Client provides cellphone photos as visual reference for layout. Replace with professional photography post-launch without code changes.
- `AnimatedSection` for section reveals; no direct `motion` imports in pages or sections

**Explicitly out of scope for V1:**
- Online booking / reservation calendar
- Client database or CRM
- Social media feeds or integrations
- User authentication or admin panel
- AI chat widget or WhatsApp bot
- CMS (Starter tier — no self-editing)
- Analytics dashboard or SEO reporting tools
- Dead-hours / off-peak pricing (not yet defined by owner)
- Cancellation policy page (to be defined before V2)

### Growth Features — V2

- Lightweight booking calendar (availability display + WhatsApp pre-fill with date/event type)
- Lead capture CRM (simple spreadsheet or Notion DB fed by contact form)
- Analytics: Vercel Analytics + heatmap tool activation
- Off-peak / training-session pricing section
- Instagram feed or social proof widget
- Formal cancellation and deposit policy page
- Registration on Deportea.app as additional discovery channel
- Replace placeholder images with professional venue photography

### Vision — V3+

- WhatsApp automation / booking bot
- Owner dashboard (booking management, lead tracking)
- Loyalty program or repeat-customer discounts
- AI chat widget (`ai_agent_enabled: true` tier unlock)
- Expansion model: Break Point as replicable venue brand in other zones of La Paz

---

## User Journeys

### Journey 1: The Football Group Captain — Primary User, Happy Path

**Persona: Rodrigo, 28, vendedor en empresa de zona central**

Rodrigo coordinates a weekly 5v5 match with nine friends. Their usual neighborhood court in Sopocachi has deteriorated turf and poor lighting. A coworker mentions Break Point: "synthetic grass, zona sur, look it up."

**Opening Scene:** Tuesday night, Rodrigo on his phone. Opens Google Maps, searches "cancha fútbol 5 zona sur La Paz." Break Point appears. He taps the site link.

**Rising Action:** Home loads on mobile. Hero image shows the field — green turf, floodlights. He scrolls to pricing: Bs 130/hr nighttime. Divided by 10 players = Bs 13/person. Reasonable. He taps WhatsApp.

**Climax:** Types: "Hola, quería consultar disponibilidad para este jueves 20:00–22:00 para 10 personas." Response arrives within minutes. Booking confirmed. He sends the site URL to the group chat so teammates can see the place.

**Resolution:** Thursday game at Break Point. Field exceeds expectations. Rodrigo becomes the captain who always books here. Break Point has a recurring customer who never filled a form — just tapped WhatsApp.

**Capabilities revealed:** Hero with quality field photography · Pricing visible without extra navigation · WhatsApp CTA accessible within first scroll · Google Maps / GBP presence · Fast mobile load on 4G

---

### Journey 2: The Birthday Parent — Primary User, Decision-Making Path

**Persona: Valeria, 35, mother of two in San Miguel, zona sur**

Her son turns 8 in three weeks. She wants something where kids can play football AND adults have space to eat and socialize — not a generic salon or a pizzeria. A friend mentions Break Point in a neighborhood Facebook group.

**Opening Scene:** Valeria Googles "Break Point La Paz" from her laptop. The landing loads fast. First image shows kids playing on the field. She keeps reading.

**Rising Action:** Home lists everything she needs: field, salon, BBQ, kitchen, trampoline, foosball, tables and chairs, carpa. Goes to Pricing. Sees the birthday package: fixed hours, everything included, fixed price. No need to request a quote. Mental math: cheaper and more complete than booking separate venue + catering + entertainment.

**Climax:** She fills the contact form — name, phone, event date (Saturday May 16), event type (birthday party). Submits. On-screen confirmation: "We'll contact you shortly via WhatsApp." Owner responds within 2 hours.

**Resolution:** Saturday May 16 — 45 guests at Break Point. Kids play football and the trampoline. Adults grill at the BBQ. The carpa shelters from the wind. Valeria coordinated nothing with third parties. She posts a photo on Instagram tagging the location.

**Capabilities revealed:** Full amenities list on Home · Pricing page with fixed-price package (no quote needed) · Contact form with "event type" field · On-screen post-submit confirmation message · Responsive on desktop and mobile · SEO targeting "cumpleaños fútbol La Paz"

---

### Journey 3: The Corporate Coordinator — Secondary User, Inquiry Path

**Persona: Diego, 32, HR coordinator at a mid-size company**

His company has 40 people. The manager wants a team-building day before year-end. Budget is moderate. Diego needs a venue for physical activities and group meals, convenient for zona sur where most of the team lives. He finds Break Point searching "salón eventos La Paz zona sur" on Google.

**Opening Scene:** Google returns Break Point in organic results. Diego enters the site. He's scanning fast: How many people fit? Is there food space? Kitchen included or do they need to bring catering?

**Rising Action:** Home answers his questions: salon up to 100 people, BBQ, equipped kitchen. Goes to Pricing: Bs 250/hr full venue, 3-hour minimum. For a 4-hour block he can calculate the total. Fills the form: name, phone, tentative date, event type: "corporate team building, 40 people."

**Resolution:** Owner responds with a firm total price for the time block and confirms availability. Diego has a concrete number to present to management. Event confirmed for a Saturday in November.

**Capabilities revealed:** Pricing page with hour-block logic (3hr minimum + rate for hour 4+) · Contact form with event type field · FAQ section answering capacity and included services · WhatsApp as quick close channel

---

### Journey 4: The Venue Owner — Operations / Admin User

**Persona: Break Point owner — receives leads, manages availability manually**

**Opening Scene:** Owner receives a Resend email: "New contact from the site — Valeria Mamani · 7X-XXX-XXX · Birthday party · May 16." Email arrives within seconds of form submission.

**Rising Action:** Opens WhatsApp, finds the number, types a response. Checks manual calendar for May 16. Available. Replies with price, conditions (50% deposit, 72hr minimum advance booking), and payment transfer instructions.

**Resolution:** Booking confirmed via WhatsApp. The site did its job: captured the lead with complete data, delivered it in real time, required zero ongoing maintenance.

**Capabilities revealed:** Resend email containing all form fields (name, phone, date, event type) · Rate limiting to prevent spam to owner's inbox · Form fields optimized for WhatsApp follow-up (phone over email as primary field)

---

### Journey 5: Mobile Visitor on Slow Connection — Edge Case

**Persona: Anonymous visitor, fluctuating 4G, mid-range Android**

Someone shares the Break Point URL in a WhatsApp group. The recipient opens it directly from WhatsApp in-app browser on a slow 4G connection.

**Critical scenario:** Page takes longer than 3 seconds to paint. Does the user bounce?

**Required resolution:** Hero renders a skeleton first — no layout shift. Images are WebP via `next/image` with blur placeholders. The WhatsApp CTA is visible before images fully load. User can initiate contact before the full photo gallery renders.

**Capabilities revealed:** `next/image` for all venue photos · Blur placeholders on images · Above-the-fold content independent of heavy images · WhatsApp CTA in first viewport · LCP < 2.5s even with images · No CLS on load

---

### Journey Requirements Summary

| Journey | Key Capabilities Required |
|---|---|
| Football Captain | Fast mobile load · Pricing without extra navigation · WhatsApp CTA above fold · Google Maps presence |
| Birthday Parent | Amenities list on Home · Fixed-price package · Contact form with event type · Post-submit confirmation |
| Corporate Coordinator | Hour-block pricing (3hr min + hour 4+ rate) · FAQ: capacity + services · Contact form with event type |
| Owner (Operations) | Resend email with complete lead data · Rate limiting · Real-time delivery · Phone as primary contact field |
| Slow connection (edge) | `next/image` + blur placeholders · CTA before image load · LCP < 2.5s · Zero CLS |

---

## Marketing Site Specific Requirements

### Page Architecture & Navigation

**3-page structure — segment-oriented:**

| Page | Route | Purpose | Primary CTA | Secondary CTA |
|---|---|---|---|---|
| Home | `/` | Introduce Break Point, build desire, orient visitors to their segment | WhatsApp | Links to /cancha and /eventos |
| La Cancha | `/cancha` | Field rental — pricing, availability, specs for football groups | WhatsApp only | — |
| Eventos | `/eventos` | Full venue packages — birthday parties, corporate events, pricing | WhatsApp | Contact form (structured inquiry) |

**Rationale for no Contact page:** WhatsApp covers all contact needs. Football groups (La Cancha) make fast decisions — zero friction. Event planners (Eventos) benefit from the form to submit all details at once. A standalone Contact page would be redundant and thin.

**Navigation:** Sticky top navbar — logo + 3 links (Inicio · La Cancha · Eventos) + WhatsApp CTA button. Mobile: hamburger menu. Footer: address, phone, WhatsApp link, map reference.

**Floating WhatsApp button:** Persistent on all pages, bottom-right, visible on every scroll position.

**No 404-trap internal links.** Every nav link resolves in V1. No "coming soon" pages.

---

### Home Page Section Architecture

Sections in render order (mobile-first):

1. **Hero** — Headline + subheadline + primary WhatsApp CTA + hero image (venue placeholder)
2. **Value proposition strip** — 3–4 icons: exclusivity · full venue · zona sur · transparent pricing
3. **Facilities** — Full amenities list with icons: field, salon, BBQ, kitchen, trampoline, foosball, tables/chairs, carpa/umbrellas, bathrooms
4. **Segment split** — Two CTA cards: "Quiero jugar fútbol →" (to /cancha) · "Quiero hacer un evento →" (to /eventos)
5. **How it works** — 3 steps: Reserva → Llega → Disfruta. Reduce friction perception.
6. **Gallery** — 4–6 `<VenueImage>` placeholders, fixed aspect ratios. Replace with real photos post-launch.
7. **FAQ** — 4–6 questions covering both segments. JSON-LD FAQPage schema.
8. **Final CTA** — WhatsApp button

---

### La Cancha Page (`/cancha`) Section Architecture

Target user: recreational football groups, fast decision-makers.

1. **Header** — "La Cancha" + positioning line (synthetic grass, lighting, zona sur)
2. **Field specs** — Dimensions, surface (synthetic grass), lighting (LED), capacity (5v5 = 10 players)
3. **Pricing** — Bs 120/hr day · Bs 130/hr night. Clean, no complexity.
4. **Availability windows** — Typical open slots (weekday evenings 18:00–22:00, weekend mornings)
5. **Field amenities** — What's included in a field-only booking (bathrooms, parking)
6. **Booking conditions** — Minimum 1 hour · payment on arrival or via transfer
7. **Gallery** — 2–3 field photos (placeholder)
8. **CTA** — Single WhatsApp button: "Reservar cancha" (pre-filled message: "Hola, quiero reservar la cancha para...")

---

### Eventos Page (`/eventos`) Section Architecture

Target users: birthday parents, corporate coordinators — higher coordination need.

1. **Header** — "Eventos" + positioning line (exclusive, full venue, your group only)
2. **What's included** — Full amenities itemized: field, salon, BBQ, kitchen, tables/chairs, carpa, umbrellas, trampoline, foosball, bathrooms
3. **Pricing** — Full venue Bs 250/hr · minimum 3 hours (= Bs 750 base) · ⚠️ TBD: rate for hours 4+
4. **Birthday package** — Fixed-price card ⚠️ TBD: price + hours to define
5. **Exclusivity statement** — "El lugar es tuyo. Solo tu grupo, sin extraños." — reinforces differentiator
6. **Booking conditions** — 3hr minimum · 50% deposit to confirm · 72hr advance booking minimum
7. **Gallery** — 4–6 event/venue photos (placeholder)
8. **WhatsApp CTA** — Primary: "Reservar mi fecha" (pre-filled: "Hola, quiero consultar disponibilidad para un evento...")
9. **Contact form** — Secondary, for structured inquiries:
   - Name (required)
   - Phone number (required — WhatsApp-ready)
   - Event date (date picker, required)
   - Event type (select: Cumpleaños infantil / Evento corporativo / Reunión social / Otro)
   - Estimated guests (number input, optional)
   - Message (optional, 300 char max)
   - Submit → Resend email to owner + on-screen confirmation + WhatsApp redirect suggestion

---

### SEO Specifications

**Target keywords per page:**

| Page | Primary Keywords | Secondary Keywords |
|---|---|---|
| Home (`/`) | `Break Point La Paz` · `complejo deportivo zona sur La Paz` | `cancha fútbol La Paz zona sur` |
| La Cancha (`/cancha`) | `cancha fútbol 5 zona sur La Paz` · `cancha fútbol 5 La Paz` | `alquiler cancha fútbol La Paz` |
| Eventos (`/eventos`) | `cumpleaños infantil fútbol La Paz` · `salón eventos zona sur La Paz` | `evento corporativo La Paz zona sur` |

**Technical SEO (all pages):**
- `generateMetadata()` via `lib/seo.ts` — unique `title` + `description` per page
- Open Graph: `og:title`, `og:description`, `og:image` (1200×630px), `og:locale: es_BO`
- Canonical URLs, `robots.ts` (allow all / block `/api/`), `sitemap.ts` (3 pages)
- `llms.txt` — describes Break Point for AI crawlers

**Structured data (JSON-LD in `app/layout.tsx`):**
- `Organization` — name, URL, address, telephone, sameAs (WhatsApp)
- `SportsActivityLocation` — name, address, amenityFeature list
- `FAQPage` — from FAQ section on Home

---

### Performance Specifications

Performance targets, implementation notes, and measurement methods are defined in the [Non-Functional Requirements — Performance](#performance) section (NFR-P1 through NFR-P6).

---

### WhatsApp CTA Specifications

- **Floating button:** Bottom-right, all pages, all scroll positions. Always visible on mobile.
- **Pre-filled messages per page:**
  - Home: `Hola, quiero consultar sobre Break Point`
  - La Cancha: `Hola, quiero reservar la cancha para [fecha]`
  - Eventos: `Hola, quiero consultar disponibilidad para un evento`
- **Phone number source:** `config/site.ts` — never hardcoded anywhere.

---

### Contact Form Specifications (Eventos page only)

- **Pattern:** `eventos/page.tsx` (Server) → `event-contact-form.tsx` ('use client') → `useActionState` → `actions.ts` ('use server')
- **Rate limiting:** 5 submissions/hr/IP via Upstash Redis
- **On success:** Inline confirmation + "También puedes escribirnos por WhatsApp" redirect suggestion
- **On error:** Inline field-level errors; generic message for server errors (no technical details)
- **Resend email to owner:** Subject: `[Break Point] Evento — {eventType} · {date} · {guests} personas` · Body: all fields formatted for quick WhatsApp response

---

### Integration Requirements

| Integration | Purpose | V1 | V2 |
|---|---|---|---|
| Resend | Eventos contact form → email to owner | ✅ | — |
| WhatsApp (wa.me deep link) | Primary CTA — no API, pre-filled messages | ✅ | — |
| Upstash Redis | Rate limiting on Eventos form | ✅ | — |
| Google Maps / GBP | Local discovery — external setup | Recommended alongside V1 | — |
| Deportea.app | Additional discovery — manual listing | — | ✅ |
| Vercel Analytics | Traffic + conversion tracking | — | ✅ |

---

### Visual Assets Strategy

**V1 — Structured placeholders:**
- `<VenueImage>` component wraps `next/image` with fixed `aspect-ratio` container and blur placeholder
- Placeholder background: `@theme` brand token (not hardcoded hex)
- Correct final dimensions from day one — zero layout shift when real photos arrive
- Client provides cellphone photos as layout reference during design

**V2 — Professional photography (recommended shots):**
- Field daytime · Field nighttime (lit) · Salon interior · BBQ area · Kitchen · Trampoline + foosball · Full venue overview · Event in progress (kids/adults)
- Format: WebP, < 500KB each
- Swap path: replace files in `public/images/` — zero code changes

---

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Experience MVP — the goal is not to prove market demand (already validated by WhatsApp bookings) but to deliver the minimum digital presence that converts existing latent demand into direct contact. A visitor should be able to understand the value, see the price, and initiate contact in under 60 seconds.

**The MVP is done when:** A stranger who has never heard of Break Point can find it on Google, land on the site, and send a WhatsApp message — without needing to talk to anyone first.

**Resource requirements:** 1 developer (full-stack), ~3–4 weeks. Stack already scaffolded. No external dependencies beyond Resend + Upstash (both have free tiers sufficient for V1 traffic).

### MVP Feature Set — Phase 1 (V1)

**Core journeys supported in V1:**
- Football group captain → La Cancha → WhatsApp
- Birthday parent → Eventos → WhatsApp or form
- Corporate coordinator → Eventos → form or WhatsApp
- Owner → receives Resend email → responds via WhatsApp

**Must-have capabilities:**

| Capability | Justification |
|---|---|
| 3 pages: Home, La Cancha, Eventos | Core product — without this, nothing exists |
| Floating WhatsApp button (all pages) | Primary conversion action |
| Transparent pricing on La Cancha and Eventos | Market differentiator — no competitor publishes prices |
| Full amenities list on Home + Eventos | Eliminates the #1 pre-contact question |
| Contact form on Eventos + Resend delivery | Captures event leads with full context for owner |
| Rate limiting on form | Prevents spam to owner's email |
| JSON-LD structured data | Enables Google rich results and local SEO |
| `next/image` + WebP placeholders | LCP < 2.5s — non-negotiable for mobile-first Bolivia |
| Mobile-first responsive design | >80% of traffic will be mobile |
| Google PageSpeed ≥ 90 | Prerequisite for local SEO competitiveness |

**Intentionally deferred from V1:**

| Deferred | Reason |
|---|---|
| Online booking calendar | V2 trigger when WhatsApp volume justifies it |
| Professional photography | Post-launch swap — placeholders ship day 1 |
| Analytics/heatmaps | No traffic baseline yet |
| Cancellation policy | Owner has not defined it yet |
| Hour 4+ pricing | TBD — ships with "consultar" note until defined |
| Off-peak / training pricing | Use case not fully defined |

### Risk Mitigation Strategy

**Technical risks:**

| Risk | Likelihood | Mitigation |
|---|---|---|
| Resend email not delivered (spam) | Low | Verify domain in Resend dashboard before launch; test delivery pre-launch |
| Rate limiter blocks legitimate users | Low | 5/hr/IP is generous for local venue traffic |
| Images too heavy → LCP fail | Medium | `next/image` + WebP + Lighthouse CI gate prevents regression |
| Upstash Redis quota exceeded | Very low | Free tier = 10K req/day; venue will not approach this in V1 |

**Market risks:**

| Risk | Likelihood | Mitigation |
|---|---|---|
| Low organic traffic in first 30 days | Medium | Google Business Profile is the real traffic driver — launch GBP simultaneously with site |
| WhatsApp number changes post-launch | Low | Number in `config/site.ts` — one change updates all CTAs |
| Owner overwhelmed by leads | Low | Form pre-qualifies with date + type — owner responds faster with structured data |

**Scope risks:**

| Risk | Likelihood | Mitigation |
|---|---|---|
| Pricing TBDs delay launch | Medium | Ship with "Consultar disponibilidad" placeholder — confirm numbers, update copy with zero code changes |
| Professional photos never arrive | Low | `<VenueImage>` placeholders designed for zero-code swap |

---

## Functional Requirements

### Site Navigation & Structure

- **FR1:** Visitors can navigate between Home, La Cancha, and Eventos from any page without losing their position
- **FR2:** Visitors can reach WhatsApp contact from any page at any scroll position
- **FR3:** Visitors can identify the venue name, location, and contact method from the footer on any page
- **FR4:** Visitors on mobile can access the full navigation menu from a compact control
- **FR5:** Search engines can crawl all three pages via a machine-readable sitemap

### Content & Information Display

- **FR6:** Visitors can see the complete list of venue amenities (field, salon, BBQ, kitchen, trampoline, foosball, tables/chairs, carpa, umbrellas, bathrooms) in one place
- **FR7:** Visitors can see the field specifications (surface type, dimensions, capacity, lighting) on La Cancha
- **FR8:** Visitors can see all pricing tiers (field day, field night, full venue hourly) with the minimum booking requirement clearly stated
- **FR9:** Visitors can see a fixed-price event package for birthdays/events on the Eventos page *(content TBD — ships with placeholder until owner confirms)*
- **FR10:** Visitors can see the booking conditions (deposit requirement, minimum advance booking, minimum hours) without initiating contact
- **FR11:** Visitors can see typical availability windows to self-qualify before contacting
- **FR12:** Visitors can see venue photography across all three pages
- **FR13:** Visitors can get answers to the most common questions (capacity, what's included, how to book, parking, location) without contacting the owner
- **FR14:** Visitors on Home can identify which page matches their need (field rental vs. event) and navigate directly to it

### Lead Capture & Contact

- **FR15:** Visitors can initiate WhatsApp contact with a pre-composed message relevant to the page they are on (La Cancha vs. Eventos)
- **FR16:** Visitors on Eventos can submit a structured inquiry including their name, phone number, event date, event type, and estimated guest count
- **FR17:** Visitors receive on-screen confirmation after submitting the contact form
- **FR18:** Visitors are offered a WhatsApp alternative after submitting the contact form
- **FR19:** Visitors who submit invalid or incomplete form data see specific inline error messages per field without losing their other inputs

### Owner Notifications & Lead Management

- **FR20:** The owner receives an email notification for every contact form submission containing all submitted fields, formatted for quick WhatsApp follow-up
- **FR21:** The system prevents automated or excessive form submissions from a single source within a defined time window
- **FR22:** The owner's contact information (WhatsApp number, email) can be updated site-wide from a single configuration file

### SEO & Discoverability

- **FR23:** Each page presents unique, descriptive metadata (title, description) to search engines and social platforms
- **FR24:** The site presents structured data describing the venue as a sports location with amenities and contact information
- **FR25:** The site presents structured data for the FAQ content in a format search engines can parse
- **FR26:** The site declares its crawling policy for search engines and AI agents
- **FR27:** AI language models can read a machine-readable description of the venue and its services

### Performance & Media

- **FR28:** Venue images load progressively — visitors see a placeholder immediately and the full image as it loads, with no layout shift
- **FR29:** The site meets Core Web Vitals thresholds on mobile devices with typical Bolivian 4G connections
- **FR30:** All venue images can be replaced with updated assets without requiring code changes

### Localization & Brand Consistency

- **FR31:** All visitor-facing copy is in Spanish by default
- **FR32:** The site infrastructure supports adding an English language variant without structural changes
- **FR33:** All brand strings (venue name, phone number, address, WhatsApp link) are sourced from a single configuration — changing them once updates the entire site

---

## Non-Functional Requirements

This section covers quality attributes for a mobile-first marketing site targeting Bolivia's 4G network. No auth, payments, or sensitive stored data — requirements are scoped to performance, security of the contact form, and public accessibility.

### Performance

**Context:** The primary audience is on mobile 4G in La Paz. Slow pages convert poorly and rank poorly on Google. Performance is a direct SEO and conversion requirement.

| Requirement | Target | Rationale |
|---|---|---|
| **NFR-P1** Largest Contentful Paint (LCP) | < 2.5s on mobile 4G | Google Core Web Vitals threshold; hero image is critical path |
| **NFR-P2** Cumulative Layout Shift (CLS) | < 0.1 | Fixed aspect ratios on all images; no late-injected content |
| **NFR-P3** Interaction to Next Paint (INP) | < 200ms | Server Components minimize client JS; form state via `useActionState` |
| **NFR-P4** First Load JS bundle | < 80KB | No unnecessary client bundles; `'use client'` only where required |
| **NFR-P5** Google PageSpeed mobile score | ≥ 90 | Success criterion; prerequisite for local SEO competitiveness |
| **NFR-P6** Google PageSpeed desktop score | ≥ 95 | Measured via Lighthouse; CI gate prevents regression |

**Implementation notes:**
- Hero image served with `next/image` `priority` flag — preloaded, never lazy-loaded
- All images: WebP format, < 500KB, `blur` placeholder to eliminate CLS
- Fonts: `next/font` with `display: swap` — no FOUT, no extra network round-trip
- No third-party scripts in V1 (no analytics, no chat widgets, no tracking pixels)

---

### Security

**Context:** No user accounts, no payments, no sensitive stored data. The only attack surface is the Eventos contact form. Security requirements are scoped accordingly — lightweight but not absent.

| Requirement | Target | Rationale |
|---|---|---|
| **NFR-S1** Rate limiting on contact form | 5 submissions/hr/IP via Upstash Redis | Prevents spam to owner's email; protects Resend sending quota |
| **NFR-S2** No PII in server logs | Names, phones, email addresses MUST NOT appear in `console.log` or error logs | Privacy hygiene; AGENTS.md absolute rule |
| **NFR-S3** Server-side form validation | All contact form inputs validated in `actions.ts` before Resend call | Client validation alone is bypassed; no trust in browser input |
| **NFR-S4** No technical error details exposed to users | Generic messages on server errors; specifics logged server-side only | Prevents information disclosure |
| **NFR-S5** Environment variables for all secrets | Resend API key, Upstash credentials — never in source code | Standard secrets hygiene; enforced by `.env.local` + Vercel env vars |
| **NFR-S6** API routes validate env vars first | Before any business logic, check required env vars are present | Prevents silent failures in production misconfiguration |
| **NFR-S7** HTTPS only | Enforced by Vercel — no opt-out | Baseline transport security |
| **NFR-S8** Content Security Policy | `next.config.ts` headers — allow only known origins | Mitigates XSS; no inline scripts in production |

---

### Accessibility

**Context:** Public-facing site for a local family and sports venue. Users include parents across age groups, on mobile. WCAG 2.1 AA is the target — not audited for legal compliance but required for good UX and Lighthouse score.

| Requirement | Target | Rationale |
|---|---|---|
| **NFR-A1** Lighthouse Accessibility score | ≥ 95 | CI gate; success criterion from step-03 |
| **NFR-A2** Semantic HTML throughout | Headings in correct order (`h1` → `h2` → `h3`); landmark regions (`main`, `nav`, `footer`) | Screen reader navigation; SEO signal |
| **NFR-A3** ARIA labels on all interactive elements | WhatsApp buttons, form inputs, nav toggle — descriptive labels in Spanish | Non-visual users can operate all CTAs |
| **NFR-A4** Color contrast ratio | ≥ 4.5:1 for body text; ≥ 3:1 for large text and UI components | WCAG 2.1 AA; enforced via `@theme` tokens (not hardcoded hex) |
| **NFR-A5** Focus management on form submission | On success: focus moves to confirmation message; on error: focus moves to first invalid field | Keyboard and screen reader users complete the form correctly |
| **NFR-A6** Touch targets ≥ 44×44px | All buttons and links on mobile | Fat-finger usability; WCAG 2.5.5 |
| **NFR-A7** Images have descriptive `alt` text | Venue photos describe the space for non-visual users; decorative images use `alt=""` | WCAG 1.1.1 |

---

### Scalability

**Context:** V1 serves a single local venue with modest expected traffic (< 1,000 unique visits/month in the first quarter). No custom infrastructure to scale. All scalability is inherited from Vercel's platform.

- **NFR-SC1:** The site is deployed to Vercel and scales automatically to traffic spikes (e.g., a viral social media post about the venue) without operator intervention
- **NFR-SC2:** Static pages (Home, La Cancha) are statically generated at build time — zero server load under any traffic volume
- **NFR-SC3:** The Eventos page with the contact form is the only Server Action endpoint; Upstash rate limiting caps its load at 5 req/hr/IP
- **NFR-SC4:** Upstash free tier (10K req/day) is sufficient for V1 projected traffic; no capacity planning required until V2

