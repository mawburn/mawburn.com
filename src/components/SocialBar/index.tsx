import React from 'react'

import gh from './github.svg'
import hn from './hn.svg'
import ig from './instagram.svg'
import li from './linkedin.svg'
import reddit from './reddit.svg'
import s from './styles.module.scss'
import email from './email.svg'

const SocialBar = () => (
  <div className={s.socialBar}>
    <a href="https://www.linkedin.com/in/burnettmatt/" title="LinkedIn">
      <img src={li} alt="linkedin" />
    </a>
    <a href="https://github.com/mawburn" title="Github">
      <img src={gh} alt="github" />
    </a>
    <a href="https://www.instagram.com/mawburn_/" title="Instagram">
      <img src={ig} alt="instagram" />
    </a>
    <a href="https://reddit.com/mawburn" title="Reddit">
      <img src={reddit} alt="reddit" />
    </a>
    <a href="https://news.ycombinator.com/user?id=mawburn" title="Hacker News">
      <img src={hn} alt="hackernews" />
    </a>
    <a href="mailto:mawburn7@gmail.com" title="Email Me">
      <img src={email} alt="email" />
    </a>
  </div>
)

export default SocialBar
