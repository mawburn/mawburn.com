import { BranchHeader } from '~/components/BranchHeader'
import {
  Bluesky,
  EmailIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedIn,
  RedditIcon,
} from '~/components/icons'
import { PortlandTime } from '~/components/PortlandTime'
import { resumeProfile } from '~/data/resume'
import { cachePolicies, routeCacheHeaders } from '~/utils/cache'
import { canonicalLink, pageMeta, SITE_URL } from '~/utils/seo'
import { generateBreadcrumbStructuredData } from '~/utils/structuredData'

import type { Route } from './+types/contact'

export const links: Route.LinksFunction = () => [canonicalLink('/contact')]

export function meta() {
  return pageMeta({
    title: 'Contact | Matt Burnett',
    description:
      'Get in touch with Matt Burnett, a Senior / Staff Software Engineer in Portland, Oregon. Email, GitHub, LinkedIn, Instagram, Reddit and Bluesky.',
    path: '/contact',
  })
}

export function headers({ parentHeaders }: Route.HeadersArgs) {
  return routeCacheHeaders(parentHeaders, cachePolicies.page)
}

const channels = [
  {
    label: 'Email',
    Icon: EmailIcon,
    value: resumeProfile.email,
    note: 'Direct inbox',
    href: `mailto:${resumeProfile.email}`,
    external: false,
    hover: 'hover:border-moss-bright',
    labelColor: 'text-moss-bright',
  },
  {
    label: 'LinkedIn',
    Icon: LinkedIn,
    value: 'in/burnettmatt',
    note: 'Professional profile',
    href: 'https://www.linkedin.com/in/burnettmatt/',
    external: true,
    hover: 'hover:border-mist-fog',
    labelColor: 'text-mist-light',
  },
  {
    label: 'GitHub',
    Icon: GitHubIcon,
    value: 'mawburn',
    note: 'Code & projects',
    href: 'https://github.com/mawburn',
    external: true,
    hover: 'hover:border-moss-bright',
    labelColor: 'text-text-muted',
  },
  {
    label: 'Bluesky',
    Icon: Bluesky,
    value: '@mawburn.com',
    note: 'Posts & short notes',
    href: 'https://bsky.app/profile/mawburn.com',
    external: true,
    hover: 'hover:border-mist-fog',
    labelColor: 'text-mist-light',
  },
  {
    label: 'Reddit',
    Icon: RedditIcon,
    value: 'u/_mawburn',
    note: 'Reddit profile',
    href: 'https://www.reddit.com/user/_mawburn',
    external: true,
    hover: 'hover:border-[#FF4500]',
    labelColor: 'text-[#ff7a45]',
  },
  {
    label: 'Instagram',
    Icon: InstagramIcon,
    value: '@_mawburn',
    note: 'Photos',
    href: 'https://www.instagram.com/_mawburn',
    external: true,
    hover: 'hover:border-mist-fog',
    labelColor: 'text-mist-light',
  },
] as const

export default function Contact() {
  const breadcrumbs = generateBreadcrumbStructuredData([
    { name: 'Home', url: SITE_URL },
    { name: 'Contact' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <BranchHeader
        eyebrow="Portland, Oregon · Senior / Staff Software Engineer"
        title="Get in touch"
      >
        <p className="max-w-xl text-base leading-relaxed text-text-muted">
          I&rsquo;m always glad to talk with other engineers and engineering leads. Whether you have
          a role in mind or just want to chat about tech or game systems, feel free to reach out.
        </p>
      </BranchHeader>

      <div className="mx-auto w-full max-w-[880px] flex-1 space-y-8 px-6 py-10">
        <section aria-labelledby="channels">
          <h2 id="channels" className="sr-only">
            Ways to reach me
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {channels.map(channel => (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`group block h-full rounded-lg border border-border-subtle bg-surface-dark p-5 shadow-sm transition-colors hover:bg-surface-card ${channel.hover}`}
                >
                  <span
                    className={`flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider ${channel.labelColor}`}
                  >
                    <channel.Icon size={16} />
                    {channel.label}
                  </span>
                  <span className="block break-words text-base font-bold text-text-primary">
                    {channel.value}
                  </span>
                  <span className="mt-0.5 block text-sm text-text-muted">{channel.note}</span>
                  {channel.external ? <span className="sr-only">(opens in a new tab)</span> : null}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="flex flex-col gap-2 rounded-lg border border-border-subtle bg-surface-dark p-5 text-sm sm:flex-row sm:items-center sm:justify-between"
          aria-labelledby="availability"
        >
          <h2 id="availability" className="sr-only">
            Location
          </h2>
          <p className="flex items-center gap-2 text-text-primary">
            <span
              className="h-2.5 w-2.5 rounded-full bg-moss-bright shadow-[0_0_8px_#34D399]"
              aria-hidden="true"
            />
            Portland, Oregon &middot; current time <PortlandTime />
          </p>
        </section>
      </div>
    </>
  )
}
