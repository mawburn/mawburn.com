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
})

describe('isInDevelopment', () => {
  it('returns boolean value', () => {
    const result = isInDevelopment()
    expect(typeof result).toBe('boolean')
  })
})

describe('Edge Cases', () => {
  describe('isPostPublished with edge cases', () => {
    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2024-06-15T12:00:00.000Z'))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should handle null input', () => {
      expect(() => isPostPublished(null as any)).toThrow()
    })

    it('should handle undefined input', () => {
      expect(() => isPostPublished(undefined as any)).toThrow()
    })

    it('should handle empty string', () => {
      expect(isPostPublished('')).toBe(false)
    })

    it('should handle invalid date string', () => {
      expect(isPostPublished('not-a-date')).toBe(false)
    })

    it('should handle malformed ISO date', () => {
      expect(isPostPublished('2024-13-40T25:70:80Z')).toBe(false)
    })

    it('should handle dates at exact current time', () => {
      expect(isPostPublished('2024-06-15T12:00:00.000Z')).toBe(true)
    })

    it('should handle dates 1 millisecond in future', () => {
      expect(isPostPublished('2024-06-15T12:00:00.001Z')).toBe(false)
    })

    it('should handle dates 1 millisecond in past', () => {
      expect(isPostPublished('2024-06-15T11:59:59.999Z')).toBe(true)
    })

    it('should handle very old dates', () => {
      expect(isPostPublished('0001-01-01')).toBe(true)
    })

    it('should handle very future dates', () => {
      expect(isPostPublished('9999-12-31')).toBe(false)
    })

    it('should handle leap year edge case', () => {
      expect(isPostPublished('2024-02-29')).toBe(true)
    })

    it('should handle timezone boundary cases', () => {
      expect(isPostPublished('2024-06-15T11:29:59Z')).toBe(true)
      expect(isPostPublished('2024-06-15T12:00:01Z')).toBe(false)
    })

    it('should handle date with unusual whitespace', () => {
      expect(isPostPublished('  2024-06-14  ')).toBe(false)
    })
  })

  describe('formatPublishDate with edge cases', () => {
    it('should handle null input gracefully', () => {
      expect(() => formatPublishDate(null as any)).toThrow()
    })

    it('should handle undefined input gracefully', () => {
      expect(() => formatPublishDate(undefined as any)).toThrow()
    })

    it('should handle empty string', () => {
      const result = formatPublishDate('')
      expect(typeof result).toBe('string')
    })

    it('should handle invalid date string', () => {
      const result = formatPublishDate('not-a-date')
      expect(typeof result).toBe('string')
    })

    it('should handle malformed ISO date', () => {
      const result = formatPublishDate('2024-13-40T25:70:80Z')
      expect(typeof result).toBe('string')
    })

    it('should handle very old dates', () => {
      const result = formatPublishDate('0001-01-01')
      expect(typeof result).toBe('string')
      expect(result.length).toBeGreaterThan(0)
    })

    it('should handle very future dates', () => {
      const result = formatPublishDate('9999-12-31')
      expect(typeof result).toBe('string')
      expect(result.length).toBeGreaterThan(0)
    })

    it('should handle leap year edge case', () => {
      const result = formatPublishDate('2024-02-29')
      expect(typeof result).toBe('string')
      expect(result.length).toBeGreaterThan(0)
    })
  })
})
