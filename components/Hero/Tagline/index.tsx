import clone from 'lodash/cloneDeep'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'

import { ScreenType } from '../../../lib/useWindowSize'
import styles from '../styles.module.scss'
import getTag from './getTag'

interface TaglineProps {
  screen: ScreenType
}

const getSizeFromScreen = (screen: ScreenType) => (screen === 'phone' ? 25 : 42)

const updateLastSevenTags = (lastSeven: ReactNode[], newTag: ReactNode) => {
  lastSeven.push(newTag)

  if (lastSeven.length > 7) {
    lastSeven.shift()
  }

  return lastSeven
}

const Tagline = ({ screen }: TaglineProps) => {
  const [tag, setTag] = useState<ReactNode>('software engineer')
  const lastSeven = useRef<ReactNode[]>(['software engineer'])

  const getNewTag = useCallback((): ReactNode => {
    let newTag = getTag()

    while (lastSeven.current.includes(newTag)) {
      newTag = getTag()
    }

    lastSeven.current = updateLastSevenTags(clone(lastSeven.current), newTag)

    return newTag
  }, [])

  useEffect(() => {
    const size = getSizeFromScreen(screen)

    const interval = setInterval(() => {
      setTag(getNewTag())
    }, 1000)

    return () => clearInterval(interval)
  }, [screen, getNewTag])

  return <div className={styles.tagline}>{tag}</div>
}

export default Tagline
