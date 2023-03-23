import Image from 'next/image'
import { ReactNode } from 'react'

const getTag = (size = 25): ReactNode => {
  const tagList = [
    'mentor',
    'software engineer',
    'full-stack developer',
    'js ninja',
    '❤️ typescript',
    'web developer',
    'the rare ENSP engineer',
    'type 3 Enneagram',
    <>
      <span>futurama nerd</span>
      <Image src="/img/lars.webp" width={size} height={size} alt="Lars Fillmore" />
    </>,
    'father',
    'husband',
    'backpacker 🏕 ',
    <>
      <Image src="/img/d12.webp" width={size} height={size} alt="d12" />
      <span>tabletop GM</span>
    </>,
    'board game lover',
    <>
      <span>ttrpg enthusiast</span>
      <Image src="/img/d20.webp" width={size} height={size} alt="d20" />
    </>,
    'community creator',
    'creator of content',
    'entrepreneur',
    <>
      <Image src="/img/hypnoCode-animated.webp" width={size} height={size} alt="hypnoCode small" />
      <span>hypnoCode</span>
    </>,
  ]

  let indexList: number[] = tagList.map((_, i) => i)

  const rand = (): number => {
    if (indexList.length === 1) {
      const ret = indexList[0]
      indexList = tagList.map((_, i) => i)

      const retIndex = indexList.findIndex(n => n === ret)
      indexList.splice(retIndex, 1)

      return ret
    }

    const remove = Math.floor(Math.random() * indexList.length)
    const retVal = indexList[remove]
    indexList.splice(remove, 1)

    return retVal
  }

  return tagList[rand()]
}

export default getTag
