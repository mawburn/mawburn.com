import cn from 'classnames'
import React from 'react'

import Tagline from '../Tagline'

import s from './styles.module.scss'

const Hero = () => (
  <div className={s.hero}>
    <div className={cn('max-width', s.inner)}>
      <Tagline />
      <div>img</div>
    </div>
  </div>
)

export default Hero
