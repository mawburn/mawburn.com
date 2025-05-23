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
})
