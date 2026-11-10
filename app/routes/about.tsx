import { Link } from 'react-router'

import { BranchHeader } from '~/components/BranchHeader'
import { cachePolicies, routeCacheHeaders } from '~/utils/cache'
import { canonicalLink, pageMeta, SITE_URL } from '~/utils/seo'
import { generateBreadcrumbStructuredData } from '~/utils/structuredData'

import type { Route } from './+types/about'

export const links: Route.LinksFunction = () => [canonicalLink('/about')]

export function meta() {
  return pageMeta({
    title: 'About | Matt Burnett',
    description:
      'Matt Burnett is a Senior Software Engineer in Portland, Oregon with nearly 15 years of full-stack experience, including five years at Shopify on Checkout Extensibility and internal AI tooling.',
    path: '/about',
    type: 'profile',
  })
}

export function headers({ parentHeaders }: Route.HeadersArgs) {
  return routeCacheHeaders(parentHeaders, cachePolicies.page)
}

const experience = [
  {
    org: 'Shopify',
    role: 'Senior Software Engineer',
    detail: 'Checkout Extensibility, Checkout Editor, Internal AI Platform',
    period: '2021 – 2026',
    accent: 'text-moss-bright',
  },
  {
    org: 'Red Ventures',
    role: 'Senior Software Engineer / Tech Lead',
    detail: 'ExpertFlyer travel systems modernization (Go, React)',
    period: '2018 – 2021',
    accent: 'text-mist-light',
  },
  {
    org: 'ABC Financial Services',
    role: 'Software Developer III',
    detail: 'Greenfield fintech platform (React, Node.js, PostgreSQL)',
    period: '2016 – 2018',
    accent: 'text-text-muted',
  },
  {
    org: 'Arkansas Blue Cross Blue Shield',
    role: 'Systems Analyst Programmer III',
    detail: 'State healthcare applications and database development',
    period: '2013 – 2016',
    accent: 'text-text-muted',
  },
  {
    org: 'Baptist Health',
    role: 'Web Analyst',
    detail: 'Hospital web applications suite and mainframe migrations',
    period: '2012 – 2013',
    accent: 'text-text-muted',
  },
]

export default function About() {
  const breadcrumbs = generateBreadcrumbStructuredData([
    { name: 'Home', url: SITE_URL },
    { name: 'About' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <BranchHeader
        eyebrow="Portland, Oregon · Profile"
        title="About Matt Burnett"
        subtitle="Senior Software Engineer"
      >
        <p className="max-w-2xl text-base leading-relaxed text-text-muted">
          I am a software engineer with nearly 15 years of experience across the full stack. I focus
          on TypeScript, React, and Node.js, with plenty of Go, SQL, APIs, and cloud infrastructure
          along the way.
        </p>
      </BranchHeader>

      <div className="mx-auto w-full max-w-[880px] flex-1 space-y-12 px-6 py-10">
        <section className="space-y-4" aria-labelledby="background">
          <h2 id="background" className="text-lg font-bold text-text-primary">
            Background
          </h2>
          <div className="space-y-3 text-base leading-relaxed text-text-muted">
            <p>
              I spent more than five years at Shopify (2021–2026). On the Checkout Extensibility
              team, I worked on the initial Checkout Editor and built the architecture for secure
              tracking script injection. Later, I co-built and operated Shopify&rsquo;s internal AI
              chat platform, bringing LibreChat to thousands of employees and integrating it with
              internal development tools.
            </p>
            <p>
              Before Shopify, I was a Senior Software Engineer and Technical Lead at Red Ventures,
              modernizing ExpertFlyer&rsquo;s travel systems from legacy Java Struts to Go backend
              services and React. Earlier in my career, I built hospital administrative software at
              Baptist Health, worked on state healthcare systems at Arkansas Blue Cross Blue Shield,
              and worked on fintech platforms at ABC Financial.
            </p>
          </div>
        </section>

        <section className="space-y-4" aria-labelledby="experience">
          <div className="flex items-baseline justify-between border-b border-border-subtle pb-2">
            <h2 id="experience" className="text-lg font-bold text-text-primary">
              Experience at a glance
            </h2>
            <Link to="/resume" className="font-mono text-xs text-mist-light hover:underline">
              Full résumé →
            </Link>
          </div>
          <ul className="space-y-3">
            {experience.map(job => (
              <li
                key={job.org}
                className="flex flex-col justify-between gap-1 rounded-lg border border-border-subtle bg-surface-dark p-4 shadow-sm transition-colors hover:border-moss-accent sm:flex-row sm:items-center"
              >
                <div>
                  <span className="font-bold text-text-primary">{job.org}</span>
                  <span className="text-text-muted"> — {job.role}</span>
                  <span className={`block text-sm font-medium ${job.accent}`}>{job.detail}</span>
                </div>
                <span className="whitespace-nowrap font-mono text-xs text-text-muted">
                  {job.period}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4" aria-labelledby="education">
          <h2 id="education" className="text-lg font-bold text-text-primary">
            Education &amp; Military Service
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border-subtle bg-surface-dark p-4 shadow-sm">
              <h3 className="mb-1 font-mono text-xs font-bold uppercase tracking-wider text-mist-light">
                Education
              </h3>
              <p className="text-base font-bold text-text-primary">Henderson State University</p>
              <p className="mt-0.5 text-sm text-text-muted">B.S. in Computer Science</p>
            </div>
            <div className="rounded-lg border border-border-subtle bg-surface-dark p-4 shadow-sm">
              <h3 className="mb-1 font-mono text-xs font-bold uppercase tracking-wider text-moss-bright">
                Military Service
              </h3>
              <p className="text-base font-bold text-text-primary">U.S. Army National Guard</p>
              <p className="mt-0.5 text-sm text-text-muted">
                39th Infantry Brigade Combat Team · 7 years (2004–2011), including deployment in
                support of Operation Iraqi Freedom.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3" aria-labelledby="personal">
          <h2 id="personal" className="text-lg font-bold text-text-primary">
            Personal
          </h2>
          <p className="text-base leading-relaxed text-text-muted">
            I live in Portland, Oregon. When I&rsquo;m away from work, I spend time with tabletop
            roleplaying games (Mothership RPG, D&amp;D), open-source side projects like Portaler,
            and writing on my blog.
          </p>
        </section>

        <section className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border-subtle bg-surface-dark p-5">
          <p className="text-sm text-text-muted">
            Looking for complete career details, dates, and technologies?
          </p>
          <div className="flex items-center gap-3">
            <Link
              to="/resume"
              className="rounded bg-moss-bright px-4 py-2 text-sm font-bold text-forest-bg transition-colors hover:bg-white"
            >
              View full résumé
            </Link>
            <Link to="/contact" className="px-3.5 py-2 text-sm text-mist-light hover:underline">
              Get in touch →
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
