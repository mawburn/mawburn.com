import clsx from 'clsx'
import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  className?: string
}

const getClass = (className: string | undefined, defaultClass: string) => className ?? defaultClass

const H1 = ({ className, children }: Props) => (
  <h1 className={clsx(getClass(className, 'text-4xl'), 'tracking-widest font-header')}>
    {children}
  </h1>
)

const H2 = ({ className, children }: Props) => (
  <h2 className={clsx(getClass(className, 'text-3xl'), 'tracking-widest font-header')}>
    {children}
  </h2>
)

const H3 = ({ className, children }: Props) => (
  <h3 className={clsx(getClass(className, 'text-2xl'), 'tracking-wider font-header')}>
    {children}
  </h3>
)

export const Header = {
  H1,
  H2,
  H3,
}
