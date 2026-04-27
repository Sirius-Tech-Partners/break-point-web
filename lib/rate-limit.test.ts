import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock Redis before importing the module under test
vi.mock('@upstash/redis', () => ({
  Redis: { fromEnv: vi.fn(() => ({})) },
}))

const mockSlidingWindow = vi.fn().mockReturnValue({ type: 'slidingWindow', limit: 5, window: '1 h' })
const MockRatelimit = Object.assign(vi.fn(), { slidingWindow: mockSlidingWindow })

vi.mock('@upstash/ratelimit', () => ({
  Ratelimit: MockRatelimit,
}))

describe('contactLimiter', () => {
  beforeEach(() => {
    vi.resetModules()
    mockSlidingWindow.mockClear()
    MockRatelimit.mockClear()
  })

  it('is configured with a sliding window of 5 requests per hour', async () => {
    await import('@/lib/rate-limit')
    expect(mockSlidingWindow).toHaveBeenCalledWith(5, '1 h')
  })

  it('uses Redis.fromEnv() — credentials from environment variables', async () => {
    const { Redis } = await import('@upstash/redis')
    expect(Redis.fromEnv).toHaveBeenCalled()
  })
})
