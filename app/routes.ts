import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('blog', 'routes/blog.tsx'),
  route('blog/:slug', 'routes/blog.post.tsx'),
  route('sitemap.xml', 'routes/sitemap[.]xml.tsx'),
  route('rss.xml', 'routes/rss[.]xml.tsx'),
  route('.well-known/appspecific/com.chrome.devtools.json', 'routes/[.well-known].appspecific[.]com.chrome.devtools.json.tsx'),
] satisfies RouteConfig
