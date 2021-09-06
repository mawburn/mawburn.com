import styles from './styles.module.scss'

const Footer = () => (
  <>
    <div className={styles.spacer} />
    <footer className={styles.footer}>&copy; {new Date().getFullYear()} mawburn.com</footer>
  </>
)

export default Footer
