import type { BlogPost, BlogPostMetadata } from 'postflow'
import { BlogEngine, ContentLoader } from 'postflow'

export type BlogPostMetadataWithUpdated = BlogPostMetadata & {
  updated?: string
  wordCount?: number
}

export type BlogPostWithUpdated = BlogPost & {
  updated?: string
  wordCount?: number
}

function parseFrontmatterValue(content: string, field: string) {
  const lines = content.split('\n')
  if (lines[0] !== '---') return undefined

  const endIndex = lines.indexOf('---', 1)
  if (endIndex === -1) return undefined

  for (const line of lines.slice(1, endIndex)) {
    const colonIndex = line.indexOf(':')
    if (colonIndex <= 0) continue

    const key = line.slice(0, colonIndex).trim()
    if (key !== field) continue

    const value = line.slice(colonIndex + 1).trim()
    if (!value) return undefined

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      return value.slice(1, -1)
    }

    return value
  }

  return undefined
}

function parseUpdatedFrontmatter(content: string) {
  return parseFrontmatterValue(content, 'updated')
}

function getMarkdownBody(content: string) {
  const lines = content.split('\n')
  if (lines[0] !== '---') return content

  const endIndex = lines.indexOf('---', 1)
  if (endIndex === -1) return content

  return lines.slice(endIndex + 1).join('\n')
}

function calculateWordCount(content: string) {
  return getMarkdownBody(content)
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[[^\]]+\]\([^)]+\)/g, '$1')
    .replace(/[#>*_`~-]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
}

function parseFrontmatterArray(content: string, field: string) {
  const lines = content.split('\n')
  if (lines[0] !== '---') return []

  const endIndex = lines.indexOf('---', 1)
  if (endIndex === -1) return []

  const frontmatterLines = lines.slice(1, endIndex)
  const fieldIndex = frontmatterLines.findIndex(line => line.trim() === `${field}:`)
  if (fieldIndex === -1) return []

  const values: string[] = []
  for (const line of frontmatterLines.slice(fieldIndex + 1)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed === '[' || trimmed === ']') continue
    if (!line.startsWith(' ') && !line.startsWith('\t')) break

    const value = trimmed.replace(/,$/, '')
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      values.push(value.slice(1, -1))
    }
  }

  return values
}

function parseTagsFrontmatter(content: string) {
  return parseFrontmatterArray(content, 'tags')
}

function hasFrontmatterImage(content: string) {
  return parseFrontmatterValue(content, 'image') !== undefined
}

// Load all markdown files at build time using Vite
const blogFiles = import.meta.glob('../../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

// Convert the glob results to the format expected by PostFlow
const blogContent: Record<string, string> = {}
for (const [path, content] of Object.entries(blogFiles)) {
  const slug = path.split('/').pop()?.replace('.md', '') || ''
  if (slug && typeof content === 'string') {
    blogContent[slug] = content
  }
}

export const blogRawContent = blogContent

export function addFrontmatterToPost<T extends BlogPost | BlogPostMetadata>(
  post: T
): T & { updated?: string } {
  const content = blogContent[post.slug] ?? ''
  const tags = parseTagsFrontmatter(content)
  const updated = parseUpdatedFrontmatter(content)
  const result = {
    ...post,
    tags: tags.length > 0 ? tags : post.tags,
    wordCount: calculateWordCount(content),
  } as T & { updated?: string; wordCount?: number }

  if (updated) {
    result.updated = updated
  }

  return result
}

export async function getPostBySlugWithUpdated(slug: string): Promise<BlogPostWithUpdated | null> {
  const post = await blog.getPostBySlug(slug)
  if (!post) return null

  const postWithUpdated = addFrontmatterToPost(post)
  if (!hasFrontmatterImage(blogContent[slug] ?? '')) {
    postWithUpdated.image = undefined
    postWithUpdated.images = undefined
  }

  return postWithUpdated
}

export async function getAllPostsMetadataWithUpdated(): Promise<BlogPostMetadataWithUpdated[]> {
  const posts = await blog.getAllPostsMetadata()
  return posts.map(addFrontmatterToPost)
}

export const blog = new BlogEngine({
  contentLoader: new ContentLoader({
    type: 'memory',
    content: blogContent,
  }),
  siteConfig: {
    title: 'Matt Burnett - Developer & Creator',
    description: 'A blog about web development, technology, and creativity',
    baseUrl: 'https://mawburn.com',
    language: 'en-us',
  },
  imageConfig: {
    basePath: '/images',
    variants: {
      default: '{slug}.webp',
      twitter: '{slug}-twitter.webp',
      small: '{slug}-small.webp',
    },
  },
  isDevelopment: process.env.NODE_ENV === 'development',
})
