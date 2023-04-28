import clsx from 'clsx'
import { ReactNode } from 'react'

import styles from './styles.module.scss'

interface ProjectProps {
  name: string
  descr: string
  img: string
  tech: ReactNode
  isOpenSource?: boolean
  url?: string
}

const OpenSourceIcon = () => (
  <div className={styles.openSource}>
    <span className="icon-github" />
  </div>
)

const ProjectHeader = ({ isOpenSource, name }: { isOpenSource: boolean; name: string }) => (
  <h3 className={clsx({ [styles.openSourceHeader]: isOpenSource })}>{name}</h3>
)

const Project = ({
  name,
  descr,
  img,
  tech,
  isOpenSource = false,
  url = undefined,
}: ProjectProps) => {
  const bgImg = { backgroundImage: `url(/img/${img})` }
  const link = url ?? `/projects/${name.replace(/’/gi, '').toLowerCase().split(' ').join('-')}`

  return (
    <a href={link} title={name} className={styles.link}>
      <div className={styles.top}>{isOpenSource && <OpenSourceIcon />}</div>
      <div className={styles.project}>
        <ProjectHeader isOpenSource={isOpenSource} name={name} />
        <div className={styles.preview} style={bgImg} />
        <div className={styles.descr}>{descr}</div>
        <div className={styles.tech}>
          <h4>Tech:</h4> <div>{tech}</div>
        </div>
      </div>
    </a>
  )
}

export default Project
