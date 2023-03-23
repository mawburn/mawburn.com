import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'

import { ScreenType } from '../../../lib/useWindowSize'
import styles from '../styles.module.scss'
import getTag from './getTag'

interface TaglineProps {
  screen: ScreenType
}

const Tagline = ({ screen }: TaglineProps) => {
  const [tag, setTag] = useState<ReactNode>('software engineer')
  const lastSeven = useRef<ReactNode[]>(['software engineer'])

  const getNewTag = useCallback((size: number): ReactNode => {
    const tag = getTag(size)

    if (lastSeven.current.includes(tag)) {
      return getNewTag(size)
    }

    lastSeven.current.push(tag)

    if (lastSeven.current.length > 7) {
      lastSeven.current.shift()
    }

    return tag
  }, [])

  useEffect(() => {
    const size = screen === 'phone' ? 25 : 42

    const interval = setInterval(() => {
      setTag(getNewTag(size))
    }, 650)

    return () => clearInterval(interval)
  }, [screen, getNewTag])

  return <div className={styles.tagline}>{tag}</div>
}

export default Tagline
