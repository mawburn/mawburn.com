import { PropsWithChildren } from 'react'

const H1 = ({ children }: PropsWithChildren) => <h1>{children}</h1>

const H2 = ({ children }: PropsWithChildren) => <h2>{children}</h2>

const H3 = ({ children }: PropsWithChildren) => <h2>{children}</h2>

export const Header = {
  H1,
  H2,
  H3,
}
