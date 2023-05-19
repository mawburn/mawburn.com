import Head from 'next/head'
import { Header, Icon, Layout, MDXLoader, MDXResult } from 'src/components'
import getPostData from 'src/lib/getPostData'
import localConfig from 'src/lib/localConfig'

import type { NextPage } from 'next'

interface Props {
  portaler: MDXResult
}

const tooling = [
  'react',
  'typescript',
  'postgresql',
  'redis',
  'discord',
  'docker',
  'netlify',
  'cloudflare',
  'prometheus',
  'grafana',
  'github',
]

const Portaler: NextPage<Props> = ({ portaler }) => (
  <>
    <Head>
      <title>{localConfig.title}</title>
    </Head>
    <Layout className="flex flex-col justify-center items-center gap-8 mt-12 mb-24 max-w-myMax mx-4 md:mx-auto">
      <article className="sectionBreak">
        <MDXLoader source={portaler} />
      </article>
      <section className="flex flex-col lg:flex-row text-sm justify-center items-center w-full py-8 bg-neutral-950/80 p-2 rounded-lg">
        <Header.H3 className="mb-4 lg:mb-0">Tooling:</Header.H3>
        <ul className="flex flex-wrap mx-4 gap-4 text-center lg:gap-8 text-2xl">
          {tooling.map(tool => (
            <li key={`tool${tool}`}>
              <Icon name={tool} />
            </li>
          ))}
        </ul>
      </section>
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
