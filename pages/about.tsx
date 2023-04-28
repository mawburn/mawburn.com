import clsx from 'clsx'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import Footer from '../components/Footer'
import Header from '../components/Header'
import config from '../lib/config'
import getPostData from '../lib/getPostData'
import styles from '../styles/util.module.scss'

import type { NextPage } from 'next'
interface Props {
  postData: string
}

const About: NextPage<Props> = ({ postData }) => (
  <div className={styles.container}>
    <Head>
      <title>About me - {config.title}</title>
    </Head>
    <Header />

    <main className={styles.main}>
      <section dangerouslySetInnerHTML={{ __html: postData }} />
    </main>
    <Footer />
  </div>
)

export async function getStaticProps() {
  const postData = await getPostData('about')

  return {
    props: {
      postData,
    },
  }
}

export default About
