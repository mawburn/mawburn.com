import cn from 'classnames'
import React from 'react'

import SocialBar from '../SocialBar'

import s from './styles.module.scss'

const Header = () => (
  <div className={s.header}>
    <div className={cn('max-width', s.inner)}>
      <SocialBar />
    </div>
  </div>
)

export default Header
