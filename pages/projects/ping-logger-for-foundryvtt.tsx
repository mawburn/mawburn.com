import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import config from '../../lib/config'
import styles from '../../styles/util.module.scss'

const PingLogger = () => (
  <div className={styles.container}>
    <Head>
      <title>Ping Logger - Projects - {config.title}</title>
    </Head>

    <Header />

    <main className={styles.main}>
      <section>
        <h2>Ping Logger for FoundryVTT</h2>
        <div className={styles.center}>
          <Image src="/img/foundryvtt.webp" width={128} height={128} alt="FoundryVTT" />
        </div>
        <p>
          There is really nothing to this. It just asks the Foundry server for the time via
          websockets &amp; calculates the user’s average latency then displays it in the list. But{' '}
          <a
            href="https://tooomm.github.io/github-release-stats/?username=mawburn&repository=foundry-ping-logger"
            rel="noopener nofollow"
          >
            it is pretty popular based on the GitHub download stats
          </a>
          . It started out as just a fork because the module was broken, but it was using http
          requests that have extra overhead &amp; one thing lead to another &amp; 💥 I created my
          own entire version of it.
        </p>
        <hr />
        <div>
          You can find the source code here:{' '}
          <a href="https://github.com/mawburn/foundry-ping-logger" rel="noopener">
            github.com/mawburn/foundry-ping-logger
          </a>
        </div>
        <hr />
        <div>
          And the FoundryVTT directory listing here:{' '}
          <a href="https://foundryvtt.com/packages/ping-logger/" rel="noopener">
            foundryvtt.com/packages/ping-logger
          </a>
        </div>
      </section>
    </main>
    <Footer />
  </div>
)

export default PingLogger
