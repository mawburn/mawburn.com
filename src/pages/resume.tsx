import Head from 'next/head'
import { Header, Layout, MDXLoader, MDXResult } from 'src/components'
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
    <Layout className="flex justify-center items-center gap-8 px-6 mt-12 max-w-myMax mx-auto">
      <article className="sectionBreak resume mb-16">
        <Header.H1 className="text-2xl text-center lg:text-4xl lg:text-left">
          Matt Burnett’s Resumé
        </Header.H1>
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
