import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'

import BlogPost, { meta as blogPostMeta } from '~/routes/blog.post'
import { loader as llmsLoader } from '~/routes/llms[.]txt'
import { loader as resumeMarkdownLoader } from '~/routes/resume[.]md'
import { loader as robotsLoader } from '~/routes/robots[.]txt'
import { loader as rssLoader } from '~/routes/rss[.]xml'
import { loader as sitemapLoader } from '~/routes/sitemap[.]xml'
import {
  CANONICAL_PERSON_ID,
  generateArticleStructuredData,
  generatePersonStructuredData,
  generateProfilePageStructuredData,
  generateWebSiteStructuredData,
  WEBSITE_ID,
} from '~/utils/structuredData'

vi.mock('~/components/Footer', () => ({
  Footer: () => <footer>Footer</footer>,
}))

vi.mock('~/components/MarkdownContent', () => ({
  MarkdownContent: ({ html }: { html: string }) => (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  ),
}))

vi.mock('~/components/ShareButtons', () => ({
  ShareButtons: () => <div>Share buttons</div>,
}))

vi.mock('~/components/icons', () => ({
  RSSIcon: () => <svg aria-label="RSS" />,
}))

const BlogPostAny = BlogPost as any

const basePost = {
  slug: 'example-post',
  title: 'Example Post',
  date: '2025-06-03 16:00',
  excerpt: 'An example post.',
  tags: ['SEO'],
  content: '<p>Body</p>',
  readTime: 3,
  images: { default: '/images/example.webp' },
}

describe('structured data canonical entities', () => {
  it('uses one canonical Person @id globally and from WebSite/ProfilePage/BlogPosting', () => {
    const person = generatePersonStructuredData()
    const website = generateWebSiteStructuredData()
    const profilePage = generateProfilePageStructuredData()
    const article = generateArticleStructuredData(basePost, 'https://mawburn.com/blog/example-post')

    expect(person['@id']).toBe(CANONICAL_PERSON_ID)
    expect(website['@id']).toBe(WEBSITE_ID)
    expect(website.author['@id']).toBe(CANONICAL_PERSON_ID)
    expect(profilePage.mainEntity['@id']).toBe(CANONICAL_PERSON_ID)
    expect(article.author['@id']).toBe(CANONICAL_PERSON_ID)
    expect(article.mainEntityOfPage?.['@id']).toBe('https://mawburn.com/blog/example-post')
  })
})

describe('blog article dates', () => {
  it('keeps datePublished as the original post date and emits dateModified when updated exists', () => {
    const article = generateArticleStructuredData(
      { ...basePost, updated: '2025-06-05 10:30' },
      'https://mawburn.com/blog/example-post'
    )

    expect(article.datePublished).toBe(new Date('2025-06-03 16:00').toISOString())
    expect(article.dateModified).toBe(new Date('2025-06-05 10:30').toISOString())
  })

  it('omits dateModified when updated is absent', () => {
    const article = generateArticleStructuredData(basePost, 'https://mawburn.com/blog/example-post')

    expect(article.datePublished).toBe(new Date('2025-06-03 16:00').toISOString())
    expect(article.dateModified).toBeUndefined()
  })

  it('adds article modified metadata only when updated exists', () => {
    const withUpdated = blogPostMeta({
      params: { slug: 'example-post' },
      data: { post: { ...basePost, updated: '2025-06-05 10:30' } },
      location: {} as any,
      matches: [],
    } as any)
    const withoutUpdated = blogPostMeta({
      params: { slug: 'example-post' },
      data: { post: basePost },
      location: {} as any,
      matches: [],
    } as any)

    expect(withUpdated).toContainEqual({
      name: 'article:modified_time',
      content: new Date('2025-06-05 10:30').toISOString(),
    })
    expect(withoutUpdated).not.toContainEqual(
      expect.objectContaining({ name: 'article:modified_time' })
    )
  })

  it('renders the human-readable updated date only when it differs from publication date', () => {
    const { rerender } = render(
      <MemoryRouter>
        <BlogPostAny
          loaderData={{ post: { ...basePost, updated: '2025-06-05 10:30' } }}
          params={{ slug: 'example-post' }}
          matches={[]}
        />
      </MemoryRouter>
    )

    expect(screen.getByText('Updated')).toBeInTheDocument()
    expect(screen.getByText('June 5, 2025')).toBeInTheDocument()

    rerender(
      <MemoryRouter>
        <BlogPostAny
          loaderData={{ post: basePost }}
          params={{ slug: 'example-post' }}
          matches={[]}
        />
      </MemoryRouter>
    )

    expect(screen.queryByText('Updated')).not.toBeInTheDocument()
  })
})

describe('crawler-facing endpoints', () => {
  it('sitemap uses updated lastmod for updated posts and publication date otherwise', async () => {
    const response = await sitemapLoader()
    const xml = await response.text()

    expect(response.headers.get('Content-Type')).toContain('application/xml')
    expect(xml).toContain('<loc>https://mawburn.com/blog/2025-06-03-shopify-ai-chat</loc>')
    expect(xml).toContain(`<lastmod>${new Date('2025-06-05 10:30').toISOString()}</lastmod>`)
    expect(xml).toContain(`<lastmod>${new Date('2025-06-06 09:00').toISOString()}</lastmod>`)
    expect(xml).not.toMatch(/<loc>https:\/\/mawburn\.com\/<\/loc>\s*<lastmod>/)
  })

  it('robots.txt, llms.txt, rss.xml, and resume.md expose expected content types and canonical URLs', async () => {
    const robots = robotsLoader()
    const llms = llmsLoader()
    const rss = await rssLoader()
    const resumeMarkdown = resumeMarkdownLoader()

    expect(robots.headers.get('Content-Type')).toContain('text/plain')
    expect(await robots.text()).toContain('User-agent: OAI-SearchBot\nAllow: /')

    expect(llms.headers.get('Content-Type')).toContain('text/markdown')
    expect(await llms.text()).toContain('https://mawburn.com/resume')

    expect(rss.headers.get('Content-Type')).toContain('xml')
    expect(await rss.text()).toContain('https://mawburn.com/blog/')

    expect(resumeMarkdown.headers.get('Content-Type')).toContain('text/markdown')
    expect(await resumeMarkdown.text()).toContain('[Website](https://mawburn.com)')
  })
})
