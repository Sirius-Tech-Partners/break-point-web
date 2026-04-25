---
title: "Product Brief: Break Point Web — Landing Site"
status: "complete"
created: "2026-04-24"
updated: "2026-04-24"
inputs:
  - "Founder interview (Mauricio, April 2026)"
  - "BLUEPRINT.md — Sirius Tech Partners institutional architecture"
  - "AGENTS.md — project-specific stack and constraints"
  - "package.json — installed dependencies"
---

# Product Brief: Break Point — Informational Landing Site

## Executive Summary

Break Point is a private sports and events complex located in the Caliri neighborhood of La Paz, Bolivia's zona sur — a sunny, residential area with growing demand for family-friendly recreational spaces. The complex offers a single, high-quality five-a-side football field with synthetic grass, paired with a full event suite: a salon, BBQ area, kitchen, and bathrooms. Unlike shared sports facilities that fragment the experience, Break Point operates as an all-inclusive, exclusive venue: when you book, the entire space is yours.

Today, Break Point has no digital presence. Every booking comes through personal referral and WhatsApp. This landing site is the first step in building a scalable, professional public face — one that answers the three questions every prospective customer asks before they reach out: *What does the place look like? How much does it cost? How do I contact you?*

The V1 goal is straightforward: convert curious visitors into WhatsApp conversations. Everything else — online booking, client databases, marketing automation — comes in V2.

---

## The Problem

Finding a venue in La Paz that combines recreational football with a complete event experience is harder than it sounds. Most canchas are bare fields: you bring the food, you manage the music, you find bathrooms somewhere. Families planning a children's birthday party who want football *and* a proper space to eat and celebrate face a fragmented market — they book a cancha here, a salon there, and still end up improvising.

Break Point solves this by bundling everything under one roof: field, salon, BBQ, kitchen, outdoor areas. The tradeoff is the all-or-nothing model — no splitting the field from the event spaces — which actually becomes a feature: guests get the whole place to themselves, creating the privacy and exclusivity that group events demand.

The missing piece is visibility. Right now, the only people who find Break Point are those who already know someone who's been there. An entire addressable market — parents in zona sur browsing for birthday options, office coordinators looking for team-building spaces, football groups tired of waiting for a public court — has no way to discover the complex exists.

---

## The Solution

A three-page informational landing site that:

1. **Home** — Introduces Break Point through its key proposition: a complete, exclusive venue for football and events. Hero section with venue photography, a quick breakdown of facilities (field, salon, BBQ, kitchen, outdoor areas), and extra activities (foosball table, trampoline, and more being added). Primary CTA: WhatsApp.

2. **Pricing & Availability** — Transparent pricing tiers with clear rental logic. Standard rates: Bs 120/hr (field, daytime) · Bs 130/hr (field, nighttime) · Bs 250/hr (full venue, all spaces). Typical availability windows so prospects self-qualify before reaching out. Space for a "custom quote" CTA for non-standard events.

3. **Contact** — WhatsApp button (primary), a contact form for lead capture (secondary, feeds V2 client database), and location details (Barrio Caliri, La Paz zona sur) with map reference.

The site is built on an already-scaffolded Next.js 16 stack with React 19, Tailwind v4, and Resend email integration — meaning the technical infrastructure for the contact form, rate limiting, and SEO is production-ready from day one.

---

## What Makes This Different

**Exclusivity by design.** You don't share the complex with strangers. The all-or-nothing rental model means your group owns the entire space for the duration of your event — no overlapping birthday parties, no strangers on the field.

**Full venue, not just a field.** The combination of synthetic grass + salon + BBQ + kitchen in one location is rare for La Paz's zona sur residential market. Families don't have to coordinate multiple venues or logistics.

**Sunshine and calm.** The Caliri neighborhood is known for receiving sunlight throughout the day — a real differentiator for outdoor birthday parties and afternoon football in a city where weather and neighborhood feel matter.

**A growing activity suite.** Football is the anchor, but foosball tables, a trampoline, and future additions expand the draw beyond pure sport. This positions Break Point as an *activity destination*, not just a cancha.

**Zero digital competition at this address.** The local market for private sports venues operates largely through word of mouth and basic social profiles. A well-executed landing site immediately becomes the most professional digital presence in the local segment.

---

## Who This Serves

**Primary — Recreational football groups:** Friends, colleagues, or neighbors who want to play a casual match on weekday evenings (6–10 PM) or weekend mornings. They're not competing; they want a quality field, easy booking, and no friction. Field fits 5 players per team (5v5). They find venues through WhatsApp groups and word of mouth.

**Primary — Parents planning children's birthday parties:** Families in La Paz zona sur looking for a venue that handles the entertainment (field + activities), the food setup (BBQ + kitchen), and the privacy (exclusive rental). The salon accommodates 70–100 guests. The sweet spot is Saturday events, with a minimum 72-hour advance booking and 50% deposit to confirm.

**Secondary — Social and corporate groups:** Companies or friend groups organizing team-building days or confraternization events. These often happen on Saturdays and require the full venue package (Bs 250/hr, full exclusive use).

**Future — Off-peak users:** Individuals or small groups interested in training, fitness classes, or alternative activities during dead hours (late mornings, early afternoons on weekdays). This segment is being explored and is out of scope for V1.

---

## Success Criteria

**V1 (Landing site launch):**
- First WhatsApp inquiry generated through the site within 30 days of launch
- At least 3 bookings per month attributable to visitors who came through the landing (tracked via "how did you find us?" question at contact)
- Contact form submission rate ≥ 5% of unique visitors (baseline for future comparison)
- Google PageSpeed score ≥ 90 on mobile (required for local SEO)
- Break Point appears in Google Maps results for "cancha fútbol 5 La Paz zona sur" within 30 days of Google Business Profile setup
- Break Point appears in organic Google search results for local queries within 60 days of launch

**V2 indicators (signals to build next):**
- Growing contact form submissions → justifies CRM/client database
- Repeat customers → justifies loyalty or booking management features
- Off-peak inquiries → justifies dedicated pricing page for dead-hour slots

---

## Scope

**In for V1:**
- Three-page site: Home · Pricing & Availability · Contact
- WhatsApp CTA (primary contact channel)
- Transparent pricing tiers: Bs 120/hr (field, day) · Bs 130/hr (field, night) · Bs 250/hr (full venue). Cancha minimum 1 hour. Events: minimum 72-hour advance booking, 50% deposit to confirm.
- Defined event packages (to be specified): bundled field + salon + BBQ for a set number of hours at a fixed price — reduces decision friction for birthday clients
- Contact form (name, phone, event date, type of event) → Resend email notification to owner
- Basic SEO: meta tags, JSON-LD (Organization + Service + FAQPage schemas), `llms.txt`, `robots.ts`
- Mobile-first, accessible, fast (Core Web Vitals compliant)
- Spanish-first copy; English secondary structure (i18n infrastructure scaffolded, content ES for MVP)
- Venue photography integration (client to provide WebP assets; existing event photos are a strong asset)

**Launch actions (outside the site, recommended alongside V1):**
- Google Business Profile setup (free; enables Google Maps visibility for local searches)
- WhatsApp broadcast to existing contacts announcing the new site
- Post in La Paz zona sur neighborhood Facebook groups
- Begin publishing event photos on at least one social profile (Instagram recommended) to build social proof

**Explicitly out for V1:**
- Online booking / calendar / reservation system
- Client database or CRM
- Social media integration or feeds
- User authentication or admin panel
- AI chat widget or WhatsApp bot
- CMS (no self-editing capability — Starter tier)
- Analytics dashboard or SEO reporting
- Dead-hours / off-peak pricing section (still being defined)
- Formal cancellation policy (to be defined by owner before V2)

---

## Roadmap Thinking

If Break Point's landing delivers consistent inbound inquiries, the natural V2 is a lightweight booking layer: a calendar showing available slots, a WhatsApp pre-fill button with date and event type, and a simple CRM to track leads. This doesn't require a full booking engine — even a Google Calendar integration surfaced on the site would meaningfully reduce the back-and-forth.

At scale, Break Point becomes more than a single venue — it becomes a proven model for a neighborhood sports-and-events destination in zona sur, potentially replicable or expandable. The off-peak activation strategy (training sessions, fitness classes, alternative events) is the first expansion lever, turning dead hours into recurring revenue without adding inventory.

The digital platform grows alongside the physical offering: as Break Point adds activities (more games, equipment, themed party packages), the site evolves to showcase them. The V1 landing is the foundation.
