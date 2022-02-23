import Head from 'next/head'
import Image from 'next/image'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import config from '../../lib/config'
import styles from '../../styles/util.module.scss'

const TheGameTools = () => (
  <div className={styles.container}>
    <Head>
      <title>TheGame.Tools - Projects - {config.title}</title>
    </Head>

    <Header />

    <main className={styles.main}>
      <section>
        <h2>TheGame.Tools</h2>
        <div className={styles.center}>
          <Image src="/img/thegametools.svg" width={71} height={100} alt="TheGame.Tools" />
        </div>
        <h3>
          <a href="https://thegame.tools" target="_new">
            Go to the TheGame.Tools
          </a>
        </h3>
        <p>
          I tend to make random tools for the games I play, but have just thrown them in random
          places in the past. So, I figured I would put them all under one roof. The idea is that
          the game name comes first, followed by “TheGame.Tools”.
        </p>
        <hr />
        <p>
          The first is for a TTRPG game called <strong>Fluxfall Horizon</strong>. It’s mostly just a
          bunch of roll-tables, but you can find it at{' '}
          <a href="https://fluxfall.thegame.tools" target="_new">
            Fluxfall.TheGame.Tools
          </a>
          .
        </p>
      </section>
    </main>
    <Footer />
  </div>
)

export default TheGameTools
