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

const whoAmISection =
  'flex flex-col gap-8 max-w-full mx-2 mt-12 md:max-w-myMax md:mx-auto lg:flex-row lg:items-center lg:justify-center lg:gap-20'

const WhoAmI = () => {
  const [hovering, setHovering] = useState(false)

  return (
    <section
      className={whoAmISection}
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Header.H2 className="text-center lg:text-left">Who am I?</Header.H2>
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
        <p className="block mt-4 font-bold text-center lg:text-left ">
          Well... I make software & software accessories.
        </p>
      </div>
    </section>
  )
}

const NameTitle = () => (
  <section className="flex flex-col justify-center items-center my-16 gap-8 lg:flex-row lg:gap-16">
    <div className="flex flex-col justify-center items-center">
      <Header.H2 className="hardTextShadow text-center" size="text-5xl">
        Matt Burnett
      </Header.H2>
      <div className="flex flex-col items-center font-header tracking-wider mt-4 hardTextShadow lg:flex-row">
        <span className="text-2xl">Software Engineer</span>
        <span className="ml-2 text-lg">(Frontend)</span>
      </div>
    </div>
    <div className="text-3xl text-accent font-bold font-header hardTextShadow">
      He<span className="mx-2">/</span>Him
    </div>
  </section>
)

const JustTheBasics = ({ theBasics }: Props) => (
  <article className="flex flex-col justify-start w-full px-4 lg:flex-row lg:max-w-myMax lg:gap-8 lg:mx-auto">
    <Header.H3 className="inline-block text-center text-3xl mb-4 lg:text-right">
      Just the basics
    </Header.H3>
    <div className="parBreak parIndent text-xl lg:text-lg">
      <MDXLoader source={theBasics} />
    </div>
  </article>
)

const Projects = () => (
  <section id="projects" className="flex flex-col justify-center items-center w-full mt-8 mx-4">
    <Header.H2 className="text-center">Noteworthy projects</Header.H2>
    <div className="flex flex-wrap justify-center items-center gap-8 mt-4 lg:mt-8">
      <Project
        title="Tabletop.Land"
        url="https://tabletop.land"
        image="/img/TTLand.webp"
        tags={['shopify', 'react', 'next-js', 'vercel']}
      >
        An online store by my wife & me, targeting tabletop gamers. Features our products & various
        vendors selling their unique gaming goods.
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
        An open source mapping tool for Albion Online, boasting 19k-21k monthly users and close to
        500 server installations.
      </Project>
      <Project
        title="Logos & Graphics"
        url="/projects/logos"
        image="/img/Paint.webp"
        tags={['adobephotoshop', 'inkscape', 'paint-brush']}
      >
        I’m not a pro designer, but I enjoy using my artistic flair to create logos for personal
        projects and others.
      </Project>
    </div>
  </section>
)

const Home: NextPage<Props> = ({ theBasics }) => (
  <>
    <Head>
      <title>{localConfig.title}</title>
    </Head>
    <Layout>
      <WhoAmI />
      <NameTitle />
      <JustTheBasics theBasics={theBasics} />
      <Projects />
    </Layout>
  </>
)

export async function getStaticProps() {
  const theBasics = await getPostData('basics')

  return {
    props: {
      theBasics,
    },
  }
}

export default Home
