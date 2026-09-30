import { Footer } from '~/components/Footer'
import { EmailIcon, GitHubIcon, LinkedIn } from '~/components/icons'

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

type ExperienceArea = {
  name: string
  dates?: string
  bullets: string[]
}

type ExperienceEntry = {
  company: string
  role: string
  dates: string
  location?: string
  intro?: string
  areas?: ExperienceArea[]
  bullets?: string[]
}

const workAreas = [
  {
    name: 'Full-stack product engineering',
    details:
      'React and TypeScript on the frontend; Node.js, Go, Java, SQL, and APIs on the backend.',
  },
  {
    name: 'Architecture & technical leadership',
    details:
      'System design, modernization, architectural decisions, mentoring, and technical direction while remaining hands-on.',
  },
  {
    name: 'High-scale product systems',
    details:
      'Experience across Shopify Checkout, fintech, travel, healthcare systems, and other production systems with significant operational requirements.',
  },
  {
    name: 'Developer platforms & AI',
    details:
      "Built and operated internal & external developer tooling, including Shopify's internal AI chat platform used by thousands of employees.",
  },
]

const selectedProjects = [
  {
    name: 'Portaler',
    subtitle: 'Real-time collaborative mapping platform for Albion Online',
    githubUrl: 'https://github.com/mawburn/portaler-core',
    metrics: [
      ['22K', 'monthly active unique users'],
      ['15M', 'API requests'],
      ['75K', 'Discord roles monitored'],
      ['~$30/mo', 'Hetzner production server'],
    ],
    technologies: ['TypeScript', 'React', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker'],
  },
]

const experience: ExperienceEntry[] = [
  {
    company: 'Shopify',
    role: 'Senior Software Engineer',
    dates: 'April 2021 – August 2026',
    intro:
      'Product and platform engineering across Shopify Checkout, Checkout Extensibility, and internal AI developer tooling at Shopify scale.',
    areas: [
      {
        name: 'Dev AI / Augmented Engineering',
        dates: 'March 2025 – August 2026',
        bullets: [
          'Launched, built, operated, and evolved an internal AI chat and developer platform used in the daily workflows of thousands of Shopify employees.',
          'Built production developer infrastructure around LLMs: full-stack React/TypeScript application work, a Node.js backend, LLM integrations, internal APIs, and developer-oriented workflows.',
          'Designed and implemented AI-assisted engineering capabilities intended to make AI useful inside real software-development workflows rather than functioning as a generic chat interface.',
          'Built integrations between the AI platform and Shopify internal systems, working across frontend/backend boundaries, application architecture, deployment, reliability, and developer experience.',
          'Contributed technically as the platform grew from an early internal tool into a broadly adopted product and helped shape the emerging Augmented Engineering function.',
        ],
      },
      {
        name: 'Checkout / Checkout Extensibility',
        dates: 'April 2021 – March 2025',
        bullets: [
          'Worked on Checkout Extensibility systems that enable merchants and developers to customize Shopify Checkout, a business-critical surface whose resulting checkout experiences are seen by hundreds of millions of people.',
          'Served as a key engineer on the initial Checkout Editor team, contributing to system design, application architecture, frontend architecture, data flows, API integration, developer interfaces, and core technical decisions.',
          'Built complex merchant-facing Checkout Editor behavior with React and TypeScript while working across the editor UI, application data, backend/platform capabilities, APIs, and checkout extensibility systems.',
          'Worked with internal-facing GraphQL APIs, application data contracts, platform services, and integration points connecting product UI to the underlying checkout platform.',
          'Designed and implemented the original secure tracking-script injection architecture for Checkout Editor, enabling extensibility while isolating checkout from malicious or unsafe code.',
          'Integrated checkout extensibility work with major Shopify systems including Shop Pay, Customer Accounts, and other checkout/platform teams, balancing system boundaries, compatibility, security, and cross-product behavior.',
        ],
      },
    ],
  },
  {
    company: 'Red Ventures',
    role: 'Senior Software Engineer / Technical Lead',
    dates: 'March 2018 – April 2021',
    intro:
      'Hands-on technical lead and senior engineer across travel-product modernization, full-stack web applications, and backend data/event systems.',
    areas: [
      {
        name: 'ExpertFlyer / The Points Guy Travel',
        bullets: [
          'Led the engineering effort to re-architect ExpertFlyer after it became part of The Points Guy / Red Ventures travel organization, while continuing to write production code.',
          'Helped define the new architecture, break apart and replace legacy functionality, determine implementation approaches, mentor engineers, and build rapid proofs of concept for technical evaluation.',
          'Built Go backend services, REST APIs, business logic, application workflows, and integrations as the primary backend foundation for the new ExpertFlyer architecture.',
          'Designed Go services and REST APIs that integrated with the existing legacy Java Struts application during the ExpertFlyer modernization without working on the Struts application itself.',
          'Contributed to the modern full-stack application using React and TypeScript alongside the Go backend architecture.',
        ],
      },
      {
        name: 'CreditCards.com',
        bullets: [
          'Helped build and launch an advertising/customer-facing portal using React, TypeScript, and Node.js.',
          'Built separate Java backend functionality for event tracking and data processing, consolidating user/event information into shared ETL-style data flows after acquisitions within Red Ventures.',
        ],
      },
    ],
  },
  {
    company: 'ABC Financial Services',
    role: 'Senior Software Engineer',
    dates: 'September 2016 – March 2018',
    bullets: [
      'Worked on a greenfield full-stack platform with React, TypeScript/JavaScript, Node.js, Java/Spring, PostgreSQL, SQL, REST APIs, and AWS-hosted production systems.',
      'Built user-facing React functionality and Node.js service-layer code connecting frontend behavior to backend services, APIs, business logic, and PostgreSQL-backed data.',
      'Contributed to application architecture, API design, relational data modeling/data flows, backend integration, and product/technical strategy.',
      'Worked across Java/Spring services and cloud-hosted infrastructure where appropriate while maintaining substantial hands-on full-stack ownership.',
    ],
  },
  {
    company: 'Arkansas Blue Cross Blue Shield',
    role: 'Systems Analyst Programmer III',
    dates: 'October 2013 – September 2016',
    bullets: [
      'Built and modernized a critical database-backed healthcare application used daily by medical facilities across Arkansas and designed to support thousands of users.',
      'Delivered substantial feature development, performance improvements, usability improvements, architecture work, application/data integration, and SQL/database development.',
      'Worked on complex healthcare workflows and production reliability for software depended upon by real healthcare organizations.',
      'Took on increasing technical responsibility over time, including mentoring junior developers and improving existing enterprise systems rather than simply maintaining them.',
    ],
  },
  {
    company: 'Baptist Health',
    role: 'Web Analyst',
    dates: 'January 2012 – October 2013',
    bullets: [
      'Developed an internal full-stack hospital application suite with authentication, single sign-on, configurable user roles, granular permissions, database-backed workflows, and internal web interfaces.',
      'Helped migrate important hospital workflows from mainframe-based processes into modern web applications across application logic, relational data, workflow design, and hospital-process integration.',
      'Maintained and supported more than 12 additional applications and databases while building and modernizing core hospital systems.',
    ],
  },
  {
    company: 'Acxiom',
    role: 'Configuration Management Intern',
    dates: 'May 2011 – August 2011',
    location: 'Conway, Arkansas',
    bullets: [
      'Automated categorization and documentation of large enterprise folder structures using Perl within an established configuration-management environment.',
      'Worked with Subversion and enterprise development processes while building scripts that traversed filesystem structures, categorized existing content, and reduced manual inspection/documentation work.',
    ],
  },
]

const militaryService = {
  organization: 'U.S. Army National Guard — 39th Infantry Brigade Combat Team',
  dates: 'April 2004 – April 2011',
  details:
    'Seven years of service while completing school and beginning my technical career, including a deployment in support of Operation Iraqi Freedom.',
  roles:
    'Trained or served across several specialties as responsibilities changed, including 25B Information Technology Specialist / Information Systems Operator-Analyst, 25F Network Switching Systems Operator-Maintainer, 11B Infantryman, 88M Motor Transport Operator, and 92Y Unit Supply Specialist.',
  bullets: [
    'Performed military IT and communications-systems work involving deployment, installation, operation, troubleshooting, and maintenance of information systems, network/communications equipment, and telecommunications information-management processes.',
    'Documented technical procedures and requirements, prepared reports and system-related documentation, and helped coordinate technical and operational tasks.',
    'Developed early leadership and operational skills through task delegation, training other soldiers, planning and executing assigned tasks, adapting to changing requirements, ROTC participation, and military leadership training.',
  ],
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
  return (
    <div className="min-h-screen bg-white dark:bg-[oklch(25%_0.015_260)] transition-colors flex flex-col">
      <main className="container mx-auto max-w-4xl px-4 py-10 font-['Source_Sans_3'] text-gray-900 dark:text-gray-100">
        <header className="mb-14">
          <h1 className="mb-4 font-['Source_Serif_4'] text-4xl font-bold tracking-tight text-gray-950 dark:text-white md:text-6xl">
            Matt Burnett
          </h1>
          <p className="mb-5 text-2xl font-bold text-cyan-700 dark:text-cyan-300">
            Senior / Staff Software Engineer
          </p>
          <p className="max-w-3xl text-xl leading-relaxed text-gray-700 dark:text-gray-300">
            Nearly 15 years building full-stack products and high-scale systems. Former Shopify
            Senior Engineer with deep TypeScript, React, and Node.js experience, plus Go, SQL,
            GraphQL, Java, AWS, and GCP.
          </p>
          <p className="mt-5 max-w-3xl text-gray-600 dark:text-gray-400">
            Portland, Oregon · Senior/Staff IC roles · Full-stack · Architecture · Developer
            Platforms
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm font-bold">
            <a
              href="https://www.linkedin.com/in/burnettmatt/"
              className="inline-flex items-center gap-2 text-fuchsia-700 underline-offset-4 hover:underline dark:text-fuchsia-300"
            >
              <LinkedIn size={18} />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/mawburn"
              className="inline-flex items-center gap-2 text-fuchsia-700 underline-offset-4 hover:underline dark:text-fuchsia-300"
            >
              <GitHubIcon size={18} />
              <span>GitHub</span>
            </a>
            <a
              href="mailto:mawburn7@gmail.com"
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
                  Docker deployment, and production infrastructure for real-time collaborative
                  mapping and data sharing.
                </p>
                <p>
                  The production system ran on a roughly <strong>$30/month Hetzner server</strong>{' '}
                  and typically consumed only <strong>5–10% of available resources</strong>, leaving
                  substantial headroom despite meaningful production traffic.
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
  )
}
