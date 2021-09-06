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

const Project = ({
  name,
  descr,
  img,
  tech,
  isOpenSource = false,
  url = undefined,
}: ProjectProps) => {
  const bgImg = { backgroundImage: `url(/img/${img})` }

  const link = url || `/projects/${name.replace(/’/gi, '').toLowerCase().split(' ').join('-')}`

  return (
    <a href={link} title={name} className={styles.link}>
      <div className={styles.top}>
        {isOpenSource && (
          <div className={styles.openSource}>
            <span className="icon-github" />
          </div>
        )}
      </div>
      <div className={styles.project}>
        <h3 className={clsx({ [styles.openSourceHeader]: isOpenSource })}>{name}</h3>
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
