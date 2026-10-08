import type { BlogPost, BlogPostMetadata } from 'postflow'
import { BlogEngine, ContentLoader } from 'postflow'

export type BlogPostMetadataWithUpdated = BlogPostMetadata & {
  updated?: string
}

export type BlogPostWithUpdated = BlogPost & {
  updated?: string
}

function parseUpdatedFrontmatter(content: string) {
  const lines = content.split('\n')
  if (lines[0] !== '---') return undefined

  const endIndex = lines.indexOf('---', 1)
  if (endIndex === -1) return undefined

  for (const line of lines.slice(1, endIndex)) {
    const colonIndex = line.indexOf(':')
    if (colonIndex <= 0) continue

    const key = line.slice(0, colonIndex).trim()
    if (key !== 'updated') continue

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

export function addUpdatedToPost<T extends BlogPost | BlogPostMetadata>(
  post: T
): T & { updated?: string } {
  return {
    ...post,
    updated: parseUpdatedFrontmatter(blogContent[post.slug] ?? ''),
  }
}

export async function getPostBySlugWithUpdated(slug: string): Promise<BlogPostWithUpdated | null> {
  const post = await blog.getPostBySlug(slug)
  return post ? addUpdatedToPost(post) : null
}

export async function getAllPostsMetadataWithUpdated(): Promise<BlogPostMetadataWithUpdated[]> {
  const posts = await blog.getAllPostsMetadata()
  return posts.map(addUpdatedToPost)
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
