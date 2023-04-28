import Head from 'next/head'
import { Header, Layout, MDXLoader, MDXResult, Project } from 'src/components'

import type { NextPage } from 'next'

import config from 'src/lib/localConfig'
import getPostData from 'src/lib/getPostData'
import Image from 'next/image'
import { useState } from 'react'
import clsx from 'clsx'

interface Props {
  theBasics: MDXResult
}

const sectionClassName = 'flex justify-center items-center gap-8 mt-12 max-w-myMax mx-auto'

const Home: NextPage<Props> = ({ theBasics }) => {
  const [hovering, setHovering] = useState(false)

  return (
    <>
      <Head>
        <title>{config.title}</title>
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
              tags={['shopify', 'react', 'next-js']}
            >
              An online store by my wife & me, targeting tabletop gamers. Features our products &
              various vendors selling their unique gaming goods.
            </Project>
            <Project title="xyz" url="xyz" image="/img/TTLand.webp" tags={[]} />
            <Project title="xyz" url="xyz" image="/img/TTLand.webp" tags={[]} />
          </section>
        </article>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const theBasics = await getPostData('basics')
  const postData = await getPostData('home')

  return {
    props: {
      theBasics,
      postData,
    },
  }
}

export default Home
