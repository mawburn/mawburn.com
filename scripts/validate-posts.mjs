#!/usr/bin/env node
/** Validates every post in content/blog. Exits non-zero on errors. Run: pnpm validate-posts */
import { loadPosts } from './lib/posts.mjs'
import { validatePosts } from './lib/validate.mjs'

const reports = validatePosts(await loadPosts())
let failed = 0

for (const { file, errors, warnings } of reports) {
  for (const message of errors) console.error(`✗ ${file}: ${message}`)
  for (const message of warnings) console.warn(`! ${file}: ${message}`)
  if (errors.length) failed += 1
}

if (failed) {
  console.error(`\n${failed} of ${reports.length} posts have errors.`)
  process.exit(1)
}
console.log(`✓ ${reports.length} posts valid`)
