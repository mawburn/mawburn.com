import React, { FunctionComponent } from 'react'

import styles from './styles.module.scss'

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => (
  <footer className={styles.footer}>
    © {new Date().getFullYear()} mawburn.com
  </footer>
)

export default Footer
