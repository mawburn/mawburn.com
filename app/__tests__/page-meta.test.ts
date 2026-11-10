import { describe, expect, it } from 'vitest'

import { links as aboutLinks, meta as aboutMeta } from '~/routes/about'
import { links as blogLinks, meta as blogMeta } from '~/routes/blog'
import { links as contactLinks, meta as contactMeta } from '~/routes/contact'
import { links as homeLinks, meta as homeMeta } from '~/routes/home'
import { links as resumeLinks, meta as resumeMeta } from '~/routes/resume'

type Tag = Record<string, string>

const pages = [
  { name: 'home', path: '/', meta: homeMeta, links: homeLinks, canonical: 'https://mawburn.com/' },
  {
    name: 'about',
    path: '/about',
    meta: aboutMeta,
    links: aboutLinks,
    canonical: 'https://mawburn.com/about',
  },
  {
    name: 'contact',
    path: '/contact',
    meta: contactMeta,
    links: contactLinks,
    canonical: 'https://mawburn.com/contact',
  },
  {
    name: 'resume',
    path: '/resume',
    meta: resumeMeta,
    links: resumeLinks,
    canonical: 'https://mawburn.com/resume',
  },
  {
    name: 'blog',
    path: '/blog',
    meta: blogMeta,
    links: blogLinks,
    canonical: 'https://mawburn.com/blog',
  },
] as const

describe.each(pages)('$name page SEO', ({ meta, links, canonical }) => {
  const tags = (meta as unknown as () => Tag[])()
  const find = (key: 'name' | 'property', value: string) => tags.find(tag => tag[key] === value)

  it('has a title and a description of reasonable length', () => {
    expect(tags.find(tag => 'title' in tag)?.title).toBeTruthy()
    const description = find('name', 'description')?.content ?? ''
    expect(description.length).toBeGreaterThan(50)
    expect(description.length).toBeLessThanOrEqual(320)
  })

  it('has Open Graph and Twitter tags including a 1200x630 image', () => {
    for (const property of ['og:title', 'og:description', 'og:url', 'og:image', 'og:type']) {
      expect(find('property', property)?.content, property).toBeTruthy()
    }
    expect(find('property', 'og:image')?.content).toMatch(/^https:\/\/mawburn\.com\/images\//)
    expect(find('property', 'og:image:width')?.content).toBe('1200')
    expect(find('property', 'og:image:height')?.content).toBe('630')
    expect(find('name', 'twitter:card')?.content).toBe('summary_large_image')
    expect(find('name', 'twitter:image')?.content).toBeTruthy()
  })

  it('declares a canonical URL matching og:url', () => {
    const link = (links as unknown as () => Array<{ rel: string; href: string }>)().find(
      item => item.rel === 'canonical'
    )
    expect(link?.href).toBe(canonical)
    expect(find('property', 'og:url')?.content).toBe(canonical.replace(/\/$/, ''))
  })
})
