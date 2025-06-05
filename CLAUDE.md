## Project Structure

This is a personal portfolio site with a blog built using modern web technologies.

### Framework & Libraries

- **React Router v7** (renamed from Remix) - Full-stack React framework
- **TailwindCSS v4** - Utility-first CSS framework
- **Three.js** - 3D graphics library for the synthwave background on home page
- **TypeScript** - Type-safe JavaScript

### App Architecture

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

### Blog Images

- Images use WebP format for better compression
- Support for multiple sizes: `{slug}.webp`, `{slug}-twitter.webp`, `{slug}-small.webp`
- Images can be specified in frontmatter or auto-detected by slug naming

### Features

- **RSS Feed**: Auto-generated RSS 2.0 feed at `/rss.xml` for blog syndication
- **SEO Sitemap**: XML sitemap at `/sitemap.xml` with proper priorities and change frequencies
- **Social Sharing**: Share buttons for Twitter, LinkedIn, Bluesky, and copy-to-clipboard
- **Dark Mode**: System-aware theme switching with persistence
- **Responsive Design**: Mobile-first approach with adaptive layouts

### Performance Optimizations

- SynthwaveBackground is lazy-loaded and only renders on home page
- Font preloading is conditional (blog pages only load Lexend fonts)
- Blog content is processed server-side with caching
- RSS and sitemap responses are cached for 1 hour
- Theme toggle includes hydration safety to prevent flashing

### Styling Conventions

- Home page: Dark theme with synthwave aesthetics
- Blog pages: Clean, readable design with `dark:bg-slate-900` background
- Consistent spacing and typography using Tailwind utilities

## Development Guidelines

### Do's

- Follow existing patterns in the folder structure
- Use file-based routing conventions for new pages
- Examine node_modules packages to understand library functionality
- Start with README.md files in each package
- Adhere to .prettierrc & oxlint.json configurations
- Use `pnpm` as the package manager
- Only comment complex code requiring extra explanation
- Always run `pnpm typecheck` and `pnpm lint` after creating or updating code
- Prefer editing existing files over creating new ones
- Use lazy loading for heavy components (like Three.js background)

### Don'ts

- DON'T USE COMMENTS unless there is a very unique piece of code that requires extra information
- Don't use `(_) => null` syntax for unused parameters; omit them instead
- Don't use `pnpm run dev` for error testing (inefficient)
- Don't assume knowledge of React Router v7 or TailwindCSS v4 functionality
- Don't use the `any` type unless absolutely necessary
- Don't typecast unless absolutely necessary
- Don't load heavy assets (Three.js, unused fonts) on blog pages
