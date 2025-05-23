import type { Route } from './+types/blog.post'
import { getPostBySlug } from '~/utils/blog'
import type { BlogPost } from '~/utils/blogTypes'
import { createCachedResponse, cacheConfigs } from '~/utils/cache'
import { Link } from 'react-router'
import { BlogFooter } from '~/components/BlogFooter'

export function meta({ params }: Route.MetaArgs) {
  const post = getPostBySlug(params.slug)
  if (!post) {
    return [{ title: 'Post Not Found | Matt Burnett' }]
  }

  const url = `https://mawburn.com/blog/${params.slug}`

  return [
    { title: `${post.title} | Matt Burnett` },
    { name: 'description', content: post.excerpt },
    { name: 'keywords', content: post.tags.join(', ') },
    { name: 'author', content: 'Matt Burnett' },
    { name: 'robots', content: 'index, follow' },
    { name: 'article:author', content: 'Matt Burnett' },
    { name: 'article:published_time', content: new Date(post.date).toISOString() },
    { name: 'article:tag', content: post.tags.join(', ') },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: post.title },
    { property: 'og:description', content: post.excerpt },
    { property: 'og:url', content: url },
    { property: 'og:site_name', content: 'Matt Burnett' },
    { property: 'og:article:author', content: 'Matt Burnett' },
    { property: 'og:article:published_time', content: new Date(post.date).toISOString() },
    { property: 'og:article:tag', content: post.tags.join(', ') },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: post.title },
    { name: 'twitter:description', content: post.excerpt },
    { name: 'reading_time', content: `${post.readTime} min read` },
  ]
}

export function loader({ params }: Route.LoaderArgs) {
  const post = getPostBySlug(params.slug)
  if (!post) {
    throw new Response('Not Found', { status: 404 })
  }

  return createCachedResponse(
    { post },
    {
      ...cacheConfigs.blogPost,
      etag: `"blog-post-${params.slug}-${post.date}"`,
    }
  )
}

export default function BlogPost({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData as { post: BlogPost }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors flex flex-col">
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <Link
          to="/blog"
          className="inline-flex items-center text-blue-600 dark:text-blue-200 hover:text-blue-800 dark:hover:text-blue-100 mb-8 transition-colors"
        >
          ← Back to Blog
        </Link>

        <article className="prose prose-gray dark:prose-invert max-w-none">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{post.title}</h1>
            <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4 space-x-4">
              <span>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span>•</span>
              <span>{post.readTime} min read</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 dark:bg-slate-300 text-gray-700 dark:text-slate-800 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div
            className="text-gray-800 dark:text-gray-200 leading-relaxed [&_p]:mb-6 mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
      <BlogFooter maxWidth="max-w-3xl" />
    </div>
  )
}
