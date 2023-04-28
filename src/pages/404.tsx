import Head from 'next/head'
import Image from 'next/image'
import { Header, Layout } from 'src/components'
import config from 'src/lib/localConfig'

import type { NextPage } from 'next'

const Projects: NextPage = () => (
  <>
    <Head>
      <title>Projects - {config.title}</title>
    </Head>
    <Layout className="flex flex-col justify-center items-center pt-8">
      <Header.H2>404 - Not Found</Header.H2>
      <Image
        className="rounded-2xl my-6"
        src="/img/DeepThought.webp"
        width={720}
        height={420}
        alt="Deep Thought"
      />
    </Layout>
  </>
)

export default Projects
