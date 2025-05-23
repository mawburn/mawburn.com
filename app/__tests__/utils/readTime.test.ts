import { calculateReadTime } from '~/utils/readTime'
import { describe, expect, it } from 'vitest'

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

  it('calculates read time for text with multiple spaces', () => {
    const text = 'This    has    multiple     spaces    between    words'
    expect(calculateReadTime(text)).toBe(1)
  })

  it('calculates read time for text with newlines', () => {
    const text = `This is a test
    with newlines
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

  it('handles text with punctuation', () => {
    const text = 'Hello, world! This is a test. How are you? I am fine, thank you very much.'
    expect(calculateReadTime(text)).toBe(1)
  })
})
