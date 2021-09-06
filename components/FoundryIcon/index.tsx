import Image from 'next/image'
import styles from './styles.module.scss'

const FoundryIcon = () => (
  <div title="FoundryVTT" className={styles.icon}>
    <Image src="/img/foundryvtt.webp" width={16} height={16} alt="FoundryVTT" />
  </div>
)

export default FoundryIcon
