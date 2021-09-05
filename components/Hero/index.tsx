import { useEffect, useState } from 'react'
import config from '../../lib/config'
import styles from './styles.module.scss'
import Tagline from './Tagline'
import Image from 'next/image'

const Hero = () => {
  const [size, setSize] = useState<number>(150)

  return (
    <header className={styles.header}>
      <h1>Matt Burnett</h1>
      <Tagline />
      <div className={styles.photo}>
        <Image src={config.photo} width={size} height={size} alt="Matt Burnett" />
      </div>
    </header>
  )
}

export default Hero
