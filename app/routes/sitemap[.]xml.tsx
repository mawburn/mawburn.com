import { blog } from '~/utils/blog-config'

const ORIGIN = 'https://mawburn.com'

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function urlEntry({ loc, lastmod }: { loc: string; lastmod?: string }) {
  const lines = ['  <url>', `    <loc>${escapeXml(loc)}</loc>`]
  if (lastmod) lines.push(`    <lastmod>${new Date(lastmod).toISOString()}</lastmod>`)
  lines.push('  </url>')
  return lines.join('\n')
}

export async function loader() {
  const posts = await blog.getAllPostsMetadata()
  const entries = [
    urlEntry({ loc: `${ORIGIN}/` }),
    urlEntry({ loc: `${ORIGIN}/resume` }),
    urlEntry({ loc: `${ORIGIN}/blog` }),
    ...posts.map(post => urlEntry({ loc: `${ORIGIN}/blog/${post.slug}`, lastmod: post.date })),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
    },
  })
}
