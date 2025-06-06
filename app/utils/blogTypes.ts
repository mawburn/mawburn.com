import type { PostImages } from './blog'

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  content: string
  readTime: number
  image?: string
  images?: PostImages
}

export interface BlogPostMetadata {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  readTime: number
}
