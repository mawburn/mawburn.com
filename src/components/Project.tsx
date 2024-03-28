import Image from 'next/image'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

import { Icon } from './Icon'

interface ProjectProps extends PropsWithChildren {
  url: string
  title: string
  image: string
  tags: string[]
  newTab?: boolean
}

export const Project = ({ url, title, image, tags, newTab, children }: ProjectProps) => (
  <Link
    href={url}
    target={newTab ? '_blank' : '_self'}
    className="flex flex-col md:flex-row items-center w-72 md:w-full my-2 text-base justify-beginning md:justify-center"
  >
    <Image
      className="border-2 border-neutral-50"
      src={image}
      alt={title}
      width={270}
      height={152}
      loading="lazy"
    />
    <div className="flex flex-col justify-between pl-4 py-2 overflow-hidden">
      <h3 className="text-xl font-bold text-center md:text-left my-2 md:my-0">{title}</h3>
      <p className="text-sm text-ellipsis overflow-hidden">{children}</p>
      <div className="flex items-center gap-2 mt-2 py-2">
        <strong>Tech:</strong>
        {tags.map(tag => (
          <Icon name={tag} key={`profile${tag}`} />
        ))}
      </div>
    </div>
  </Link>
)
