import type { BlogPost } from 'postflow'

export interface ArticleStructuredData {
  '@context': string
  '@type': string
  headline: string
  description: string
  image?: string | string[]
  datePublished: string
  dateModified?: string
  author: {
    '@type': string
    name: string
    url?: string
  }
  publisher: {
    '@type': string
    name: string
    logo?: {
      '@type': string
      url: string
    }
  }
  mainEntityOfPage?: {
    '@type': string
    '@id': string
  }
  keywords?: string
}

export interface WebSiteStructuredData {
  '@context': string
  '@type': string
  name: string
  url: string
  description: string
  author: {
    '@type': string
    name: string
  }
  potentialAction?: {
    '@type': string
    target: string
    'query-input': string
  }
}

export interface BreadcrumbStructuredData {
  '@context': string
  '@type': string
  itemListElement: Array<{
    '@type': string
    position: number
    name: string
    item?: string
  }>
}

export function generateArticleStructuredData(post: BlogPost, url: string): ArticleStructuredData {
  const images: string[] = []
  if (post.images?.default) images.push(`https://mawburn.com${post.images.default}`)
  if (post.images?.og) images.push(`https://mawburn.com${post.images.og}`)
  if (post.images?.twitter) images.push(`https://mawburn.com${post.images.twitter}`)

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: images.length > 1 ? images : images[0],
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      '@type': 'Person',
      name: 'Matt Burnett',
      url: 'https://mawburn.com',
    },
    publisher: {
      '@type': 'Person',
      name: 'Matt Burnett',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: post.tags.join(', '),
  }
}

export function generateWebSiteStructuredData(): WebSiteStructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Matt Burnett',
    url: 'https://mawburn.com',
    description:
      'Matt Burnett - Software Engineer - Building high-performance web applications with modern tech.',
    author: {
      '@type': 'Person',
      name: 'Matt Burnett',
    },
  }
}

export function generateBreadcrumbStructuredData(
  items: Array<{ name: string; url?: string }>
): BreadcrumbStructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generatePersonStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Matt Burnett',
    url: 'https://mawburn.com',
    sameAs: [
      'https://github.com/mawburn',
      'https://twitter.com/mawburn_',
      'https://www.linkedin.com/in/mawburn',
    ],
    jobTitle: 'Software Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Shopify',
    },
  }
}
