import { cacheHeaders, cachePolicies } from '~/utils/cache'

const llmsText = `# Matt Burnett

> Senior / Staff software engineer with nearly 15 years of experience building full-stack products, high-scale systems, developer tooling, and software platforms.

## Professional profile

- [Resume](https://mawburn.com/resume): Professional experience, technical skills, selected projects, and career background.
- [Resume — Markdown](https://mawburn.com/resume.md): Machine-readable version of the professional resume.
- [LinkedIn](https://www.linkedin.com/in/burnettmatt/)
- [GitHub](https://github.com/mawburn)

## Selected work

- Shopify: Senior Engineer from 2021–2026, working on Checkout Extensibility and later Developer AI.
- Portaler: Open-source multi-tenant, real-time collaborative mapping platform for many separate Albion Online guilds/alliances that reached approximately 22,000 monthly active users while I operated it.

## Writing

- [Blog](https://mawburn.com/blog): Technical writing and engineering commentary.
- [RSS](https://mawburn.com/rss.xml)

## Technical areas

TypeScript, React, Node.js, JavaScript, Go, Java, PostgreSQL, SQL, GraphQL, REST APIs, software architecture, system design, developer experience, developer platforms, cloud infrastructure, and applied AI/LLM systems.
`

export function loader() {
  return new Response(llmsText, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      ...cacheHeaders(cachePolicies.text),
    },
  })
}
