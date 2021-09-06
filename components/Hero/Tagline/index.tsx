import { ReactNode, useEffect, useState } from 'react'

import { ScreenType } from '../../../lib/useWindowSize'
import styles from '../styles.module.scss'
import getTag from './getTag'

interface TaglineProps {
  screen: ScreenType
}

const Tagline = ({ screen }: TaglineProps) => {
  const [tag, setTag] = useState<ReactNode>(getTag())

  useEffect(() => {
    const size = screen === 'phone' ? 25 : 42

    const interval = setInterval(() => {
      setTag(getTag(size))
    }, 1000)

    return () => clearInterval(interval)
  }, [screen])

  return <div className={styles.tagline}>{tag}</div>
}

export default Tagline
