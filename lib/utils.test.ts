import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn()', () => {
  it('returns a single class unchanged', () => {
    expect(cn('px-4')).toBe('px-4')
  })

  it('merges conflicting Tailwind classes — last wins', () => {
    expect(cn('px-4', 'px-6')).toBe('px-6')
    expect(cn('text-sm', 'text-lg')).toBe('text-lg')
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500')
  })

  it('handles falsy values without crashing', () => {
    expect(cn('px-4', undefined, null, false, '')).toBe('px-4')
  })

  it('handles empty input', () => {
    expect(cn()).toBe('')
  })

  it('flattens arrays of classes', () => {
    expect(cn(['px-4', 'py-2'], 'font-bold')).toBe('px-4 py-2 font-bold')
  })
})
