import clsx from 'clsx'
import Head from 'next/head'

import Footer from '../../components/Footer'
import FoundryIcon from '../../components/FoundryIcon'
import Header from '../../components/Header'
import Project from '../../components/Project'
import config from '../../lib/config'
import styles from '../../styles/util.module.scss'

import type { NextPage } from 'next'
const Projects: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>Projects - {config.title}</title>
    </Head>
    <Header />

    <main className={clsx(styles.main, styles.mainFull)}>
      <h2>A few of my projects</h2>
      <div className={styles.subTitle}>
        A <span className="icon-github" title="GitHub" /> GitHub Logo in the top, indicates it’s
        open source
      </div>
      <ul className={styles.projects}>
        <li>
          <Project
            name="Portaler"
            descr="A multi-tenant collaborative mapping tool for Albion Online. 20k+ MAU &amp; a bot on ~400 servers."
            img="portaler.webp"
            isOpenSource
            tech={
              <>
                <span className="icon-typescript" title="Typescript" />
                <span className="icon-react" title="ReactJS" />
                <span className="icon-nodejs" title="NodeJS" />
                <span className="icon-postgresql" title="PostgreSQL" />
                <span className="icon-redis" title="Redis" />
                <span className="icon-docker" title="Docker" />
                <span className="icon-discord" title="Discord" />
              </>
            }
          />
        </li>
        <li>
          <Project
            name="Agents of Syn"
            descr="A TTRPG living world community &amp; infrastructure to run FoundryVTT instances."
            img="aosbg.webp"
            tech={
              <>
                <span className="icon-typescript" title="Typescript" />
                <span className="icon-react" title="ReactJS" />
                <span className="icon-nextjs" title="NextJS" />
                <span className="icon-postgresql" title="PostgreSQL" />
                <span className="icon-docker" title="Docker" />
                <span className="icon-discord" title="Discord" />
                <FoundryIcon />
              </>
            }
          />
        </li>
        <li>
          <Project
            name="The Carolina Roleplayers’ Society"
            descr="Mostly just a Discord based community for TTRPG players in the Charlotte, NC area. Great domain CLTRPG.com!"
            img="cltrpgbg.webp"
            tech={
              <>
                <span className="icon-typescript" title="Typescript" />
                <span className="icon-react" title="ReactJS" />
                <span className="icon-nextjs" title="NextJS" />
                <span className="icon-discord" title="Discord" />
              </>
            }
          />
        </li>
        <li>
          <Project
            name="Ping Logger for FoundryVTT"
            descr="A simple plugin for the Foundry Virtual Tabletop to show user’s pings"
            img="foundrybg.webp"
            isOpenSource
            tech={
              <>
                <span className="icon-typescript" title="Typescript" />
                <span className="icon-react" title="ReactJS" />
                <span className="icon-nextjs" title="NextJS" />
                <FoundryIcon />
              </>
            }
          />
        </li>
        <li>
          <Project
            name="This!"
            descr="mawburn.com of course"
            img="mawburn.webp"
            url="https://github.com/mawburn/mawburn.com"
            isOpenSource
            tech={
              <>
                <span className="icon-typescript" title="Typescript" />
                <span className="icon-react" title="ReactJS" />
                <span className="icon-nextjs" title="NextJS" />
              </>
            }
          />
        </li>
        <li>
          <Project
            name="Expert Flyer"
            descr="A project I lead in a previous job, to rebuild &amp; architect a new version of the site."
            img="expertflyer.png"
            tech={
              <>
                <span className="icon-typescript" title="Typescript" />
                <span className="icon-react" title="ReactJS" />
                <span className="icon-go" title="GoLang" />
              </>
            }
          />
        </li>
        <li>
          <Project
            name="Artistic Stuff"
            descr="Some of the things I've painted, created, written, or otherwise."
            img="artbg.webp"
            tech={
              <>
                <span className="icon-adobephotoshop" title="Photoshop" />
                <span>
                  <span className={styles.flip}>✋</span>✋
                </span>
              </>
            }
          />
        </li>
      </ul>
    </main>
    <Footer />
  </div>
)

export default Projects
