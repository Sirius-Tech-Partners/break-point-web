'use server'

import { headers } from 'next/headers'
import { Resend } from 'resend'
import { contactLimiter } from '@/lib/rate-limit'
import { contactSchema } from './schema'
import { siteConfig } from '@/config/site'

export type ActionResult =
  | { success: true; message: string }
  | { error: 'rate_limit' | 'validation' | 'server' | 'config' }
  | { errors: Record<string, string[]> }

const TIPO_LABEL: Record<string, string> = {
  cumpleanos: 'Cumpleaños infantil',
  corporativo: 'Evento corporativo',
  social: 'Reunión social',
  otro: 'Otro',
}

export async function contactAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult | null> {

  // 1. Zod validation (E4.3 — do not move)
  const raw = Object.fromEntries(formData)
  const result = contactSchema.safeParse(raw)
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors as Record<string, string[]> }
  }

  // 2. Rate limiting — 5 req/hr per IP
  const headersList = await headers()
  const ip =
    headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headersList.get('x-real-ip') ??
    '127.0.0.1'

  try {
    const { success } = await contactLimiter.limit(ip)
    if (!success) return { error: 'rate_limit' }
  } catch {
    // Upstash unavailable — fail open, no PII logged
    console.error('[contact] rate limiter unavailable, proceeding')
  }

  // 3. Env vars check
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_RECEIVER_EMAIL
  if (!apiKey || !to) return { error: 'config' }

  // 4. Send email via Resend
  const { nombre, telefono, fecha, tipo, invitados, mensaje } = result.data

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to,
    subject: 'Nueva consulta de evento — Break Point',
    html: `
      <h2 style="color:#1a1a1a">Nueva consulta de evento</h2>
      <table style="font-family:sans-serif;font-size:15px;line-height:1.6">
        <tr><td><strong>Nombre</strong></td><td>${nombre}</td></tr>
        <tr><td><strong>Teléfono</strong></td><td><a href="tel:${telefono}">${telefono}</a></td></tr>
        <tr><td><strong>Fecha del evento</strong></td><td>${fecha}</td></tr>
        <tr><td><strong>Tipo</strong></td><td>${TIPO_LABEL[tipo] ?? tipo}</td></tr>
        <tr><td><strong>Invitados</strong></td><td>${invitados ?? 'No especificado'}</td></tr>
        <tr><td><strong>Mensaje</strong></td><td>${mensaje ?? '—'}</td></tr>
      </table>
      <hr style="margin:24px 0" />
      <a href="https://wa.me/${siteConfig.whatsapp.phone}"
         style="background:#25D366;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-family:sans-serif">
        Responder por WhatsApp
      </a>
    `,
  })

  if (error) return { error: 'server' }

  return { success: true, message: 'Mensaje enviado correctamente.' }
}
