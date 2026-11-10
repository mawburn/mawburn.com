#!/usr/bin/env node
/**
 * Generates branded Open Graph images (Cascadia Mist) as WebP.
 *
 *   pnpm og-image                 # create images for every post that has none
 *   pnpm og-image <slug>          # (re)create images for one post
 *   pnpm og-image --default       # (re)create public/images/og-default.webp
 *   pnpm og-image --force         # regenerate everything
 *
 * Output matches the blog engine's variants: {slug}.webp (1200x630),
 * {slug}-twitter.webp (1200x600) and {slug}-small.webp (600x315).
 */
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import satori from 'satori'
import sharp from 'sharp'

import { IMAGES_DIR, loadPosts } from './lib/posts.mjs'

const here = path.dirname(fileURLToPath(import.meta.url))
const fonts = await Promise.all(
  [400, 700].map(async weight => ({
    name: 'Instrument Sans',
    weight,
    style: 'normal',
    data: await readFile(path.join(here, 'fonts', `InstrumentSans-${weight}.woff`)),
  }))
)

const el = (type, style, children) => ({ type, props: { style, children } })

async function renderSvg({ eyebrow, title, footer }) {
  const fontSize = title.length > 70 ? 56 : title.length > 40 ? 68 : 82
  const tree = el(
    'div',
    {
      width: 1200,
      height: 630,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '72px 80px',
      color: '#E8F2F6',
      fontFamily: 'Instrument Sans',
      background: 'linear-gradient(160deg, #0B151F 0%, #182C3D 60%, #24445C 100%)',
      borderBottom: '10px solid #34D399',
    },
    [
      el(
        'div',
        { display: 'flex', fontSize: 28, fontWeight: 700, color: '#34D399', letterSpacing: 3 },
        eyebrow.toUpperCase()
      ),
      el(
        'div',
        {
          display: 'flex',
          width: 1040,
          fontSize,
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: -2,
        },
        title
      ),
      el(
        'div',
        {
          display: 'flex',
          width: 1040,
          justifyContent: 'space-between',
          fontSize: 28,
          color: '#A2BAC8',
        },
        [
          el('div', { display: 'flex' }, footer),
          el('div', { display: 'flex', color: '#7DD3FC', fontWeight: 700 }, 'mawburn.com'),
        ]
      ),
    ]
  )
  return satori(tree, { width: 1200, height: 630, fonts })
}

async function writeVariants(base, svg) {
  const png = await sharp(Buffer.from(svg)).png().toBuffer()
  const out = (name, w, h) =>
    sharp(png)
      .resize(w, h, { fit: 'cover' })
      .webp({ quality: 82 })
      .toFile(path.join(IMAGES_DIR, name))
  await Promise.all([
    out(`${base}.webp`, 1200, 630),
    base === 'og-default' ? null : out(`${base}-twitter.webp`, 1200, 600),
    base === 'og-default' ? null : out(`${base}-small.webp`, 600, 315),
  ])
}

const args = process.argv.slice(2)
const force = args.includes('--force')
const wantDefault = args.includes('--default') || force
const slugs = args.filter(arg => !arg.startsWith('--'))

if (wantDefault || (!slugs.length && !existsSync(path.join(IMAGES_DIR, 'og-default.webp')))) {
  await writeVariants(
    'og-default',
    await renderSvg({
      eyebrow: 'Portland, Oregon',
      title: 'Matt Burnett — Senior / Staff Software Engineer',
      footer: 'TypeScript · React · Node.js · Go',
    })
  )
  console.log('created og-default.webp')
}

const posts = await loadPosts()
for (const post of posts) {
  if (slugs.length && !slugs.includes(post.slug)) continue
  if (args.includes('--default') && !slugs.length && !force) continue
  const target = path.join(IMAGES_DIR, `${post.slug}.webp`)
  const customImage = post.data?.image && post.data.image !== `${post.slug}.webp`
  if (!force && !slugs.length && (existsSync(target) || customImage)) continue

  const date = new Date(post.data.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
  await writeVariants(
    post.slug,
    await renderSvg({
      eyebrow: (post.data.tags ?? [])[0] ?? 'Blog',
      title: post.data.title,
      footer: date,
    })
  )
  console.log(`created ${post.slug}.webp (+twitter, small)`)
}
