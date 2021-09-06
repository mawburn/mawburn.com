import clsx from 'clsx'
import Head from 'next/head'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import config from '../../lib/config'
import styles from '../../styles/util.module.scss'

import type { NextPage } from 'next'

const Portaler: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>Portaler - Projects - {config.title}</title>
    </Head>
    <Header />

    <main className={styles.main}>
      <section>
        <h2>An overview of Portaler</h2>
      </section>
    </main>
    <Footer />
  </div>
)

export default Portaler
