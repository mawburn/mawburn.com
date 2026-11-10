import { getAllPostsMetadataWithUpdated } from '~/utils/blog-config'
import { cachePolicies, routeCacheHeaders } from '~/utils/cache'
import { canonicalLink, pageMeta } from '~/utils/seo'
import { Welcome } from '~/welcome/welcome'

import type { Route } from './+types/home'

export const links: Route.LinksFunction = () => [canonicalLink('/')]

export function meta() {
  return pageMeta({
    title: 'Matt Burnett | Senior / Staff Software Engineer',
    description:
      'Senior/Staff-level software engineer with nearly 15 years building full-stack products and high-scale systems with TypeScript, React, Node.js, Go, SQL, and cloud infrastructure.',
    path: '/',
    keywords:
      'Senior Software Engineer, Staff Software Engineer, Full Stack Engineer, TypeScript, React, Node.js, Go, Java, SQL, Cloud Infrastructure, Software Architecture, Technical Leadership, Shopify',
  })
}

export async function loader() {
  const posts = await getAllPostsMetadataWithUpdated()
  return {
    recentPosts: posts.slice(0, 3).map(({ slug, title, date, readTime }) => ({
      slug,
      title,
      date,
      readTime,
    })),
  }
}

export function headers({ parentHeaders }: Route.HeadersArgs) {
  return routeCacheHeaders(parentHeaders, cachePolicies.blogList)
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <Welcome recentPosts={loaderData.recentPosts} />
}
