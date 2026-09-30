import { Footer } from '~/components/Footer'
import { EmailIcon, GitHubIcon, LinkedIn } from '~/components/icons'
import {
  education,
  experience,
  militaryService,
  resumeProfile,
  selectedProjects,
  workAreas,
} from '~/data/resume'
import { generateProfilePageStructuredData } from '~/utils/structuredData'

import type { Route } from './+types/resume'

export const links: Route.LinksFunction = () => [
  {
    rel: 'canonical',
    href: 'https://mawburn.com/resume',
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com',
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700&family=Source+Serif+4:wght@600;700&display=swap',
  },
]

export function meta() {
  const description =
    'Senior and Staff-level software engineer with nearly 15 years of experience building full-stack products and high-scale systems with TypeScript, React, Node.js, Go, SQL, and cloud infrastructure. Former Shopify engineer.'

  return [
    { title: 'Matt Burnett | Senior / Staff Software Engineer' },
    { name: 'description', content: description },
    {
      name: 'keywords',
      content:
        'Matt Burnett Resume, Senior Software Engineer, Staff Software Engineer, Shopify, React, TypeScript, Node.js, Go, Java, GraphQL, REST APIs, PostgreSQL, AI Developer Tools, Platform Engineering',
    },
    { property: 'og:type', content: 'profile' },
    { property: 'og:title', content: 'Matt Burnett | Senior / Staff Software Engineer' },
    { property: 'og:description', content: description },
    { property: 'og:url', content: 'https://mawburn.com/resume' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: 'Matt Burnett | Senior / Staff Software Engineer' },
    { name: 'twitter:description', content: description },
  ]
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="font-['Source_Serif_4'] text-3xl font-semibold text-gray-950 dark:text-white">
        {children}
      </h2>
      <div className="mt-3 h-1 w-16 bg-gradient-to-r from-fuchsia-500 to-cyan-400" />
    </div>
  )
}

function BulletList({ bullets }: { bullets: string[] }) {
  return (
    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
      {bullets.map(bullet => (
        <li key={bullet} className="leading-relaxed">
          <span className="mr-2 text-fuchsia-600 dark:text-fuchsia-400">▹</span>
          {bullet}
        </li>
      ))}
    </ul>
  )
}

export default function Resume() {
  const profilePageStructuredData = generateProfilePageStructuredData()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageStructuredData) }}
      />
      <div className="min-h-screen bg-white dark:bg-[oklch(25%_0.015_260)] transition-colors flex flex-col">
        <main className="container mx-auto max-w-4xl px-4 py-10 font-['Source_Sans_3'] text-gray-900 dark:text-gray-100">
          <header className="mb-14">
            <h1 className="mb-4 font-['Source_Serif_4'] text-4xl font-bold tracking-tight text-gray-950 dark:text-white md:text-6xl">
              {resumeProfile.name}
            </h1>
            <p className="mb-5 text-2xl font-bold text-cyan-700 dark:text-cyan-300">
              {resumeProfile.title}
            </p>
            <p className="max-w-3xl text-xl leading-relaxed text-gray-700 dark:text-gray-300">
              {resumeProfile.summary}
            </p>
            <p className="mt-5 max-w-3xl text-gray-600 dark:text-gray-400">
              {resumeProfile.location} · {resumeProfile.focus.join(' · ')}
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm font-bold">
              <a
                href={resumeProfile.linkedinUrl}
                className="inline-flex items-center gap-2 text-fuchsia-700 underline-offset-4 hover:underline dark:text-fuchsia-300"
              >
                <LinkedIn size={18} />
                <span>LinkedIn</span>
              </a>
              <a
                href={resumeProfile.githubUrl}
                className="inline-flex items-center gap-2 text-fuchsia-700 underline-offset-4 hover:underline dark:text-fuchsia-300"
              >
                <GitHubIcon size={18} />
                <span>GitHub</span>
              </a>
              <a
                href={`mailto:${resumeProfile.email}`}
                className="inline-flex items-center gap-2 text-fuchsia-700 underline-offset-4 hover:underline dark:text-fuchsia-300"
              >
                <EmailIcon size={18} />
                <span>Email</span>
              </a>
              <a
                href="/Matt_Burnett_Resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-1.5 text-gray-950 shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
              >
                <img src="/PDF_file_icon.svg" alt="" className="h-5 w-5" aria-hidden="true" />
                <span>Download PDF</span>
              </a>
            </div>
          </header>

          <section className="mb-16 rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900/40">
            <h2 className="mb-5 text-2xl font-bold text-gray-950 dark:text-white">What I Do</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {workAreas.map(area => (
                <div key={area.name}>
                  <h3 className="font-bold text-cyan-700 dark:text-cyan-300">{area.name}</h3>
                  <p className="mt-1 text-gray-700 dark:text-gray-300">{area.details}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionHeading>Experience</SectionHeading>
            <div className="space-y-12">
              {experience.map(job => (
                <article
                  key={job.company}
                  className="border-b border-gray-200 pb-12 last:border-b-0 dark:border-gray-700"
                >
                  <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-950 dark:text-white">
                        {job.company}
                      </h3>
                      <p className="text-lg text-gray-700 dark:text-gray-300">{job.role}</p>
                      {job.location && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">{job.location}</p>
                      )}
                    </div>
                    <p className="font-medium text-gray-600 dark:text-gray-400">{job.dates}</p>
                  </div>
                  {job.intro && (
                    <p className="mb-6 max-w-3xl text-gray-700 dark:text-gray-300">{job.intro}</p>
                  )}

                  {job.areas ? (
                    <div className="space-y-8">
                      {job.areas.map(area => (
                        <section key={area.name}>
                          <div className="mb-3 flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                            <h4 className="text-xl font-bold text-cyan-700 dark:text-cyan-300">
                              {area.name}
                            </h4>
                            {area.dates && (
                              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                {area.dates}
                              </p>
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

          <section className="mt-14">
            <SectionHeading>Selected Projects</SectionHeading>
            {selectedProjects.map(project => (
              <article
                key={project.name}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900/40"
              >
                <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-950 dark:text-white">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-lg text-gray-700 dark:text-gray-300">
                      {project.subtitle}
                    </p>
                  </div>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-fuchsia-700 underline-offset-4 hover:underline dark:text-fuchsia-300"
                    aria-label="View Portaler source on GitHub"
                  >
                    <GitHubIcon size={18} />
                    <span>View source on GitHub</span>
                  </a>
                </div>

                <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {project.metrics.map(([value, label]) => (
                    <div key={label} className="rounded-xl bg-white p-4 dark:bg-gray-950/40">
                      <p className="text-2xl font-bold text-cyan-700 dark:text-cyan-300">{value}</p>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    Built and operated an open-source full-stack platform that grew to approximately{' '}
                    <strong>22K monthly active unique users</strong> and handled approximately{' '}
                    <strong>15M API requests</strong>, with a Discord integration monitoring roughly{' '}
                    <strong>75K user roles across 500 Discord servers</strong> while I operated it.
                  </p>
                  <p>
                    Designed the React/TypeScript frontend, Node/Express API services,
                    PostgreSQL/Redis data layer, Discord OAuth and role-based access integration,
                    Docker deployment, and production infrastructure for a multi-tenant, real-time
                    collaborative mapping system used by many separate guilds and alliances, each
                    with private mapping data and Discord-based access controls.
                  </p>
                  <p>
                    The production system ran on a roughly <strong>$30/month Hetzner server</strong>{' '}
                    and typically consumed only <strong>5–10% of available resources</strong>,
                    leaving substantial headroom despite meaningful production traffic.
                  </p>
                  <p>
                    After I stopped maintaining Portaler, I archived the original repository and the
                    open-source project moved into community development.
                  </p>
                </div>

                <p className="mt-5 text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-bold text-gray-700 dark:text-gray-300">Technology:</span>{' '}
                  {project.technologies.join(' · ')}
                </p>
              </article>
            ))}
          </section>

          <section className="mt-14">
            <SectionHeading>Education</SectionHeading>
            <div className="grid gap-4 sm:grid-cols-2">
              {education.map(school => (
                <article
                  key={school.institution}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900/70"
                >
                  <h3 className="text-xl font-bold text-gray-950 dark:text-white">
                    {school.institution}
                  </h3>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">{school.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-14">
            <SectionHeading>Military Service</SectionHeading>
            <article className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900/40">
              <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-950 dark:text-white">
                    {militaryService.organization}
                  </h3>
                  <p className="mt-2 max-w-3xl text-gray-700 dark:text-gray-300">
                    {militaryService.details}
                  </p>
                </div>
                <p className="font-medium text-gray-600 dark:text-gray-400">
                  {militaryService.dates}
                </p>
              </div>
              <p className="mb-5 max-w-3xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {militaryService.roles}
              </p>
              <BulletList bullets={militaryService.bullets} />
            </article>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
