import { describe, expect, it } from 'vitest'

import { calculateReadTime } from '~/utils/readTime'

describe('calculateReadTime', () => {
  it('calculates read time for normal text', () => {
    const text =
      'This is a sample text with exactly twenty words in it to test the reading time calculation function properly.'
    expect(calculateReadTime(text)).toBe(1)
  })

  it('returns minimum 1 minute for very short text', () => {
    expect(calculateReadTime('Hello')).toBe(1)
    expect(calculateReadTime('')).toBe(1)
    expect(calculateReadTime('   ')).toBe(1)
  })

  it('calculates read time for longer text', () => {
    const words = Array(400).fill('word').join(' ')
    expect(calculateReadTime(words)).toBe(2)
  })

  it('handles text with multiple spaces and newlines', () => {
    const text = `This    has    multiple     spaces    between    words
    and newlines
    and multiple
    lines of text
    that should be
    counted properly`
    expect(calculateReadTime(text)).toBe(1)
  })

  it('rounds up fractional minutes', () => {
    // 250 words should be 1.25 minutes, rounded up to 2
    const words = Array(250).fill('word').join(' ')
    expect(calculateReadTime(words)).toBe(2)
  })

  it('handles edge cases', () => {
    // Special characters and numbers
    expect(calculateReadTime('!@#$%^&*()_+-=[]{}|;":,./<>?')).toBe(1)
    expect(calculateReadTime('1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20')).toBe(1)

    // Very long text
    const longText = Array(10000).fill('word').join(' ')
    expect(calculateReadTime(longText)).toBe(50)

    // Mixed content
    expect(calculateReadTime('Hello 😀 world 🌍 with emojis and こんにちは')).toBe(1)
    expect(calculateReadTime('<div>HTML-like <strong>content</strong></div>')).toBe(1)
  })
})
