import Head from 'next/head'
import { Layout, MDXLoader, MDXResult } from 'src/components'

import type { NextPage } from 'next'

import config from 'src/lib/localConfig'
import getPostData from 'src/lib/getPostData'

interface Props {
  postData: MDXResult
}

const Home: NextPage<Props> = ({ postData }) => (
  <>
    <Head>
      <title>{config.title}</title>
    </Head>
    <Layout>
      <main>
        <section>
          <MDXLoader source={postData} />
        </section>
      </main>
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
