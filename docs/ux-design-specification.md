---
stepsCompleted: [step-01-init, step-02-discovery, step-03-core-experience, step-04-emotional-response, step-05-inspiration, step-06-design-system, step-07-defining-experience, step-08-visual-foundation, step-09-design-directions, step-10-user-journeys, step-11-component-strategy, step-12-ux-patterns, step-13-responsive-accessibility, step-14-complete]
workflowStatus: complete
completedAt: "2026-04-24"
inputDocuments:
  - "_bmad-output/planning-artifacts/product-brief-break-point-web.md"
  - "_bmad-output/planning-artifacts/research/market-break-point-bolivia-research-2026-04-24.md"
  - "_bmad-output/planning-artifacts/prd.md"
  - "/Users/mauricio/Documents/Sirius Tech Partners/TokensBreakPoint.md"
---

# UX Design Specification — Break Point Web

**Author:** Mauricio
**Date:** 2026-04-24

---

<!-- UX design content will be appended sequentially through collaborative workflow steps -->

## Core User Experience

### Defining Experience

The core action of Break Point Web is a single tap: opening WhatsApp with
a pre-filled message. Everything in the design — layout, hierarchy, content
order, CTA placement — exists to make that tap feel natural, fast, and
obvious. The site does not book, charge, or register. It generates the
conversation.

The name "Break Point" signals rest, enjoyment, and cultural escape — not
just sport. The site's emotional register must reflect this: warm and
inviting, not cold and transactional. The field (cancha) is the visual
anchor that opens every page, because it is the product that makes
everything else possible.

### Platform Strategy

- **Primary platform:** Mobile web (Android mid-range, 4G Bolivia)
- **Secondary platform:** Desktop web (birthday parents, corporate coordinators)
- **Interaction model:** Touch-first — tap targets ≥ 44px, thumb-zone CTAs
- **No offline requirement.** No app. No authentication.
- **Performance constraint:** CTA and pricing must render before images load.
  The WhatsApp button is never blocked by image loading state.

### Visual Anchor: The Field

The synthetic grass field is the hero image across all three pages. Each
page uses the field at the time of day that matches its primary user's
mental model:

- **Home hero:** Field during the **day** — warm zona sur sunlight, open and
  inviting. Speaks to both segments. The Caliri sunshine is a real
  differentiator and positions Break Point as a family-friendly, welcoming
  destination before any copy is read.
- **La Cancha hero:** Field at **night** with floodlights — dramatic, energetic,
  high-quality. Exactly the image a football group captain wants to see and
  share with teammates.
- **Eventos hero:** Field visible in background (day), salon/BBQ setup in
  foreground — communicates "the field AND the full venue, yours alone."

The logo (boot + ball, Deep Blue + Vibrant Orange, "Espacio recreativo
cultural") is the brand's visual contract with the user. The site design
inherits its color story directly — no gap between logo identity and
digital presence.

### Effortless Interactions

1. **Finding the price** — Pricing must be scannable without scrolling on
   mobile. No "request a quote" gates for standard tiers. Eventos visitors
   must be able to estimate their total (hours × rate) before contacting.

2. **Tapping WhatsApp** — Floating button visible at all scroll positions.
   Pre-filled message matches the page context. Zero form required for
   La Cancha bookings.

3. **Choosing your path** — A new visitor on Home identifies their segment
   (football vs event) and navigates to the right page within 5 seconds,
   without reading body copy.

### Critical Success Moments

1. **The Hero (0–3 seconds)** — First impression on every page. Each page
   hero must speak directly to its segment. The field image does this work
   before any copy is read.

2. **The Pricing Moment** — For Eventos: the moment the visitor sees a
   calculable tier (3hr base + hour 4+ rate + birthday package). This is
   where "maybe" becomes "let me ask." Tiers must enable independent mental
   math.

3. **The Cross-Sell Discovery (La Cancha → Eventos)** — Football captains
   who discover the full venue (salon, BBQ, trampoline) shift from "I want
   a field" to "I could do my team's year-end party here." La Cancha must
   surface this naturally after the primary field content — never before
   pricing.

4. **The WhatsApp Tap** — The conversion moment. Pre-filled message removes
   the cognitive load of "what do I write."

### Experience Principles

1. **Answer before they ask** — Every question a visitor would type in
   WhatsApp (price, capacity, what's included, availability windows) must
   be answered on-page. Contact is for confirming, not for discovering.

2. **The field opens every door** — The cancha is the entry point for all
   segments. Even corporate and birthday visitors connect emotionally through
   the field first, then expand to the full venue.

3. **One path, one CTA** — La Cancha: WhatsApp only. Eventos: WhatsApp
   primary + form secondary. No page has more than two exit points.

4. **Seed curiosity, don't interrupt flow** — The cross-sell from cancha
   to full venue is a discovery moment, not a sales pitch. After pricing,
   never before.

5. **The price is the trust signal** — Transparent, calculable pricing is
   the primary differentiator. Hiding or gating price destroys the trust
   the site is building.

## Executive Summary

### Project Vision

Break Point Web is a 3-page lead-generation site (Home · La Cancha · Eventos)
for a private sports and events complex in Barrio Caliri, La Paz zona sur.
The sole conversion goal: turn anonymous local search traffic into WhatsApp
conversations. Every design decision serves this objective.

### Target Users

**Primary — Football group captain (Rodrigo, 28)**
Mobile-first, fast decisions, price-sensitive per person. Arrives via Google
Maps or WhatsApp link. Needs: pricing visible immediately, WhatsApp tap within
first scroll. Device: mid-range Android, 4G.

**Primary — Birthday parent (Valeria, 35)**
Desktop-friendly, high-coordination need, evaluates comprehensively before
contacting. Needs: full amenities list, fixed event package price, structured
contact form. Device: mix of mobile and desktop.

**Secondary — Corporate coordinator (Diego, 32)**
Scans quickly for capacity, price per hour block, and total estimate. Uses
contact form for structured inquiries requiring management approval.

### Key Design Challenges

1. **Segment bifurcation at Home** — Visitor must self-identify and route to
   the correct page (La Cancha vs Eventos) within 5 seconds, without confusion.

2. **Trust without professional photography** — Launch uses structured
   placeholder components. Typography, color, and layout must carry the premium
   perception independently.

3. **WhatsApp as primary CTA** — Must feel like a natural, inviting action —
   not a fallback or a chat-spam button. Floating button + inline CTAs designed
   as first-class elements.

4. **Mobile 4G performance** — All above-the-fold content and CTAs must render
   before images fully load. Design decisions must not add JS weight.

### Design Opportunities

1. **First-mover premium** — No local competitor has a well-designed site.
   Executing "Warm Industrial" cleanly creates instant category leadership.

2. **Exclusivity as emotional anchor** — "El lugar es tuyo" is not just copy —
   it's the visual personality: dark Anthracite sections, generous whitespace,
   structured layouts that feel curated and private.

3. **Orange as conversion driver** — Vibrant Orange (#FF8A00) reserved
   exclusively for WhatsApp CTAs and booking actions creates strong visual
   hierarchy and consistent conversion signal across all pages.

4. **Zona sur sunshine** — Warm color story (Orange accent + Off-White canvas)
   connects to the neighborhood's sunlit identity, differentiating Break Point
   from cold/generic sports venue aesthetics.

### Design System Foundation (from Stitch)

Pre-defined system "Warm Industrial" to be used as authoritative source:
- **Primary:** Deep Blue `#00327d` / `#0047AB`
- **CTA / Conversion:** Vibrant Orange `#FF8A00`
- **Dark sections:** Anthracite `#363636` / `#4d4d4d`
- **Canvas:** Off-White `#faf8ff`
- **Headlines:** Space Grotesk 700, -0.02em tracking
- **Body:** Manrope 400, 1.6 line-height
- **Buttons/Labels:** Lexend 500
- **Base grid:** 8px · Container 1280px · Gutters 24px · Radius 16px

## Desired Emotional Response

### Primary Emotional Goals

**Football group captain:**
- **Efficiency + Confidence** — "Price is clear, field looks great, I'm tapping
  WhatsApp right now." No friction, no doubt.
- **Anticipation** — The nighttime field hero creates excitement before the
  visit. The group chat already wants to go.

**Birthday parent / Event planner:**
- **Relief** — "Everything is in one place. I don't have to coordinate three
  vendors." The full amenities list delivers this moment.
- **Exclusivity** — "The whole place is ours, no strangers." This feeling must
  be present from the hero through to the booking conditions. It justifies
  the price and builds emotional commitment before contact.

**All segments on first visit:**
- **Trust through transparency** — Prices are visible, conditions are clear,
  no hidden surprises. The site feels honest before it feels beautiful.

### Emotional Journey Mapping

| Moment | Target emotion | Design trigger |
|---|---|---|
| Home hero loads | "This looks serious and beautiful" | Field image + Space Grotesk headline + warm sunlight |
| Segment split cards (Home) | "This is for me" | Two clear paths, direct language, no ambiguity |
| Pricing on La Cancha | "Bs 13/person — I'm in" | Clean price display, per-person mental math hint |
| Amenities list on Eventos | "Everything in one place" | Icon grid, visual completeness, no asterisks |
| Booking conditions | "Fair and clear" | Plain language, no legal tone, no hidden fees |
| WhatsApp CTA tap | "Easy, done" | Pre-filled message, zero cognitive load |
| Cross-sell discovery (La Cancha → Eventos) | "I didn't know this was here" | Curiosity, not pressure — shown after pricing |
| Form error | "I know what to fix — or I'll just use WhatsApp" | Inline field errors + WhatsApp alternative always visible |

### Micro-Emotions

- **Confidence over confusion** — Every page has one primary action. Users
  always know what to do next.
- **Trust over skepticism** — Pricing visible without contact. No "call us
  for a quote" gates on standard tiers.
- **Excitement over anxiety** — The field imagery and Orange CTAs create
  forward energy. The site feels like the start of something fun.
- **Belonging over isolation** — "Tu grupo, solo tu grupo" — the exclusivity
  message creates a sense of ownership and group identity.
- **Delight over mere satisfaction** — The cross-sell discovery moment (cancha
  captain finds the full venue) should feel like a pleasant surprise, not a
  sales upsell.

### Design Implications

- **Exclusivity** → Dark Anthracite sections for full-venue content on Eventos.
  Generous whitespace. No cluttered layouts. The space feels curated.
- **Anticipation** → Nighttime field hero on La Cancha. Subtle entrance
  animations via `<AnimatedSection>`. Orange CTA hover state.
- **Relief (events)** → Amenities presented as a complete visual checklist —
  icon + label grid, not prose. The eye scans it in 5 seconds and reads
  "everything is covered."
- **Trust** → Prices displayed as primary content on pricing sections — not
  buried below fold. Exact rates, no "from Bs X."
- **Warmth** → Daytime field hero on Home. Warm Orange accent throughout.
  Copy tone: direct but friendly, never corporate.

### Emotional Design Principles

1. **Feel the place before reading it** — The hero image delivers the
   emotional promise before any copy is processed. Photography choice is
   an emotional decision, not just a visual one.
2. **Exclusivity is earned, not announced** — Dark sections, generous
   whitespace, and "todo el lugar es tuyo" copy create the feeling of
   privacy without overstating it.
3. **Anticipation drives the tap** — The WhatsApp CTA should feel like the
   natural next step in an already-exciting plan, not a form submission.
4. **Delight lives in the discovery** — The cross-sell from cancha to full
   venue must feel like stumbling onto something good, not a banner ad.
5. **Relief is a product feature** — For event planners, the emotional value
   of "one venue, everything included" is as important as the price.

## UX Pattern Analysis & Inspiration

### Inspiring Products Analysis

**PedidosYa / Yango — "Price on the card, one tap to act"**
Both apps show the essential decision information (price, time, destination)
before the user taps in. There is no discovery phase inside the action —
the user already knows what they're getting before committing. Applied to
Break Point: pricing must be visible on the section card, not behind a
"contact us for pricing" gate. The tap to WhatsApp is the equivalent of
"confirmar pedido."

**Instagram — "Visual-first, scroll-reveal, tap to act"**
Full-bleed imagery with minimal overlay text. Content hierarchy is
established by image quality and size, not by text density. Users scroll
until something stops them, then they act. Applied to Break Point: each
section hero must stop the scroll on its own — through image, contrast,
or a bold headline. Copy supports the image; it does not replace it.

**TikTok — "Algorithm delivers you to the right local audience"**
TikTok's location-aware algorithm surfaces local business content to
nearby users without requiring a follower base. In Bolivia, this is the
primary organic discovery channel for venues. Key behavioral pattern:
users see TikTok content → share link via WhatsApp → recipient opens link
in WhatsApp in-app browser → lands on site. The site must perform in this
exact context: fast first paint, visible CTA before scroll, shareable URL.

**Facebook Groups — "Community as discovery"**
Local neighborhood Facebook groups (La Paz zona sur) are where birthday
party recommendations circulate. The site URL must work as a standalone
credibility signal: OG preview (title + image + description) must be
compelling enough to generate the tap when shared in a group.

### Transferable UX Patterns

**Navigation Patterns:**
- **Single-action per page** (from Yango/PedidosYa) — each page has one
  primary exit: WhatsApp. No competing destinations.
- **Sticky bottom CTA on mobile** (from delivery apps) — primary action
  button fixed at viewport bottom, always reachable with the thumb.

**Interaction Patterns:**
- **Pre-filled action** (from Yango destination pre-fill) — WhatsApp opens
  with a message already composed. Zero typing required.
- **Visual card pricing** (from PedidosYa restaurant cards) — pricing tiers
  as scannable cards with total cost calculable at a glance.
- **Scroll-triggered section reveals** (from Instagram feed) — `<AnimatedSection>`
  entrance animations on scroll. Creates progression through longer pages.

**Visual Patterns:**
- **Full-bleed hero images** (from Instagram/TikTok) — field fills the
  viewport. No white borders or card frames around the hero.
- **Dark section contrast breaks** (from TikTok's dark UI) — Anthracite
  sections create visual "break points" in the scroll, resetting attention.
- **Icon + label amenity grids** (from delivery app category icons) —
  amenities as icon + single label grid. Scannable in under 3 seconds.

### Anti-Patterns to Avoid

- **"Contact us for pricing"** — Primary bounce trigger. Transparent pricing
  is the differentiator; never gate it.
- **Email as primary contact** — Target users do not use email for local
  venue inquiries. WhatsApp is the channel.
- **Desktop-first layouts ported to mobile** — Destroys experience for
  the 80%+ mobile audience.
- **Stock photography** — Users in Bolivia recognize it immediately and it
  destroys trust. Real venue photos (even cellphone) outperform stock.
- **Autoplay video heroes** — Heavy JS, CLS risk, slow LCP on 4G.
- **Chat widget** — Adds JS weight and confuses users who expect WhatsApp.

### Design Inspiration Strategy

**Adopt directly:**
- Single-action-per-page model from delivery apps
- Pre-filled WhatsApp message pattern
- Visual card pricing layout
- Sticky floating WhatsApp button (delivery app bottom CTA)

**Adapt for Break Point:**
- TikTok full-screen vertical → mobile-first hero with full-viewport field
  image and minimal overlay text. Hero must work as shareable thumbnail
  when URL is posted in WhatsApp or TikTok bio.
- Instagram scroll-reveal → `<AnimatedSection>` entrance reveals, subtle
  and performance-safe.

**Avoid entirely:**
- Email-first contact flows, stock photography, autoplay video heroes,
  chat widgets, desktop-first grid layouts.

## Design System Foundation

### Design System Choice

**Custom Design System built on Tailwind v4**

Pre-defined via Google Stitch as "Warm Industrial." All tokens translate
directly to Tailwind v4 `@theme` block in `app/globals.css`. No external
component library — all components built from scratch using CVA
(class-variance-authority) for variants and `cn()` for conditional classes.

### Rationale

- Identity is already established: Deep Blue + Vibrant Orange + Anthracite
  is a strong, differentiated palette. An external system would override it.
- 3-page site with no auth, no dashboard, no complex components. External
  libraries add bundle weight with no benefit.
- Tailwind v4 `@theme` tokens are the single source of truth — one token
  change updates the whole site. Zero drift between design and code.
- CVA component variants handle the two-segment design: La Cancha and
  Eventos components share base styles but use distinct accent treatments.

### Color Hierarchy & Segment Strategy

Research confirms: conversion CTAs must be one consistent color across all
pages. Per-segment color applies to section accents only — never to the
primary action button.

| Element | La Cancha | Eventos | Rationale |
|---|---|---|---|
| Section accent (nav active, badge, underline) | Blue `#0047AB` | Orange `#FF8A00` | Segment identity signal |
| WhatsApp CTA (primary button) | Orange `#FF8A00` | Orange `#FF8A00` | Learned behavior — orange always = convert |
| Form submit button | — | Blue `#0047AB` | Secondary action, trust signal |
| Price highlight | Blue | Blue | Informational, consistent |
| Success / available indicator | Green `#3D6B47` | Green `#3D6B47` | Semantic only |

### Token Map — Stitch → Tailwind v4 `@theme`

```css
@theme {
  /* Brand */
  --color-primary:            #00327d;
  --color-primary-500:        #0047ab;
  --color-cta:                #ff8a00;
  --color-surface:            #faf8ff;
  --color-surface-low:        #f3f3fc;
  --color-dark:               #363636;
  --color-dark-mid:           #4d4d4d;
  --color-on-surface:         #191b22;
  --color-on-surface-var:     #434653;
  --color-outline:            #737784;
  --color-error:              #ba1a1a;

  /* Semantic — availability & success */
  --color-available:          #3d6b47;
  --color-available-dark:     #2d5a3d;  /* gradient on Anthracite sections */

  /* Typography */
  --font-heading: 'Space Grotesk', sans-serif;
  --font-body:    'Manrope', sans-serif;
  --font-ui:      'Lexend', sans-serif;

  /* Spacing (8px base grid) */
  --spacing-xs:        4px;
  --spacing-sm:        12px;
  --spacing-md:        24px;
  --spacing-lg:        48px;
  --spacing-xl:        80px;
  --spacing-container: 1280px;
  --spacing-gutter:    24px;

  /* Border radius */
  --radius-sm:   0.25rem;
  --radius-md:   0.75rem;
  --radius-lg:   1rem;
  --radius-xl:   1.5rem;
  --radius-full: 9999px;
}
```

### Availability Display Strategy

**V1 — Static text in La Cancha page**
Hardcoded availability windows in page copy. Updated by dev when needed.

**V1.5 — Config file (no CMS required)**
`config/availability.ts` with structured weekly slots. Owner notifies dev
of changes → 2-minute update → auto-deploy on Vercel. The `<AvailabilityGrid>`
component reads this file and renders slots with green/gray indicators.
Zero backend, zero CMS, zero code change to add this feature.

**V2 — Google Calendar or Notion API**
Same `<AvailabilityGrid>` component, data source swapped to a live API.
No design or layout changes required.

> V1.5 availability config is flagged for PRD update as a post-launch
> sprint feature — addable without architectural changes.

### Customization Strategy

- **Dark sections:** Anthracite (`--color-dark`) backgrounds with
  `--color-available-dark` 2px top gradient on key containers.
- **CTA hierarchy:** `--color-cta` used exclusively for WhatsApp buttons
  across all pages. Never decorative.
- **Primary Blue:** Navigation, links, secondary actions, trust elements.
- **Elevation:** Three tonal layers — base canvas, card (1px border +
  soft shadow), interactive (blue-tinted lift shadow on hover).
- **Separators:** 1px `--color-cta` at 20% opacity for "Warm Industrial"
  section dividers.

## Defining Core Experience

### The Defining Interaction

Break Point Web: **"Ver → precio → WhatsApp."**
Three steps. No registration, no confirmation screen, no waiting.
The site exists to make this sequence feel inevitable.

### User Mental Model

Zona sur residents find venues through WhatsApp group recommendations.
The mental model: "someone I trust told me → I look it up → I contact them."
The site enters at step 2. It IS the "looking it up" moment.

Break Point eliminates the three friction points of the current market:
- No website → can't verify the place is real before contacting
- Price only on request → creates back-and-forth before any commitment
- Multiple contact channels → uncertainty about which one the owner checks

### Success Criteria

1. Field visible on load — no spinner, no layout shift. *(LCP < 2.5s)*
2. Visitor identifies their segment within 5 seconds, without scrolling
   past the hero.
3. Visitor finds their price without navigating away from their page.
4. WhatsApp opens with pre-filled message — Send is the only next step.
5. Owner receives message with enough context to respond immediately.

### Pattern Strategy

All patterns are established — no user education required.
Full-bleed hero, sticky CTA, pre-filled action, segment cards,
icon grids, scroll reveals. Users already know how all of these work.

### Experience Mechanics — The WhatsApp Tap

**Tap → WhatsApp opens → pre-filled message → Send.**
Three steps. The pre-filled message is the only UX decision that matters:
specific enough to give context, short enough that the user reads it
before sending.

Pre-filled messages by page:
- Home: `"Hola, quiero consultar sobre Break Point"`
- La Cancha: `"Hola, quiero reservar la cancha"`
- Eventos: `"Hola, quiero consultar disponibilidad para un evento"`

### Availability Display Strategy

**V1 — Static text on La Cancha page**
"Horarios típicos: lunes–viernes 18:00–22:00 · sábados 08:00–14:00."
Updated by dev when needed. Zero component complexity.

**V1.5 — Google Calendar embed (iframe)**
Owner marks bookings as "busy" in their own Google Calendar → public
calendar iframe appears on the page showing real availability. Zero dev
work to update. No API, no backend. Owner already manages their
calendar — this just surfaces it.

**V2 — Interactive `<AvailabilityGrid>` with API**
If booking volume justifies it, the iframe is replaced with a proper
component fed by Google Calendar API. No design or layout changes.

## Visual Design Foundation

### Brand Identity

**Logo:** Boot + ball icon (orange→blue gradient) · "BREAK POINT" wordmark ·
tagline "Juega. Celebra. Disfruta."

**Typography updates from original logo:**
- Wordmark: Space Grotesk ExtraBold 800 · `#00327d` · tracking -0.02em
- Tagline: Lexend Regular 400 · `#434653` · tracking +0.05em · ~40% wordmark size

### Color System

#### Palette

| Token | Hex | Role |
|---|---|---|
| `--color-primary` | `#00327d` | Brand anchor, navigation, trust elements |
| `--color-primary-500` | `#0047ab` | Interactive states, links, secondary buttons |
| `--color-cta` | `#ff8a00` | WhatsApp CTAs exclusively — never decorative |
| `--color-surface` | `#faf8ff` | Main canvas background |
| `--color-surface-low` | `#f3f3fc` | Card backgrounds, subtle separation |
| `--color-dark` | `#363636` | Anthracite sections (exclusivity, contrast breaks) |
| `--color-dark-mid` | `#4d4d4d` | Secondary dark elements on Anthracite sections |
| `--color-on-surface` | `#191b22` | Primary text on light backgrounds |
| `--color-on-surface-var` | `#434653` | Secondary text, labels, captions |
| `--color-outline` | `#737784` | Borders, dividers, input outlines |
| `--color-available` | `#3d6b47` | Availability indicators, success states |
| `--color-available-dark` | `#2d5a3d` | Gradient accent on Anthracite sections |
| `--color-error` | `#ba1a1a` | Form validation errors |

#### Semantic Color Usage

| Context | Color | Do / Don't |
|---|---|---|
| WhatsApp button (all pages) | `--color-cta` bg + `--color-on-surface` text | ✅ Dark text on orange — WCAG AA compliant |
| La Cancha section accents | `--color-primary-500` | ✅ Underlines, active nav, badges |
| Eventos section accents | `--color-cta` | ✅ Orange accents for warmth/celebration |
| Form submit (Eventos) | `--color-primary-500` | ✅ Blue = trust/information action |
| Success confirmation | `--color-available` | ✅ Form sent, availability = available |
| Dark section backgrounds | `--color-dark` | ✅ Exclusivity sections, full-venue content |
| Decorative use of orange | — | ❌ Never — CTA color only |

#### WCAG Contrast Ratios

| Combination | Ratio | WCAG AA |
|---|---|---|
| `#191b22` on `#faf8ff` (body text) | 18.1:1 | ✅ AAA |
| `#ffffff` on `#00327d` (nav) | 13.2:1 | ✅ AAA |
| `#ffffff` on `#0047ab` (blue button) | 8.1:1 | ✅ AAA |
| `#191b22` on `#ff8a00` (CTA button) | 7.0:1 | ✅ AAA |
| `#ffffff` on `#ff8a00` (avoid) | 2.6:1 | ❌ Fails — use dark text on orange |
| `#ffffff` on `#363636` (dark section) | 10.7:1 | ✅ AAA |
| `#434653` on `#faf8ff` (secondary text) | 7.8:1 | ✅ AAA |

### Typography System

#### Font Stack

| Role | Font | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Logo wordmark | Space Grotesk | 800 ExtraBold | — | — | -0.02em |
| H1 — Page hero | Space Grotesk | 700 Bold | 48px / 3rem | 1.1 | -0.02em |
| H2 — Section title | Space Grotesk | 700 Bold | 36px / 2.25rem | 1.2 | -0.02em |
| H3 — Card title | Space Grotesk | 700 Bold | 24px / 1.5rem | 1.2 | -0.02em |
| Body large | Manrope | 400 Regular | 18px / 1.125rem | 1.6 | 0 |
| Body medium | Manrope | 400 Regular | 16px / 1rem | 1.6 | 0 |
| Label / badge | Lexend | 500 Medium | 14px / 0.875rem | 1.0 | 0 |
| Button text | Lexend | 500 Medium | 16px / 1rem | 1.0 | 0 |
| Logo tagline | Lexend | 400 Regular | — | — | +0.05em |

**Google Fonts import order:** Space Grotesk → Manrope → Lexend
**`next/font`** with `display: swap` — no FOUT, preloaded in `app/layout.tsx`

#### Type Hierarchy in Practice

- **H1** — one per page, in the hero only
- **H2** — section titles (Facilities, Pricing, How it works)
- **H3** — card titles, pricing tier names, FAQ questions
- **Body large** — hero subheadline, key descriptions
- **Body medium** — standard copy, conditions, FAQ answers
- **Label** — amenity names under icons, availability chips, nav items
- **Button** — all CTAs, WhatsApp button, form submit

### Spacing & Layout Foundation

#### 8px Base Grid

| Token | Value | Usage |
|---|---|---|
| `xs` | 4px | Icon internal padding, chip height adjustment |
| `sm` | 12px | Tight element spacing, icon-to-label gap |
| `md` | 24px | Component internal padding, card padding |
| `lg` | 48px | Between sections within a page block |
| `xl` | 80px | Between major page sections — creates the "break point" breathing room |
| `container` | 1280px | Max-width centered layout |
| `gutter` | 24px | Left/right page margin on desktop |

**Mobile gutters:** 16px left/right on viewport < 768px

#### Layout Principles

1. **Generous vertical rhythm** — `xl` (80px) between major sections. The
   whitespace reinforces the "premium and exclusive" feeling. Never compress
   sections to save space.
2. **Single-column on mobile** — all layouts collapse to full-width single
   column below 768px. No horizontal scrolling, ever.
3. **Max-width container** — all content centered within 1280px. Beyond that,
   the canvas background (`--color-surface`) extends to viewport edges.
4. **Full-bleed heroes** — hero images extend to viewport edges, outside the
   container. Content overlay stays within the 1280px grid.
5. **Dark sections full-bleed** — Anthracite section backgrounds extend edge
   to edge. Content inside follows the 1280px container + 24px gutters.

### Accessibility Foundation

- **Minimum font size:** 14px (Lexend labels) — never below 12px anywhere
- **Touch targets:** ≥ 44×44px on all interactive elements
- **Focus rings:** 2px solid `--color-primary-500` offset 2px — visible on
  all backgrounds
- **Motion:** `<AnimatedSection>` respects `prefers-reduced-motion` — no
  animations when user has motion sensitivity enabled
- **Images:** All `<VenueImage>` and `<Image>` components require `alt` prop —
  enforced by TypeScript
- **Form labels:** All inputs have visible labels + `aria-describedby` for
  error messages
- **WhatsApp button:** `aria-label="Contactar por WhatsApp"` on all instances

## User Journey Flows

### Venue Amenities (confirmed)

Break Point offers the following facilities — these are the only amenities
referenced in copy, components, and icon grids:

- Cancha al aire libre
- Iluminación nocturna (floodlights)
- Salón para eventos
- Área de parrilla
- Cocina equipada (microondas, refrigerador, cocina, mesón de preparación)
- Baños hombres y mujeres

No vestuarios. No estacionamiento.

### Journey 1 — Capitán reserva cancha

**Persona:** Hombre 25–40, organiza fútbol con amigos. Llega por TikTok o
link de WhatsApp compartido. Entra desde cel (Android mid-range, 4G).

**Goal:** Saber precio y horario disponible → reservar con el menor
intercambio posible de mensajes.

```
[TikTok / WhatsApp share]
        ↓
[Home — hero cancha de día]
  Campo visible + "● Disponible hoy"
        ↓ scroll
[Bifurcación — toca ⚽ La Cancha]
        ↓
[Página La Cancha]
  Hero cancha de noche (floodlights)
  Precio por hora visible: "Bs X / hora"
  Horarios disponibles (V1: texto estático)
  ────────────────────────────────────
  ¿Cómo reservar?
    1. Escribinos por WhatsApp
    2. Confirmamos tu horario
    3. Adelanto asegura tu espacio
  ────────────────────────────────────
  [Reservar por WhatsApp →]
        ↓
[WhatsApp — mensaje pre-llenado]
  "Hola, quiero reservar la cancha"
        ↓
[Dueño confirma horario + solicita adelanto]
        ↓
[Reserva confirmada ✓]
```

**Design decisions:**
- Precio visible antes del CTA — elimina la primera pregunta de WhatsApp
- "¿Cómo reservar?" normaliza el adelanto antes del contacto
- Mensaje pre-llenado acorta la conversación inicial

### Journey 2 — Organizador consulta evento

**Persona:** 30–50, mixto. Organiza cumpleaños, evento familiar o
actividad corporativa. Llega por WhatsApp recomendado o Google.
Puede ser cel o desktop.

**Goal:** Entender qué combinación de espacios necesita → saber si el
precio está en su rango → contactar para cotización exacta y bloquear fecha.

**Pricing model (V1):** El precio de eventos no es fijo — depende de la
combinación de espacios reservados. El sitio muestra las combinaciones
disponibles y dirige a WhatsApp para cotización. Si el modelo cambia, se
actualiza en V2.

```
[WhatsApp recomendado / Google]
        ↓
[Home → toca 🎉 Eventos]
        ↓
[Página Eventos]
  Hero: campo + salón (día, festivo)
  ────────────────────────────────────
  Combinaciones disponibles:
  ┌──────────────────────────────────┐
  │ ⚽ + 🔥  Cancha + Parrillero     │
  │ 🏠 + 🔥  Salón + Parrillero      │
  │ 🏠 + ⚽  Salón + Cancha          │
  │ 🏠+⚽+🔥  Complejo completo      │
  └──────────────────────────────────┘
  Precio: "según combinación y duración
           — cotizá sin compromiso"
  ────────────────────────────────────
  ¿Cómo funciona?
    1. Contanos qué combinación necesitás
    2. Coordinamos precio y disponibilidad
    3. 50% adelanto confirma tu fecha
  ────────────────────────────────────
  [Consultar por WhatsApp →]   ← primario
  [Enviar formulario]          ← secundario
        ↓
[WhatsApp — mensaje pre-llenado]
  "Hola, quiero consultar disponibilidad
   para un evento"
        ↓
[Dueño responde precio + disponibilidad]
        ↓
[50% adelanto → fecha bloqueada ✓]
```

**Design decisions:**
- Combinaciones visuales (no precio único) → visitante elige su caso antes de contactar
- "¿Cómo funciona?" normaliza el 50% adelanto — dueño no lo explica en cada conversación
- Formulario solo en Eventos (PRD) — para coordinadores corporativos que prefieren email

### Journey 3 — Visitante nuevo (descubrimiento)

**Persona:** Llegó por TikTok o referido. No sabe exactamente qué
ofrece Break Point. Puede no tener intención inmediata de reservar.

**Goal:** Entender qué es el lugar en menos de 5 segundos → elegir
su camino o guardar para después.

```
[TikTok / WhatsApp share — sin contexto previo]
        ↓
[Home — 5 segundos para retener]
  Campo de día → lugar real, bonito, accesible
  "BREAK POINT · Juega. Celebra. Disfruta."
  "● Disponible hoy"
        ↓
  ¿Scrollea?
  SÍ ──────────────────────────────────┐
        ↓                              │
  [Bifurcación]                        │
  ┌─────────────┬─────────────────┐    │
  │ ⚽ La Cancha│ 🎉 Eventos      │    │
  │ Alquilá tu  │ Cumpleaños,     │    │
  │ cancha por  │ corporativos,   │    │
  │ hora        │ reuniones       │    │
  │ [Ver más →] │ [Ver más →]     │    │
  └─────────────┴─────────────────┘    │
        ↓                              │
  [Journey 1 o Journey 2]             │
                                       │
  NO (no tiene intención inmediata) ───┘
        ↓
  [Sección Anthracite — amenidades]
  Cancha al aire libre · Iluminación nocturna
  Salón para eventos · Área de parrilla
  Cocina equipada · Baños H/M
  "¿Querés conocer el espacio?"
  [Escribinos por WhatsApp →]
```

**Design decisions:**
- 5 segundos: campo + nombre + tagline + badge = suficiente para retener
- Bifurcación solo 2 opciones — no overwhelm
- Visitante sin intención inmediata igual recibe CTA suave al fondo

### Journey Patterns

| Patrón | Aplicación |
|---|---|
| **Precio antes del CTA** | La Cancha: precio/hora siempre visible antes del botón WhatsApp |
| **Normalizar el proceso** | Sección "¿Cómo funciona?" en La Cancha y Eventos — 3 pasos claros |
| **Mensaje pre-llenado contextual** | Diferente por página, da contexto al dueño desde el primer mensaje |
| **WhatsApp siempre primario** | Formulario solo en Eventos como opción secundaria |
| **Disponibilidad como trust signal** | Badge "● Disponible hoy" en Home y La Cancha — lugar activo y accesible |

### Flow Optimization Principles

1. **Eliminar preguntas predecibles** — precio visible, combinaciones de
   evento listadas, proceso de adelanto explicado. Cada dato que el sitio
   entrega es una vuelta de WhatsApp que el dueño no tiene que dar.
2. **Fricción mínima al CTA** — en La Cancha: hero → precio → CTA (máximo
   2 scrolls). En Eventos: hero → combinaciones → CTA (máximo 3 scrolls).
3. **El dueño recibe mensajes con contexto** — mensaje pre-llenado diferente
   por página. El dueño sabe de qué página viene la consulta sin preguntar.
4. **Adelanto como feature, no como obstáculo** — presentar el adelanto
   como "asegurate el espacio" (beneficio para el visitante), no como
   requisito burocrático.

## Responsive Design & Accessibility

### Responsive Strategy

Break Point Web is **mobile-first**. All layouts are designed for the
smallest supported screen first and progressively enhanced for larger
viewports. Desktop is a secondary experience.

**Primary audience device profile:**
- Android mid-range (Samsung Galaxy A, Motorola Moto G) · 360–412px wide
- iPhone SE through iPhone 15 Pro Max · 375–430px wide
- 4G Bolivia network · intermittent signal in some parts of Zona Sur
- In-app browser (WhatsApp, TikTok) — not full Safari/Chrome

**Secondary:**
- iPad / tablet — birthday parents, event coordinators researching
- Desktop — corporate coordinators, desktop-first WhatsApp Web users

---

### Viewport & Breakpoint Strategy

#### All supported viewports (2025)

**iPhone — iOS Safari**

| Device | Width | Notes |
|---|---|---|
| iPhone SE (1st gen) | 320px | Minimum supported — rare but real |
| iPhone SE (3rd gen) · 13 mini | 375px | Small iPhone baseline |
| iPhone 14 · 15 · 14 Pro | 390px | Most common current iPhone |
| iPhone 15 Pro | 393px | Slightly wider Pro model |
| iPhone XR · 11 | 414px | Older large iPhone |
| iPhone 14 Plus · 15 Plus · 15 Pro Max | 430px | Largest current iPhone |

**Android — Chrome**

| Device | Width | Notes |
|---|---|---|
| Samsung Galaxy A14/A15 · Moto G | 360px | Most common Bolivia mid-range |
| Samsung Galaxy A54 · Pixel 7a | 384px | Mid-tier Android |
| Samsung Galaxy S23 · Pixel 7 | 412px | Android flagship |
| Samsung Galaxy S24 Ultra | 440px | Large Android |

**Tablet**

| Device | Width | Notes |
|---|---|---|
| iPad Mini | 768px | Tablet baseline |
| iPad Air | 820px | Common iPad |
| iPad Pro 11" | 1024px | Large tablet / small desktop |

**Desktop**

| Width | Notes |
|---|---|
| 1024px | Laptop minimum |
| 1280px | Container max-width |
| 1440px | Common laptop |
| 1920px | Full HD — canvas extends, content stays 1280px |

#### Tailwind v4 Breakpoints (in `@theme`)

```css
@theme {
  --breakpoint-sm:  375px;   /* iPhone SE baseline */
  --breakpoint-md:  768px;   /* Tablet */
  --breakpoint-lg:  1024px;  /* Desktop */
  --breakpoint-xl:  1280px;  /* Container max */
  --breakpoint-2xl: 1440px;  /* Large desktop */
}
```

---

### iOS iPhone Width Fix — Known Issues & Solutions

> These fixes address the reported issue of content appearing wider
> than the screen on iPhones.

#### Root causes (all must be addressed):

**1. Viewport meta tag — REQUIRED in `app/layout.tsx`**
```tsx
<meta name="viewport"
  content="width=device-width, initial-scale=1, viewport-fit=cover" />
```
- `width=device-width` — prevents iOS from zooming out to fit wide content
- `viewport-fit=cover` — required for safe area insets (notch/Dynamic Island)

**2. Global overflow prevention — in `app/globals.css`**
```css
html, body {
  overflow-x: hidden;
  max-width: 100vw;
}
```
Prevents any element wider than the viewport from causing horizontal scroll.

**3. Avoid `100vw` for widths — use `width: 100%` instead**
`100vw` includes the scrollbar width on some browsers → causes 15–17px
overflow on iOS. Use `w-full` (Tailwind) or `width: 100%` everywhere.

**4. Input zoom prevention (iOS Safari)**
Any `<input>` or `<textarea>` with `font-size < 16px` triggers automatic
zoom on iOS Safari. All form inputs must use `font-size: 16px` minimum.
In `<ContactForm>`: `text-base` (16px) on all inputs — enforced.

**5. Full-height sections — use `100dvh` not `100vh`**
`100vh` on iOS Safari includes the browser toolbar → content gets cut off.
Use `h-[100dvh]` (dynamic viewport height) for the hero section.
`dvh` is supported in iOS 15.4+ (covers all relevant iPhones).

**6. Safe area insets — notch & Dynamic Island**
iPhone X and later have a notch or Dynamic Island. The floating WhatsApp
button must clear the home indicator bar at the bottom.
```css
.btn-whatsapp-floating {
  bottom: calc(1.5rem + env(safe-area-inset-bottom));
}
```

**7. `-webkit-text-size-adjust` — in `app/globals.css`**
```css
html {
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}
```
Prevents iOS from auto-adjusting font sizes when rotating or resizing.

**8. Tap delay removal — on all buttons**
```css
button, a {
  touch-action: manipulation;
}
```
Removes the 300ms tap delay on iOS Safari without disabling zoom.

---

### Component Responsive Behavior

#### `<Navbar>`
| Viewport | Behavior |
|---|---|
| `< md` (mobile) | Logo left · WhatsApp button right · no nav links |
| `≥ md` (tablet+) | Logo left · nav links center · WhatsApp button right |

#### `<HeroSection>`
| Viewport | Behavior |
|---|---|
| `< md` | Full-screen `h-[100dvh]` · text stack vertical · CTA full-width |
| `≥ md` | Full-screen · text left-aligned · CTA inline |
| Parallax | Desktop only (`≥ lg`) · disabled on mobile |

#### `<SegmentCards>`
| Viewport | Behavior |
|---|---|
| `≥ 375px` (all mobile) | 2-column grid · equal width · stacked vertically on `< 375px` |
| `≥ md` | 2-column · larger cards · more padding |

#### `<AmenitiesGrid>`
| Viewport | Behavior |
|---|---|
| `< md` | 2-column grid · icon + label |
| `≥ md` | 3-column |
| `≥ lg` | 6-column (all amenities in one row) |

#### `<PricingBlock>` (Eventos — combinations)
| Viewport | Behavior |
|---|---|
| `< md` | 1-column list · each combination full-width card |
| `≥ md` | 2-column grid |

#### `<WhatsAppButton>`
| Viewport | Behavior |
|---|---|
| `< lg` (mobile/tablet) | Floating fixed · bottom-right · `safe-area-inset-bottom` padding |
| `≥ lg` (desktop) | Inline inside hero · no floating button |

#### `<ContactForm>` (Eventos)
| Viewport | Behavior |
|---|---|
| `< md` | Single column · inputs full-width · `font-size: 16px` (prevents iOS zoom) |
| `≥ md` | Single column · max-width 600px centered |

#### `<LocationSection>`
| Viewport | Behavior |
|---|---|
| `< md` | Map iframe full-width · address + buttons stacked below |
| `≥ md` | Map left (60%) · address + buttons right (40%) |

#### `<Footer>`
| Viewport | Behavior |
|---|---|
| `< md` | Single column · centered |
| `≥ md` | 3-column: logo · address+hours · social links |

---

### In-App Browser Compatibility

TikTok and WhatsApp use embedded browsers (WebViews) — not full
Safari/Chrome. Known limitations:

| Issue | Solution |
|---|---|
| No `backdrop-filter` in some WebViews | Navbar glassmorphism falls back to solid `--color-surface` with opacity |
| Page transitions break navigation | No page transition animations — only scroll reveals |
| `position: fixed` jitter on scroll | WhatsApp floating button uses `position: fixed` with `will-change: transform` to reduce jitter |
| External links may stay in-app | `wa.me` links use `target="_blank"` rel="noopener noreferrer"` |

---

### Accessibility Strategy

**Target compliance: WCAG 2.1 Level AA** — industry standard.
Several combinations already achieve AAA (see contrast table in
Visual Design Foundation).

#### Semantic HTML
- One `<h1>` per page — hero headline only
- `<nav>` with `aria-label="Navegación principal"`
- `<main>` wraps all page content
- `<footer>` for footer
- `<section>` with `aria-labelledby` for major sections
- Buttons are `<button>` — never `<div onClick>`
- Links are `<a href>` — never `<button>` for navigation

#### Screen Reader Support
- All `<Image>` components require `alt` — enforced by TypeScript
- Decorative images: `alt=""` explicitly
- Icons: `aria-hidden="true"` on SVG · visible label always present
- `<WhatsAppButton>`: `aria-label="Contactar por WhatsApp"`
- `<LocationSection>` map iframe: `title="Ubicación de Break Point"`
- Form inputs: `<label htmlFor>` · `aria-describedby` on errors

#### Keyboard Navigation
- All interactive elements reachable via `Tab`
- Focus ring: `2px solid --color-primary-500` offset `2px` — visible on
  all backgrounds including the Anthracite dark sections
- Skip link: `<a href="#main-content">` as first element in `<body>` —
  hidden visually, visible on focus (for screen reader / keyboard users)
- Modal/overlay: none in V1 — no focus trap needed

#### Motion & Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
`<AnimatedSection>` checks this before applying scroll animations.
Parallax fully disabled when reduced motion is active.

#### Color & Contrast
All contrast ratios documented in Visual Design Foundation.
No information conveyed by color alone — availability badge uses
text label + colored dot (never dot only).

---

### Testing Checklist (for dev agent)

**Responsive:**
- [ ] Test at 320px, 375px, 390px, 430px (iPhone range)
- [ ] Test at 360px, 412px (Android range)
- [ ] Test at 768px (tablet)
- [ ] Test at 1280px, 1440px (desktop)
- [ ] No horizontal scroll at any viewport
- [ ] WhatsApp button clears home indicator on iPhone (safe area)
- [ ] Hero fills full screen without browser chrome cutoff (`100dvh`)
- [ ] Inputs do not trigger zoom on iOS (font-size ≥ 16px)
- [ ] Test in WhatsApp in-app browser (Android + iOS)
- [ ] Test in TikTok in-app browser

**Accessibility:**
- [ ] Tab through entire page — all elements reachable, logical order
- [ ] Focus rings visible on all interactive elements
- [ ] Screen reader (VoiceOver iOS): all content readable, no orphan icons
- [ ] All images have alt text
- [ ] Contact form: error messages announced by screen reader
- [ ] Color contrast checker: all text passes WCAG AA minimum

## UX Consistency Patterns

### Button Hierarchy

| Variant | Style | Usage |
|---|---|---|
| **Primary** | `--color-cta` bg · `--color-on-surface` dark text · `rounded-full` | WhatsApp CTA — one per section, always visible |
| **Secondary** | `--color-primary-500` bg · white text · `rounded-full` | Form submit (Eventos), secondary nav actions |
| **Ghost** | Transparent · `--color-primary-500` border + text | "Ver más →" links on cards, tertiary actions |

**Rules:**
- Never two Primary buttons in the same viewport — one CTA wins
- All buttons: 200ms ease-in-out transition on background-color + box-shadow
- Mobile touch target: minimum 44×44px — use `py-3 px-6` as baseline padding
- `--color-cta` (orange) is exclusively for WhatsApp — never reused for other actions

### Feedback Patterns

**Form (ContactForm — Eventos only):**

| State | Visual | Copy |
|---|---|---|
| `idle` | Normal form | — |
| `submitting` | Button disabled + spinner icon | "Enviando…" |
| `success` | Green banner `--color-available` | "Mensaje enviado. Te respondemos pronto." |
| `error` (network) | Red banner `--color-error` | "Algo salió mal. Intentá de nuevo." |
| `error` (rate limit) | Red banner | "Demasiados intentos. Esperá unos minutos." |
| `error` (field) | Inline below input | Label + `aria-describedby` linked to message |

**Availability badge:**
- `available` → `●` verde `--color-available` + "Disponible hoy"
- V1: always shows available (static). Never shows "No disponible" — directs to WhatsApp instead.

### Animation Patterns

**Scroll reveal (all sections):**
- Wrapper: `<AnimatedSection>` · fade + slide up · `yOffset: 24px` · `duration: 0.5s`
- Respects `prefers-reduced-motion` — no movement when disabled, only fade

**Stagger on grids:**
- `<AmenitiesGrid>`: each icon item delays `index × 80ms`
- `<SegmentCards>`: card 1 at `0ms`, card 2 at `100ms`
- Implementation: CSS `animation-delay` via inline style — no JS loop

**Parallax hero (desktop only):**
- `<ParallaxHero>` variant of `<HeroSection>` — background image moves at 30% scroll speed
- Disabled on `@media (max-width: 768px)` — replaces with static image
- Disabled when `prefers-reduced-motion: reduce`
- Travel: max 40px vertical — subtle depth, not disorienting

**Glassmorphism navbar:**
- At page top: `background: transparent`
- After 60px scroll: `background: rgba(250,248,255,0.85)` · `backdrop-filter: blur(12px)` · `border-bottom: 1px solid --color-outline`
- Transition: 200ms ease on background + border
- Implementation: scroll event listener in `<Navbar>` (`'use client'`)

**Card hover (desktop only):**
- `<SegmentCards>`: background image `scale(1.03)` on hover · `transition: transform 400ms ease`
- `overflow: hidden` on card contains the zoom
- Elevation: `box-shadow: 0px 12px 32px rgba(0, 71, 171, 0.1)` on hover
- No hover effects on mobile (touch devices don't have hover state)

**WhatsApp button:**
- Hover: `opacity: 0.9` + `translateY(-1px)` · 200ms ease
- Active/tap: `translateY(0)` · immediate feedback

### Navigation Patterns

- Active page: nav link gets `--color-primary-500` underline + `aria-current="page"`
- Mobile: logo left + WhatsApp button right only — no hamburger menu in MVP
  (3 pages maximum, fits as simple footer nav or minimal top bar)
- Scroll behavior: `scroll-behavior: smooth` for anchor links within page

### Loading & Image Patterns

**Hero image (LCP):**
- `<Image priority>` — preloaded, no lazy load
- `placeholder="blur"` with `blurDataURL` — shows color gradient while image loads
- CTA and headline render immediately — never blocked by image state

**Non-hero images:**
- `<Image loading="lazy">` — loads on scroll approach
- No skeleton loaders in MVP — images simply fade in when ready

### Empty & Edge State Patterns

- **No availability data:** Badge hidden entirely — no "Unavailable" shown in V1
- **Form already submitted:** Success state persists until page reload — no re-submission
- **WhatsApp not installed:** `wa.me` link opens WhatsApp Web in browser — works on all devices
- **Maps link pending:** `LocationSection` hides map iframe if `mapsUrl === '#'` — shows address text only

## Component Strategy

### Design System Components

Tailwind v4 + custom `@theme` tokens provide the styling foundation.
No third-party component library — all components are built from scratch
using the Warm Industrial design system tokens. This keeps the bundle lean
and ensures 100% visual consistency.

**Foundation primitives (from Tailwind + tokens):**
- Buttons — CVA variants: primary (orange CTA), secondary (blue), ghost
- Typography — `font-heading`, `font-body`, `font-ui` applied via utility classes
- Colors — all via `@theme` CSS variables, never hardcoded hex
- Spacing — 8px base grid via `@theme` spacing tokens
- Border radius — `rounded-lg` (16px) as default, `rounded-full` for pills/badges

### Custom Components

All brand strings sourced from `config/site.ts`. All components in English
(code) per AGENTS.md. Copy/labels in Spanish (content).

#### `<Navbar>`
**Purpose:** Global navigation + brand anchor + persistent WhatsApp CTA  
**Anatomy:** Logo left · nav links center · WhatsApp button right  
**States:** Transparent on hero, solid `--color-surface` on scroll  
**Mobile:** Hamburger menu or simplified logo + WhatsApp button only  
**Accessibility:** `role="navigation"`, active link `aria-current="page"`

#### `<HeroSection>`
**Purpose:** Full-bleed field photograph with headline overlay and primary CTA  
**Anatomy:** `<Image priority>` full-bleed · gradient overlay (dark bottom) · H1 · subheadline · `<AvailabilityBadge>` · `<WhatsAppButton>`  
**Variants:** `day` (Home, Eventos) · `night` (La Cancha)  
**Performance:** `priority` prop — LCP image, preloaded. CTA renders before image loads.  
**Accessibility:** `alt` required · H1 one per page · button `aria-label`

#### `<AvailabilityBadge>`
**Purpose:** Trust signal — venue is active and bookable  
**Anatomy:** Green dot `●` · "Disponible hoy" label (Lexend 14px)  
**States:** `available` (green dot) · `unavailable` (gray, hidden in V1)  
**V1:** Static prop `available={true}` · **V1.5:** driven by `config/availability.ts`  
**Usage:** Inside `<HeroSection>` on Home and La Cancha pages

#### `<SegmentCards>`
**Purpose:** Bifurcación — directs visitor to La Cancha or Eventos  
**Anatomy:** 2-column grid · each card: icon + title + description + link CTA  
**Layout:** 2-col on mobile ≥ 375px · side-by-side on desktop  
**Hover:** Level 2 elevation (blue-tinted lift shadow)  
**Accessibility:** Cards are `<a>` tags, not `<div onClick>`

#### `<HowItWorks>`
**Purpose:** Normalizes the booking process and the advance payment requirement  
**Anatomy:** Numbered steps (1–3) · icon + title + description per step  
**Variants:** `cancha` (3 steps: WhatsApp → confirmar horario → adelanto) · `eventos` (3 steps: consultar → coordinar precio → 50% adelanto)  
**Usage:** La Cancha page and Eventos page

#### `<PricingBlock>`
**Purpose:** Displays pricing before CTA — eliminates first WhatsApp question  
**Variant `cancha`:** Single price "Bs X / hora" · hours available text  
**Variant `eventos`:** 4 combination cards (Cancha+Parrilla · Salón+Parrilla · Salón+Cancha · Complejo completo) · "precio según combinación y duración — cotizá sin compromiso"  
**Note:** Prices sourced from `config/site.ts` — never hardcoded in components

#### `<AmenitiesGrid>`
**Purpose:** Lists venue facilities on Anthracite break section  
**Anatomy:** Icon + label grid · 3-col mobile · 6-col desktop  
**Amenities (V1):** Cancha al aire libre · Iluminación nocturna · Salón para eventos · Área de parrilla · Cocina equipada · Baños H/M  
**Background:** `--color-dark` full-bleed · `--color-available-dark` 2px top gradient on container  
**Accessibility:** Icons decorative `aria-hidden` · labels always visible

#### `<LocationSection>`
**Purpose:** Tells visitors where Break Point is + enables easy sharing  
**Anatomy:** Google Maps embed (iframe) · address block · "Ver en Google Maps" link · "Compartir por WhatsApp" button  
**Share behavior:** WhatsApp opens with pre-filled message: `"Break Point está aquí: [mapsUrl]"`  
**Config:** `mapsUrl` from `config/site.ts` → falls back to `'#'` until Google Maps link is confirmed  
**Accessibility:** iframe has `title="Ubicación de Break Point en Google Maps"`

#### `<WhatsAppButton>`
**Purpose:** Primary CTA — opens WhatsApp with pre-filled contextual message  
**Variants:** `floating` (fixed bottom-right on mobile) · `inline` (inside hero or section)  
**Pre-filled messages (from `config/site.ts`):**
- Home: `"Hola, quiero consultar sobre Break Point"`
- La Cancha: `"Hola, quiero reservar la cancha"`
- Eventos: `"Hola, quiero consultar disponibilidad para un evento"`
**Styling:** `--color-cta` bg · `--color-on-surface` dark text (WCAG AAA 7.0:1)  
**Accessibility:** `aria-label="Contactar por WhatsApp"`

#### `<ContactForm>`
**Purpose:** Alternative contact channel for event organizers (corporate, formal)  
**Usage:** Eventos page only  
**Fields:** Nombre · Email · Mensaje · Submit  
**Stack:** `useActionState` (React 19) → `actions.ts` → Resend → Upstash rate limiting  
**States:** idle · submitting · success · error  
**Accessibility:** Visible labels · `aria-describedby` on error messages

#### `<Footer>`
**Purpose:** Institutional info + social links + copyright  
**Anatomy:** Logo · Address · Hours · Social icons (WhatsApp, TikTok, Instagram) · Copyright  
**Address:** Av. Principal (Av. Costanera) esq. Calle 6 Nº18, Caliri, Zona Sur, La Paz  
**Hours:** 08:00 – 22:00  
**Phone:** sourced from `config/site.ts` — provisional until WhatsApp Business number confirmed

#### `<AnimatedSection>`
**Purpose:** Scroll-reveal wrapper for page sections  
**Props:** `delay` · `yOffset` · `duration`  
**Rule:** All motion respects `prefers-reduced-motion` — no animations when disabled  
**Constraint (AGENTS.md):** Never import `motion` directly in pages — always use this wrapper

### Component Implementation Strategy

- All components use `cn()` from `lib/utils.ts` for conditional classes
- All variants use CVA (`class-variance-authority`)
- `'use client'` only on: `<WhatsAppButton>` (browser API), `<ContactForm>` (useActionState), `<Navbar>` (scroll state)
- All other components are Server Components by default
- All brand strings (phone, address, messages, prices) in `config/site.ts`

### Implementation Roadmap

**Phase 1 — Critical path (Journey 1 + 3):**
`Navbar` · `HeroSection` · `AvailabilityBadge` · `SegmentCards` · `WhatsAppButton` · `Footer`

**Phase 2 — La Cancha page:**
`HowItWorks` (cancha variant) · `PricingBlock` (cancha variant) · `AmenitiesGrid`

**Phase 3 — Eventos page:**
`PricingBlock` (eventos variant) · `HowItWorks` (eventos variant) · `ContactForm` · `LocationSection`

**Phase 4 — Polish:**
`AnimatedSection` wrappers · hover states · mobile floating WhatsApp button

## Design Direction Decision

### Design Directions Explored

Three full-page visual directions were generated and evaluated:

- **Direction A — Field First:** Full-screen daytime field hero, content below
  the fold, bifurcation cards (La Cancha / Eventos) as first scroll stop,
  amenities on Anthracite section below. Mobile-native layout.
- **Direction B — Bold Industrial:** Split-grid hero (text left, field photo
  right) with availability badge and venue stats. Alternating light/dark
  sections. Desktop-optimized — split collapses on mobile, losing its core
  visual proposition.
- **Direction C — Split Segment:** Full-viewport hero split into two equal
  halves (La Cancha blue / Eventos orange) with logo medallion at center.
  Immediate bifurcation. High visual impact but requires users to know their
  segment on arrival.

### Chosen Direction

**Direction A — Field First**, with one element borrowed from Direction B:
the `● Disponible hoy` availability badge incorporated into the hero area.

### Design Rationale

Direction A was selected for three reasons:

1. **Mobile-first fit:** 70–80% of Break Point traffic arrives via TikTok →
   WhatsApp → in-app browser on Android mid-range. A full-screen hero scales
   perfectly to any viewport. Direction B's split-grid and Direction C's
   dual-panel both degrade or disappear on mobile.
2. **Hero lighting:** Home hero uses daytime field — warm zona sur sunlight,
   family-friendly, speaks to both segments. The warmth and openness of a
   daytime field matches the "Juega. Celebra. Disfruta." brand positioning.
   La Cancha page retains a nighttime/floodlit hero (dramatic, sport energy).
   Eventos page uses daytime (celebration, family warmth).
3. **Gradual orientation:** Visitors who arrive from TikTok may not know
   whether they want the cancha or a salon for events. Field First lets them
   see the place first, then choose. Split Segment forces immediate choice
   before any context is given.

The availability badge from Direction B is addable as a single-line element
inside the hero — it delivers the key trust signal (venue is active and
bookable today) without altering the layout.

### Implementation Approach

- **Hero component:** Full-bleed `<Image>` with overlay gradient (dark bottom
  fade for text legibility). Daytime field photograph. `priority` prop set —
  LCP image.
- **Availability badge:** `● Disponible hoy` — Lexend 14px, `--color-available`
  dot, light pill background (`--color-surface-low`). Positioned below the H1,
  above the CTA. Static text in V1; driven by `config/availability.ts` in V1.5.
- **Bifurcation cards:** Two equal-width cards (⚽ La Cancha / 🎉 Eventos) as
  the first section below the hero. Grid: 2-column on mobile ≥ 375px, side
  by side. Each card links to its respective page with a secondary CTA.
- **Sticky WhatsApp CTA:** Floating button bottom-right on mobile; inline
  in hero on desktop. Present on all three pages.
- **Anthracite break section:** Full-venue amenities (vestuarios, parking,
  cafetería) on `--color-dark` background with `--color-available-dark` 2px
  top gradient on feature containers.
