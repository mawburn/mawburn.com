import clsx from 'clsx'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

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

    <main className={styles.main}>👋</main>
    <Footer />
  </div>
)

export default Projects
