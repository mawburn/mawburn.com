import clsx from 'clsx'
import Head from 'next/head'

import Back from '../../../components/Back'
import Footer from '../../../components/Footer'
import Header from '../../../components/Header'
import config from '../../../lib/config'
import styles from '../../../styles/util.module.scss'

import type { NextPage } from 'next'

const GMing: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>Deadlands in CLT Session 2 - {config.title}</title>
    </Head>
    <Header />

    <main className={clsx(styles.main)}>
      <Back page="/gm" />
      <section>
        <h2>Deadlands in CLT - Session 2</h2>
        <div className={styles.blogDate}>August 21, 2021</div>
        TBD
      </section>
    </main>
    <Footer />
  </div>
)

export default GMing
