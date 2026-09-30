export function loader() {
  return new Response(
    `User-agent: *
Allow: /

User-agent: OAI-SearchBot
Allow: /

Sitemap: https://mawburn.com/sitemap.xml
`,
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=86400',
      },
    }
  )
}
