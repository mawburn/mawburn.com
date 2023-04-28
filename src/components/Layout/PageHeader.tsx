import { useEffect, useState } from 'react'
import { Header } from '../Header'
import Link from 'next/link'
import clsx from 'clsx'

export const PageHeader = () => {
  const [currentPage, setCurrentPage] = useState('')

  useEffect(() => {
    if (window?.location?.pathname) {
      setCurrentPage(window.location.pathname)
    }
  }, [])

  const myName =
    currentPage === '/' ? (
      <Header.H1>Matt Burnett</Header.H1>
    ) : (
      <Link href="/" className="text-4xl font-header">
        Matt Burnett
      </Link>
    )

  const flexFull = 'flex h-full'
  const linkClass =
    'px-2 h-full cursor border-transparent border-b-2 hover:border-neutral-50 hover:motion-safe:animate-pulse'

  return (
    <header className="flex justify-between px-4 py-2">
      {myName}
      <nav className={flexFull}>
        <ul
          className={clsx(
            flexFull,
            'justify-center items-center gap-4 text-xl font-bold tracking-widest lowercase'
          )}
        >
          <li className={clsx(flexFull)}>
            <Link href="/resume" className={clsx(linkClass)}>
              Resume
            </Link>
          </li>
          <li className={clsx(flexFull)}>
            <Link href="/projects" className={clsx(linkClass)}>
              Projects
            </Link>
          </li>
          <li className={clsx(flexFull)}>
            <Link href="socials" className={clsx(linkClass)}>
              socials
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
