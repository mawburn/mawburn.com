import React from 'react'

import LarsImage from '../LarsImage'

import Tagline from './Tagline'

import s from './styles.module.scss'

const HeroBar = () => (
  <div className={s.hero}>
    <Tagline />
    <LarsImage />
  </div>
)

export default HeroBar
