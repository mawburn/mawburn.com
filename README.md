# mawburn.com

[![Tests](https://github.com/mawburn/mawburn.com/actions/workflows/test.yml/badge.svg)](https://github.com/mawburn/mawburn.com/actions/workflows/test.yml)

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

## Project Structure

```
app/
├── components/          # Reusable React components
│   ├── SynthwaveBackground/  # Three.js animated background
│   ├── Navigation.tsx   # Site navigation
│   └── ...
├── routes/             # File-based routing
│   ├── home.tsx        # Landing page
│   ├── blog.tsx        # Blog listing
│   └── blog.post.tsx   # Individual blog posts
├── utils/              # Utility functions
│   ├── blog.ts         # Blog content processing
│   ├── cache.ts        # Response caching
│   └── ...
└── __tests__/          # Comprehensive test suite
content/blog/           # Markdown blog posts
```
