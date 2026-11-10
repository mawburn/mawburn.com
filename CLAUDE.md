# CLAUDE.md

React Router v7 (SSR) on a Cloudflare Worker, Tailwind v4, pnpm. See README.md for commands.

## Conventions

- Prettier: no semicolons, single quotes, 100 cols. Run `pnpm lint`, `pnpm typecheck`, `pnpm test` before finishing.
- Every page route must use `pageMeta()` and `canonicalLink()` from `app/utils/seo.ts` (title, description, OG, Twitter, canonical) and add its URL to `sitemap[.]xml.tsx` and `llms[.]txt.tsx`. `app/__tests__/page-meta.test.ts` enforces the meta.
- Page routes go inside the `layouts/site.tsx` layout in `app/routes.ts`; resource routes (sitemap, rss, robots, llms, resume.md) stay outside it.
- Use design tokens from `app/app.css` (`bg-forest-bg`, `text-text-muted`, `text-moss-bright`, ...), not raw hex.
- The site is dark-only. Theming (`dark:` classes, the toggle) belongs only inside `BlogShell`.
- Animations: transform/opacity only, and must respect `prefers-reduced-motion`. No JS animation libraries.
- Keep client JS small; avoid new runtime dependencies.

## Blog

Posts are `content/blog/YYYY-MM-DD-slug.md`. Create with `pnpm new-post`; `pnpm validate-posts` runs in CI and before `pnpm build`. Images via `pnpm og-image`.
