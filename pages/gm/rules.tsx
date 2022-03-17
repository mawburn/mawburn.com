import clsx from 'clsx'
import Head from 'next/head'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import config from '../../lib/config'
import styles from '../../styles/util.module.scss'

import type { NextPage } from 'next'

const GMRules: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>My Game Master Rules - {config.title}</title>
    </Head>
    <Header />

    <main className={clsx(styles.main)}>
      <section>
        <h2>My Non-Negotiables</h2>
        <p>
          It’s just easier to list these on a website. Usually I am the one running games, so I can
          just point people here. I like a lot of gritty settings &amp; dark humor, but I still have
          my rules &amp; I definitely don’t have them all here so use common sense.
        </p>
      </section>
      <section>
        <h3 style={{ marginTop: '2rem' }}>
          Lines
          <br />
          <span style={{ opacity: '0.8', fontSize: '1rem' }}>(don’t do these things at all)</span>
        </h3>
        <ul>
          <li>
            <strong>No Rape or Sexual Assault</strong>
          </li>
          <li>
            <strong>No real world Racism</strong>
            <br />
            <span className={styles.subText}>
              (goofy thematic teasing of non-real world beings is fine)
            </span>
          </li>
          <li>
            <strong>No Hard Violence</strong>{' '}
            <span className={styles.subText}>(death or mutilation)</span> or{' '}
            <strong>Sexual Assault on Children</strong>
          </li>
        </ul>
        <h3 style={{ marginTop: '2rem' }}>
          Veils
          <br />
          <span style={{ opacity: '0.8', fontSize: '1rem' }}>
            (you can do these things, but don’t describe them in detail)
          </span>
        </h3>
        <ul>
          <li>
            <strong>Violent Torture</strong>
          </li>
          <li>
            <strong>Past Violence on Children</strong>
            <br />
            <span className={styles.subText}>
              (Towns get decimated, families get killed in remote places, things happen. This is
              fine. I’d rather not hear about the details regarding the children.)
            </span>
          </li>
          <li>
            <strong>Sexual Harassment</strong>
            <br />
            <span className={styles.subText}>
              (Some people play bad characters or non-politically correct characters. That’s fine,
              but I don’t. Keep it very light or off the table.)
            </span>
          </li>
          <li>
            <strong>Romance</strong>
            <br />
            <span className={styles.subText}>
              (More of a soft veil, but if I’m GM I’m not going to reciprocate flirtation &amp;
              general romance isn’t my thing. Romantic interests or in-game relationships are fine.)
            </span>
          </li>
        </ul>
      </section>
    </main>
    <Footer />
  </div>
)

export default GMRules
