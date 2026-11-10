import { useEffect, useState } from 'react'

// `undefined` locale = the visitor's browser locale.
const timeFormat = new Intl.DateTimeFormat(undefined, {
  timeZone: 'America/Los_Angeles',
  timeStyle: 'short',
})

/**
 * Portland's current time, formatted in the visitor's locale (12/24h etc.).
 * Rendered after mount so SSR and hydration markup match.
 */
export function PortlandTime() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 15_000)
    return () => clearInterval(id)
  }, [])

  const formatted = now ? timeFormat.format(now) : '\u00a0'

  return <span className="inline-block min-w-[7.5ch] font-mono tabular-nums">{formatted}</span>
}
