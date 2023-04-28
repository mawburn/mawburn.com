import { PropsWithChildren } from 'react'

import { Footer } from './Footer'
import { PageHeader } from './PageHeader'

interface LayoutProps extends PropsWithChildren {
  className?: string
}

export const Layout = ({ className, children }: PropsWithChildren<LayoutProps>) => (
  <div className="h-full flex flex-col justify-between">
    <div>
      <PageHeader />
      <main className={className}>{children}</main>
    </div>
    <Footer />
  </div>
)
