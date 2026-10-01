# mawburn.com

[![Tests](https://github.com/mawburn/mawburn.com/actions/workflows/test.yml/badge.svg)](https://github.com/mawburn/mawburn.com/actions/workflows/test.yml)
[![Cloudflare Deploy](https://img.shields.io/website?url=https%3A%2F%2Fmawburn.com&label=Cloudflare%20deploy&logo=cloudflare)](https://mawburn.com)

A personal portfolio site with blog built using modern web technologies.

## Tech Stack

- **React Router v7** (renamed from Remix) - Full-stack React framework
- **TailwindCSS v4** - Utility-first CSS framework
- **Three.js** - 3D graphics library for synthwave background
- **TypeScript** - Type-safe JavaScript
- **Vitest** - Fast unit testing framework
- **Cloudflare Workers** - Edge deployment platform

## Development

```bash
pnpm install
pnpm dev
```

## Caching

Cloudflare Workers Caching is enabled in `wrangler.jsonc`. Cache hits can be served before the Worker runs. Public response TTLs live in `app/utils/cache.ts` and are applied by the React Router routes; error responses are marked `no-store` in `workers/app.ts`. The cache is separate from the manual Workers Cache API (`caches.default`).

After deploying, request the same URL twice and inspect `Cf-Cache-Status` (`MISS` then `HIT` on a warm cache):

```bash
curl -sD - -o /dev/null https://mawburn.com/blog
curl -sD - -o /dev/null https://mawburn.com/blog
```

Test against the deployed custom domain: local development does not prove edge cache hits. Caching is public-only; revisit the policies before adding authenticated or visitor-specific responses. Cloudflare bills cached requests at the standard Workers request rate, including static asset requests when Workers Caching is enabled.

## Project Structure

```
app/
├── components/          # Reusable React components
│   ├── SynthwaveBackground/  # Three.js animated background
│   ├── ShareButtons/   # Social media sharing buttons
│   ├── MarkdownContent.tsx  # Markdown styling component
│   ├── Navigation.tsx  # Site navigation
│   ├── ThemeToggle.tsx # Dark/light mode switcher
│   └── ...
├── routes/             # Route modules (declared in app/routes.ts)
│   ├── home.tsx        # Landing page
│   ├── blog.tsx        # Blog listing with RSS link
│   ├── blog.post.tsx   # Individual blog posts with sharing
│   ├── rss[.]xml.tsx   # RSS feed generation
│   └── sitemap[.]xml.tsx  # SEO sitemap
├── utils/              # Utility functions
│   ├── blog-config.ts  # Blog content configuration
│   ├── cache.ts        # Public response cache policies
│   └── ...
└── __tests__/          # Comprehensive test suite
content/blog/           # Markdown blog posts with frontmatter
public/images/          # Blog post images (WebP format)
```
