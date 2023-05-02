import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Image from 'next/image'
import { PropsWithChildren } from 'react'

import { Header } from './Header'
import { Icon } from './Icon'
import { NoBreak } from './NoBreak'

export type MDXResult = MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>

interface Props {
  source: MDXResult
}

const components = {
  h1: Header.H1,
  h2: Header.H2,
  h3: Header.H3,
  Image: Image,
  Icon: Icon,
  NoBreak: NoBreak,
}

export const MDXLoader = ({ source }: PropsWithChildren<Props>) => (
  <MDXRemote {...source} components={components} />
)
