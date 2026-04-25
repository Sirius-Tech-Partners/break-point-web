# Epic 2: Home Page — Discovery & Segment Routing

A visitor who has never heard of Break Point lands on the site, sees the venue, understands what it offers, and navigates to the right page (La Cancha or Eventos) within 5 seconds.

**FRs covered:** FR6 · FR12 · FR13 · FR14
**Includes:** `<HeroSection>` (day variant), `<AvailabilityBadge>`, `<SegmentCards>`, `<AmenitiesGrid>`, `<FaqSection>`, `<GalleryGrid>`, app/page.tsx (Home SSG)

---

## Story 2.1: Home Hero & Availability Badge

As a first-time visitor,
I want to see the Break Point field immediately on load with a clear headline and availability signal,
So that I know the venue is real, inviting, and bookable before I read any copy.

**Acceptance Criteria:**

**Given** a visitor opens the Home page on mobile
**When** the page loads
**Then** a full-viewport (`h-[100dvh]`) field photo (daytime, `priority` prop set) fills the screen with a dark gradient overlay at the bottom for text legibility — no layout shift, no loading spinner

**Given** the hero renders
**When** observed on any device
**Then** H1 headline "Juega. Celebra. Disfruta.", a subheadline, and the `<AvailabilityBadge>` ("● Disponible hoy" in green `--color-available`) are visible before the primary CTA

**Given** the hero renders on desktop (`≥ lg`)
**When** the page is scrolled
**Then** the background image moves at 30% scroll speed (parallax effect) — disabled on mobile and when `prefers-reduced-motion` is active

**Given** `<VenueImage slot="hero" alt="Campo de fútbol de Break Point" />` is used without a `src`
**When** the placeholder renders
**Then** it fills the full viewport height with `--color-surface-low` background — correct aspect ratio, zero CLS

---

## Story 2.2: Segment Bifurcation Cards

As a visitor,
I want to see two clearly distinct paths (La Cancha and Eventos) immediately below the hero,
So that I can navigate to the right page for my need within one scroll, without reading dense copy.

**Acceptance Criteria:**

**Given** a visitor scrolls past the hero on Home
**When** the `<SegmentCards>` section comes into view
**Then** two cards are displayed: ⚽ La Cancha ("Alquilá tu cancha por hora") and 🎉 Eventos ("Cumpleaños, corporativos, reuniones") — each with a link CTA ("Ver más →")

**Given** viewport is below 375px
**When** `<SegmentCards>` renders
**Then** the two cards stack vertically (single column)

**Given** viewport is 375px or wider
**When** `<SegmentCards>` renders
**Then** the two cards display in a 2-column equal-width grid

**Given** a visitor hovers over a card on desktop
**When** the pointer is over the card
**Then** the background image scales to 1.03 with a blue-tinted lift shadow (`box-shadow: 0px 12px 32px rgba(0, 71, 171, 0.1)`) — no hover state on mobile/touch

**Given** a visitor taps either card
**When** the link activates
**Then** they navigate to `/cancha` or `/eventos` respectively — cards are `<a>` tags, not `<div onClick>`

**Given** the second card enters the viewport
**When** `<AnimatedSection>` reveals it
**Then** it is delayed 100ms relative to the first card (stagger pattern)

---

## Story 2.3: Amenities Grid & Gallery

As a visitor,
I want to see all of Break Point's facilities at a glance in one visual section,
So that I can confirm the venue has everything I need without scrolling through paragraphs.

**Acceptance Criteria:**

**Given** the `<AmenitiesGrid>` section renders
**When** observed on any device
**Then** all 6 amenities are displayed as icon + label pairs on an Anthracite (`--color-dark`) full-bleed background with a `--color-available-dark` 2px top gradient: Cancha al aire libre · Iluminación nocturna · Salón para eventos · Área de parrilla · Cocina equipada · Baños H/M

**Given** viewport is below 768px
**When** `<AmenitiesGrid>` renders
**Then** the grid is 2 columns

**Given** viewport is 768px–1023px
**When** `<AmenitiesGrid>` renders
**Then** the grid is 3 columns

**Given** viewport is 1024px or wider
**When** `<AmenitiesGrid>` renders
**Then** all 6 amenities appear in a single row (6 columns)

**Given** the amenity icons are Lucide icons
**When** a screen reader encounters them
**Then** each icon has `aria-hidden="true"` and the visible text label is always present alongside

**Given** the `<GalleryGrid>` section renders (4–6 `<VenueImage>` placeholders)
**When** visible on any device
**Then** all images maintain their designated aspect ratios with no layout shift — placeholders show `--color-surface-low` background until real photos are provided

---

## Story 2.4: FAQ Section & Home Page Assembly

As a visitor with common questions,
I want to find answers to the most frequent questions without needing to contact anyone,
So that I arrive at WhatsApp already informed and ready to confirm.

**Acceptance Criteria:**

**Given** the `<FaqSection>` renders on Home
**When** a visitor reads it
**Then** at least 4 questions are answered: capacity, what's included, how to book, and whether there is parking (answer: no — "No hay estacionamiento" clearly stated)

**Given** `<FaqSection>` renders
**When** a visitor taps a question
**Then** the answer expands inline (accordion behavior) — no page navigation required

**Given** the FAQ answers
**When** a visitor reads them
**Then** "No hay estacionamiento" and "No hay vestuarios" are clearly stated — no false expectations

**Given** `app/page.tsx` (Home SSG) is built
**When** `pnpm build` runs
**Then** the page is statically generated — sections in order: HeroSection → SegmentCards → AmenitiesGrid → GalleryGrid → FaqSection → final WhatsApp CTA

**Given** each major section is wrapped in `<AnimatedSection>`
**When** a visitor scrolls through Home
**Then** sections reveal with delays 0, 0.1, 0.2, 0.3 — no section is nested inside another `<AnimatedSection>`
