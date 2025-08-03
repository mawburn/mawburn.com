import { reactRouter } from '@react-router/dev/vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
  build: {
    minify: 'terser',
    cssMinify: true,
    cssCodeSplit: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
    },
    rollupOptions: {
      output: {
        manualChunks: id => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            if (id.includes('three')) {
              return 'three'
            }
            if (id.includes('markdown-it')) {
              return 'markdown'
            }
            return 'vendor'
          }
          // Route-based splitting for better caching
          if (id.includes('routes/blog.tsx')) {
            return 'blog-list'
          }
          if (id.includes('routes/blog.post.')) {
            return 'blog-post'
          }
          if (id.includes('routes/home.')) {
            return 'home'
          }
          // Separate Three.js background into its own chunk
          if (id.includes('SynthwaveBackground')) {
            return 'synthwave'
          }
        },
        assetFileNames: assetInfo => {
          if (!assetInfo.names?.[0]) return `assets/[name]-[hash].[ext]`
          const name = assetInfo.names[0]
          const info = name.split('.')
          const ext = info[info.length - 1]
          if (/\.(css)$/.test(name)) {
            // Route-specific CSS naming for better caching
            if (name.includes('blog')) {
              return `css/blog-[hash].${ext}`
            }
            return `css/[name]-[hash].${ext}`
          }
          return `assets/[name]-[hash].${ext}`
        },
      },
    },
  },
})
