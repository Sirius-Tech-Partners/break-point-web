# PRD — Break Point Web

**Proyecto:** Break Point — sitio web de marketing y captación de leads
**Cliente:** Dueño del complejo deportivo Break Point, La Paz, Bolivia
**Stack:** Next.js 16.2.4 · React 19 · Tailwind v4 · Vercel · Starter tier
**Fecha:** Abril 2026

---

## Contexto del Negocio

Break Point es un complejo deportivo y de eventos ubicado en Barrio Caliri, Zona Sur, La Paz, Bolivia. Actualmente no tiene presencia digital — todas las reservas son por WhatsApp y boca a boca.

**El problema:** Potenciales clientes no encuentran el lugar en Google. No hay información de precios, horarios ni condiciones disponible 24/7. El dueño pierde tiempo respondiendo las mismas preguntas básicas por WhatsApp.

**La solución:** Sitio web de 3 páginas que informa, califica y convierte visitantes en leads de WhatsApp. Canal de contacto principal: WhatsApp. Canal secundario: formulario de contacto estructurado (solo en Eventos).

---

## Usuarios Objetivo

**Segmento 1 — Capitán de equipo de fútbol**
- Busca cancha para alquilar por hora con su grupo
- Necesita: precio por hora, iluminación nocturna, disponibilidad, cómo reservar
- Convierte por: WhatsApp con mensaje precompuesto sobre cancha

**Segmento 2 — Organizador de eventos**
- Planea cumpleaños infantil, evento corporativo o reunión social
- Necesita: qué espacios hay, combinaciones posibles, capacidad, precio, condiciones
- Convierte por: WhatsApp o formulario de contacto estructurado

---

## Páginas

### Home (`/`)
Página de descubrimiento. El visitante entiende qué es Break Point y navega al segmento correcto (cancha vs. eventos) en menos de 5 segundos.

**Secciones:** Hero (foto diurna) · AvailabilityBadge · SegmentCards (bifurcación) · AmenitiesGrid · GalleryGrid · FaqSection · WhatsApp CTA final

### La Cancha (`/cancha`)
Conversión para alquiler de cancha. El capitán ve specs, precios y condiciones — luego convierte a WhatsApp con un tap.

**Secciones:** Hero (foto nocturna) · FieldSpecs · PricingBlock · HowItWorks · WhatsApp CTA

### Eventos (`/eventos`)
Captación de leads para eventos. El organizador ve combinaciones de espacios, precios referenciales y contacta por WhatsApp (principal) o formulario (secundario).

**Secciones:** Hero (foto diurna) · PricingBlock (combinaciones) · HowItWorks · LocationSection · ContactForm

---

## Datos del Negocio

### Información de Contacto
- **WhatsApp:** +591 70690685 (provisional — reemplazar con WhatsApp Business)
- **Dirección:** Av. Principal (Av. Costanera) esq. Calle 6 Nº18, Caliri, Zona Sur, La Paz
- **Horarios:** 08:00 – 22:00
- **Google Maps:** PENDIENTE (dueño debe confirmar URL)

### Precios
| Servicio | Precio | Estado |
|---|---|---|
| Cancha de día | Bs 120/hora | ✅ Confirmado |
| Cancha de noche (con iluminación) | Bs 130/hora | ✅ Confirmado |
| Complejo completo por hora | Bs 250/hora (3 hr mínimo) | ✅ Confirmado |
| Complejo completo hora 4+ | TBD | ⏳ Pendiente dueño |
| Paquete cumpleaños (precio fijo) | TBD | ⏳ Pendiente dueño |
| Paquete cumpleaños (horas incluidas) | TBD | ⏳ Pendiente dueño |

### Condiciones de Reserva
- **Cancha:** Adelanto = % a confirmar con el dueño
- **Eventos:** 50% de adelanto bloquea la fecha
- **Combinaciones de eventos:** Cancha+Parrilla · Salón+Parrilla · Salón+Cancha · Complejo completo — precio según combinación, cotizar sin compromiso

### Amenidades
✅ Cancha al aire libre (césped sintético)
✅ Iluminación nocturna
✅ Salón para eventos
✅ Área de parrilla
✅ Cocina equipada
✅ Baños H/M
❌ NO hay vestuarios
❌ NO hay estacionamiento propio

---

## Requisitos Funcionales (33 FRs)

### Navegación y Estructura
- **FR1** Visitantes navegan entre Home, La Cancha y Eventos desde cualquier página sin perder posición
- **FR2** Visitantes acceden a WhatsApp desde cualquier página en cualquier scroll
- **FR3** Visitantes identifican nombre, ubicación y contacto desde el footer
- **FR4** En mobile, visitantes acceden al menú completo desde un control compacto
- **FR5** Search engines rastrean todas las páginas via sitemap

### Contenido e Información
- **FR6** Visitantes ven la lista completa de amenidades en un lugar
- **FR7** Visitantes ven specs del campo (superficie, dimensiones, capacidad, iluminación) en La Cancha
- **FR8** Visitantes ven todos los precios con condición mínima claramente indicada
- **FR9** Visitantes ven opciones de combinación para eventos (modelo: precio-por-WhatsApp)
- **FR10** Visitantes ven condiciones de reserva sin iniciar contacto
- **FR11** Visitantes ven ventanas de disponibilidad típicas para auto-calificarse
- **FR12** Visitantes ven fotografía del venue en las 3 páginas
- **FR13** Visitantes obtienen respuestas a preguntas comunes (capacidad, qué incluye, cómo reservar, estacionamiento, ubicación) sin contactar
- **FR14** Visitantes en Home identifican qué página les corresponde y navegan directamente

### Captación de Leads y Contacto
- **FR15** Visitantes inician WhatsApp con mensaje precompuesto relevante a la página
- **FR16** Visitantes en Eventos envían consulta estructurada (nombre, teléfono, fecha, tipo evento, invitados)
- **FR17** Visitantes reciben confirmación on-screen tras enviar el formulario
- **FR18** Visitantes reciben sugerencia de WhatsApp tras enviar el formulario
- **FR19** Visitantes ven errores inline específicos por campo sin perder otros inputs

### Notificaciones al Dueño
- **FR20** El dueño recibe email con todos los campos del formulario, formateado para WhatsApp follow-up
- **FR21** El sistema previene envíos automatizados o excesivos (5 req/hr/IP)
- **FR22** Información de contacto del dueño se actualiza desde un solo archivo de configuración

### SEO y Discoverabilidad
- **FR23** Cada página tiene metadata única (title, description) para search engines y social
- **FR24** El sitio presenta datos estructurados del venue como sports location
- **FR25** El sitio presenta datos estructurados para el contenido FAQ
- **FR26** El sitio declara su política de crawling
- **FR27** LLMs pueden leer descripción machine-readable del venue

### Performance y Media
- **FR28** Imágenes cargan progresivamente — placeholder inmediato, imagen real sin layout shift
- **FR29** El sitio cumple Core Web Vitals en mobile con 4G boliviano típico
- **FR30** Todas las imágenes se pueden reemplazar sin cambios de código

### Localización y Marca
- **FR31** Todo el copy visible para visitantes está en español por defecto
- **FR32** La infraestructura soporta variante en inglés sin cambios estructurales
- **FR33** Todos los strings de marca (nombre, teléfono, dirección, link WA) vienen de un solo archivo de configuración

---

## Requisitos No Funcionales (resumen)

### Performance
- LCP < 2.5s mobile 4G · CLS < 0.1 · INP < 200ms · First Load JS < 80KB
- PageSpeed mobile ≥ 90 · PageSpeed desktop ≥ 95

### Seguridad
- Rate limiting 5 req/hr/IP via Upstash · Sin PII en logs
- Validación server-side · Secrets en env vars · CSP via proxy.ts · HTTPS (Vercel)

### Accesibilidad
- Lighthouse Accessibility ≥ 95 · WCAG 2.1 AA
- Semantic HTML · ARIA labels en español · Focus rings visibles · Touch targets ≥ 44×44px

### Escalabilidad
- Home y La Cancha: SSG (cero cómputo servidor)
- Único endpoint live: Server Action de Eventos (rate-limited)
- Deploy automático en Vercel CDN edge

---

## Mensajes de WhatsApp Precompuestos

| Página | Mensaje |
|---|---|
| Home | "Hola, me interesa conocer más sobre Break Point." |
| La Cancha | "Hola, quiero reservar la cancha. ¿Cuál es la disponibilidad?" |
| Eventos | "Hola, quiero cotizar un evento en Break Point." |
| Share (LocationSection) | "Te comparto la ubicación de Break Point: Av. Principal esq. Calle 6 Nº18, Caliri, Zona Sur, La Paz." |

---

## Decisiones de Producto

1. **WhatsApp como canal primario** — sin sistema de reservas online. El dueño confirma manualmente.
2. **Formulario solo en Eventos** — La Cancha convierte solo por WhatsApp (segmento más simple).
3. **Precios visibles en La Cancha** — reduce fricción para el capitán de equipo.
4. **Precios de eventos: cotizar** — combinaciones muy variables, precio por WhatsApp reduce expectativas incorrectas.
5. **Fotografías V1: placeholders** — el sitio lanza con `<VenueImage>` placeholders, fotos reales se agregan post-launch sin cambio de código.
6. **Disponibilidad V1: estática** — badge "Disponible hoy" siempre verde. V1.5 conectará Google Calendar iframe.
7. **No CMS, no analytics, no chat** — Starter tier, se activan en V2.
