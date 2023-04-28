import Head from 'next/head'
import Image from 'next/image'
import { Layout, MDXLoader, MDXResult } from 'src/components'
import getPostData from 'src/lib/getPostData'
import localConfig from 'src/lib/localConfig'

import type { NextPage } from 'next'
import Link from 'next/link'
interface Props {
  logos: MDXResult
}

interface LogoProps {
  name: string
  img: string
  size: [number, number]
  desc?: string
}

const LogoBlock = ({ name, img, size, desc }: LogoProps) => (
  <div className="flex flex-col items-center w-60 h-96">
    <div className="h-52 rounded-lg overflow-hidden">
      <Image src={img} width={size[0]} height={size[1]} alt={name} />
    </div>
    <span className="text-lg font-bold text-center">{name}</span>
    {desc && <span className="text-sm text-center">{desc}</span>}
  </div>
)

const Logos: NextPage<Props> = ({ logos }) => (
  <>
    <Head>
      <title>{localConfig.title}</title>
    </Head>
    <Layout className="flex justify-center items-center gap-8 mt-12 max-w-myMax mx-auto">
      <article className="flex flex-col items-center sectionBreak mb-4">
        <section className="max-w-prose">
          <MDXLoader source={logos} />
        </section>
        <section className="flex mt-16 gap-8">
          <Link href="https://tabletop.land">
            <LogoBlock
              name="Tabletop.Land"
              img="/img/TTLandRound.webp"
              size={[200, 200]}
              desc="My tabletop crafts shop"
            />
          </Link>
          <Link href="https://cltrpg.com">
            <LogoBlock
              name="CLTRPG.com"
              img="/img/CLTRPG.svg"
              size={[173, 198]}
              desc="A Charlotte, NC (CLT) area TTRPG Discord community that I created"
            />
          </Link>
          <LogoBlock
            name="Savage Interludes"
            img="/img/SavageInterludes.svg"
            size={[200, 193]}
            desc="A TTRPG podcast that is no longer airing"
          />
          <LogoBlock
            name="Roleplaying as Smart People"
            img="/img/RPSP.webp"
            size={[200, 200]}
            desc="Another TTRPG podcast that is still airing"
          />
        </section>
      </article>
    </Layout>
  </>
)

export async function getStaticProps() {
  const logos = await getPostData('logos')

  return {
    props: {
      logos,
    },
  }
}

export default Logos
