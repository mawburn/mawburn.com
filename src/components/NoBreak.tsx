import { PropsWithChildren } from 'react'

export const NoBreak = ({ children }: PropsWithChildren) => (
  <span className="whitespace-nowrap">{children}</span>
)
