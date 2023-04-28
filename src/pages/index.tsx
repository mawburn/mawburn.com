import clsx from 'clsx'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { Header, Layout, MDXLoader, MDXResult, Project } from 'src/components'
import getPostData from 'src/lib/getPostData'
import localConfig from 'src/lib/localConfig'

import type { NextPage } from 'next'

interface Props {
  theBasics: MDXResult
}

const sectionClassName = 'flex justify-center items-center gap-8 mt-12 max-w-myMax mx-auto'

const Home: NextPage<Props> = ({ theBasics }) => {
  const [hovering, setHovering] = useState(false)

  return (
    <>
      <Head>
        <title>{localConfig.title}</title>
      </Head>
      <Layout className="">
        <section
          className={sectionClassName}
          onMouseOver={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <Header.H2>Who am I?</Header.H2>
          <div className="flex flex-col justify-center items-center">
            <div className="flex items-center w-[150px] h-[150px] rounded-full overflow-hidden">
              <Image
                src="/img/MeGame.webp"
                width={150}
                height={150}
                alt="Matt Burnett"
                loading="lazy"
              />
              <Image
                className={clsx(
                  { 'opacity-100': hovering, 'opacity-0': !hovering },
                  'ml-[-150px] transition-opacity duration-1000 ease-in-out'
                )}
                src="/img/HankHill.webp"
                width={150}
                height={150}
                alt="Hank Hill"
              />
            </div>
            <p className="block mt-4 font-bold">Well... I make software & software accessories.</p>
          </div>
        </section>
        <section className="flex justify-center items-center my-16 gap-16 sm:gap-8">
          <div className="flex flex-col justify-center items-center">
            <Header.H2 className="hardTextShadow" size="text-5xl">
              Matt Burnett
            </Header.H2>
            <div className="flex items-center font-header hardTextShadow tracking-wider mt-3">
              <span className="text-2xl">Software Engineer</span>
              <span className="ml-2 text-lg">(Frontend)</span>
            </div>
          </div>
          <div className="text-3xl text-accent hardTextShadow font-bold font-header">
            He<span className="mx-2">/</span>Him
          </div>
        </section>
        <article className="flex justify-start gap-8 mt-12 max-w-myMax mx-auto">
          <Header.H3>
            <span className="inline-block text-right">Just the basics</span>
          </Header.H3>
          <section className="flex flex-col gap-3">
            <MDXLoader source={theBasics} />
          </section>
        </article>
        <article id="projects" className="flex flex-col gap-4 mt-24 m-8 justify-center">
          <Header.H2>Noteworthy projects</Header.H2>
          <section className="flex gap-8">
            <Project
              title="Tabletop.Land"
              url="https://tabletop.land"
              image="/img/TTLand.webp"
              tags={['shopify', 'react', 'next-js', 'vercel']}
            >
              An online store by my wife & me, targeting tabletop gamers. Features our products &
              various vendors selling their unique gaming goods.
            </Project>
            <Project
              title="Portaler"
              url="/projects/portaler"
              image="/img/portaler.webp"
              tags={[
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
              ]}
            >
              An open source mapping tool for Albion Online, boasting 19k-21k monthly users and
              close to 500 server installations.
            </Project>
            <Project
              title="Logos & Graphics"
              url="/projects/logos"
              image="/img/Paint.webp"
              tags={['adobephotoshop', 'inkscape', 'paint-brush']}
            >
              Not a pro designer, but enjoy using my artistic flair to create logos for personal
              projects and others.
            </Project>
          </section>
        </article>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const theBasics = await getPostData('basics')

  return {
    props: {
      theBasics,
    },
  }
}

export default Home
