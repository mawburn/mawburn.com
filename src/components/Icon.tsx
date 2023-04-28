interface IconProps {
  name: string
}

export const Icon = ({ name }: IconProps) => (
  <span className={`icon-${name.toLowerCase()}`} title={name} />
)
