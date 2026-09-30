import { index, route, type RouteConfig } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('resume', 'routes/resume.tsx'),
  route('resume.md', 'routes/resume[.]md.tsx'),
  route('blog', 'routes/blog.tsx'),
  route('blog/:slug', 'routes/blog.post.tsx'),
  route('sitemap.xml', 'routes/sitemap[.]xml.tsx'),
  route('rss.xml', 'routes/rss[.]xml.tsx'),
  route('robots.txt', 'routes/robots[.]txt.tsx'),
  route('llms.txt', 'routes/llms[.]txt.tsx'),
  route(
    '.well-known/appspecific/com.chrome.devtools.json',
    'routes/[.well-known].appspecific[.]com.chrome.devtools.json.tsx'
  ),
] satisfies RouteConfig
