import Head from 'next/head'
import { Layout, MDXLoader, MDXResult } from 'src/components'
import getPostData from 'src/lib/getPostData'
import localConfig from 'src/lib/localConfig'

import type { NextPage } from 'next'

interface Props {
  resume: MDXResult
}

const Resume: NextPage<Props> = ({ resume }) => (
  <>
    <Head>
      <title>{localConfig.title}</title>
    </Head>
    <Layout className="flex justify-center items-center gap-8 mt-12 max-w-myMax mx-auto">
      <article className="sectionBreak">
        <MDXLoader source={resume} />
      </article>
    </Layout>
  </>
)

export async function getStaticProps() {
  const resume = await getPostData('resume')

  return {
    props: {
      resume,
    },
  }
}

export default Resume
