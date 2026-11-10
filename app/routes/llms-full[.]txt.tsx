import { blogRawContent, getAllPostsMetadataWithUpdated } from '~/utils/blog-config'
import { cacheHeaders, cachePolicies } from '~/utils/cache'
import { ATTRIBUTION_NOTE, markdownHeaders, renderPostMarkdown } from '~/utils/post-markdown'
import { ORIGIN } from '~/utils/structuredData'

export async function loader() {
  const posts = await getAllPostsMetadataWithUpdated()
  const sections = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .flatMap(post => {
      const raw = blogRawContent[post.slug]
      return raw ? [renderPostMarkdown(post, raw, 2)] : []
    })

  const text = `# Matt Burnett — full blog content

> Every post from ${ORIGIN}/blog in full. Index of pages: ${ORIGIN}/llms.txt

${ATTRIBUTION_NOTE}

${sections.join('\n---\n\n')}`

  return new Response(text, {
    headers: markdownHeaders(cacheHeaders(cachePolicies.text)),
  })
}
