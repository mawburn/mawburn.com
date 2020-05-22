import cn from 'classnames'
import React, { FC } from 'react'

import s from './styles.module.scss'

interface ColorProps {
  name?: string
}

const Color: FC<ColorProps> = ({ name = null, children }) => (
  <span className={cn(s[(name ?? (children as string)).toLowerCase()], s.span)}>
    {children}
  </span>
)

export default Color
