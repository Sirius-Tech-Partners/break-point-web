import { describe, it, expect } from 'vitest'
import { contactSchema } from '@/app/events/schema'

// Valid date 7 days from now
function futureDate(daysAhead = 7): string {
  const d = new Date()
  d.setDate(d.getDate() + daysAhead)
  return d.toISOString().split('T')[0]
}

const validBase = {
  nombre: 'María García',
  telefono: '70690685',
  fecha: futureDate(),
  tipo: 'cumpleanos' as const,
}

describe('contactSchema', () => {
  describe('nombre', () => {
    it('accepts a non-empty name', () => {
      expect(contactSchema.safeParse(validBase).success).toBe(true)
    })

    it('rejects an empty name', () => {
      const result = contactSchema.safeParse({ ...validBase, nombre: '' })
      expect(result.success).toBe(false)
    })
  })

  describe('telefono — Bolivian phone validation', () => {
    it('accepts 8-digit mobile starting with 7', () => {
      expect(contactSchema.safeParse({ ...validBase, telefono: '76543210' }).success).toBe(true)
    })

    it('accepts 8-digit mobile starting with 6', () => {
      expect(contactSchema.safeParse({ ...validBase, telefono: '67891234' }).success).toBe(true)
    })

    it('accepts number with +591 country code', () => {
      expect(contactSchema.safeParse({ ...validBase, telefono: '+59170690685' }).success).toBe(true)
    })

    it('accepts number with 591 prefix (no +)', () => {
      expect(contactSchema.safeParse({ ...validBase, telefono: '59170690685' }).success).toBe(true)
    })

    it('rejects a landline starting with 2', () => {
      expect(contactSchema.safeParse({ ...validBase, telefono: '22345678' }).success).toBe(false)
    })

    it('rejects too short number', () => {
      expect(contactSchema.safeParse({ ...validBase, telefono: '7069068' }).success).toBe(false)
    })

    it('rejects empty phone', () => {
      expect(contactSchema.safeParse({ ...validBase, telefono: '' }).success).toBe(false)
    })
  })

  describe('fecha — 3-day minimum advance', () => {
    it('accepts a date 7 days ahead', () => {
      expect(contactSchema.safeParse({ ...validBase, fecha: futureDate(7) }).success).toBe(true)
    })

    it('rejects a date only 1 day ahead', () => {
      expect(contactSchema.safeParse({ ...validBase, fecha: futureDate(1) }).success).toBe(false)
    })

    it('rejects an empty date', () => {
      expect(contactSchema.safeParse({ ...validBase, fecha: '' }).success).toBe(false)
    })
  })

  describe('tipo', () => {
    it('accepts all valid event types', () => {
      for (const tipo of ['cumpleanos', 'corporativo', 'social', 'otro']) {
        expect(contactSchema.safeParse({ ...validBase, tipo }).success).toBe(true)
      }
    })

    it('rejects an unknown event type', () => {
      expect(contactSchema.safeParse({ ...validBase, tipo: 'fiesta' }).success).toBe(false)
    })
  })

  describe('mensaje — optional, max 300 chars', () => {
    it('accepts no mensaje (optional)', () => {
      expect(contactSchema.safeParse(validBase).success).toBe(true)
    })

    it('accepts mensaje within 300 chars', () => {
      expect(contactSchema.safeParse({ ...validBase, mensaje: 'Hola'.repeat(10) }).success).toBe(true)
    })

    it('rejects mensaje over 300 chars', () => {
      expect(contactSchema.safeParse({ ...validBase, mensaje: 'x'.repeat(301) }).success).toBe(false)
    })
  })
})
