import type { BlogPost, BlogPostMetadata } from './blogTypes'
import { blogPostsData } from './blogData'
import { parseFrontmatter } from './frontmatter'
import { markdownToHtml } from './markdown'
import { calculateReadTime } from './readTime'
import { isPostPublished, isInDevelopment } from './dateUtils'

export interface PostImages {
  default?: string
  og?: string // 1200x630 - Open Graph standard
  twitter?: string // 1200x600 - Twitter large card
  small?: string // 600x315 - smaller OG size
}

export const findPostImages = (slug: string, frontmatterImage?: string): PostImages => {
  const images: PostImages = {}
  
  if (frontmatterImage) {
    const imagePath = frontmatterImage.startsWith('/') ? frontmatterImage : `/images/${frontmatterImage}`
    images.default = imagePath
    images.og = imagePath
    images.twitter = imagePath
    images.small = imagePath
  } else {
    images.default = `/images/${slug}.webp`
    images.og = `/images/${slug}-og.webp`
    images.twitter = `/images/${slug}-twitter.webp`
    images.small = `/images/${slug}-small.webp`
  }
  
  return images
}

// Keep the old function for backward compatibility
export const findPostImage = (slug: string, frontmatterImage?: string): string | undefined => {
  const images = findPostImages(slug, frontmatterImage)
  return images.default
}

export const getAllPostsMetadata = (): BlogPostMetadata[] => {
  const posts: BlogPostMetadata[] = []

  for (const [slug, content] of Object.entries(blogPostsData)) {
    const { data, content: markdownContent } = parseFrontmatter(content)

    // Only include published posts (or all posts in development)
    if (isInDevelopment() || isPostPublished(data.date)) {
      posts.push({
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        tags: data.tags || [],
        readTime: calculateReadTime(markdownContent),
      })
    }
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export const getPostBySlug = (slug: string): BlogPost | null => {
  const content = blogPostsData[slug]
  if (!content) return null

  const { data, content: markdownContent } = parseFrontmatter(content)

  // Check if post should be published (allow access in development)
  if (!isInDevelopment() && !isPostPublished(data.date)) {
    return null
  }

  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    tags: data.tags || [],
    content: markdownToHtml(markdownContent),
    readTime: calculateReadTime(markdownContent),
    image: findPostImage(slug, data.image),
    images: findPostImages(slug, data.image),
  }
}
