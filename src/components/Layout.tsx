import { PropsWithChildren } from 'react'
import { PageHeader } from './PageHeader'
import { Footer } from './Footer'

interface LayoutProps {}

export const Layout = ({ children }: PropsWithChildren<LayoutProps>) => (
  <>
    <PageHeader />
    <main>{children}</main>
    <Footer />
  </>
)
