import {
  AnimatedXTwitterIcon,
  Bluesky,
  EmailIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedIn,
} from '~/components/icons'
import { ScrollArrow } from '~/components/ScrollArrow'

export function Welcome() {
  return (
    <main className="flex flex-col flex-1">
      <div className="flex-1"></div>
      <div className="flex flex-col items-center justify-center gap-4 min-h-screen">
        <div className="contents">
          <h1 className="outrun tracking-widest text-center text-6xl neon-gradient p-2 will-change-transform main-heading">
            Matt Burnett
          </h1>
          <h2 className="fancyText tracking-wide text-center text-4xl p-2">
            Senior / Staff Software Engineer
          </h2>
          <p className="text-sm text-gray-400">(he/him)</p>
        </div>
      </div>
      <section
        id="what-i-do"
        className="mx-auto mt-32 py-16 px-6 md:px-0 max-w-[80ch] gap-8 flex flex-col scroll-mt-12"
      >
        <h2 className="fancyText tracking-widest text-5xl font-bold text-center">What I do...</h2>
        <p className="text-lg">
          I'm a Senior/Staff-level software engineer with nearly 15 years of experience building
          full-stack products and high-scale systems. I spent more than five years at Shopify
          working on Checkout Extensibility and internal developer AI tooling.
        </p>
        <p className="text-lg">
          I work primarily with TypeScript, React, and Node.js, with additional experience across
          Go, Java, SQL, cloud infrastructure, software architecture, and technical leadership.
        </p>
        <p className="text-lg">
          I'm currently exploring Senior and Staff individual-contributor software engineering
          roles.
        </p>
      </section>
      <section className="mx-auto my-16 py-16 max-w-[80ch] gap-8 flex flex-col">
        <h2 className="fancyText tracking-widest text-5xl font-bold text-center">Get in touch</h2>
        <div className="flex flex-wrap gap-8 justify-center">
          {resources.map(resource => (
            <a
              href={resource.href}
              key={resource.text}
              className="flex flex-col items-center gap-2 text-white"
            >
              {resource.icon}
              <span className="text-xs">{resource.text}</span>
            </a>
          ))}
        </div>
      </section>
      <ScrollArrow targetId="what-i-do" />
    </main>
  )
}

const resources = [
  {
    href: 'https://www.linkedin.com/in/burnettmatt/',
    text: 'LinkedIn',
    icon: <LinkedIn />,
  },
  {
    href: 'https://github.com/mawburn',
    text: 'GitHub',
    icon: <GitHubIcon />,
  },
  {
    href: 'https://github.com/mawburn',
    text: 'Instagram',
    icon: <InstagramIcon />,
  },
  {
    href: 'https://bsky.app/profile/mawburn.com',
    text: 'Bluesky',
    icon: <Bluesky />,
  },
  {
    href: 'https://x.com/_mawburn',
    text: 'Twitter/X',
    icon: <AnimatedXTwitterIcon />,
  },
  {
    href: 'mailto:mawburn7@gmail.com',
    text: 'Email',
    icon: <EmailIcon />,
  },
]
