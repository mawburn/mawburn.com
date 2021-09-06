import clsx from 'clsx'
import Head from 'next/head'
import Image from 'next/image'

import Footer from '../components/Footer'
import Header from '../components/Header'
import config from '../lib/config'
import styles from '../styles/util.module.scss'

import type { NextPage } from 'next'

const Projects: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>Projects - {config.title}</title>
    </Head>
    <Header />
    <main className={styles.main}>
      <div className={clsx(styles.center, styles.four04)}>404 - Page not found</div>
      <div className={styles.imgRounder}>
        <Image src="/img/404.webp" width={500} height={312} alt="What is the question?" />
      </div>
    </main>
    <Footer />
  </div>
)

export default Projects
