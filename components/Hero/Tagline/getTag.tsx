import Image from 'next/image'
import { ReactNode } from 'react'

const tagList: ReactNode[] = [
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
    <Image src="/img/lars.webp" width={25} height={25} alt="Lars Fillmore" />
  </>,
  'father',
  'husband',
  'backpacker 🏕 ',
  <>
    <Image src="/img/d12.webp" width={25} height={25} alt="d12" />
    <span>tabletop GM</span>
  </>,
  'board game lover',
  <>
    <span>ttrpg enthusiast</span>
    <Image src="/img/d20.webp" width={25} height={25} alt="d20" />
  </>,
  'community creator',
  'creator of content',
  'entrepreneur',
  <>
    <Image src="/img/hypnoCode-animated.webp" width={25} height={25} alt="hypnoCode small" />
    <span>hypnoCode</span>
  </>,
]

const resetIndexList = () => tagList.map((_, i) => i)

const getRandomIndex = (indexList: number[]) => {
  const remove = Math.floor(Math.random() * indexList.length)
  const retVal = indexList[remove]
  indexList.splice(remove, 1)
  return retVal
}

const getTag = (): ReactNode => {
  let indexList = resetIndexList()

  const rand = () => {
    if (indexList.length === 1) {
      const ret = indexList[0]
      indexList = resetIndexList()
      const retIndex = indexList.findIndex(n => n === ret)
      indexList.splice(retIndex, 1)

      return ret
    }

    return getRandomIndex(indexList)
  }

  return tagList[rand()]
}

export default getTag
