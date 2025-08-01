# CLAUDE.md - Project Instructions

Last updated: 2025-07-31

Personal portfolio and blog site built with modern web technologies.

## Tech Stack

- React Router v7 (renamed from Remix) - Full-stack React framework
- TypeScript 5.x - Type-safe JavaScript
- TailwindCSS v4 - Utility-first CSS framework
- Three.js - 3D graphics for synthwave background (home page only)
- pnpm - Package manager
- Vite - Build tool

## Project Structure

- `app/routes/` - File-based routing
  - `home.tsx` - Landing page with 3D synthwave background
  - `blog.tsx` - Blog listing page with RSS feed link
  - `blog.post.tsx` - Individual blog post pages with social sharing
  - `rss[.]xml.tsx` - RSS 2.0 feed generation
  - `sitemap[.]xml.tsx` - XML sitemap for SEO
- `app/components/` - Reusable React components
  - `SynthwaveBackground/` - Three.js animated background (home page only)
  - `Navigation.tsx` - Site navigation
  - `ShareButtons/` - Social media sharing (Twitter, LinkedIn, Bluesky, copy link)
  - `MarkdownContent.tsx` - Centralized markdown styling with dark mode support
  - `ThemeToggle.tsx` - Dark/light theme switcher with hydration safety
- `app/utils/` - Utility functions for blog content processing
  - `blog.ts` - Handles blog posts and multi-size image support
  - `frontmatter.ts` - Parses markdown frontmatter including image field
- `content/blog/` - Markdown blog posts with frontmatter
- `public/images/` - Blog post images in WebP format with size variants

## Key Features

- RSS 2.0 feed at `/rss.xml`
- XML sitemap at `/sitemap.xml`
- Social sharing (Twitter, LinkedIn, Bluesky, copy link)
- Dark/light theme switching with system awareness
- Responsive mobile-first design
- Multi-size WebP blog images: `{slug}.webp`, `{slug}-twitter.webp`, `{slug}-small.webp`

## Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm lint` - Run linting with oxlint

## Code Style

- Use ES modules (import/export), not CommonJS
- Destructure imports when possible
- 2-space indentation
- Semicolons required
- Single quotes for strings
- Function components with hooks only
- Arrow functions preferred
- PascalCase for components, camelCase for functions/variables

## Architecture Patterns

- File-based routing with React Router v7
- Server-side rendering for blog content
- Lazy loading for heavy components (Three.js)
- Conditional font preloading (Lexend fonts on blog pages only)
- 1-hour caching for RSS and sitemap responses
- Hydration-safe theme switching

## Performance Guidelines

- Three.js loads only on home page
- Blog content processed server-side with caching
- Images served as WebP with size variants
- Avoid loading unused fonts on non-blog pages

## Workflow

- Always run `pnpm typecheck` and `pnpm lint` after code changes
- Prefer editing existing files over creating new ones
- Test with actual builds, not dev server for error testing
- Follow existing patterns in the codebase

## Important Restrictions

- NEVER add comments unless absolutely necessary for complex logic
- NEVER use `(_) => null` syntax - omit unused parameters
- NEVER use `any` type or typecasting unless absolutely necessary
- NEVER assume React Router v7 or TailwindCSS v4 APIs - check documentation
- NEVER load Three.js or heavy assets on blog pages
- NEVER create new files unless explicitly required
