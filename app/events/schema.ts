import { z } from 'zod'

const phoneRegex = /^(\+?591)?[67]\d{7}$/

export const contactSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  telefono: z
    .string()
    .min(1, 'El teléfono es requerido')
    .regex(phoneRegex, 'Ingresá un número boliviano válido (ej. 70690685)'),
  fecha: z
    .string()
    .min(1, 'La fecha del evento es requerida')
    .refine(val => {
      const event = new Date(val + 'T00:00:00')
      const min = new Date()
      min.setDate(min.getDate() + 3)
      min.setHours(0, 0, 0, 0)
      return event >= min
    }, 'La fecha debe ser con al menos 3 días de anticipación'),
  tipo: z.enum(['cumpleanos', 'corporativo', 'social', 'otro'], {
    error: 'Seleccioná un tipo de evento',
  }),
  invitados: z.preprocess(v => v === '' ? undefined : v, z.coerce.number().int().min(1).optional()),
  mensaje: z.string().max(300, 'Máximo 300 caracteres').optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
