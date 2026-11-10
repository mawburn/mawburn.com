import { blogRawContent, getPostBySlugWithUpdated } from '~/utils/blog-config'
import { cacheHeaders, cachePolicies } from '~/utils/cache'
import { markdownHeaders, renderPostMarkdown } from '~/utils/post-markdown'

import type { Route } from './+types/blog.post[.]md'

export async function loader({ params }: Route.LoaderArgs) {
  const post = await getPostBySlugWithUpdated(params.slug)
  const raw = blogRawContent[params.slug]
  if (!post || !raw) {
    throw new Response('Not Found', { status: 404 })
  }

  return new Response(renderPostMarkdown(post, raw), {
    headers: markdownHeaders(cacheHeaders(cachePolicies.blogPost)),
  })
}
