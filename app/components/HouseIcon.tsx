interface HouseIconProps {
  className?: string
}

export function HouseIcon({ className = '' }: HouseIconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M15.4 7 14 5.6V2c0-.6-.5-1-1-1h-1a1 1 0 0 0-1 1v.6l-2-2C8.7.3 8.5 0 8 0s-.7.3-1 .6L.5 7c-.3.3-.5.6-.5 1 0 .6.4 1 1 1h1v6c0 .6.5 1 1 1h3v-5c0-.6.5-1 1-1h2c.6 0 1 .5 1 1v5h3c.6 0 1-.5 1-1V9h1c.6 0 1-.4 1-1 0-.4-.2-.7-.6-1z"
        fill="currentColor"
      />
    </svg>
  )
}
