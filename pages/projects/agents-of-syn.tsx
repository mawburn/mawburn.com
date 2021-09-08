import clsx from 'clsx'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import config from '../../lib/config'
import styles from '../../styles/util.module.scss'

const AgentsOfSyn = () => (
  <div className={styles.container}>
    <Head>
      <title>Agents of Syn - Projects - {config.title}</title>
    </Head>

    <Header />

    <main className={styles.main}>
      <section>
        <h2>Agents of Syn</h2>
        <div className={styles.center}>
          <Image src="/img/aos.webp" width={128} height={128} alt="Agents of Syn" />
        </div>
        <p>
          <a href="https://agentsofsyn.com/" rel="noopener">
            AgentsOfSyn.com
          </a>{' '}
          is a “Living World” or “West Marches” style Tabletop Role-playing Game campaign, I explain
          more about what these things are{' '}
          <a href="https://agentsofsyn.com/about#tabletop-rpg-living-world" rel="noopener">
            the website
          </a>
          . It’s ran totally online with an online community that exists mostly on Discord.
        </p>
        <p>
          The setting is based on the generic roleplaying system{' '}
          <a href="https://amzn.to/3zQcRKT" rel="noopener nofollow">
            Savage Worlds
          </a>{' '}
          in the setting of{' '}
          <a
            href="https://www.drivethrurpg.com/product/254714/Crystal-Heart-Starter-Set?affiliate_id=2703170"
            rel="noopener"
          >
            Crystal Heart
          </a>
          . It’s a fantastic setting that mixes a lot of different genres together. It’s based on a
          web comic series of the same name on the website{' '}
          <a href="https://www.uptofourplayers.com/">UpToFourPlayers.com</a>, where the characters
          in the comic are playing in the world of Crystal Heart.
        </p>
        <h2>Work put in to it</h2>
        <p>
          This is half community, half tech. Although I don’t have the tech open sourced, there is a
          good bit going on behind the scenes. We have a{' '}
          <span className={styles.nobreak}>
            <a href="https://reddit.com/r/AgentsOfSyn" rel="noopener">
              <span className="icon-reddit" /> r/AgentsOfSyn Subreddit
            </a>
            ,
          </span>
          but that isn’t very active. The Discord community is slightly active, but I’m having fun
          running it &amp; getting people together.
        </p>
        <p>
          On the website, you can log in if you’re a member of our Discord server which will allow
          you to see a list of the known crystals we have found. The site was my first{' '}
          <span className="icon-nextjs" /> NextJS site &amp; uses that for the login. However,
          working on other things like a character creator have proved to be a bit of a learning
          curve, but I worked through them &amp; now I just need to finish it.
        </p>
        <p>
          I also get to GM games when I have the time &amp; write the world. As of this writing, we
          are going through a big shift to make the living world more plausible... which is a lot of
          fun.
        </p>
        <h2>Foundry</h2>
        <div className={styles.center}>
          <Image src="/img/foundryvtt.webp" width={128} height={128} alt="Agents of Syn" />
        </div>
        <p>
          <a href="https://foundryvtt.com/" rel="noopener">
            FoundryVTT
          </a>{' '}
          is the Virtual Tabletop we use to run our games. I host 3 instances of this concurrently
          on my server &amp; have built a little infrastructure around that to clone worlds &amp;
          allow other GMs to have access to things. I eventually want to incorporate this into the
          website. However, I do have another project that is a Foundry plugin called{' '}
          <Link href="/projects/ping-logger-for-foundryvtt">Ping Logger</Link>, but it’s very very
          simple. Maybe I’ll make more in the future. I did start on a Crystal Heart character sheet
          using Svelte. 🤔
        </p>
      </section>
    </main>
    <Footer />
  </div>
)

export default AgentsOfSyn
