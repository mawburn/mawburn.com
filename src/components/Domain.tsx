import { PropsWithChildren } from 'react'

export const Domain = ({ children }: PropsWithChildren) => (
  <strong className="inline-block p-2 font-mono bg-black/80">{children}</strong>
)
