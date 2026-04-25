# Epic 3: La Cancha Page — Field Booking Conversion

A football group captain sees the field specs, hourly pricing (day/night), typical availability windows, and booking conditions — then converts to WhatsApp with one tap.

**FRs covered:** FR7 · FR8 · FR10 · FR11 · FR15
**Includes:** `<HeroSection>` (night variant), `<PricingBlock cancha>`, `<HowItWorks cancha>`, WhatsApp CTA contextual, app/cancha/page.tsx (SSG)

---

## Story 3.1: La Cancha Hero — Night Field Experience

As a football group captain,
I want to see the field at night with floodlights as the first thing on the La Cancha page,
So that I immediately feel the energy of an evening game and know this is the right venue.

**Acceptance Criteria:**

**Given** a visitor opens `/cancha`
**When** the page loads
**Then** a full-viewport (`h-[100dvh]`) nighttime field photo with floodlights (`priority` prop set) fills the screen — `<HeroSection variant="night">`, dark gradient overlay, H1 "La Cancha", and a positioning subheadline (synthetic grass · lighting · zona sur)

**Given** the `<AvailabilityBadge>` is present in the La Cancha hero
**When** rendered
**Then** it shows "● Disponible hoy" in `--color-available` green — static V1 value

**Given** the La Cancha hero renders on desktop (`≥ lg`)
**When** the visitor scrolls
**Then** parallax effect is active at 30% scroll speed — disabled on mobile and `prefers-reduced-motion`

**Given** `<VenueImage slot="hero" alt="Cancha de fútbol nocturna con iluminación en Break Point" />` is used without `src`
**When** the placeholder renders
**Then** it fills full viewport height with `--color-surface-low` background — zero CLS

---

## Story 3.2: Field Specs & Pricing Block

As a football group captain,
I want to see the field specifications and hourly pricing clearly stated,
So that I can decide if Break Point fits my group's budget and needs before contacting.

**Acceptance Criteria:**

**Given** the field specs section renders on `/cancha`
**When** a visitor reads it
**Then** the following are visible: surface type (césped sintético), dimensions, capacity (players), and lighting availability (iluminación nocturna incluida en tarifa nocturna)

**Given** the `<PricingBlock variant="cancha">` renders
**When** a visitor reads it
**Then** two prices are displayed — sourced from `siteConfig.pricing.cancha`: Bs 120/hora (día) · Bs 130/hora (noche con iluminación)

**Given** the pricing block renders
**When** a visitor reads the conditions
**Then** minimum booking requirement is clearly stated — 1 hora mínimo

**Given** `siteConfig.pricing.cancha.day` or `.night` is updated
**When** `pnpm build` runs
**Then** the prices on the page update automatically — no hardcoded values in component files

**Given** the pricing block renders
**When** observed on mobile
**Then** both price tiers are readable without horizontal scrolling — stacked layout on small viewports

---

## Story 3.3: Booking Conditions, Availability & How It Works

As a football group captain,
I want to understand exactly how to book and when the field is typically available,
So that I can self-qualify and arrive at WhatsApp ready to confirm.

**Acceptance Criteria:**

**Given** the `<HowItWorks variant="cancha">` section renders
**When** a visitor reads the 3 steps
**Then** the steps are: (1) Contactar por WhatsApp → (2) Confirmar horario disponible → (3) Adelanto asegura el espacio

**Given** the booking conditions block renders
**When** a visitor reads it
**Then** the advance payment condition is shown: `siteConfig.pricing.deposit.cancha` ("% a confirmar con el dueño") — no hardcoded text

**Given** the typical availability section renders
**When** a visitor reads it
**Then** available windows are shown (e.g. weekday mornings, weekend slots) so visitors can self-qualify before contacting

**Given** the WhatsApp CTA renders on `/cancha`
**When** tapped
**Then** it opens WhatsApp with `siteConfig.whatsapp.messages.cancha` pre-filled — contextually different from Home message

**Given** `app/cancha/page.tsx` is built
**When** `pnpm build` runs
**Then** the page is statically generated (SSG) with zero server compute — sections: HeroSection → FieldSpecs → PricingBlock → HowItWorks → WhatsApp CTA
