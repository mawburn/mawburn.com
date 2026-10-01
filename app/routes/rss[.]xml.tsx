import { RSSGenerator } from 'postflow'

import { blog } from '~/utils/blog-config'
import { cacheHeaders, cachePolicies } from '~/utils/cache'

export async function loader() {
  const posts = await blog.getAllPostsMetadata()
  const siteConfig = blog.getSiteConfig()
  const rssGenerator = new RSSGenerator(siteConfig)

  return rssGenerator.generateRSSResponse(
    posts,
    cacheHeaders(cachePolicies.blogList, 'Accept-Encoding')
  )
}
