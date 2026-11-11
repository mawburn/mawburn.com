import { describe, expect, it } from 'vitest'

// Build scripts live outside the app's TS project, so load them dynamically.
type PostInput = { file: string; slug: string; data: Record<string, unknown> | null; body: string }
type Report = { file: string; errors: string[]; warnings: string[] }
const load = (name: string) =>
  import(/* @vite-ignore */ new URL(`../../scripts/lib/${name}`, import.meta.url).href)
const { loadPosts } = (await load('posts.mjs')) as { loadPosts: () => Promise<PostInput[]> }
const { validatePosts } = (await load('validate.mjs')) as {
  validatePosts: (posts: PostInput[]) => Report[]
}

const good = {
  file: '2026-01-02-valid-post.md',
  slug: '2026-01-02-valid-post',
  data: {
    title: 'A valid post',
    date: '2026-01-02 09:00',
    excerpt: 'A reasonably long excerpt that comfortably clears the fifty character minimum.',
    tags: ['testing'],
    category: 'engineering',
  },
  body: 'Body text. '.repeat(20),
}

const errorsFor = (overrides: Record<string, unknown> = {}, file = good.file) =>
  validatePosts([{ ...good, file, data: { ...good.data, ...overrides } }])[0].errors

describe('post validation', () => {
  it('accepts a well-formed post', () => {
    expect(validatePosts([good])[0].errors).toEqual([])
  })

  it('rejects bad filenames and mismatched dates', () => {
    expect(errorsFor({}, 'My Post.md')).toContain('filename must be YYYY-MM-DD-lowercase-slug.md')
    expect(errorsFor({ date: '2026-02-02 09:00' })).toContain(
      'date does not match the date in the filename'
    )
  })

  it('requires title, excerpt, tags and a string date', () => {
    expect(errorsFor({ title: '' })).toContain('title is required')
    expect(errorsFor({ excerpt: 'short' }).join()).toMatch(/excerpt is required/)
    expect(errorsFor({ tags: [] })).toContain('tags must be a non-empty list of strings')
    // an unquoted YAML date becomes a Date object, not a string
    expect(errorsFor({ date: new Date('2026-01-02T09:00:00Z') }).join()).toMatch(
      /date must look like/
    )
  })

  it('rejects scaffold placeholders, missing images and empty bodies', () => {
    expect(errorsFor({ excerpt: 'TODO: ' + 'x'.repeat(60) })).toContain('replace the TODO excerpt')
    expect(errorsFor({ tags: ['TODO'] })).toContain('replace the TODO tags')
    expect(errorsFor({ image: 'does-not-exist.webp' }).join()).toMatch(
      /not found in public\/images/
    )
    expect(validatePosts([{ ...good, body: 'tiny' }])[0].errors).toContain(
      'post body is empty or too short'
    )
  })

  it('requires exactly one known category', () => {
    const message = 'category must be exactly one of: engineering, hobbies, stories, muses'
    expect(errorsFor({ category: undefined })).toContain(message)
    expect(errorsFor({ category: 'cooking' })).toContain(message)
    expect(errorsFor({ category: ['engineering', 'hobbies'] })).toContain(message)
    expect(errorsFor({ category: 'hobbies' })).toEqual([])
  })

  it('rejects an updated date before the publish date', () => {
    expect(errorsFor({ updated: '2025-12-01' })).toContain('updated is earlier than date')
  })

  it('every post in content/blog is valid', async () => {
    const failures = validatePosts(await loadPosts()).filter(report => report.errors.length)
    expect(failures).toEqual([])
  })
})
