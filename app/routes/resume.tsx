import { BranchHeader } from '~/components/BranchHeader'
import { EmailIcon, GitHubIcon, LinkedIn } from '~/components/icons'
import {
  education,
  experience,
  militaryService,
  resumeProfile,
  selectedProjects,
  workAreas,
} from '~/data/resume'
import { cachePolicies, routeCacheHeaders } from '~/utils/cache'
import { canonicalLink, pageMeta } from '~/utils/seo'
import { generateProfilePageStructuredData } from '~/utils/structuredData'

import type { Route } from './+types/resume'

export const links: Route.LinksFunction = () => [canonicalLink('/resume')]

export function meta() {
  return pageMeta({
    title: 'Matt Burnett | Senior / Staff Software Engineer',
    description:
      'Senior and Staff-level software engineer with nearly 15 years of experience building full-stack products and high-scale systems with TypeScript, React, Node.js, Go, SQL, and cloud infrastructure. Former Shopify engineer.',
    path: '/resume',
    type: 'profile',
    keywords:
      'Matt Burnett Resume, Senior Software Engineer, Staff Software Engineer, Shopify, React, TypeScript, Node.js, Go, Java, GraphQL, REST APIs, PostgreSQL, AI Developer Tools, Platform Engineering',
  })
}

export function headers({ parentHeaders }: Route.HeadersArgs) {
  return routeCacheHeaders(parentHeaders, cachePolicies.page)
}

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="mb-6 border-b border-border-subtle pb-2 text-xl font-bold text-text-primary"
    >
      {children}
    </h2>
  )
}

function BulletList({ bullets }: { bullets: string[] }) {
  return (
    <ul className="space-y-2.5 text-text-muted">
      {bullets.map(bullet => (
        <li key={bullet} className="flex gap-2.5 leading-relaxed">
          <span className="mt-[0.15rem] text-moss-bright" aria-hidden="true">
            ▹
          </span>
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  )
}

const linkClass =
  'inline-flex items-center gap-2 text-sm font-semibold text-mist-light underline-offset-4 hover:underline'

export default function Resume() {
  const profilePageStructuredData = generateProfilePageStructuredData()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageStructuredData) }}
      />
      <BranchHeader
        eyebrow="Curriculum Vitae"
        title={resumeProfile.name}
        subtitle={resumeProfile.title}
      >
        <p className="max-w-2xl text-base leading-relaxed text-text-muted">
          {resumeProfile.summary}
        </p>
        <p className="font-mono text-xs text-text-muted">
          {resumeProfile.location} · {resumeProfile.focus.join(' · ')}
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-2">
          <a
            href="/Matt_Burnett_Resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded bg-moss-bright px-4 py-2 text-sm font-bold text-forest-bg transition-colors hover:bg-white"
          >
            Download PDF
          </a>
          <a href={`mailto:${resumeProfile.email}`} className={linkClass}>
            <EmailIcon size={16} />
            <span>Email</span>
          </a>
          <a
            href={resumeProfile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <LinkedIn size={16} />
            <span>LinkedIn</span>
          </a>
          <a
            href={resumeProfile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <GitHubIcon size={16} />
            <span>GitHub</span>
          </a>
        </div>
      </BranchHeader>

      <div className="mx-auto w-full max-w-[880px] flex-1 space-y-14 px-6 py-10">
        <section
          aria-labelledby="what-i-do"
          className="rounded-lg border border-border-subtle bg-surface-dark p-6"
        >
          <h2 id="what-i-do" className="mb-5 text-lg font-bold text-text-primary">
            What I Do
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {workAreas.map(area => (
              <div key={area.name}>
                <h3 className="font-bold text-moss-bright">{area.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-text-muted">{area.details}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="experience">
          <SectionHeading id="experience">Experience</SectionHeading>
          <div className="space-y-10">
            {experience.map(job => (
              <article
                key={job.company}
                className="border-b border-border-subtle pb-10 last:border-b-0"
              >
                <div className="mb-4 flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">{job.company}</h3>
                    <p className="text-base text-text-muted">{job.role}</p>
                    {job.location && <p className="text-sm text-text-muted">{job.location}</p>}
                  </div>
                  <p className="whitespace-nowrap font-mono text-xs text-text-muted">{job.dates}</p>
                </div>
                {job.intro && <p className="mb-5 max-w-3xl text-text-muted">{job.intro}</p>}

                {job.areas ? (
                  <div className="space-y-7">
                    {job.areas.map(area => (
                      <section key={area.name}>
                        <div className="mb-3 flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                          <h4 className="text-lg font-bold text-mist-light">{area.name}</h4>
                          {area.dates && (
                            <p className="font-mono text-xs text-text-muted">{area.dates}</p>
                          )}
                        </div>
                        <BulletList bullets={area.bullets} />
                      </section>
                    ))}
                  </div>
                ) : job.bullets ? (
                  <BulletList bullets={job.bullets} />
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="projects">
          <SectionHeading id="projects">Selected Projects</SectionHeading>
          {selectedProjects.map(project => (
            <article
              key={project.name}
              className="rounded-lg border border-border-subtle bg-surface-dark p-6"
            >
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-text-primary">{project.name}</h3>
                  <p className="mt-1 text-text-muted">{project.subtitle}</p>
                </div>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  <GitHubIcon size={16} />
                  <span>View source on GitHub</span>
                </a>
              </div>

              <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {project.metrics.map(([value, label]) => (
                  <div key={label} className="rounded-md bg-forest-bg/60 p-4">
                    <p className="text-2xl font-bold text-moss-bright">{value}</p>
                    <p className="mt-1 text-sm text-text-muted">{label}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 text-text-muted">
                <p>
                  Built and operated an open-source full-stack platform that grew to approximately{' '}
                  <strong className="text-text-primary">22K monthly active unique users</strong> and
                  handled approximately{' '}
                  <strong className="text-text-primary">15M API requests</strong>, with a Discord
                  integration monitoring roughly{' '}
                  <strong className="text-text-primary">
                    75K user roles across 500 Discord servers
                  </strong>{' '}
                  while I operated it.
                </p>
                <p>
                  Designed the React/TypeScript frontend, Node/Express API services,
                  PostgreSQL/Redis data layer, Discord OAuth and role-based access integration,
                  Docker deployment, and production infrastructure for a multi-tenant, real-time
                  collaborative mapping system used by many separate guilds and alliances, each with
                  private mapping data and Discord-based access controls.
                </p>
                <p>
                  The production system ran on a roughly{' '}
                  <strong className="text-text-primary">$30/month Hetzner server</strong> and
                  typically consumed only{' '}
                  <strong className="text-text-primary">5–10% of available resources</strong>,
                  leaving substantial headroom despite meaningful production traffic.
                </p>
                <p>
                  After I stopped maintaining Portaler, I archived the original repository and the
                  open-source project moved into community development.
                </p>
              </div>

              <p className="mt-5 text-sm text-text-muted">
                <span className="font-bold text-text-primary">Technology:</span>{' '}
                {project.technologies.join(' · ')}
              </p>
            </article>
          ))}
        </section>

        <section aria-labelledby="education">
          <SectionHeading id="education">Education</SectionHeading>
          <div className="grid gap-4 sm:grid-cols-2">
            {education.map(school => (
              <article
                key={school.institution}
                className="rounded-lg border border-border-subtle bg-surface-dark p-5"
              >
                <h3 className="text-lg font-bold text-text-primary">{school.institution}</h3>
                <p className="mt-2 text-text-muted">{school.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="military">
          <SectionHeading id="military">Military Service</SectionHeading>
          <article className="rounded-lg border border-border-subtle bg-surface-dark p-6">
            <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
              <div>
                <h3 className="text-xl font-bold text-text-primary">
                  {militaryService.organization}
                </h3>
                <p className="mt-2 max-w-3xl text-text-muted">{militaryService.details}</p>
              </div>
              <p className="whitespace-nowrap font-mono text-xs text-text-muted">
                {militaryService.dates}
              </p>
            </div>
            <p className="mb-5 max-w-3xl text-sm leading-relaxed text-text-muted">
              {militaryService.roles}
            </p>
            <BulletList bullets={militaryService.bullets} />
          </article>
        </section>
      </div>
    </>
  )
}
