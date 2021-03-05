import React, { useEffect, useState } from 'react'

import s from './styles.module.scss'

const tags: string[] = [
  'software engineer',
  'full-stack developer',
  'js ninja',
  '❤️ typescript',
  'web developer',
  'futurama nerd',
  'father',
  'husband',
  'backpacker 🏕 ',
  '🎲 tabletop GM',
  'board game lover',
]

let lastThree: number[] = []

const rand = (): number => {
  const newIndex = Math.floor(Math.random() * tags.length)

  if (lastThree.includes(newIndex)) {
    return rand()
  }

  lastThree.unshift(newIndex)
  lastThree = lastThree.slice(0, 3)
  return newIndex
}

const Tagline = () => {
  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    setTimeout(() => {
      const newIdx = rand()
      setIndex(newIdx)
    }, 1000)
  }, [index])

  return <div className={s.tagline}>{tags[index]}</div>
}

export default Tagline
