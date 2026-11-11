# mawburn.com

[![Tests](https://github.com/mawburn/mawburn.com/actions/workflows/test.yml/badge.svg)](https://github.com/mawburn/mawburn.com/actions/workflows/test.yml)
[![Cloudflare Deploy](https://img.shields.io/website?url=https%3A%2F%2Fmawburn.com&label=Cloudflare%20deploy&logo=cloudflare)](https://mawburn.com)

A personal portfolio site with blog built using modern web technologies.

## Tech Stack

- **React Router v7** (renamed from Remix) - Full-stack React framework
- **TailwindCSS v4** - Utility-first CSS framework
- **Cascadia Mist design system** - dark Pacific Northwest theme, self-hosted Instrument Sans + JetBrains Mono
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

## Writing a blog post

```bash
pnpm new-post "My post title" --category engineering --tags "react,typescript"   # scaffolds content/blog/YYYY-MM-DD-slug.md + OG images
# write the post, replace the TODO excerpt/tags
pnpm dev                                                 # preview at /blog/<slug>
pnpm validate-posts                                      # frontmatter, filename, image checks (also run by CI and `pnpm build`)
```

Frontmatter: `title`, `date` (`'YYYY-MM-DD HH:mm'`, must match the filename), `excerpt` (becomes the meta description, 50–160 chars ideal), `category` (exactly one id from `content/blog/categories.json`; drives the filter buttons on `/blog`), `tags`, optional `image` and `updated`. Other commands:

- `pnpm og-image [slug]` generates branded `{slug}.webp` (1200x630) plus `-twitter` and `-small` variants for posts without an image. `--force` regenerates all, `--default` rebuilds `og-default.webp`.
- Posts are bundled at build time, so publishing means committing and deploying (`pnpm deploy`).

New posts appear automatically in the blog list, home page "Recent Writing", `sitemap.xml`, `rss.xml` and `llms.txt`.

## Design and theming

Design tokens live in the `@theme` block of `app/app.css`. The site is dark-only; only blog routes (`BlogShell`) offer a light/dark toggle, scoped to a wrapper element so other pages never read `localStorage.theme`. The animated forest hero (`ForestHero`) is inline SVG + CSS keyframes (transform/opacity only), paused off-screen and disabled for `prefers-reduced-motion`.

## Project Structure

```
app/
├── layouts/site.tsx    # Shared nav + footer + skip link around page routes
├── components/         # ForestHero, BranchHeader, BlogShell, Navigation, Footer, ShareButtons, ...
├── routes/             # home, about, contact, resume, blog, blog.post + sitemap/rss/robots/llms resources
├── utils/              # blog-config, cache policies, seo (pageMeta/canonicalLink), structuredData
└── __tests__/          # test suite
scripts/                # new-post, validate-posts, og-image (plain Node ESM)
content/blog/           # Markdown posts with frontmatter
public/images/          # Post images and og-default.webp (WebP)
```
