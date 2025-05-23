import type { BlogPost, BlogPostMetadata } from './blogTypes'
import { blogPostsData } from './blogData'
import { parseFrontmatter } from './frontmatter'
import { markdownToHtml } from './markdown'
import { calculateReadTime } from './readTime'
import { isPostPublished, isInDevelopment } from './dateUtils'

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
  }
}
