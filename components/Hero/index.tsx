import Image from 'next/image'
import { useState } from 'react'

import config from '../../lib/config'
import useWindowSize from '../../lib/useWindowSize'
import styles from './styles.module.scss'
import Tagline from './Tagline'

const Hero = () => {
  const [size, setSize] = useState<number>(150)

  const { screen } = useWindowSize()

  return (
    <div className={styles.hero}>
      <Tagline screen={screen} />
      <div className={styles.photo}>
        <Image src={config.photo} width={size} height={size} alt="Matt Burnett" />
      </div>
    </div>
  )
}

export default Hero
