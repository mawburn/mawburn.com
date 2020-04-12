import cn from 'classnames'
import React from 'react'

import Tagline from '../Tagline'

import Image from '../image'

import s from './styles.module.scss'

const Hero = () => (
  <div className={s.hero}>
    <div className={cn('max-width', s.inner)}>
      <div className={s.tagline}>
        <Tagline />
      </div>
      <div className={s.img}>
        <Image />
      </div>
    </div>
  </div>
)

export default Hero
