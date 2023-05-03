import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

import { Header } from '../Header'

const headerStyles =
  'flex flex-col px-4 py-2 w-full items-center md:flex-row md:justify-between lg:max-w-w1400 lg:mx-auto'

const navStyles = 'flex justify-center items-center h-full w-full mx-4 mt-2 md:mt-0 md:w-fit'

const menuStyles = 'flex justify-center items-center h-full mt-2 mx-auto gap-2 md:gap-8'

const linkStyles =
  'px-2 h-full text-lg lowercase font-bold cursor tracking-widest border-transparent border-b-2 hover:border-neutral-50 hover:motion-safe:animate-pulse md:text-xl'

export const PageHeader = () => {
  const [currentPage, setCurrentPage] = useState('')

  const scrollTo = useCallback(
    (evt: any) => {
      const elm = document.getElementById('projects')

      if (currentPage === '/' && elm) {
        evt.preventDefault()
        evt.stopPropagation()
        elm.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
    [currentPage]
  )

  useEffect(() => {
    if (window?.location?.pathname) {
      setCurrentPage(window.location.pathname)
    }
  }, [])

  const pageName =
    currentPage === '/' ? (
      <Header.H1 size="text-3xl">Matt Burnett</Header.H1>
    ) : (
      <Link href="/" className="text-3xl font-header">
        Matt Burnett
      </Link>
    )

  return (
    <header className={headerStyles}>
      {pageName}
      <nav className={navStyles}>
        <ul className={menuStyles}>
          <li>
            <Link href="/resume" className={linkStyles}>
              Resumé
            </Link>
          </li>
          <li>
            <Link href="/#projects" onClick={scrollTo} className={linkStyles}>
              Projects
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
