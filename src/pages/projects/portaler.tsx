import Head from 'next/head'
import { Layout, MDXLoader, MDXResult } from 'src/components'
import getPostData from 'src/lib/getPostData'
import localConfig from 'src/lib/localConfig'

import type { NextPage } from 'next'

interface Props {
  portaler: MDXResult
}

const Portaler: NextPage<Props> = ({ portaler }) => (
  <>
    <Head>
      <title>{localConfig.title}</title>
    </Head>
    <Layout className="flex justify-center items-center gap-8 mt-12 max-w-myMax mx-auto">
      <article className="sectionBreak">
        <MDXLoader source={portaler} />
      </article>
    </Layout>
  </>
)

export async function getStaticProps() {
  const portaler = await getPostData('portaler')

  return {
    props: {
      portaler,
    },
  }
}

export default Portaler
