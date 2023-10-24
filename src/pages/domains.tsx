import Head from 'next/head'
import { Layout, MDXLoader, MDXResult } from 'src/components'
import getPostData from 'src/lib/getPostData'
import localConfig from 'src/lib/localConfig'

import type { NextPage } from 'next'

interface Props {
  domains: MDXResult
}

const Domains: NextPage<Props> = ({ domains }) => (
  <>
    <Head>
      <title>{localConfig.title}</title>
    </Head>
    <Layout className="flex justify-center items-center gap-8 px-6 mt-12 max-w-myMax mx-auto">
      <article className="sectionBreak resume mb-16 domainList">
        <MDXLoader source={domains} />
      </article>
    </Layout>
  </>
)

export async function getStaticProps() {
  const domains = await getPostData('domains')

  return {
    props: {
      domains,
    },
  }
}

export default Domains
