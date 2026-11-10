import { useEffect, useRef } from 'react'

/**
 * Animated Pacific Northwest forest scene. Pure SVG + CSS keyframes (see app.css),
 * server-rendered, no animation JS. The effect below only pauses the animations when the
 * hero is off-screen or the tab is hidden so it costs nothing while you read.
 */
export function ForestHero() {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    let visible = true
    const update = () => (el.dataset.paused = String(!visible || document.hidden))

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      update()
    })
    observer.observe(el)
    document.addEventListener('visibilitychange', update)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', update)
    }
  }, [])

  return (
    <svg
      ref={ref}
      className="forest-hero absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1200 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      data-paused="false"
    >
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0E1A26" />
          <stop offset="50%" stopColor="#182C3D" />
          <stop offset="85%" stopColor="#1E384D" />
          <stop offset="100%" stopColor="#24445C" />
        </linearGradient>
        <linearGradient id="mistAqua" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
          <stop offset="35%" stopColor="#7DD3FC" stopOpacity="0.32" />
          <stop offset="65%" stopColor="#34D399" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="mistEmerald"
          x1="0"
          y1="0"
          x2="1200"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
          <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="treeMidGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16533F" />
          <stop offset="100%" stopColor="#0E3327" />
        </linearGradient>
        <linearGradient id="treeForeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0F382B" />
          <stop offset="100%" stopColor="#081E17" />
        </linearGradient>
      </defs>

      <rect width="1200" height="400" fill="url(#skyGrad)" />

      {/* Distant ridge + fir silhouettes */}
      <path
        d="M0 260 Q 280 215 600 240 T 1200 220 L 1200 400 L 0 400 Z"
        fill="#152B38"
        opacity="0.85"
      />
      <g stroke="#1E4554" strokeWidth="3" strokeLinecap="round" opacity="0.7">
        <line x1="120" y1="250" x2="120" y2="215" />
        <line x1="240" y1="240" x2="240" y2="200" />
        <line x1="390" y1="230" x2="390" y2="185" />
        <line x1="580" y1="245" x2="580" y2="205" />
        <line x1="780" y1="235" x2="780" y2="190" />
        <line x1="960" y1="230" x2="960" y2="190" />
        <line x1="1080" y1="235" x2="1080" y2="195" />
      </g>

      {/* Deep mist */}
      <g className="mist-1" opacity="0.9">
        <rect x="0" y="180" width="2400" height="130" fill="url(#mistAqua)" />
        <ellipse cx="380" cy="240" rx="320" ry="60" fill="#38BDF8" opacity="0.2" />
        <ellipse cx="980" cy="250" rx="360" ry="70" fill="#34D399" opacity="0.18" />
      </g>

      {/* Midground firs */}
      <g className="sway-sm">
        <rect x="220" y="90" width="12" height="310" fill="url(#treeMidGrad)" rx="2" />
        <path
          d="M226 70 L195 130 L257 130 Z M226 115 L185 185 L267 185 Z M226 165 L170 255 L282 255 Z"
          fill="url(#treeMidGrad)"
        />
        <path
          d="M226 72 L198 128 M226 117 L188 183"
          stroke="#34D399"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.8"
        />
        <rect x="480" y="110" width="10" height="290" fill="url(#treeMidGrad)" rx="2" />
        <path
          d="M485 95 L460 145 L510 145 Z M485 135 L445 195 L525 195 Z M485 180 L435 255 L535 255 Z"
          fill="url(#treeMidGrad)"
        />
        <rect x="1020" y="80" width="12" height="320" fill="url(#treeMidGrad)" rx="2" />
        <path
          d="M1026 65 L995 125 L1057 125 Z M1026 110 L985 180 L1067 180 Z M1026 160 L970 250 L1082 250 Z"
          fill="url(#treeMidGrad)"
        />
      </g>

      {/* Foreground mist */}
      <g className="mist-2" opacity="0.85">
        <rect x="0" y="240" width="2400" height="140" fill="url(#mistEmerald)" />
        <ellipse cx="620" cy="300" rx="420" ry="75" fill="#38BDF8" opacity="0.22" />
      </g>

      {/* Foreground Douglas firs with moss highlights */}
      <g className="sway-lg">
        <rect x="90" y="30" width="18" height="370" fill="url(#treeForeGrad)" rx="3" />
        <path
          d="M99 10 L60 85 L138 85 Z M99 65 L48 150 L150 150 Z M99 125 L32 235 L166 235 Z"
          fill="url(#treeForeGrad)"
        />
        <path
          d="M99 130 Q135 122 170 138"
          stroke="#10B981"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M99 70 Q65 62 40 76"
          stroke="#34D399"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.85"
        />
        <rect x="860" y="45" width="16" height="355" fill="url(#treeForeGrad)" rx="3" />
        <path
          d="M868 25 L830 95 L906 95 Z M868 75 L818 160 L918 160 Z M868 135 L802 240 L934 240 Z"
          fill="url(#treeForeGrad)"
        />
        <path
          d="M868 140 Q830 132 795 146"
          stroke="#10B981"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.85"
        />
      </g>

      {/* Understory */}
      <path d="M0 330 C 300 315 750 345 1200 325 L 1200 400 L 0 400 Z" fill="#0A161E" />
      <path
        d="M120 340 Q220 332 320 342 M760 335 Q860 327 960 337"
        stroke="#10B981"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Rain */}
      <g stroke="#7DD3FC" strokeWidth="1.2" strokeLinecap="round" opacity="0.4">
        <line
          x1="160"
          y1="90"
          x2="155"
          y2="130"
          className="rain-line"
          style={{ animationDelay: '0.2s' }}
        />
        <line
          x1="340"
          y1="120"
          x2="335"
          y2="160"
          className="rain-line"
          style={{ animationDelay: '1.1s' }}
        />
        <line
          x1="620"
          y1="80"
          x2="615"
          y2="120"
          className="rain-line"
          style={{ animationDelay: '2.3s' }}
        />
        <line
          x1="820"
          y1="110"
          x2="815"
          y2="150"
          className="rain-line"
          style={{ animationDelay: '0.7s' }}
        />
        <line
          x1="1040"
          y1="95"
          x2="1035"
          y2="135"
          className="rain-line"
          style={{ animationDelay: '1.8s' }}
        />
      </g>
    </svg>
  )
}
