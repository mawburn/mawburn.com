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

  it('handles different quote styles and formats', () => {
    const content = `---
title: Test Post Without Quotes
date: 2024-01-15
excerpt: 'Single quoted excerpt'
tags: ["double", 'single', unquoted]
image: "/images/test.jpg"
---

Content here.`

    const result = parseFrontmatter(content)

    expect(result.data.title).toBe('Test Post Without Quotes')
    expect(result.data.date).toBe('2024-01-15')
    expect(result.data.excerpt).toBe('Single quoted excerpt')
    expect(result.data.tags).toEqual(['double', 'single', 'unquoted'])
    expect(result.data.image).toBe('/images/test.jpg')
  })

  it('handles missing or invalid frontmatter', () => {
    // No frontmatter
    const noFrontmatter = `This is just content without frontmatter.`
    const result1 = parseFrontmatter(noFrontmatter)
    expect(result1.data.title).toBe('')
    expect(result1.data.tags).toEqual([])
    expect(result1.content).toBe(noFrontmatter)

    // Incomplete frontmatter
    const incomplete = `---
title: Test Post
date: 2024-01-15

This content has no closing frontmatter delimiter.`
    const result2 = parseFrontmatter(incomplete)
    expect(result2.data.title).toBe('')
    expect(result2.content).toBe(incomplete)
  })

  it('handles edge cases', () => {
    // Empty string
    const result1 = parseFrontmatter('')
    expect(result1.data.title).toBe('')
    expect(result1.content).toBe('')

    // Only delimiters
    const result2 = parseFrontmatter('---\n---')
    expect(result2.data.title).toBe('')
    expect(result2.content).toBe('')

    // Arrays with mixed content
    const content = `---
title: Test
tags: ["tag[1]", "tag]2[", "[tag3]"]
---

Content`
    const result3 = parseFrontmatter(content)
    expect(result3.data.tags).toEqual(['tag[1]', 'tag]2[', '[tag3]'])

    // Special characters
    const specialContent = `---
title: "Title with 🚀 emojis and símböls & çhârs"
excerpt: "Special chars: !@#$%^&*()_+-=[]{}|;':",./<>?"
---

Content`
    const result4 = parseFrontmatter(specialContent)
    expect(result4.data.title).toBe('Title with 🚀 emojis and símböls & çhârs')
    expect(result4.data.excerpt).toBe('Special chars: !@#$%^&*()_+-=[]{}|;\':",./<>?')
  })
})
