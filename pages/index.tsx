import clsx from 'clsx'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'
import config from '../lib/config'
import styles from '../styles/util.module.scss'

import type { NextPage } from 'next'
const Home: NextPage = () => (
  <>
    <Head>
      <title>{config.title}</title>
    </Head>
    <Header>
      <Hero />
    </Header>
    <main className={styles.main}>
      <section>
        <div className={styles.center}>
          Heya, my name is Matt. I make software &amp; software accessories.
        </div>
        <figure className={styles.center}>
          <Image src="/img/hankhill.webp" width={45} height={75} alt="Hank Hill, yup" />
          <figcaption>yup...</figcaption>
        </figure>
        <p>
          I work for an awesome company called{' '}
          <span className={styles.nobreak}>
            <span className="icon-shopify" />{' '}
            <strong>
              <a href="https://shopify.com/" rel="noopener nofollow">
                Shopify
              </a>
              .
            </strong>
          </span>
          Great company with an awesome mission &amp; just scratching the surface of their
          potential.
        </p>
      </section>
      <section>
        <h2>Tools of the trade</h2>
        <p>
          The tools of my trade are mostly{' '}
          <span className={styles.nobreak}>
            <span className="icon-typescript" /> <strong>TypeScript</strong>,
          </span>
          <span className={styles.nobreak}>
            <span className="icon-react" /> <strong>React</strong>,
          </span>
          <span className={styles.nobreak}>
            <span className="icon-nodejs" /> <strong>NodeJS</strong>,
          </span>
          &amp;{' '}
          <span className={styles.nobreak}>
            <span className="icon-visualstudiocode" /> <strong>VSC</strong>.
          </span>
          <a href="https://github.com/mawburn/mawburn.com" rel="noopener">
            This site was over-engineered using{' '}
            <span className={styles.nobreak}>
              <span className={clsx('icon-nextjs', styles.fontColor)} /> <strong>NextJS</strong>...
            </span>
          </a>
          because it’s just awesomeness. I consider myself lucky that even after 10yrs+ of
          development, it’s still one of my main hobbies... although I do have a{' '}
          <strong>ton</strong> of hobbies.
        </p>
        <p>
          I’m a full-stack dev who’s worked with a lot more than just these techs &amp; if you’re
          curious checkout my <Link href="/about">ABOUT</Link> page, though I do lean pretty heavy
          on the frontend because that’s just where my passion lies.
        </p>
        <p>
          I’m not the best developer on the planet, but I know what I’m doing &amp; like to think
          I’m pretty good at it.
        </p>
      </section>
      <section>
        <h2>💡 Ideas, 🕐 Time, &amp; ⚡️ Energy</h2>
        <p>
          I have more ideas than I have time. Plenty of energy, just not enough time. Why can’t days
          last for 72hrs instead of 24? That would be cool! If I actually turned any of my ideas
          into businesses (which I don’t), you could probably call me a serial entrepreneur.
        </p>
        <p>
          If I can’t find something or something I want doesn’t exist, I end up just making it. I’m
          definitely a serial community creator &amp; run a few <span className="icon-discord" />{' '}
          Discord servers, with the most being somewhere around 3,000 members.
        </p>
        <p>
          On my <Link href="/projects">PROJECTS</Link> page you can find more about the stuff I have
          done in my free time &amp; a little about what I’ve done for work.
        </p>
      </section>
    </main>
    <Footer />
  </>
)

export default Home
