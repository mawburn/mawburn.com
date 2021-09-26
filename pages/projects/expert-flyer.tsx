import Head from 'next/head'
import Image from 'next/image'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import config from '../../lib/config'
import styles from '../../styles/util.module.scss'

const ExpertFlyer = () => (
  <div className={styles.container}>
    <Head>
      <title>ExpertFlyer - Projects - {config.title}</title>
    </Head>

    <Header />

    <main className={styles.main}>
      <section>
        <h2>Expert Flyer</h2>
        <div className={styles.center}>
          <Image src="/img/eflogo.png" width={68} height={75} alt="Expert Flyer" />
        </div>
        <p>
          For a good portion of my last job, I was able to lead a team tasked to rebuild &amp;
          redesign the architecture of <a href="https://expertflyer.com/">ExpertFlyer.com</a>, which
          was a property that my company bought. The original site was around 15yrs old, we totally
          rebuilt it in{' '}
          <span className={styles.nobreak}>
            <span className="icon-go" /> Go,
          </span>
          <span className={styles.nobreak}>
            <span className="icon-react" /> React,
          </span>
          &amp;{' '}
          <span className={styles.nobreak}>
            <span className="icon-typescript" /> Typescript.
          </span>
        </p>
        <p>
          The version I was working on wasn’t fully launched when I left the company, but it was
          very near completion. I can not speak to what happened to it after I left, but we put a
          great deal of time into making it very fast, responsive, &amp; everything you’d expect
          from a modern web application.
        </p>
        <p>
          However, we did launch an Open Beta as part of a partnership with American Express &amp;
          Hilton while I was there. You can read about it on{' '}
          <span className={styles.nobreak}>
            <a
              href="https://thepointsguy.com/news/hilton-card-expertflyer-offer/"
              rel="noopener nofollow noreferrer"
              target="_blank"
            >
              ThePointsGuy.com here
            </a>
            .
          </span>
          You can also find the page about it on{' '}
          <a
            href="https://www.redventures.com/about/brands/expert-flyer"
            rel="noopener noreferrer"
            target="_blank"
          >
            Red Venture’s site
          </a>
          . It has more screenshots of stuff I built! (but didn’t design 😆).
        </p>
      </section>
    </main>
    <Footer />
  </div>
)

export default ExpertFlyer
