import { PropsWithChildren } from 'react'
import Navbar from '../Navbar'

import styles from './styles.module.scss'

const Header = ({ children }: PropsWithChildren) => (
  <header className={styles.header}>
    <h1>Matt Burnett</h1>
    {children}
    <Navbar />
  </header>
)

export default Header
