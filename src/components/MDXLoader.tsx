import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Image from 'next/image'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { YouTube } from './YouTube'

import { Header } from './Header'
import { Icon } from './Icon'
import { NoBreak } from './NoBreak'
import { Domain } from './Domain'

export type MDXResult = MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>

const ImageLoader = (props: any) => {
  const { alt, ...rest } = props
  return <Image alt={alt} {...rest} />
}

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
  Image: ImageLoader,
  Icon: Icon,
  NoBreak: NoBreak,
  Domain: Domain,
  YouTube,
}

export const MDXLoader = ({ source }: Props) => <MDXRemote {...source} components={components} />
