import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
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
      <section>
        <h2>Logos</h2>
        <p>
          I’ve also done a few logos, mostly for my personal stuff but some for others. Here are
          some of them:
        </p>
        <div className={styles.images}>
          <figure>
            <Image src="/img/cltrpg.png" width="150" height="150" loading="lazy" alt="cltrpg.com" />
            <figcaption>
              <a href="https://cltrpg.com" rel="noopener">
                CLTRPG.com
              </a>
              <br />
              (mine)
            </figcaption>
          </figure>
          <figure>
            <Image
              src="/img/tabletopland.png"
              width="150"
              height="150"
              loading="lazy"
              alt="tabletop.land"
            />
            <figcaption>
              <a href="https://tabletop.land" rel="noopener">
                Tabletop.Land
              </a>
              <br />
              (mine)
            </figcaption>
          </figure>
          <figure>
            <Image src="/img/aos.png" width="150" height="150" loading="lazy" alt="agents of syn" />
            <figcaption>
              <Link href="/projects/agents-of-syn">Agents of Syn</Link>
              <br />
              (mine)
            </figcaption>
          </figure>
          <figure>
            <div>
              <Image
                src="/img/savageinterludes.png"
                width="150"
                height="150"
                loading="lazy"
                alt="savage interludes"
              />
            </div>
            <figcaption>
              <a href="https://savageinterludes.com/" rel="noopener">
                Savage Interludes Podcast
              </a>
              <br />
              (not mine)
            </figcaption>
          </figure>
          <figure>
            <Image src="/img/portaler.png" width="150" height="150" loading="lazy" alt="portaler" />
            <figcaption>
              <Link href="/projects/portaler">Portaler</Link>
              <br />
              (mine)
            </figcaption>
          </figure>
        </div>
      </section>
    </main>
    <Footer />
  </div>
)

export default ArtisticStuff
