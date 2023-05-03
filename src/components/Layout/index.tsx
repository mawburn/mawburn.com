import { PropsWithChildren } from 'react'

import { Footer } from './Footer'
import { PageHeader } from './PageHeader'

interface LayoutProps extends PropsWithChildren {
  className?: string
}

export const Layout = ({ className, children }: LayoutProps) => (
  <div className="h-full w-full flex flex-col justify-between">
    <div>
      <PageHeader />
      <main className={className ?? 'w-full'}>{children}</main>
    </div>
    <Footer />
  </div>
)
