import { useEffect, useState } from 'react'

import styles from '../styles.module.scss'

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
  'ttrpg enthusiast 🎲',
  'community creator',
  'creator of content',
  'entrepreneur',
]

let indexList: number[] = tags.map((_, i) => i)
const startIdx = indexList.shift() || 0

const rand = (): number => {
  if (indexList.length === 1) {
    const ret = indexList[0]
    indexList = tags.map((_, i) => i)

    const retIndex = indexList.findIndex(n => n === ret)
    indexList.splice(retIndex, 1)

    return ret
  }

  const remove = Math.floor(Math.random() * indexList.length)
  const retVal = indexList[remove]
  indexList.splice(remove, 1)

  return retVal
}

const Tagline = () => {
  const [index, setIndex] = useState<number>(startIdx)

  useEffect(() => {
    setTimeout(() => {
      const newIdx = rand()
      setIndex(newIdx)
    }, 1000)
  }, [index])

  return <div className={styles.tagline}>{tags[index]}</div>
}

export default Tagline
