import { RSSGenerator } from 'postflow'

import { categoryLabel } from '~/utils/blog-categories'
import { blog, getAllPostsMetadataWithUpdated } from '~/utils/blog-config'
import { cacheHeaders, cachePolicies } from '~/utils/cache'

export async function loader() {
  // postflow renders each tag as an RSS <category>; lead with the post's blog category.
  const posts = (await getAllPostsMetadataWithUpdated()).map(post => ({
    ...post,
    tags: [categoryLabel(post.category), ...post.tags],
  }))
  const siteConfig = blog.getSiteConfig()
  const rssGenerator = new RSSGenerator(siteConfig)

  return rssGenerator.generateRSSResponse(
    posts,
    cacheHeaders(cachePolicies.blogList, 'Accept-Encoding')
  )
}
