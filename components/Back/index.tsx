import Link from 'next/link'

import styles from './styles.module.scss'

interface BackProps {
  page: string
}

const Back = ({ page }: BackProps) => (
  <div className={styles.backBtn}>
    <Link href={page}>&lt; Back</Link>
  </div>
)

export default Back
