import React, { useRef } from 'react'

import styles from './styles.module.scss'

const taglines: string[] = ['just some random software engineer guy']

const Tagline = () => {
  const index = useRef<number>(
    Math.floor(Math.random() * Math.floor(taglines.length))
  )

  return <div className={styles.tagline}>{taglines[index.current]}</div>
}

export default Tagline
