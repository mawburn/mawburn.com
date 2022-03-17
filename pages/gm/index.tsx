import clsx from 'clsx'
import Head from 'next/head'
import Link from 'next/link'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import config from '../../lib/config'
import styles from '../../styles/util.module.scss'

import type { NextPage } from 'next'
const GM: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>Game Master Stuff - {config.title}</title>
    </Head>
    <Header />

    <main className={clsx(styles.main)}>
      <section>
        <h2>Links</h2>
        <div style={{ textAlign: 'center' }}>
          <Link href="/gm/rules">My GM Lines &amp; Veils</Link>
        </div>
      </section>
      <section>
        <h2 style={{ textAlign: 'left' }}>Blog Posts</h2>
        <ul className={styles.noStyleList}>
          <li>
            <span className={styles.mono}>2022-03-16:</span>{' '}
            <Link href="/gm/blog/gming">Game Mastering &amp; what it means to me </Link>
          </li>
        </ul>
      </section>
      <section>
        <h2 style={{ textAlign: 'left' }}>Game Recaps</h2>
        <p>
          I don’t always write down recaps or battle reports of my games, but sometimes they are
          requested or sometimes I catch the bug.
        </p>
        <ul className={styles.noStyleList}>
          <li>
            <span className={styles.mono}>2021-08-08:</span>{' '}
            <Link href="/gm/games/deadlands-1">Deadlands in CLT - Session 1</Link>
          </li>
          <li style={{ display: 'none' }}>
            <span className={styles.mono}>2021-08-21:</span>{' '}
            <Link href="/gm/games/deadlands-2">Deadlands in CLT - Session 2</Link>
          </li>
        </ul>
      </section>
    </main>
    <Footer />
  </div>
)

export default GM
