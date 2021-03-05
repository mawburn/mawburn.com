import React, { useEffect, useState } from 'react'

import s from './styles.module.scss'

const tags: string[] = [
  'software engineer',
  'full-stack developer',
  'js ninja',
  'web developer',
  'futurama nerd',
  'father',
  'tabletop GM',
  'board game lover',
]

const Tagline = () => {
  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    setTimeout(() => {
      const next = index + 1 < tags.length ? index + 1 : 0
      setIndex(next)
    }, 1000)
  }, [index])

  return <div className={s.tagline}>{tags[index]}</div>
}

export default Tagline
