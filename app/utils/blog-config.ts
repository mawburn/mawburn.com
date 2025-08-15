import { BlogEngine, ContentLoader } from 'postflow'

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
