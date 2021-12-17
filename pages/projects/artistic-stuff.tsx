import Head from 'next/head'
import Image from 'next/image'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

import config from '../../lib/config'
import styles from '../../styles/util.module.scss'

const ArtisticStuff = () => (
  <div className={styles.container}>
    <Head>
      <title>Artistic Stuff - Projects - {config.title}</title>
    </Head>
    <Header />
    <main className={styles.main}>
      <section>
        <h2>My artistic stuff</h2>
        <p>
          I’m no artist, but I have an artistic side. Most of which you can find on{' '}
          <a href="https://www.instagram.com/_mawburn/">Instagram</a> or the{' '}
          <a href="https://www.instagram.com/tabletopland/">Tabletop.Land Instagram</a>. But, I like
          to make logos too which include the Agents of Syn, Tabletop.Land, &amp; CLTRPG.com logos.
        </p>
        <p>
          I may fill this space with a list of some pictures, but for now you’ll just have to check
          out my other links.
        </p>
      </section>
    </main>
    <Footer />
  </div>
)

export default ArtisticStuff
