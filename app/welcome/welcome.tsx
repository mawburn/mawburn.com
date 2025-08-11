import {
  AnimatedXTwitterIcon,
  Bluesky,
  EmailIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedIn,
} from '~/components/icons'

export function Welcome() {
  return (
    <main className="flex flex-col flex-1">
      <div className="flex-1"></div>
      <div className="flex flex-col items-center justify-center gap-4 min-h-screen">
        <div className="contents">
          <h1 className="outrun tracking-widest text-center text-6xl neon-gradient p-2 will-change-transform main-heading">
            Matt Burnett
          </h1>
          <h2 className="fancyText tracking-wide text-center text-4xl p-2">Software Engineer</h2>
          <p className="text-sm text-gray-400">(he/him)</p>
        </div>
      </div>
      <section className="mx-auto mt-32 py-16 px-6 md:px-0 max-w-[80ch] gap-8 flex flex-col">
        <h2 className="fancyText tracking-widest text-5xl font-bold text-center">What I do...</h2>
        <p className="text-lg">
          I'm a software engineer with a passion for building high-performance web applications with
          modern a variety of modern tech.
        </p>
        <p className="text-lg">
          I'm currently a Senior Software Engineer at Shopify on the “Augmented Engineering” team
          helping improve DX internally. Previously at the company, I spent 4 years previous working
          on Checkout and the Checkout Editor. One of the{' '}
          <strong>
            <u>most visible</u>
          </strong>{' '}
          pieces of the Shopify platform.
        </p>
        <p className="text-lg">
          Before Shopify, I’ve worked at a variety of companies doing cool things since 2012.
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
