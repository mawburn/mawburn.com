import clsx from 'clsx'
import Head from 'next/head'
import Image from 'next/image'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import config from '../../lib/config'
import styles from '../../styles/util.module.scss'

export interface PortalerProps {
  online?: string
  total?: string
}

const Portaler = ({ online, total }: PortalerProps) => (
  <div className={styles.container}>
    <Head>
      <title>Portaler - Projects - {config.title}</title>
    </Head>
    <Header />

    <main className={styles.main}>
      <section>
        <h2>An overview of Portaler</h2>
        <div className={clsx(styles.center, styles.imgRounder)}>
          <Image src="/img/portalerlogo.webp" width={300} height={114} alt="Portaler Logo" />
        </div>
        <p>
          You can find the main website at{' '}
          <a href="https://portaler.zone" rel="noopener">
            Portaler.zone
          </a>
          , but that is there mostly for SEO purposes &amp; to have a landing page. You can find a
          demo of it on the{' '}
          <a href="https://public.portaler.zone" rel="noopener">
            public map
          </a>
          , which I can’t garuntee will have any connections. You can join the{' '}
          <span className={styles.nobreak}>
            <a href="https://discord.gg/W2NteY4dDS" rel="noopener nofollow">
              <span className="icon-discord" /> Discord
            </a>
          </span>
          server &amp; make your own if you’d like.
        </p>
        <p>
          The project is Open Source which you can find on{' '}
          <span className={styles.nobreak}>
            <span className="icon-github" />{' '}
            <a href="https://github.com/Portaler-Zone/portaler-core">GitHub</a>.
          </span>
          It’s currently looking for contributors as I don’t really play the game as much as I used
          to.
        </p>
        {online && total && (
          <>
            <p>
              The Discord server has quite a few people, which I manage myself, but it’s not hard or
              time consuming.
            </p>
            <h3>Current Live Discord Stats</h3>
            <div className={styles.discordUsers}>
              <div>
                <strong>Online:</strong> <span>{online}</span>
              </div>
              <div>
                <strong>Total:</strong> <span>{total}</span>
              </div>
            </div>
          </>
        )}
        <h2>What is it?</h2>
        <p>
          Portaler is a mult-tenant collaborative mapping tool for{' '}
          <a href="https://albiononline.com/">Albion Online</a>, that allows users to create private
          maps for their guilds. Albion Online is a heavy focused on Player <em>vs</em> Player
          combat, with full loot &amp; territory control.
        </p>
        <p>
          In 2020, Albion Online introduced “portals” that are randomly spawned gateways to
          “Avalonian Roads” which have even more connections. These connections only last a certain
          amount of time then vanish. Portaler helps guilds or groups of players manage maps of
          their current connections. It is mostly geared towards guilds who make their home base
          inside of the roads &amp; need a constant, readily available, map to be able to navigate
          correctly. However, it’s used by many other players as well.
        </p>
        <h2>Userbase</h2>
        <p>
          According to{' '}
          <span className={styles.nobreak}>
            <span className="icon-cloudflare" /> Cloudflare
          </span>{' '}
          metrics, I receive about 19,000 to 21,000 Monthly Active Users &amp; according to{' '}
          <span className={styles.nobreak}>
            <span className="icon-discord" /> Discord
          </span>
          the bot that provides Authentication is installed on about 400 servers.
        </p>
        <p>
          The whole suite of services runs on less than 2gb of memory &amp; barely uses any
          processor. The entire codebase is written in{' '}
          <span className={styles.nobreak}>
            <span className="icon-typescript" /> TypeScript,
          </span>
          including the{' '}
          <span className={styles.nobreak}>
            <span className="icon-nodejs" /> NodeJS
          </span>
          portions of the service. It relies on a{' '}
          <span className={styles.nobreak}>
            <span className="icon-postgresql" /> PostgreSQL
          </span>
          database for persistent storage &amp;{' '}
          <span className={styles.nobreak}>
            <span className="icon-redis" /> Redis
          </span>
          for caching. Albion Online has no API, so authentication is provided through Discord
          Roles, which require a bot to be installed on the user’s server to gain visibility into
          the users’ role.
        </p>
        <p>
          Overall, I’d say it’s not my best project code wise, but it runs well, scales well, &amp;
          working in the codebase isn’t too challenging. It was originally started to just play
          around with using Redux hooks, which were new at the time. Then it kind of blew up. 🤣
        </p>
        <h2>Income? lol no</h2>
        <p>
          I don’t make any income from the app, despite the user base. I messed up a little bit
          &amp; gave each individual server a subdomain, which I thought was cool, but bit me in the
          ass when it comes to advertising. What I do make comes from generous users donating to my
          small{' '}
          <span className={styles.nobreak}>
            <a href="https://www.patreon.com/bePatron?u=30652180" rel="noopener">
              <span className="icon-patreon" /> Patreon
            </a>
          </span>
          &amp;{' '}
          <span className={styles.nobreak}>
            <a href="https://ko-fi.com/mawburn" rel="noopener">
              <span className="icon-ko-fi" /> Ko-Fi.
            </a>
          </span>
          But it barely pays for the server cost, which admittedly is hosted on a lot more hardware
          than I need. I can say though, that the community generated around the app has surprised
          the hell out of me with how friendly &amp; supportive they are. They are really great!
        </p>
      </section>
    </main>
    <Footer />
  </div>
)

export async function getServerSideProps() {
  const headers = new Headers()
  headers.set('Authorization', `Bot ${process.env.BOT}`)
  const response = await fetch('https://discord.com/api/guilds/766357630154178562/preview', {
    method: 'GET',
    headers,
  })

  if (response.ok) {
    const json = await response.json()

    return {
      props: {
        online: `${json.approximate_presence_count}`,
        total: `${json.approximate_member_count}`,
      },
    }
  }

  return {
    props: {},
  }
}

export default Portaler
