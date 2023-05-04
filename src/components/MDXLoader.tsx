import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Image from 'next/image'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

import { Header } from './Header'
import { Icon } from './Icon'
import { NoBreak } from './NoBreak'

export type MDXResult = MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>

const Anchor = ({ children, ...props }: PropsWithChildren<any>) => {
  const { href, target, rel, ...rest } = props

  if (!href) {
    return children
  }

  const isExternal = href.startsWith('http')

  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : target}
      rel={isExternal ? 'noopener noreferrer' : rel}
      {...rest}
    >
      {children}
    </Link>
  )
}

interface Props {
  source: MDXResult
}

const components = {
  h1: Header.H1,
  h2: Header.H2,
  h3: Header.H3,
  a: Anchor,
  Image: Image,
  Icon: Icon,
  NoBreak: NoBreak,
}

export const MDXLoader = ({ source }: PropsWithChildren<Props>) => (
  <MDXRemote {...source} components={components} />
)
