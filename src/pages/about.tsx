import Head from 'next/head'
import { Layout, MDXResult } from 'src/components'
import configLinks from 'src/lib/localConfig'

import type { NextPage } from 'next'
interface Props {
  postData?: MDXResult
}

const About: NextPage<Props> = ({}) => (
  <>
    <Head>
      <title>About me - {configLinks.title}</title>
    </Head>
    <Layout />
  </>
)

export default About
