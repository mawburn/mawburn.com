import { parseFrontmatter } from '~/utils/frontmatter'
import { describe, expect, it } from 'vitest'

describe('parseFrontmatter', () => {
  it('parses valid frontmatter correctly', () => {
    const content = `---
title: "Test Post"
date: "2024-01-15"
excerpt: "This is a test post"
tags: ["javascript", "testing"]
---

This is the content of the post.`

    const result = parseFrontmatter(content)

    expect(result.data.title).toBe('Test Post')
    expect(result.data.date).toBe('2024-01-15')
    expect(result.data.excerpt).toBe('This is a test post')
    expect(result.data.tags).toEqual(['javascript', 'testing'])
    expect(result.data.image).toBeUndefined()
    expect(result.content).toBe('\nThis is the content of the post.')
  })

  it('handles frontmatter without quotes', () => {
    const content = `---
title: Test Post Without Quotes
date: 2024-01-15
excerpt: This is a test excerpt
tags: [javascript, testing, "quoted tag"]
---

Content here.`

    const result = parseFrontmatter(content)

    expect(result.data.title).toBe('Test Post Without Quotes')
    expect(result.data.date).toBe('2024-01-15')
    expect(result.data.excerpt).toBe('This is a test excerpt')
    expect(result.data.tags).toEqual(['javascript', 'testing', 'quoted tag'])
  })

  it('handles single quotes in frontmatter', () => {
    const content = `---
title: 'Test Post with Single Quotes'
date: '2024-01-15'
excerpt: 'This is a test excerpt'
tags: ['javascript', 'testing']
---

Content here.`

    const result = parseFrontmatter(content)

    expect(result.data.title).toBe('Test Post with Single Quotes')
    expect(result.data.date).toBe('2024-01-15')
    expect(result.data.excerpt).toBe('This is a test excerpt')
    expect(result.data.tags).toEqual(['javascript', 'testing'])
  })

  it('parses image field correctly', () => {
    const content = `---
title: "Test Post with Image"
date: "2024-01-15"
excerpt: "This post has an image"
image: "test-image.jpg"
tags: ["javascript"]
---

Content here.`

    const result = parseFrontmatter(content)

    expect(result.data.title).toBe('Test Post with Image')
    expect(result.data.date).toBe('2024-01-15')
    expect(result.data.excerpt).toBe('This post has an image')
    expect(result.data.image).toBe('test-image.jpg')
    expect(result.data.tags).toEqual(['javascript'])
  })

  it('handles image field with full path', () => {
    const content = `---
title: "Test Post"
date: "2024-01-15"
excerpt: "Test"
image: "/images/custom/test-image.png"
tags: []
---

Content here.`

    const result = parseFrontmatter(content)

    expect(result.data.image).toBe('/images/custom/test-image.png')
  })

  it('handles missing image field', () => {
    const content = `---
title: "Test Post"
date: "2024-01-15"
excerpt: "Test"
tags: []
---

Content here.`

    const result = parseFrontmatter(content)

    expect(result.data.image).toBeUndefined()
  })

  it('handles empty arrays', () => {
    const content = `---
title: Test Post
date: 2024-01-15
excerpt: Test excerpt
tags: []
---

Content here.`

    const result = parseFrontmatter(content)

    expect(result.data.tags).toEqual([])
  })

  it('handles missing frontmatter', () => {
    const content = `This is just content without frontmatter.`

    const result = parseFrontmatter(content)

    expect(result.data.title).toBe('')
    expect(result.data.date).toBe('')
    expect(result.data.excerpt).toBe('')
    expect(result.data.tags).toEqual([])
    expect(result.data.image).toBeUndefined()
    expect(result.content).toBe(content)
  })

  it('handles incomplete frontmatter (no closing ---)', () => {
    const content = `---
title: Test Post
date: 2024-01-15

This content has no closing frontmatter delimiter.`

    const result = parseFrontmatter(content)

    expect(result.data.title).toBe('')
    expect(result.data.date).toBe('')
    expect(result.data.excerpt).toBe('')
    expect(result.data.tags).toEqual([])
    expect(result.data.image).toBeUndefined()
    expect(result.content).toBe(content)
  })

  it('handles frontmatter with extra whitespace', () => {
    const content = `---
title:    "Test Post"   
date:   2024-01-15  
excerpt:  "Test excerpt"  
tags:   [  "javascript"  ,  "testing"  ]  
---

Content here.`

    const result = parseFrontmatter(content)

    expect(result.data.title).toBe('Test Post')
    expect(result.data.date).toBe('2024-01-15')
    expect(result.data.excerpt).toBe('Test excerpt')
    expect(result.data.tags).toEqual(['javascript', 'testing'])
  })

  it('ignores invalid frontmatter lines', () => {
    const content = `---
title: Valid Title
invalid line without colon
date: 2024-01-15
: invalid colon at start
excerpt: Valid excerpt
another invalid line
tags: [tag1, tag2]
---

Content here.`

    const result = parseFrontmatter(content)

    expect(result.data.title).toBe('Valid Title')
    expect(result.data.date).toBe('2024-01-15')
    expect(result.data.excerpt).toBe('Valid excerpt')
    expect(result.data.tags).toEqual(['tag1', 'tag2'])
  })

  it('handles arrays with mixed quote styles', () => {
    const content = `---
title: Test Post
date: 2024-01-15
excerpt: Test excerpt
tags: ["double", 'single', unquoted, ""]
---

Content here.`

    const result = parseFrontmatter(content)

    expect(result.data.tags).toEqual(['double', 'single', 'unquoted'])
  })

  describe('Edge Cases', () => {
    it('should handle null input', () => {
      expect(() => parseFrontmatter(null as any)).toThrow()
    })

    it('should handle undefined input', () => {
      expect(() => parseFrontmatter(undefined as any)).toThrow()
    })

    it('should handle empty string', () => {
      const result = parseFrontmatter('')

      expect(result.data.title).toBe('')
      expect(result.data.date).toBe('')
      expect(result.data.excerpt).toBe('')
      expect(result.data.tags).toEqual([])
      expect(result.data.image).toBeUndefined()
      expect(result.content).toBe('')
    })

    it('should handle numeric input', () => {
      expect(() => parseFrontmatter(123 as any)).toThrow()
    })

    it('should handle only frontmatter delimiters', () => {
      const content = `---
---`
      const result = parseFrontmatter(content)

      expect(result.data.title).toBe('')
      expect(result.data.date).toBe('')
      expect(result.data.excerpt).toBe('')
      expect(result.data.tags).toEqual([])
      expect(result.data.image).toBeUndefined()
      expect(result.content).toBe('')
    })

    it('should handle frontmatter with only spaces', () => {
      const content = `---
   
     
---

Content`
      const result = parseFrontmatter(content)

      expect(result.data.title).toBe('')
      expect(result.data.date).toBe('')
      expect(result.data.excerpt).toBe('')
      expect(result.data.tags).toEqual([])
      expect(result.data.image).toBeUndefined()
      expect(result.content).toBe('\nContent')
    })

    it('should handle malformed arrays (missing brackets)', () => {
      const content = `---
title: Test
tags: javascript, testing
---

Content`
      const result = parseFrontmatter(content)

      expect(result.data.tags).toEqual([])
    })

    it('should handle arrays with only commas', () => {
      const content = `---
title: Test
tags: [,,,]
---

Content`
      const result = parseFrontmatter(content)

      expect(result.data.tags).toEqual([])
    })

    it('should handle arrays with nested brackets', () => {
      const content = `---
title: Test
tags: ["tag[1]", "tag]2[", "[tag3]"]
---

Content`
      const result = parseFrontmatter(content)

      expect(result.data.tags).toEqual(['tag[1]', 'tag]2[', '[tag3]'])
    })

    it('should handle extremely long values', () => {
      const longValue = 'a'.repeat(10000)
      const content = `---
title: ${longValue}
date: 2024-01-15
---

Content`
      const result = parseFrontmatter(content)

      expect(result.data.title).toBe(longValue)
      expect(result.data.date).toBe('2024-01-15')
    })

    it('should handle special characters in values', () => {
      const content = `---
title: "Title with 🚀 emojis and símböls & çhârs"
date: 2024-01-15
excerpt: "Special chars: !@#$%^&*()_+-=[]{}|;':",./<>?"
---

Content`
      const result = parseFrontmatter(content)

      expect(result.data.title).toBe('Title with 🚀 emojis and símböls & çhârs')
      expect(result.data.excerpt).toBe('Special chars: !@#$%^&*()_+-=[]{}|;\':",./<>?')
    })

    it('should handle values with line breaks (should be ignored)', () => {
      const content = `---
title: Title with
line break
date: 2024-01-15
---

Content`
      const result = parseFrontmatter(content)

      expect(result.data.title).toBe('Title with')
      expect(result.data.date).toBe('2024-01-15')
    })

    it('should handle multiple --- in content', () => {
      const content = `---
title: Test
---

Content with --- dashes --- in it`
      const result = parseFrontmatter(content)

      expect(result.data.title).toBe('Test')
      expect(result.content).toBe('\nContent with --- dashes --- in it')
    })

    it('should handle frontmatter with no content after', () => {
      const content = `---
title: Test
date: 2024-01-15
---`
      const result = parseFrontmatter(content)

      expect(result.data.title).toBe('Test')
      expect(result.data.date).toBe('2024-01-15')
      expect(result.content).toBe('')
    })

    it('should handle duplicate keys (last one wins)', () => {
      const content = `---
title: First Title
date: 2024-01-15
title: Second Title
---

Content`
      const result = parseFrontmatter(content)

      expect(result.data.title).toBe('Second Title')
      expect(result.data.date).toBe('2024-01-15')
    })

    it('should handle arrays with unmatched quotes', () => {
      const content = `---
title: Test
tags: ["unclosed, 'quote", "normal"]
---

Content`
      const result = parseFrontmatter(content)

      expect(result.data.tags).toEqual(['unclosed', 'quote', 'normal'])
    })

    it('should handle values with escaped quotes', () => {
      const content = `---
title: "Title with \\"escaped\\" quotes"
excerpt: 'Single with \\'escaped\\' quotes'
---

Content`
      const result = parseFrontmatter(content)

      expect(result.data.title).toBe('Title with \\"escaped\\" quotes')
      expect(result.data.excerpt).toBe("Single with \\'escaped\\' quotes")
    })
  })
})
