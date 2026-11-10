import type { ReactNode } from 'react'

type BranchHeaderProps = {
  eyebrow?: string
  title: string
  subtitle?: string
  children?: ReactNode
}

/** Static branch illustration used as the page header on About, Résumé, Contact and the blog. */
export function BranchHeader({ eyebrow, title, subtitle, children }: BranchHeaderProps) {
  return (
    <div className="relative overflow-hidden border-b border-border-subtle bg-surface-dark px-6 py-14">
      <div
        className="pointer-events-none absolute inset-0 select-none opacity-60"
        aria-hidden="true"
      >
        <svg
          className="h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 1200 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          focusable="false"
        >
          <path
            d="M-40 -20 Q 180 40 380 45 T 780 75 T 1240 30"
            stroke="#081018"
            strokeWidth="26"
            strokeLinecap="round"
          />
          <path
            d="M-40 -20 Q 180 40 380 45 T 780 75 T 1240 30"
            stroke="#12222E"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            d="M-40 -20 Q 180 40 380 45 T 780 75 T 1240 30"
            stroke="#1A3345"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.4"
          />
          <path
            d="M120 28 Q 220 95 340 135 T 510 180"
            stroke="#0A151F"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M260 110 Q 320 160 410 195"
            stroke="#0D1C27"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M350 44 Q 460 100 580 125 T 780 160"
            stroke="#0A151F"
            strokeWidth="11"
            strokeLinecap="round"
          />
          <path
            d="M520 110 Q 610 155 700 185"
            stroke="#0D1C27"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M680 145 Q 750 190 830 210"
            stroke="#0F2230"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M620 62 Q 740 105 880 118 T 1120 140"
            stroke="#0A151F"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M820 112 Q 920 150 1040 170"
            stroke="#0D1C27"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M1240 -10 Q 1060 30 890 55 T 640 68"
            stroke="#09131C"
            strokeWidth="16"
            strokeLinecap="round"
          />
          <path
            d="M960 42 Q 880 90 760 120"
            stroke="#0C1924"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <g stroke="#14382B" strokeWidth="2.5" strokeLinecap="round" opacity="0.6">
            <line x1="240" y1="102" x2="215" y2="120" />
            <line x1="280" y1="118" x2="260" y2="140" />
            <line x1="330" y1="132" x2="315" y2="155" />
            <line x1="420" y1="175" x2="400" y2="200" />
            <line x1="480" y1="172" x2="495" y2="198" />
            <line x1="480" y1="88" x2="465" y2="110" />
            <line x1="560" y1="120" x2="540" y2="145" />
            <line x1="640" y1="135" x2="625" y2="160" />
            <line x1="740" y1="152" x2="720" y2="180" />
            <line x1="860" y1="116" x2="840" y2="140" />
            <line x1="980" y1="145" x2="960" y2="170" />
          </g>
          <g stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" opacity="0.4">
            <line x1="250" y1="106" x2="230" y2="122" />
            <line x1="340" y1="135" x2="328" y2="154" />
            <line x1="570" y1="122" x2="555" y2="143" />
            <line x1="750" y1="155" x2="735" y2="178" />
          </g>
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-[880px] space-y-3">
        {eyebrow ? (
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-moss-bright">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">{title}</h1>
        {subtitle ? <p className="text-lg font-semibold text-moss-bright">{subtitle}</p> : null}
        {children}
      </div>
    </div>
  )
}
