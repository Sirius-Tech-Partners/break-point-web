# Epic 4: Eventos Page — Event Inquiry & Lead Capture

Event organizers (birthday parents, corporate coordinators) see space combinations, understand the pricing model, and contact the owner via WhatsApp (primary) or a structured form that delivers a complete lead to the owner's email (secondary).

**FRs covered:** FR9 · FR10 · FR15 · FR16 · FR17 · FR18 · FR19 · FR20 · FR21
**Includes:** `<HeroSection>` (day variant), `<PricingBlock eventos>` (4 combinations), `<HowItWorks eventos>`, `<LocationSection>`, `<ContactForm>` (useActionState + Zod + Resend + Upstash), app/eventos/page.tsx + actions.ts + schema.ts

---

## Story 4.1: Eventos Hero & Combination Pricing

As an event organizer,
I want to see the event space and understand the combination options immediately,
So that I can identify which combination fits my event before contacting.

**Acceptance Criteria:**

**Given** a visitor opens `/eventos`
**When** the page loads
**Then** a full-viewport (`h-[100dvh]`) daytime venue photo (`priority` prop, `<HeroSection variant="day">`) fills the screen with H1 "Eventos" and a positioning subheadline

**Given** the `<PricingBlock variant="eventos">` renders
**When** a visitor reads it
**Then** 4 combination cards are visible: Cancha + Parrilla · Salón + Parrilla · Salón + Cancha · Complejo completo — each with "precio según combinación — cotizá sin compromiso" copy (no fixed prices shown)

**Given** the combination cards render
**When** observed on mobile
**Then** cards stack in a 1-column or 2-column grid — readable without horizontal scroll

**Given** the pricing block renders
**When** a visitor reads the conditions
**Then** the 50% deposit requirement is visible: `siteConfig.pricing.deposit.eventos` ("50% adelanto confirma la fecha")

---

## Story 4.2: How It Works & Location Section

As an event organizer,
I want to understand the booking process and find the venue location,
So that I know what to expect before I reach out and can plan logistics.

**Acceptance Criteria:**

**Given** the `<HowItWorks variant="eventos">` section renders
**When** a visitor reads the 3 steps
**Then** the steps are: (1) Consultar combinación por WhatsApp → (2) Coordinar precio y disponibilidad → (3) 50% adelanto confirma la fecha

**Given** the `<LocationSection>` renders and `siteConfig.contact.mapsUrl === '#'`
**When** the section loads
**Then** the address block is always visible (Av. Principal esq. Calle 6 Nº18, Caliri, Zona Sur, La Paz) and hours (08:00–22:00) — the Google Maps iframe is hidden when mapsUrl is '#'

**Given** `siteConfig.contact.mapsUrl` is updated to a real Google Maps Place URL
**When** the page renders
**Then** the iframe appears automatically with `title="Ubicación de Break Point en Google Maps"` — no code change required

**Given** the "Ver en Google Maps" link renders
**When** tapped
**Then** it opens Google Maps in a new tab with the venue location

**Given** the "Compartir por WhatsApp" button renders in LocationSection
**When** tapped
**Then** it opens WhatsApp with `siteConfig.whatsapp.messages.share` pre-filled

**Given** the LocationSection renders on desktop (`≥ lg`)
**When** observed
**Then** layout is 60/40 split: map left, address+hours right — stacked on mobile

---

## Story 4.3: Contact Form — UI, Validation & States

As an event organizer,
I want a structured form to send my inquiry with all relevant details,
So that the owner receives complete information and can respond quickly.

**Acceptance Criteria:**

**Given** the `<ContactForm>` renders on `/eventos`
**When** a visitor sees it
**Then** the following fields are present: Nombre (required) · Teléfono (required, Bolivian format) · Fecha del evento (date picker, required) · Tipo de evento (select: Cumpleaños infantil / Evento corporativo / Reunión social / Otro) · Nro de invitados (optional number) · Mensaje (optional, 300 char max)

**Given** all form inputs render
**When** observed on iOS Safari
**Then** all inputs have `font-size: 16px` minimum — no auto-zoom on focus

**Given** a visitor submits the form with invalid data
**When** validation runs
**Then** inline error messages appear below each invalid field with `aria-describedby` linked to the field — other valid field values are preserved

**Given** the phone field receives a Bolivian number
**When** validated against `/^(\+?591)?[67]\d{7}$/`
**Then** formats like `70690685`, `591 70690685`, `+591 70690685` are all accepted

**Given** the form is submitting
**When** the Server Action is pending
**Then** the submit button is disabled with a spinner icon and "Enviando…" text — `isPending` from `useActionState` only, no additional `useState`

**Given** `app/eventos/schema.ts` exports the Zod schema
**When** used in both `event-contact-form.tsx` (client) and `actions.ts` (server)
**Then** the same validation rules apply on both sides — no duplication

---

## Story 4.4: Contact Form — Server Action, Email & Rate Limiting

As the venue owner,
I want to receive a structured email for every form submission,
So that I can follow up on WhatsApp immediately with all the context I need.

**Acceptance Criteria:**

**Given** a visitor submits a valid contact form
**When** the Server Action runs
**Then** rate limiting is checked first via `contactLimiter` (5 req/hr/IP via Upstash) — before any business logic

**Given** rate limiting passes
**When** the Server Action continues
**Then** env vars are validated (`RESEND_API_KEY`, `CONTACT_RECEIVER_EMAIL`) — if missing, returns `{ error: 'config' }` without calling Resend

**Given** env vars are valid
**When** Resend is called
**Then** `{ error }` is checked before proceeding — SDK does NOT throw; if error exists, returns `{ error: 'server' }`

**Given** Resend sends successfully
**When** the owner receives the email
**Then** it contains: Nombre, Teléfono, Fecha del evento, Tipo de evento, Nro de invitados, Mensaje — formatted for quick WhatsApp follow-up

**Given** a visitor exceeds 5 submissions per hour from the same IP
**When** the rate limit triggers
**Then** the form returns `{ error: 'rate_limit' }` and shows "Demasiados intentos. Esperá unos minutos." — no email sent

**Given** the Server Action runs at any point
**When** logging occurs
**Then** no PII (name, phone, email) appears in `console.log` or error logs

---

## Story 4.5: Eventos Page Assembly & Success/Error States

As an event organizer,
I want clear feedback after submitting the form,
So that I know my inquiry was received and have a WhatsApp alternative if I prefer faster response.

**Acceptance Criteria:**

**Given** the form submits successfully
**When** the success state renders
**Then** a green confirmation banner (`--color-available`) shows "Mensaje enviado. Te respondemos pronto." and focus moves to the confirmation message

**Given** the success state renders
**When** a visitor reads it
**Then** a WhatsApp alternative button is shown: "¿Preferís respuesta inmediata? Escribinos por WhatsApp" — links to `siteConfig.whatsapp.messages.eventos`

**Given** a network or server error occurs
**When** the error state renders
**Then** a red banner (`--color-error`) shows "Algo salió mal. Intentá de nuevo." — no technical error details exposed

**Given** `app/eventos/page.tsx` is built
**When** `pnpm build` runs
**Then** the page shell is statically generated — sections: HeroSection → PricingBlock → HowItWorks → LocationSection → ContactForm → WhatsApp CTA

**Given** focus management is implemented
**When** the form has validation errors
**Then** focus moves to the first invalid field automatically (NFR-A5)
