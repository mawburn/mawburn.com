import React, { useRef } from 'react'

import s from './styles.module.scss'

const taglines: string[] = ['just some random software engineer guy']

const Tagline = () => {
  const index = useRef<number>(
    Math.floor(Math.random() * Math.floor(taglines.length))
  )

  return <div className={s.tagline}>{taglines[index.current]}</div>
}

export default Tagline
