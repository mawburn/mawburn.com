import { Link } from 'react-router'

import { ForestHero } from '~/components/ForestHero'
import { resumeProfile } from '~/data/resume'
import { datePart, formatPublishDate } from '~/utils/dateUtils'

export type RecentPost = {
  slug: string
  title: string
  date: string
  readTime: number
}

const selectedWork = [
  {
    org: 'Shopify',
    period: '2025–2026',
    title: 'Internal AI Platform',
    body: 'Internal LibreChat application and LLM developer tooling adopted daily by thousands of Shopify employees.',
    accent: 'moss',
  },
  {
    org: 'Shopify',
    period: '2021–2025',
    title: 'Checkout Extensibility',
    body: 'Checkout Editor architecture and secure tracking script injection system built with React and TypeScript.',
    accent: 'mist',
  },
  {
    org: 'Open Source',
    period: '22K MAU',
    title: 'Portaler',
    body: 'Real-time collaborative mapping platform handling 15M requests for Albion Online on a $30/mo Hetzner server.',
    accent: 'moss',
  },
] as const

export function Welcome({ recentPosts }: { recentPosts: RecentPost[] }) {
  return (
    <>
      <section
        className="relative overflow-hidden border-b border-border-subtle bg-gradient-to-b from-[#0B151F] via-[#111F2D] to-surface-dark"
        aria-label="Introduction"
      >
        <div className="pointer-events-none relative h-[360px] w-full select-none md:h-[400px]">
          <ForestHero />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-forest-bg to-transparent" />
        </div>

        <div className="relative z-10 mx-auto -mt-24 max-w-[880px] px-6 pb-12 md:-mt-28">
          <div className="surface-enter flex flex-col items-start gap-6 md:flex-row-reverse md:items-end md:justify-between md:gap-10">
            <img
              src="/images/matt-burnett.webp"
              alt="Portrait of Matt Burnett"
              width={160}
              height={160}
              fetchPriority="high"
              className="size-24 shrink-0 rounded-full border-2 border-border-light object-cover shadow-lg shadow-black/40 ring-4 ring-forest-bg md:size-40"
            />
            <div className="max-w-2xl">
              <h1 className="mb-3 text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
                Matt Burnett
              </h1>
              <p className="mb-4 text-xl font-semibold text-moss-bright">
                Senior Software Engineer · Portland, Oregon
              </p>
              <p className="mb-6 text-base leading-relaxed text-text-muted md:text-lg">
                I&rsquo;m a full-stack engineer with nearly 15 years of experience building software
                and platform systems. I spent more than five years at Shopify working on Checkout
                Extensibility and internal developer AI tooling.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/about"
                  prefetch="intent"
                  className="inline-flex items-center gap-2 rounded bg-moss-bright px-4 py-2 text-sm font-bold text-forest-bg transition-colors hover:bg-white"
                >
                  About me <span aria-hidden="true">→</span>
                </Link>
                <Link
                  to="/blog"
                  prefetch="intent"
                  className="inline-flex items-center rounded border border-border-light bg-surface-dark px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-mist-light"
                >
                  Read Blog
                </Link>
                <Link
                  to="/resume"
                  prefetch="intent"
                  className="inline-flex items-center px-3.5 py-2 text-sm text-text-muted transition-colors hover:text-text-primary"
                >
                  Résumé
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[880px] flex-1 space-y-14 px-6 py-12">
        <section className="space-y-4" aria-labelledby="what-i-do">
          <h2 id="what-i-do" className="text-lg font-bold text-text-primary">
            What I do
          </h2>
          <p className="text-base leading-relaxed text-text-muted">
            I work primarily with TypeScript, React, and Node.js, with additional experience in Go,
            SQL, cloud infrastructure, and software architecture. I like solving hard, foundational
            problems—building developer platforms, modernizing legacy systems, and making software
            that runs reliably.
          </p>
          <p className="text-sm text-text-muted">
            Read more on the{' '}
            <Link to="/about" className="font-semibold text-moss-bright hover:underline">
              About page
            </Link>
            .
          </p>
        </section>

        <section className="space-y-4" aria-labelledby="selected-work">
          <div className="flex items-baseline justify-between border-b border-border-subtle pb-2">
            <h2 id="selected-work" className="text-lg font-bold text-text-primary">
              Selected Work
            </h2>
            <Link to="/resume" className="font-mono text-xs text-mist-light hover:underline">
              Full experience on résumé →
            </Link>
          </div>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {selectedWork.map(item => (
              <li
                key={item.title}
                className="rounded-lg border border-border-subtle bg-surface-dark p-5"
              >
                <div className="mb-2 flex items-center justify-between font-mono text-xs text-text-muted">
                  <span
                    className={`font-bold ${
                      item.accent === 'moss' ? 'text-moss-bright' : 'text-mist-light'
                    }`}
                  >
                    {item.org}
                  </span>
                  <span>{item.period}</span>
                </div>
                <h3 className="mb-2 text-base font-bold text-text-primary">{item.title}</h3>
                <p className="text-sm leading-relaxed text-text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {recentPosts.length > 0 ? (
          <section className="space-y-4" aria-labelledby="recent-writing">
            <div className="flex items-baseline justify-between border-b border-border-subtle pb-2">
              <h2 id="recent-writing" className="text-lg font-bold text-text-primary">
                Recent Writing
              </h2>
              <Link to="/blog" className="font-mono text-xs text-mist-light hover:underline">
                All posts →
              </Link>
            </div>
            <ul className="divide-y divide-border-subtle">
              {recentPosts.map(post => (
                <li
                  key={post.slug}
                  className="flex flex-col justify-between gap-1 py-4 sm:flex-row sm:items-baseline"
                >
                  <h3 className="text-base font-medium">
                    <Link
                      to={`/blog/${post.slug}`}
                      prefetch="intent"
                      className="text-text-primary transition-colors hover:text-moss-bright"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <span className="whitespace-nowrap font-mono text-xs text-text-muted">
                    <time dateTime={datePart(post.date)}>
                      {formatPublishDate(post.date, 'short')}
                    </time>{' '}
                    · {post.readTime} min
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section
          className="flex flex-col justify-between gap-4 rounded-lg border border-border-subtle bg-surface-dark p-6 sm:flex-row sm:items-center"
          aria-labelledby="get-in-touch"
        >
          <div>
            <h2 id="get-in-touch" className="text-base font-bold text-text-primary">
              Get in touch
            </h2>
            <p className="text-sm text-text-muted">
              Exploring Senior and Staff individual contributor roles from Portland, Oregon.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="rounded bg-moss-bright px-4 py-2 text-sm font-bold text-forest-bg transition-colors hover:bg-white"
            >
              Contact
            </Link>
            <a
              href={`mailto:${resumeProfile.email}`}
              className="font-mono text-xs text-mist-light transition-colors hover:text-white"
            >
              {resumeProfile.email}
            </a>
          </div>
        </section>
      </div>
    </>
  )
}
