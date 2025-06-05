import { isPostPublished, formatPublishDate, isInDevelopment } from '~/utils/dateUtils'
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'

describe('isPostPublished', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-06-15T12:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns true for past dates', () => {
    expect(isPostPublished('2024-06-14')).toBe(true)
    expect(isPostPublished('2024-01-01')).toBe(true)
  })

  it('returns false for future dates', () => {
    expect(isPostPublished('2024-06-16')).toBe(false)
    expect(isPostPublished('2024-12-25')).toBe(false)
  })

  it('handles datetime formats', () => {
    expect(isPostPublished('2024-06-15T11:00:00Z')).toBe(true)
    expect(isPostPublished('2024-06-15T13:00:00Z')).toBe(false)
  })

  it('handles edge cases', () => {
    // Invalid dates
    expect(isPostPublished('')).toBe(false)
    expect(isPostPublished('not-a-date')).toBe(false)

    // Exact current time
    expect(isPostPublished('2024-06-15T12:00:00.000Z')).toBe(true)

    // One millisecond difference
    expect(isPostPublished('2024-06-15T12:00:00.001Z')).toBe(false)
    expect(isPostPublished('2024-06-15T11:59:59.999Z')).toBe(true)
  })
})

describe('formatPublishDate', () => {
  it('returns formatted date string', () => {
    const result = formatPublishDate('2024-06-15')
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
  })

  it('handles datetime input', () => {
    const result = formatPublishDate('2024-06-15T12:30:00Z')
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
  })

  it('handles invalid date strings gracefully', () => {
    const result = formatPublishDate('not-a-date')
    expect(typeof result).toBe('string')
  })
})

describe('isInDevelopment', () => {
  it('returns boolean value', () => {
    const result = isInDevelopment()
    expect(typeof result).toBe('boolean')
  })
})
