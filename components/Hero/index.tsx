import Image from 'next/image'

import config from '../../lib/config'
import useWindowSize from '../../lib/useWindowSize'
import styles from './styles.module.scss'
import Tagline from './Tagline'

const Hero = () => {
  const { screen } = useWindowSize()

  return (
    <div className={styles.hero}>
      <Tagline screen={screen} />
      <div>
        <div className={styles.photo}>
          <Image src={config.photo} width={150} height={150} alt="Matt Burnett" />
        </div>
        <div className={styles.heHimText}>
          <em>He/Him</em>
        </div>
      </div>
    </div>
  )
}

export default Hero
