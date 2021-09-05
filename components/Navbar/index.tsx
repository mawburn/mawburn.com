import styles from './styles.module.scss'
import clsx from 'clsx'

interface NavbarProps {
  url: 'home' | 'about' | 'projects'
}

const Navbar = ({ url }: NavbarProps) => (
  <nav className={styles.nav}>
    <ul>
      {url !== 'home' && <li>Home</li>}
      <li className={clsx({ [styles.active]: url === 'about' })}>About me</li>
      <li className={clsx({ [styles.active]: url === 'projects' })}></li>
    </ul>
    <ul className={styles.social}>
      <li></li>
    </ul>
  </nav>
)

export default Navbar
