import Head from 'next/head'

import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'
import config from '../lib/config'
import getPostData from '../lib/getPostData'
import styles from '../styles/util.module.scss'

import type { NextPage } from 'next'
interface Props {
  postData: string
}

const Home: NextPage<Props> = ({ postData }) => (
  <>
    <Head>
      <title>{config.title}</title>
    </Head>
    <Header>
      <Hero />
    </Header>
    <main className={styles.main}>
      <section dangerouslySetInnerHTML={{ __html: postData }} />
    </main>
    <Footer />
  </>
)

export async function getStaticProps() {
  const postData = await getPostData('home')

  return {
    props: {
      postData,
    },
  }
}

export default Home
