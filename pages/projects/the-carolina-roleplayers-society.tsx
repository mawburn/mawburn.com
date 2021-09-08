import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import config from '../../lib/config'
import styles from '../../styles/util.module.scss'

const CLTRPG = () => (
  <div className={styles.container}>
    <Head>
      <title>CLTRPG.com - Projects - {config.title}</title>
    </Head>

    <Header />

    <main className={styles.main}>
      <section>
        <h2>The Carolina Roleplayers’ Society</h2>
        <div className={styles.center}>
          <Image src="/img/cltrpg.webp" width={128} height={128} alt="Agents of Syn" />
        </div>
        <div className={styles.subTitle}>
          <a href="https://cltrpg.com/" rel="noopener">
            CLTRPG.com
          </a>
        </div>
        <p>
          This is just a Discord group that myself &amp; some others started to build a local
          community of Game, System, &amp; Store agnostic TTRPG players. I probably wouldn’t have
          made a site for it but I noticed that{' '}
          <strong>
            <a href="https://CLTRPG.com" rel="noopener">
              CLTRPG.com
            </a>
          </strong>{' '}
          was available &amp; couldn’t pass up the opportunity! The only reason this is a{' '}
          <span className={styles.nobreak}>
            <span className="icon-nextjs" /> NextJS
          </span>
          site is to get a user count on the site. Similar to what I did over on the{' '}
          <Link href="/projects/portaler">Portaler</Link> section of this site.
        </p>
        <p>This group is growing fairly well. Hopefully we’ll be able to grow it some more.</p>
        <h3>WE EVEN HAVE STICKERS!</h3>
        <div className={styles.center}>
          <Image
            src="/img/cltrpgstickers.webp"
            width={128}
            height={128}
            alt="CLTRPG.com Stickers"
          />
        </div>
        <p>
          Again, these probably wouldn’t exist if I didn’t accidentally create a logo I’m super
          proud of. Plus... we can hand them out at events or leave them at stores.
        </p>
      </section>
    </main>
    <Footer />
  </div>
)

export default CLTRPG
