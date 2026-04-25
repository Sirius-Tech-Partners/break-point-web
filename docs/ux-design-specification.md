# UX Design Specification — Break Point Web

**Dirección de diseño:** Field First (Dirección A)
**Sistema de diseño:** Warm Industrial
**Tagline:** "Juega. Celebra. Disfruta."

---

## Sistema de Colores — Warm Industrial

| Token | Hex | Rol |
|---|---|---|
| `--color-primary` | `#00327d` | Azul profundo — ancla de marca, navegación, confianza |
| `--color-primary-500` | `#0047ab` | Estados interactivos, links, botones secundarios |
| `--color-cta` | `#ff8a00` | Naranja vibrante — EXCLUSIVO para WhatsApp CTAs |
| `--color-surface` | `#faf8ff` | Fondo principal del canvas |
| `--color-surface-low` | `#f3f3fc` | Fondos de cards, separación sutil, placeholders |
| `--color-dark` | `#363636` | Antracita — secciones de contraste (AmenitiesGrid) |
| `--color-dark-mid` | `#4d4d4d` | Elementos secundarios sobre Antracita |
| `--color-on-surface` | `#191b22` | Texto principal sobre fondos claros |
| `--color-on-surface-var` | `#434653` | Texto secundario, labels, captions |
| `--color-outline` | `#737784` | Bordes, divisores, contornos de inputs |
| `--color-available` | `#3d6b47` | Indicadores de disponibilidad, estados de éxito |
| `--color-available-dark` | `#2d5a3d` | Gradiente accent sobre secciones Antracita |
| `--color-error` | `#ba1a1a` | Errores de validación de formulario |

### Reglas de uso de color
- `--color-cta` (naranja): SOLO para botones de WhatsApp — nunca decorativo
- Texto oscuro (`--color-on-surface`) sobre naranja — NUNCA texto blanco sobre naranja (WCAG AAA 7.0:1)
- Botón submit del formulario: `--color-primary-500` (azul = acción informativa/confianza)
- Divisores de sección: 1px `--color-cta` al 20% opacidad

---

## Tipografía

| Token | Fuente | Pesos | Uso |
|---|---|---|---|
| `--font-heading` | Space Grotesk | 700 | H1, H2, H3 |
| `--font-body` | Manrope | 400 | Párrafos, copy general |
| `--font-ui` | Lexend | 400, 500 | Labels, botones, badges |

- Todas subsets `latin` via `next/font/google` con `display: swap`
- Mínimo 14px (labels Lexend) — nunca bajo 12px
- Inputs: mínimo 16px (previene zoom en iOS)

---

## Espaciado (Grid base 8px)

| Token | Valor | Uso |
|---|---|---|
| `--spacing-xs` | 4px | Padding interno de chips/íconos |
| `--spacing-sm` | 12px | Gap ícono-label, espaciado ajustado |
| `--spacing-md` | 24px | Padding interno de componentes, cards |
| `--spacing-lg` | 48px | Entre secciones dentro de un bloque |
| `--spacing-xl` | 80px | Entre secciones principales de página |
| `--spacing-container` | 1280px | Max-width del contenido |
| `--spacing-gutter` | 24px | Gutter lateral en mobile |

---

## Breakpoints

| Token | Valor | Dispositivo |
|---|---|---|
| `--breakpoint-sm` | 375px | iPhone SE baseline |
| `--breakpoint-md` | 768px | Tablet |
| `--breakpoint-lg` | 1024px | Desktop |
| `--breakpoint-xl` | 1280px | Container max |
| `--breakpoint-2xl` | 1440px | Large desktop |

---

## Border Radius

| Token | Valor |
|---|---|
| `--radius-sm` | 0.25rem |
| `--radius-md` | 0.75rem |
| `--radius-lg` | 1rem |
| `--radius-xl` | 1.5rem |
| `--radius-full` | 9999px |

---

## Héroes por Página

| Página | Variante | Foto | Overlay |
|---|---|---|---|
| Home | `day` | Campo diurno | Degradado oscuro bottom fade |
| La Cancha | `night` | Campo nocturno con iluminación | Degradado oscuro bottom fade |
| Eventos | `day` | Complejo/salón diurno | Degradado oscuro bottom fade |

Todos: `h-[100dvh]` · `<Image priority>` · Paralax desktop-only (≥lg) · Desactivado en `prefers-reduced-motion`

---

## Especificaciones de Componentes (UX-DRs)

### UX-DR2: Button CVA Variants
- **Primary:** `--color-cta` bg + texto oscuro `--color-on-surface` + `rounded-full` — WhatsApp CTA
- **Secondary:** `--color-primary-500` bg + texto blanco + `rounded-full` — Submit formulario
- **Ghost:** Transparente + borde `--color-primary-500` + texto `--color-primary-500` — "Ver más →"
- Todos: transición 200ms ease-in-out · Touch target mínimo 44×44px

### UX-DR3: Navbar
- Transparente en top → glassmorphism después de 60px scroll (`rgba(250,248,255,0.85)` + `backdrop-filter: blur(12px)` + borde bottom)
- Transición: 200ms
- **Mobile (< 768px):** Logo izquierda + botón WhatsApp derecha — sin nav links en top bar
- **Desktop (≥ 768px):** Logo izquierda · Nav links (Inicio · La Cancha · Eventos) centro · WhatsApp derecha
- Link activo: underline `--color-primary-500` + `aria-current="page"`
- Fallback WebView (TikTok/WhatsApp): fondo sólido `--color-surface` con opacidad cuando `backdrop-filter` no disponible

### UX-DR4: HeroSection
- Full-bleed `<Image priority>` (`h-[100dvh]`)
- Gradient overlay: degradado oscuro en la parte inferior
- Contenido: H1 + subheadline + `<AvailabilityBadge>` + `<WhatsAppButton>`
- Paralax desktop-only: imagen a 30% de velocidad de scroll

### UX-DR5: AvailabilityBadge
- Punto verde (`--color-available`) + "Disponible hoy" (Lexend 14px) + pill bg (`--color-surface-low`)
- V1: siempre `available={true}` (estático)
- Estado `unavailable`: oculto en V1

### UX-DR6: SegmentCards
- Grid 2 columnas en ≥375px · Columna única por debajo
- Cards son `<a>` tags (nunca `<div onClick>`)
- Hover desktop: `scale(1.03)` + shadow azul `box-shadow: 0px 12px 32px rgba(0,71,171,0.1)`
- Stagger: Card 1 a 0ms, Card 2 a 100ms

### UX-DR7: HowItWorks
- **Variante cancha:** 1. WhatsApp → 2. Confirmar horario → 3. Adelanto asegura espacio
- **Variante eventos:** 1. Consultar combinación → 2. Coordinar precio+disponibilidad → 3. 50% adelanto confirma fecha
- Numeración visible como steps (1, 2, 3)

### UX-DR8: PricingBlock
- **Variante cancha:** Bs 120/hr día · Bs 130/hr noche — sourced de `siteConfig.pricing.cancha`
- **Variante eventos:** 4 cards de combinación (Cancha+Parrilla · Salón+Parrilla · Salón+Cancha · Complejo completo) + "precio según combinación — cotizá sin compromiso"

### UX-DR9: AmenitiesGrid
- Fondo Antracita (`--color-dark`) full-bleed + gradiente 2px top `--color-available-dark`
- Grid: 2 col mobile → 3 col md → 6 col lg
- Amenidades: Cancha al aire libre · Iluminación nocturna · Salón para eventos · Área de parrilla · Cocina equipada · Baños H/M
- Íconos: `aria-hidden="true"` · Labels siempre visibles
- Stagger: cada item con delay `index × 80ms` via `animation-delay` CSS inline

### UX-DR10: LocationSection
- Google Maps iframe: solo cuando `mapsUrl !== '#'` — `title="Ubicación de Break Point en Google Maps"`
- Bloque de dirección: siempre visible
- "Ver en Google Maps" link + "Compartir por WhatsApp" button
- Layout: stacked mobile → split 60/40 desktop (mapa izquierda, dirección derecha)

### UX-DR11: WhatsAppButton
- **Variante floating:** `position: fixed` bottom-right · `bottom: calc(1.5rem + env(safe-area-inset-bottom))` · `will-change: transform`
- **Variante inline:** dentro de hero/sección
- En desktop (≥ lg): solo variante inline en hero — floating NO aparece simultáneamente
- En mobile/tablet (< lg): solo variante floating
- `aria-label="Contactar por WhatsApp"` · `target="_blank" rel="noopener noreferrer"`
- Hover: `opacity: 0.9 + translateY(-1px)`
- Mensajes precompuestos: distintos por página desde `siteConfig.whatsapp.messages`

### UX-DR12: ContactForm (solo Eventos)
- **Campos:** Nombre (req) · Teléfono (req, formato boliviano) · Fecha del evento (date, req) · Tipo de evento (select: Cumpleaños infantil / Evento corporativo / Reunión social / Otro) · Nro de invitados (opcional) · Mensaje (opcional, max 300 chars)
- **Estados:** idle · submitting (botón disabled + spinner + "Enviando…") · success (banner verde) · error:network · error:rate_limit · error:field (inline)
- `isPending` de `useActionState` únicamente — sin `useState` adicional
- Font-size ≥ 16px en todos los inputs (previene zoom iOS)
- Focus management: éxito → foco a confirmación · error → foco a primer campo inválido

### UX-DR13: Footer
- Logo · Dirección · Horarios (08:00–22:00) · Íconos sociales (WhatsApp, TikTok, Instagram) · Copyright
- Todo desde `siteConfig` — sin hardcode
- Layout: 1 columna mobile → 3 columnas desktop

### UX-DR14: AnimatedSection
- `'use client'` · LazyMotion + domAnimation
- Props: `delay` · `yOffset` (default 24px) · `duration` (default 0.5s)
- `prefers-reduced-motion`: solo fade (sin movimiento)
- Nunca anidar `<AnimatedSection>` dentro de otro
- Delays máximos por página: 0, 0.1, 0.2, 0.3 (nunca > 0.4)

### UX-DR15: VenueImage
- Prop `slot`: `'hero' | 'gallery' | 'card'` — TypeScript required
- Sin `src`: fondo `--color-surface-low` + ícono de cámara, aspect ratio correcto
- Con `src`: `next/image fill` + `placeholder="blur"` · prop `alt` required (TypeScript error si falta) · prop `sizes` obligatorio en fill images

---

## Accessibility (UX-DR20, UX-DR21, UX-DR22)

- Skip link: `<a href="#main-content">` como primer elemento del body (visible solo en focus)
- Focus rings: `2px solid --color-primary-500` offset 2px — visible en todos los fondos incluso Antracita
- Íconos: `aria-hidden` + labels visibles siempre
- Form labels: `htmlFor` + `aria-describedby` en errores
- Un solo H1 por página (solo en hero)
- `<nav aria-label="Navegación principal">` · `<main>` · `<footer>` · sections con `aria-labelledby`
- Botones como `<button>` · links como `<a href>` · nunca `<div onClick>`
- Contraste: ≥ 4.5:1 para texto body · ≥ 3:1 para texto grande y UI

---

## iOS Safari & In-App Browser (UX-DR16, UX-DR17)

- `viewport-fit=cover` en meta viewport
- `overflow-x: hidden + max-width: 100vw` en html/body
- `-webkit-text-size-adjust: 100%`
- `touch-action: manipulation` en todos los buttons y links
- `h-[100dvh]` para heroes
- `safe-area-inset-bottom` en floating WhatsApp button
- Font-size ≥ 16px en todos los inputs
- Glassmorphism navbar: fallback a sólido `--color-surface` cuando `backdrop-filter` no disponible
- Sin page transition animations (rompen in-app navigation)
- `will-change: transform` en floating button (reduce jitter)
- `target="_blank"` en links wa.me

---

## Animaciones (UX-DR19)

- AmenitiesGrid: cada item con delay `index × 80ms` (CSS `animation-delay` inline — sin JS loop)
- SegmentCards: Card 1 a 0ms, Card 2 a 100ms
- Todos via `<AnimatedSection>` — nunca `motion` directo
- Delays por página: 0 · 0.1 · 0.2 · 0.3 segundos máximo
