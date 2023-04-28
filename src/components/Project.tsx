import Image from 'next/image'
import Link from 'next/link'

import { Icon } from './Icon'
import { PropsWithChildren } from 'react'

interface ProjectProps extends PropsWithChildren {
  url: string
  title: string
  image: string
  tags: string[]
}

export const Project = ({ url, title, image, tags, children }: ProjectProps) => (
  <Link
    href={url}
    className="flex flex-col w-60 h-72 border-4 border-neutral-50 bg-neutral-900/90 pt-2 text-base justify-between"
  >
    <div>
      <h3 className="w-ful text-center text-xl font-bold py-1">{title}</h3>
      <Image src={image} alt={title} width={270} height={152} loading="lazy" />
    </div>
    <p className="flex h-full items-center px-2 text-xs text-ellipsis overflow-hidden">
      {children}
    </p>
    <div className="flex w-full items-center gap-1 border-t-2 border-neutral-50 px-1 py-2">
      {tags.map(tag => (
        <Icon name={tag} key={`profile${tag}`} />
      ))}
    </div>
  </Link>
)
