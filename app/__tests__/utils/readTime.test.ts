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

  describe('Edge Cases', () => {
    it('should handle null input', () => {
      expect(() => calculateReadTime(null as any)).toThrow()
    })

    it('should handle undefined input', () => {
      expect(() => calculateReadTime(undefined as any)).toThrow()
    })

    it('should handle numeric input', () => {
      expect(() => calculateReadTime(123 as any)).toThrow()
    })

    it('should handle boolean input', () => {
      expect(() => calculateReadTime(true as any)).toThrow()
    })

    it('should handle object input', () => {
      expect(() => calculateReadTime({} as any)).toThrow()
    })

    it('should handle array input', () => {
      expect(() => calculateReadTime([] as any)).toThrow()
    })

    it('should handle extremely long text (10000 words)', () => {
      const words = Array(10000).fill('word').join(' ')
      const result = calculateReadTime(words)
      expect(result).toBe(50)
      expect(typeof result).toBe('number')
    })

    it('should handle text with only special characters', () => {
      const text = '!@#$%^&*()_+-=[]{}|;":,./<>?'
      expect(calculateReadTime(text)).toBe(1)
    })

    it('should handle text with only numbers', () => {
      const text = '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20'
      expect(calculateReadTime(text)).toBe(1)
    })

    it('should handle text with mixed language characters', () => {
      const text = 'Hello こんにちは Bonjour Hola 你好 مرحبا Привет Γεια σας'
      expect(calculateReadTime(text)).toBe(1)
    })

    it('should handle text with emojis', () => {
      const text = '😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 🥰 😗 😙 😚 ☺️ 🙂'
      expect(calculateReadTime(text)).toBe(1)
    })

    it('should handle text with tabs and carriage returns', () => {
      const text = 'word1\tword2\rword3\nword4\r\nword5'
      expect(calculateReadTime(text)).toBe(1)
    })

    it('should handle text with excessive whitespace', () => {
      const text = '     word1          word2               word3     '
      expect(calculateReadTime(text)).toBe(1)
    })

    it('should handle single character repeated', () => {
      const text = 'a'.repeat(1000)
      expect(calculateReadTime(text)).toBe(1)
    })

    it('should handle HTML-like content', () => {
      const text = '<div>Hello <span>world</span> this is <strong>test</strong> content</div>'
      expect(calculateReadTime(text)).toBe(1)
    })

    it('should handle markdown-like content', () => {
      const text = '# Title\n## Subtitle\n**Bold** and *italic* text with [links](url)'
      expect(calculateReadTime(text)).toBe(1)
    })

    it('should handle URLs and email addresses', () => {
      const text = 'Visit https://example.com or email user@example.com for more info'
      expect(calculateReadTime(text)).toBe(1)
    })

    it('should handle contractions and apostrophes', () => {
      const text = "Don't you think it's amazing that we're testing can't, won't, shouldn't?"
      expect(calculateReadTime(text)).toBe(1)
    })

    it('should handle hyphenated words', () => {
      const text =
        'Well-known state-of-the-art twenty-one thirty-two forty-three fifty-four sixty-five seventy-six eighty-seven ninety-eight'
      expect(calculateReadTime(text)).toBe(1)
    })
  })
})
