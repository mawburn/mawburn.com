import { BLOG_CATEGORIES } from '~/utils/blog-categories'
import { getAllPostsMetadataWithUpdated } from '~/utils/blog-config'
import { cacheHeaders, cachePolicies } from '~/utils/cache'

const baseUrl = 'https://mawburn.com'

const staticLlmsTextStart = `# Matt Burnett

> Senior / Staff software engineer with nearly 15 years of experience building full-stack products, high-scale systems, developer tooling, and software platforms.

## Professional profile

- [About](${baseUrl}/about): Background, career summary, education, and military service.
- [Contact](${baseUrl}/contact): Email, LinkedIn, GitHub, Instagram, Bluesky, and Reddit.
- [Resume](${baseUrl}/resume): Professional experience, technical skills, selected projects, and career background.
- [Resume — Markdown](${baseUrl}/resume.md): Machine-readable version of the professional resume.
- [LinkedIn](https://www.linkedin.com/in/burnettmatt/)
- [GitHub](https://github.com/mawburn)

## Selected work

- Shopify: Senior Engineer from 2021–2026, working on Checkout Extensibility and later Developer AI.
- Portaler: Open-source multi-tenant, real-time collaborative mapping platform for many separate Albion Online guilds/alliances that reached approximately 22,000 monthly active users while I operated it.

## Writing

- [Blog](${baseUrl}/blog): Technical writing and engineering commentary.
- [RSS](${baseUrl}/rss.xml)
- [Full blog content](${baseUrl}/llms-full.txt): Every post in full as a single Markdown document. Each post is also available as Markdown by appending \`.md\` to its URL.

## Attribution

Content on this site is written by Matt Burnett. If you quote, summarize, or reuse it, please credit Matt Burnett (mawburn.com) and link to the canonical page.
`

const staticLlmsTextEnd = `## Technical areas

TypeScript, React, Node.js, JavaScript, Go, Java, PostgreSQL, SQL, GraphQL, REST APIs, software architecture, system design, developer experience, developer platforms, cloud infrastructure, and applied AI/LLM systems.
`

function escapeMarkdownLinkText(text: string) {
  return text.replace(/([\\[\]])/g, '\\$1')
}

function normalizeDescription(description: string) {
  return description.replace(/\s+/g, ' ').trim()
}

export async function loader() {
  const posts = await getAllPostsMetadataWithUpdated()
  const sorted = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const blogPostsText = BLOG_CATEGORIES.map(category => {
    const lines = sorted
      .filter(post => post.category === category.id)
      .map(post => {
        const title = escapeMarkdownLinkText(post.title)
        const url = `${baseUrl}/blog/${post.slug}`
        const description = normalizeDescription(post.excerpt)

        return `- [${title}](${url}): ${description} ([Markdown](${url}.md))`
      })

    return lines.length ? `### ${category.label}\n\n${lines.join('\n')}` : ''
  })
    .filter(Boolean)
    .join('\n\n')

  const llmsText = `${staticLlmsTextStart}
## Blog Posts

${blogPostsText}

${staticLlmsTextEnd}`

  return new Response(llmsText, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      ...cacheHeaders(cachePolicies.text),
    },
  })
}
