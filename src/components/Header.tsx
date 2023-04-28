import clsx from 'clsx'
import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  className?: string
  size?: string
}

const getSize = (size: string | undefined, defaultSize: string) => size ?? defaultSize

const H1 = ({ className, size, children }: Props) => (
  <h1 className={clsx(className, getSize(size, 'text-4xl'), 'tracking-widest font-header')}>
    {children}
  </h1>
)

const H2 = ({ className, size, children }: Props) => (
  <h2 className={clsx(className, getSize(size, 'text-3xl'), 'tracking-widest font-header')}>
    {children}
  </h2>
)

const H3 = ({ className, size, children }: Props) => (
  <h3 className={clsx(className, getSize(size, 'text-2xl'), 'tracking-wider font-header')}>
    {children}
  </h3>
)

export const Header = {
  H1,
  H2,
  H3,
}
