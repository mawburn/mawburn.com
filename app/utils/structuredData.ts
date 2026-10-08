import type { BlogPostWithUpdated } from './blog-config'

export const ORIGIN = 'https://mawburn.com'
export const CANONICAL_PERSON_ID = `${ORIGIN}/#matt-burnett`
export const WEBSITE_ID = `${ORIGIN}/#website`
export const PROFILE_PAGE_ID = `${ORIGIN}/resume#profile-page`

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
    '@id': string
  }
  publisher?: {
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
  '@id': string
  name: string
  url: string
  description: string
  author: {
    '@type': string
    '@id': string
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

export function generateCanonicalPersonReference() {
  return {
    '@type': 'Person',
    '@id': CANONICAL_PERSON_ID,
  }
}

export function generateArticleStructuredData(
  post: BlogPostWithUpdated,
  url: string
): ArticleStructuredData {
  const images: string[] = []
  if (post.images?.default) images.push(`${ORIGIN}${post.images.default}`)
  if (post.images?.og) images.push(`${ORIGIN}${post.images.og}`)
  if (post.images?.twitter) images.push(`${ORIGIN}${post.images.twitter}`)

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: images.length > 1 ? images : images[0],
    datePublished: new Date(post.date).toISOString(),
    ...(post.updated ? { dateModified: new Date(post.updated).toISOString() } : {}),
    author: generateCanonicalPersonReference(),
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
    '@id': WEBSITE_ID,
    name: 'Matt Burnett',
    url: ORIGIN,
    description:
      'Matt Burnett is a Senior/Staff-level software engineer and former Shopify engineer building full-stack products, high-scale systems, developer tooling, and software platforms.',
    author: generateCanonicalPersonReference(),
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
    '@id': CANONICAL_PERSON_ID,
    name: 'Matt Burnett',
    url: ORIGIN,
    sameAs: [
      'https://www.linkedin.com/in/burnettmatt/',
      'https://github.com/mawburn',
      'https://bsky.app/profile/mawburn.com',
      'https://x.com/_mawburn',
    ],
    jobTitle: 'Senior / Staff Software Engineer',
    description:
      'Senior/Staff-level software engineer with nearly 15 years of professional experience building full-stack products, high-scale systems, developer tooling, and software platforms.',
    knowsAbout: [
      'TypeScript',
      'React',
      'Node.js',
      'JavaScript',
      'GraphQL',
      'REST APIs',
      'SQL',
      'PostgreSQL',
      'Go',
      'Java',
      'AWS',
      'GCP',
      'Docker',
      'Software Architecture',
      'AI/LLM applications',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Portland',
      addressRegion: 'OR',
      addressCountry: 'US',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Henderson State University',
    },
  }
}

export function generateProfilePageStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': PROFILE_PAGE_ID,
    url: `${ORIGIN}/resume`,
    name: 'Matt Burnett | Senior / Staff Software Engineer',
    description:
      'Senior and Staff-level software engineer with nearly 15 years of experience building full-stack products and high-scale systems with TypeScript, React, Node.js, Go, SQL, and cloud infrastructure. Former Shopify engineer.',
    mainEntity: generatePersonStructuredData(),
  }
}
