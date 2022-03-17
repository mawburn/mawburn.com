import styles from './styles.module.scss'
import clsx from 'clsx'
import config from '../../lib/config'
import utilStyle from '../../styles/util.module.scss'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'

const Navbar = () => {
  const { pathname } = useRouter()

  return (
    <nav className={styles.nav}>
      <ul>
        {pathname !== '/' && (
          <li className={styles.navlink}>
            <Link href="/">Home</Link>
          </li>
        )}
        <li className={clsx(styles.navlink, { [styles.active]: pathname === '/about' })}>
          <Link href="/about">About me</Link>
        </li>
        <li className={clsx(styles.navlink, { [styles.active]: pathname === '/projects' })}>
          <Link href="/projects">Projects</Link>
        </li>
        <li className={clsx(styles.navlink, { [styles.active]: pathname === '/gm' })}>
          <Link href="/gm">GMing</Link>
        </li>
      </ul>
      <ul className={styles.social}>
        <li>
          <a href={config.linkedin} rel="noopener" title="LinkedIn">
            <div className={styles.licontent}>
              <span className="icon-linkedin" />
            </div>
          </a>
        </li>
        <li>
          <a href={config.github} rel="noopener" title="GitHub">
            <div className={styles.licontent}>
              <span className="icon-github" />
            </div>
          </a>
        </li>
        <li>
          <a
            href={`https://twitter.com/${config.twitter}`}
            rel="noopener"
            title={`Twitter @${config.twitter}`}
          >
            <div className={styles.licontent}>
              <span className="icon-twitter" />
            </div>
          </a>
        </li>
        <li>
          <a href={config.instagram} rel="noopener" title="Instagram">
            <div className={styles.licontent}>
              <span className="icon-instagram" />
            </div>
          </a>
        </li>
        <li>
          <a href={config.reddit} rel="noopener" title="Reddit">
            <div className={styles.licontent}>
              <span className="icon-reddit" />
            </div>
          </a>
        </li>
        <li className={utilStyle.hideMobile}>
          <a href={config.spotify} rel="noopener" title="Spotify">
            <div className={styles.licontent}>
              <span className="icon-spotify" />
            </div>
          </a>
        </li>
        <li className={utilStyle.hideBelowDesktop}>
          <a href={config.hackernews} rel="noopener" title="Hacker News">
            <div className={styles.licontent}>
              <span className="icon-ycombinator" />
            </div>
          </a>
        </li>
        <li>
          <a href={`mailto:${config.email}`} rel="noopener" title="Email">
            <div className={styles.licontent}>
              <span className="icon-gmail" />
            </div>
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
