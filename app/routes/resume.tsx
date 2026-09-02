import { Footer } from '~/components/Footer'

import type { Route } from './+types/resume'

export const links: Route.LinksFunction = () => [
  {
    rel: 'canonical',
    href: 'https://mawburn.com/resume',
  },
]

export function meta() {
  const description =
    'Resume for Matt Burnett, a senior software engineer with 14+ years of full-stack, product, platform, and AI developer-infrastructure experience.'

  return [
    { title: 'Resume | Matt Burnett' },
    { name: 'description', content: description },
    {
      name: 'keywords',
      content:
        'Matt Burnett Resume, Senior Software Engineer, Staff Software Engineer, Shopify, React, TypeScript, Node.js, Go, Java, GraphQL, REST APIs, PostgreSQL, AI Developer Tools, Platform Engineering',
    },
    { property: 'og:type', content: 'profile' },
    { property: 'og:title', content: 'Resume | Matt Burnett' },
    { property: 'og:description', content: description },
    { property: 'og:url', content: 'https://mawburn.com/resume' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: 'Resume | Matt Burnett' },
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

const skillGroups = [
  ['Frontend', 'React, TypeScript, JavaScript, frontend architecture, application state/data flows'],
  ['Backend', 'Node.js, Go, Java, Spring, REST APIs, business logic, service integration'],
  ['APIs & data', 'GraphQL, internal APIs, developer-facing interfaces, PostgreSQL, SQL, RDBMS'],
  ['Platform', 'Checkout extensibility, developer tooling, AI/LLM integrations, AWS, GCP, Docker'],
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
          'Helped launch, build, operate, and evolve an internal AI chat and developer platform used in the daily workflows of thousands of Shopify employees.',
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
      <h2 className="text-3xl font-bold text-gray-950 dark:text-white">{children}</h2>
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
      <main className="container mx-auto max-w-5xl px-4 py-10 text-gray-900 dark:text-gray-100">
        <header className="mb-14">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-fuchsia-600 dark:text-fuchsia-400">
            Resume
          </p>
          <h1 className="mb-5 text-4xl font-bold tracking-tight text-gray-950 dark:text-white md:text-6xl">
            Matt Burnett
          </h1>
          <p className="max-w-3xl text-xl leading-relaxed text-gray-700 dark:text-gray-300">
            Senior software engineer with 14+ years of professional experience across full-stack web
            engineering, product/platform systems, API and data architecture, technical leadership,
            and production AI developer infrastructure.
          </p>
        </header>

        <section className="mb-16 rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900/40">
          <h2 className="mb-5 text-2xl font-bold text-gray-950 dark:text-white">Technical profile</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {skillGroups.map(([label, skills]) => (
              <div key={label}>
                <h3 className="font-bold text-cyan-700 dark:text-cyan-300">{label}</h3>
                <p className="mt-1 text-gray-700 dark:text-gray-300">{skills}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading>Experience</SectionHeading>
          <div className="space-y-12">
            {experience.map(job => (
              <article key={job.company} className="border-b border-gray-200 pb-12 last:border-b-0 dark:border-gray-700">
                <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-950 dark:text-white">{job.company}</h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300">{job.role}</p>
                    {job.location && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">{job.location}</p>
                    )}
                  </div>
                  <p className="font-medium text-gray-600 dark:text-gray-400">{job.dates}</p>
                </div>
                {job.intro && <p className="mb-6 max-w-3xl text-gray-700 dark:text-gray-300">{job.intro}</p>}

                {job.areas ? (
                  <div className="space-y-8">
                    {job.areas.map(area => (
                      <section key={area.name}>
                        <div className="mb-3 flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                          <h4 className="text-xl font-bold text-cyan-700 dark:text-cyan-300">{area.name}</h4>
                          {area.dates && (
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{area.dates}</p>
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
              <p className="font-medium text-gray-600 dark:text-gray-400">{militaryService.dates}</p>
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
