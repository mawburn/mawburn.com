import './icons/style.css'

import React from 'react'

import s from './styles.module.scss'

const SocialBar = () => (
  <div className={s.socialBar}>
    <ul>
      <li>
        <a href="https://www.linkedin.com/in/burnettmatt/" title="LinkedIn">
          <span className="icon-linkedin" />
        </a>
      </li>
      <li>
        <a href="https://github.com/mawburn" title="Github">
          <span className="icon-github" />
        </a>
      </li>
      <li>
        <a href="https://www.instagram.com/_mawburn/" title="Instagram">
          <span className="icon-instagram" />
        </a>
      </li>
      <li>
        <a href="https://reddit.com/u/mawburn" title="Reddit">
          <span className="icon-reddit-alien" />
        </a>
      </li>
      <li>
        <a
          href="https://news.ycombinator.com/user?id=mawburn"
          title="Hacker News"
        >
          <span className="icon-hackernews" />
        </a>
      </li>
      <li>
        <a href="mailto:mawburn7@gmail.com" title="Mail">
          <span className="icon-mail" />
        </a>
      </li>
    </ul>
  </div>
)

export default SocialBar
