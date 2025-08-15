import { SitemapGenerator } from 'postflow'

import { blog } from '~/utils/blog-config'

export async function loader() {
  const posts = await blog.getAllPostsMetadata()
  const siteConfig = blog.getSiteConfig()
  const sitemapGenerator = new SitemapGenerator(siteConfig)

  return sitemapGenerator.generateSitemapResponse(posts)
}
