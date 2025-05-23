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
  - `blog.tsx` - Blog listing page
  - `blog.post.tsx` - Individual blog post pages
- `app/components/` - Reusable React components
  - `SynthwaveBackground/` - Three.js animated background (home page only)
  - `Navigation.tsx` - Site navigation
- `app/utils/` - Utility functions for blog content processing
- `content/blog/` - Markdown blog posts with front matter

### Performance Optimizations

- SynthwaveBackground is lazy-loaded and only renders on home page
- Font preloading is conditional (blog pages only load Lexend fonts)
- Blog content is processed server-side with caching

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
