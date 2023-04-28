import Head from 'next/head'
import { Header, Layout, MDXLoader, MDXResult } from 'src/components'

import type { NextPage } from 'next'

import config from 'src/lib/localConfig'
import getPostData from 'src/lib/getPostData'
import Image from 'next/image'

interface Props {
  postData: MDXResult
}

const Home: NextPage<Props> = ({ postData }) => (
  <>
    <Head>
      <title>{config.title}</title>
    </Head>
    <Layout className="max-w-myMax">
      <section className="flex justify-between">
        <Header.H2>Who am I?</Header.H2>
        <div className="flex flex-col justify-center items-center">
          <Image
            className="block rounded-full shadow-lg	border-neutral-50/25 border-4"
            src="/img/MeGame.webp"
            width={150}
            height={150}
            alt="Matt Burnett"
          />
          <p className="block">I make software & software accessories.</p>
        </div>
      </section>
      <section>
        <MDXLoader source={postData} />
      </section>
    </Layout>
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
