import Head from 'next/head'
import Image from 'next/image'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import config from '../../lib/config'
import styles from '../../styles/util.module.scss'

const TabletopLand = () => (
  <div className={styles.container}>
    <Head>
      <title>Tabletop.Land - Projects - {config.title}</title>
    </Head>
    <Header />
    <main className={styles.main}>
      <section>
        <h2>Tabletop.Land - online vendor marketplace</h2>
        <div className={styles.center}>
          <a href="https://tabletop.land/" rel="noopener">
            <Image src="/img/tabletopland.webp" width={100} height={100} alt="Tabletop.Land" />
          </a>
        </div>
        <div className={styles.subTitle}>
          <a href="https://tabletop.land/" rel="noopener">
            Tabletop.Land
          </a>
        </div>
        <p>
          Tabletop.Land is a real business filed under HypnoCode Productions LLC, which started as
          just an LLC I got to protect myself with my various online ventures. We opened up shop
          November 22, 2021.
        </p>
        <p>
          The site specializes in handmade tabletop terrain &amp; miniatures that are used in
          Tabletop RPGs, Wargaming, &amp; other scale modeling. In a sense, it is very similar to
          Etsy, but specifically targeted at our small niche. I am sole owner, but my wife helps me
          out &amp; it is a full time job for her. She makes some products, but mostly handles the
          online orders, transactions, &amp; other administrative stuff. For me it is a part-time
          gig, since I have a full time job.
        </p>
        <p>
          It is build on the{' '}
          <span className={styles.nobreak}>
            <span className="icon-shopify" />{' '}
            <a href="https://shopify.com/" rel="noopener nofollow">
              Shopify
            </a>
          </span>{' '}
          platform. As of this writing, it uses a 3rd party plugin to manage the multi-vendor
          marketplace, but hopefully I will have a better solution for that developed soon.
        </p>
      </section>
    </main>
    <Footer />
  </div>
)

export default TabletopLand