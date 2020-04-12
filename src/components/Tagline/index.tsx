import React, { useRef, useEffect, useState } from 'react'

import s from './styles.module.scss'

const taglines: string[] = [
  'software engineer',
  'full-stack developer',
  'js ninja',
  'web developer',
  'futurama nerd',
]

const Tagline = () => {
  const timer = useRef(null)
  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex(i => (i + 1 < taglines.length ? ++i : 0))
    }, 1000)

    return () => clearInterval(timer.current)
  }, [])

  return <div className={s.tagline}>{taglines[index]}</div>
}

export default Tagline
