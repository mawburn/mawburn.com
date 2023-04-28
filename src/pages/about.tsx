import Head from 'next/head'
import { Layout, MDXResult } from 'src/components'
import localConfig from 'src/lib/localConfig'

import type { NextPage } from 'next'
interface Props {
  postData?: MDXResult
}

const About: NextPage<Props> = ({}) => (
  <>
    <Head>
      <title>About me - {localConfig.title}</title>
    </Head>
    <Layout />
  </>
)

export default About
