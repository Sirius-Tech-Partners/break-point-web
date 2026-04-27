'use client'

import { useActionState, useEffect, useRef } from 'react'
import { Loader2, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { contactAction, type ActionResult } from '@/app/events/actions'
import { siteConfig } from '@/config/site'

function FieldError({ id, messages }: { id: string; messages?: string[] }) {
  if (!messages?.length) return null
  return (
    <p id={id} role="alert" className="mt-1 font-ui text-sm text-error">
      {messages[0]}
    </p>
  )
}

function inputClass(hasError: boolean) {
  return cn(
    'w-full rounded-lg border px-4 py-3 font-body text-base text-on-surface outline-none transition-colors placeholder:text-on-surface-var/50',
    'focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
    hasError ? 'border-error bg-error/5' : 'border-outline/30 bg-white'
  )
}

export function EventContactForm() {
  const [state, action, isPending] = useActionState<ActionResult | null, FormData>(
    contactAction,
    null
  )

  const successRef = useRef<HTMLDivElement>(null)

  const fieldErrors = state && 'errors' in state ? state.errors : {}
  const isSuccess = state && 'success' in state && state.success
  const globalError = state && 'error' in state ? state.error : null

  // Min date: 72 hours (3 days) from today — matches business policy
  const minDate = new Date()
  minDate.setDate(minDate.getDate() + 3)
  const minDateStr = minDate.toISOString().split('T')[0]

  // Focus management per NFR-A5
  useEffect(() => {
    if (isSuccess && successRef.current) {
      successRef.current.focus()
    }
  }, [isSuccess])

  useEffect(() => {
    if (fieldErrors && Object.keys(fieldErrors).length > 0) {
      document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
    }
  }, [fieldErrors])

  const waHref = `https://wa.me/${siteConfig.whatsapp.phone}?text=${encodeURIComponent(siteConfig.whatsapp.messages.eventos)}`

  if (isSuccess) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="rounded-xl border border-available/30 bg-available/10 p-8 text-center outline-none"
      >
        <p className="font-heading text-lg font-bold text-available">
          Mensaje enviado. Te respondemos pronto.
        </p>
        <p className="mt-3 font-body text-sm text-on-surface-var">
          ¿Preferís respuesta inmediata?{' '}
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary-500 underline underline-offset-2 hover:opacity-80"
          >
            Escribinos por WhatsApp
          </a>
        </p>
      </div>
    )
  }

  return (
    <>
      <h2 className="mb-[var(--spacing-md)] text-center font-heading text-3xl font-bold text-on-surface md:text-4xl">
        Envianos tu consulta
      </h2>
      <p className="mb-[var(--spacing-md)] text-center font-body text-base text-on-surface-var">
        Completá el formulario y te respondemos con una cotización a medida.
      </p>
    <form action={action} noValidate className="flex flex-col gap-5">
      {globalError && (
        <div role="alert" className="rounded-lg border border-error/30 bg-error/10 px-4 py-3">
          <p className="font-ui text-sm font-medium text-error">
            {globalError === 'rate_limit'
              ? 'Demasiados intentos. Esperá unos minutos.'
              : 'Algo salió mal. Intentá de nuevo.'}
          </p>
        </div>
      )}

      {/* Legend */}
      <p className="text-xs text-on-surface-var">
        Los campos con <span className="text-error font-medium">*</span> son obligatorios
      </p>

      {/* Nombre */}
      <div>
        <label htmlFor="nombre" className="block font-ui text-sm font-medium text-on-surface">
          Nombre <span aria-hidden="true" className="text-error">*</span>
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          autoComplete="name"
          aria-describedby={fieldErrors.nombre ? 'nombre-error' : undefined}
          aria-invalid={!!fieldErrors.nombre}
          className={cn('mt-1', inputClass(!!fieldErrors.nombre))}
        />
        <FieldError id="nombre-error" messages={fieldErrors.nombre} />
      </div>

      {/* Teléfono */}
      <div>
        <label htmlFor="telefono" className="block font-ui text-sm font-medium text-on-surface">
          Teléfono <span aria-hidden="true" className="text-error">*</span>
        </label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          required
          autoComplete="tel"
          placeholder="70690685"
          aria-describedby={fieldErrors.telefono ? 'telefono-error' : undefined}
          aria-invalid={!!fieldErrors.telefono}
          className={cn('mt-1', inputClass(!!fieldErrors.telefono))}
        />
        <FieldError id="telefono-error" messages={fieldErrors.telefono} />
      </div>

      {/* Fecha del evento */}
      <div>
        <label htmlFor="fecha" className="block font-ui text-sm font-medium text-on-surface">
          Fecha del evento <span aria-hidden="true" className="text-error">*</span>
        </label>
        <input
          id="fecha"
          name="fecha"
          type="date"
          required
          min={minDateStr}
          aria-describedby={fieldErrors.fecha ? 'fecha-error' : undefined}
          aria-invalid={!!fieldErrors.fecha}
          className={cn('mt-1', inputClass(!!fieldErrors.fecha))}
        />
        <FieldError id="fecha-error" messages={fieldErrors.fecha} />
      </div>

      {/* Tipo de evento */}
      <div>
        <label htmlFor="tipo" className="block font-ui text-sm font-medium text-on-surface">
          Tipo de evento <span aria-hidden="true" className="text-error">*</span>
        </label>
        <select
          id="tipo"
          name="tipo"
          required
          aria-describedby={fieldErrors.tipo ? 'tipo-error' : undefined}
          aria-invalid={!!fieldErrors.tipo}
          className={cn('mt-1', inputClass(!!fieldErrors.tipo))}
        >
          <option value="" disabled>Seleccioná una opción</option>
          <option value="cumpleanos">Cumpleaños infantil</option>
          <option value="corporativo">Evento corporativo</option>
          <option value="social">Reunión social</option>
          <option value="otro">Otro</option>
        </select>
        <FieldError id="tipo-error" messages={fieldErrors.tipo} />
      </div>

      {/* Nro de invitados (opcional) */}
      <div>
        <label htmlFor="invitados" className="block font-ui text-sm font-medium text-on-surface">
          Nro de invitados{' '}
          <span className="font-normal text-on-surface-var">(opcional)</span>
        </label>
        <input
          id="invitados"
          name="invitados"
          type="number"
          min={1}
          aria-describedby={fieldErrors.invitados ? 'invitados-error' : undefined}
          aria-invalid={!!fieldErrors.invitados}
          className={cn('mt-1', inputClass(!!fieldErrors.invitados))}
        />
        <FieldError id="invitados-error" messages={fieldErrors.invitados} />
      </div>

      {/* Mensaje (opcional) */}
      <div>
        <label htmlFor="mensaje" className="block font-ui text-sm font-medium text-on-surface">
          Mensaje{' '}
          <span className="font-normal text-on-surface-var">(opcional, máx. 300 caracteres)</span>
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={4}
          maxLength={300}
          aria-describedby={fieldErrors.mensaje ? 'mensaje-error' : undefined}
          aria-invalid={!!fieldErrors.mensaje}
          className={cn('mt-1 resize-none', inputClass(!!fieldErrors.mensaje))}
        />
        <FieldError id="mensaje-error" messages={fieldErrors.mensaje} />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-cta px-6 py-3 font-ui font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {isPending ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            <span>Enviando…</span>
          </>
        ) : (
          <>
            <MessageCircle size={18} aria-hidden="true" />
            <span>Enviar consulta</span>
          </>
        )}
      </button>
    </form>
    </>
  )
}
