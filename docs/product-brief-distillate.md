---
title: "Product Brief Distillate: break-point-web"
type: llm-distillate
source: "product-brief-break-point-web.md"
created: "2026-04-24"
purpose: "Token-efficient context for downstream PRD creation"
---

# Break Point Web — Detail Pack for PRD Creation

## Business & Venue Facts

- Single 5-a-side football field (synthetic grass). Max 5 players per team = max 10 players on field simultaneously.
- Salon capacity: 70–100 people.
- Supporting spaces: BBQ area (parrillero), kitchen, men's and women's bathrooms, exterior areas (not large).
- All-or-nothing rental model — field and event spaces cannot be rented separately at the same time. If a team is playing, no birthday party can happen in the salon, and vice versa.
- Location: Barrio Caliri, La Paz, Bolivia (zona sur). Neighborhood characteristic: full-day sunshine, residential, family-friendly.
- Owner: Mauricio. Sole operator at this stage.

## Pricing (confirmed)

- Field rental daytime: Bs 120/hr
- Field rental nighttime: Bs 130/hr (higher due to lighting costs)
- Full venue rental (all spaces): Bs 250/hr
- Minimum field rental: 1 hour
- Event packages: not yet formally defined — a key deliverable for V1. Should bundle field + salon + BBQ for a set number of hours at a flat rate (reduces friction for birthday parents).

## Booking Policies (confirmed/in-progress)

- Event reservation: requires 50% deposit to confirm booking.
- Event advance booking: minimum 72 hours before event date (not yet fully formalized — treat as working policy).
- Field reservation: no advance booking minimum defined yet — to be worked out.
- Cancellation policy: does NOT exist yet. Should be defined before V2. Not a blocker for V1 site.

## Activities & Extras (current and planned)

- Current extra activities: futbolín (foosball table), cama elástica (trampoline).
- Planned additions: more activity equipment (owner is actively adding; unspecified).
- These extras are key differentiators for birthday party bookings — children can play football AND other activities.
- For birthdays, the field can be adapted beyond football (space for activities, games).

## Operating Schedule

- Events: primarily Saturdays.
- Field rental: weekday evenings 6:00–7:00 PM start until 10:00 PM. Occasionally Saturday mornings or Sundays at variable hours.
- Dead hours (underutilized slots): late mornings and early afternoons on weekdays. Owner is exploring how to monetize these (training sessions, fitness classes, alternative activities). OUT OF SCOPE for V1.

## Current Customer Acquisition (baseline)

- 100% word of mouth and personal referral.
- Some discovery from parents picking up children in the neighborhood who see the complex.
- WhatsApp is the primary and only contact channel today.
- Zero digital presence: no website, no Instagram, no Facebook, no Google Business Profile.
- Implication: V1 landing is the first digital touchpoint ever. Google Business Profile should launch simultaneously with the site for immediate Maps visibility.

## Target Users (detailed)

**Recreational football groups:**
- Motivation: fun/social, not competitive. Friends, coworkers, neighbors.
- Primary slot: weekday evenings + some weekend mornings.
- Discovery path: WhatsApp groups, word of mouth, referrals.
- Key concern: field availability and easy booking process.

**Parents — children's birthday parties:**
- Motivation: complete event experience without juggling multiple vendors. Field + food + space + activities in one place.
- Primary slot: Saturdays.
- Decision trigger: salon capacity (70–100 people fits large family events), activities for children, BBQ for adults.
- Discovery path: word of mouth from other parents; will likely search Google once site is live.
- Key concern: what's included, pricing, and how to reserve.

**Social/corporate groups:**
- Motivation: team building, confraternization, socializing outside the office.
- Primary slot: Saturdays.
- Budget: higher than individual football groups — full venue package justified.
- Currently underdeveloped as a segment; has growth potential.

**Future segment (out of V1 scope):**
- Training groups, fitness class instructors, alternative event organizers wanting dead-hour slots at reduced pricing.

## Differentiators (owner-stated)

- Exclusivity: the entire complex is yours — no strangers sharing the space.
- Tranquil neighborhood (Caliri): calm, residential, sunny all day.
- All-in-one: field + salon + BBQ + kitchen in one booking — rare in local market.
- Activity destination beyond football: futbolín, trampoline, more to come.
- Field adaptability: can convert field space for non-football birthday activities.

## Technical Context (from codebase analysis)

- Stack: Next.js 16.2.4 (App Router only), React 19.2.4, TypeScript strict, Tailwind v4 (@theme in globals.css), pnpm 9.
- Installed and ready: Upstash Redis (rate limiting), Resend (transactional email), class-variance-authority, lucide-react.
- Contact form pattern: page.tsx (Server) → form component ('use client' + useActionState from 'react') → actions.ts ('use server') → Resend email to owner.
- Rate limiting: mandatory on contact form endpoint (Upstash sliding window, 5 req/IP/hr suggested).
- No middleware.ts — use proxy.ts at repo root for locale detection and security headers.
- i18n: sub-path routing (ES at /, EN at /en/*). Not yet scaffolded. Decision for V1: monolingual ES or bilingual. Recommendation: start ES, scaffold EN path for future.
- SEO mandatory: llms.txt, robots.ts, JSON-LD (Organization, Service, FAQPage, BreadcrumbList), meta tags per page.
- Security headers non-negotiable: CSP nonce, X-Frame-Options DENY, HSTS, Permissions-Policy.
- No CMS (cms_enabled: false — Starter tier). All content hardcoded in config/site.ts.
- No auth, no analytics, no AI agent (all Starter tier limitations).
- Vercel deployment assumed. All secrets in Vercel Dashboard (never .env.local in CI).

## Rejected / Deferred Ideas

- **Online booking/reservation system**: OUT — V2. Would require calendar, payment, and backend complexity beyond Starter scope.
- **Client CRM/database**: OUT — V2. Contact form lays groundwork (lead capture), but no storage layer in V1.
- **AI WhatsApp bot**: OUT — requires ai_agent_enabled: true and $600+/mo Cerebro IA add-on. Not in Starter tier.
- **Dead-hours pricing page**: OUT — owner hasn't finalized this model yet. Placeholder thinking only.
- **Social media feeds on site**: OUT — no social accounts exist yet.
- **Cancellation policy**: Not defined by owner. Cannot include in V1 content. Mark as TODO for owner before launch.
- **Formal minimum booking times for field**: Not finalized beyond "1 hour minimum." Further policy needed.

## Open Questions (unresolved at brief completion)

- Will V1 be monolingual (Spanish only) or bilingual (ES + EN)? Recommendation: ES-only content, EN infrastructure scaffolded.
- What are the specific event package bundles (hours + price)? Owner needs to define before pricing page copy can be written.
- What is the exact WhatsApp number for CTA buttons? Required for implementation.
- What is the domain name? (break-point.bo or similar — needs registration check.)
- Will the owner provide professional venue photos, or will stock/placeholder images be used for launch?
- What email address should receive contact form submissions (via Resend)?

## Go-to-Market Launch Actions (recommended, outside site scope)

1. **Google Business Profile** (free): Create profile at business.google.com → adds Break Point to Google Maps + local search results. Upload venue photos. Add operating hours, WhatsApp number, and website URL once live. This is the single highest-leverage free action.
2. **WhatsApp broadcast**: Message all existing contacts announcing the new website.
3. **Neighborhood Facebook groups**: Post in La Paz / Caliri / zona sur community groups with venue photos and link.
4. **Event photo publishing**: Begin posting existing event photos on Instagram. Each photo shared by event attendees = free reach. Recommended: create Instagram profile before or at launch.

## Sirius Tier & Business Model Notes

- Tier: Starter. Permanent deliverables: 1–3 page landing, 15 days included support, 1 free domain year (if available).
- No self-editing (no CMS). Content changes require developer.
- Add-on path to V2: Business tier adds CMS + analytics + scheduling. Advanced tier adds auth + custom APIs.
- Monthly add-on catalog (for future): Cerebro IA (WhatsApp bot) $600+/mo, Maintenance Basic $80/mo, SEO Reports $150/mo.
