import clsx from 'clsx'
import Head from 'next/head'
import Image from 'next/image'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import config from '../../lib/config'
import styles from '../../styles/util.module.scss'

const Portaler = () => (
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
          Portaler ran for a little more than a year, it was spun down as a live service on December
          1, 2021.
        </p>
        <p>
          The project is still Open Source which you can find on{' '}
          <span className={styles.nobreak}>
            <span className="icon-github" />{' '}
            <a href="https://github.com/Portaler-Zone/portaler-core">GitHub</a>.
          </span>
          It’s currently looking for contributors as I don’t really play the game as much as I used
          to.
        </p>
        <p>
          The Discord server had quite a few people, which I managed by myself, but wasn’t hard or
          time consuming. This was the count just before I made the announcement that I was shutting
          everything down:
        </p>
        <div className={styles.center}>
          <Image
            src="/img/portaler-discord-users.webp"
            width={300}
            height={40}
            alt="portaler discord stat"
          />
        </div>
        <h2>What was it?</h2>
        <p>
          Portaler was a mult-tenant collaborative mapping tool for{' '}
          <a href="https://albiononline.com/">Albion Online</a>, that allowed users to create
          private maps for their guilds. Albion Online is a heavy focused on Player <em>vs</em>{' '}
          Player combat, with full loot, &amp; territory control.
        </p>
        <p>
          In 2020, Albion Online introduced “portals”, which were randomly spawned gateways to
          “Avalonian Roads” that had even more connections. These connections only lasted a certain
          amount of time then vanished. Portaler helps guilds or groups of players manage maps of
          their current connections. Portaler was mostly geared towards guilds who made their home
          base inside of the roads &amp; needed a constant, readily available, map to be able to
          navigate correctly. However, it was used by many other players as well.
        </p>
        <h2>Userbase</h2>
        <p>
          According to{' '}
          <span className={styles.nobreak}>
            <span className="icon-cloudflare" /> Cloudflare
          </span>{' '}
          metrics, I received about 19,000 to 21,000 Monthly Active Users &amp; according to{' '}
          <span className={styles.nobreak}>
            <span className="icon-discord" /> Discord
          </span>
          the bot that provided Authentication was installed on close to servers. This is the only
          screenshot I have, but I think it reached 490ish at one point.
        </p>
        <div className={styles.center}>
          <Image
            src="/img/portaler-discord-bot.webp"
            width={300}
            height={457}
            alt="Portaler Discord servers"
          />
        </div>
        <p>
          The whole suite of services ran on less than 2gb of memory &amp; barely used any
          processor. The entire codebase was written in{' '}
          <span className={styles.nobreak}>
            <span className="icon-typescript" /> TypeScript,
          </span>
          including the{' '}
          <span className={styles.nobreak}>
            <span className="icon-nodejs" /> NodeJS
          </span>
          portions of the service. It relied on a{' '}
          <span className={styles.nobreak}>
            <span className="icon-postgresql" /> PostgreSQL
          </span>
          database for persistent storage &amp;{' '}
          <span className={styles.nobreak}>
            <span className="icon-redis" /> Redis
          </span>
          for caching. Albion Online had no API, so authentication was provided through Discord
          Roles, which required a bot to be installed on the users’ server to gain visibility into
          the users’ role.
        </p>
        <p>
          Overall, I’d say it’s not my best project code wise, but it runs well, scales well, &amp;
          working in the codebase isn’t too challenging. It was originally started to just play
          around with using Redux hooks, which were new at the time. Then it kind of blew up. 🤣
        </p>
        <h2>Income? lol no</h2>
        <p>
          I did’t make any income from the app, despite the user base. I messed up a little bit
          &amp; gave each individual server a subdomain, which I thought was cool when I decided on
          that, but bit me in the ass when it comes to advertising. What I did make came from
          generous users donating to my small{' '}
          <span className={styles.nobreak}>
            <span className="icon-patreon" /> Patreon
          </span>
          &amp;{' '}
          <span className={styles.nobreak}>
            <span className="icon-ko-fi" /> Ko-Fi.
          </span>
          But it barely paid for the server cost, which admittedly was hosted on a lot more hardware
          than I needed. I can say though, that the community generated around the app surprised the
          hell out of me with how friendly &amp; supportive they were. They were really great &amp;
          what I miss most about the project!
        </p>
      </section>
    </main>
    <Footer />
  </div>
)

export default Portaler
