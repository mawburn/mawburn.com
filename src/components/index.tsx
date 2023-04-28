export { Footer } from './Footer'
export { Header } from './Header'
export { Layout } from './Layout'
export { MDXLoader } from './MDXLoader'
export { PageHeader } from './PageHeader'
export type { MDXResult } from './MDXLoader'

import dynamic from 'next/dynamic'

export const Icon = dynamic(() => import('./Icon') as any, {
  loading: () => <p>Loading...</p>,
})
