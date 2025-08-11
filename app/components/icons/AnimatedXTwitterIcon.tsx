import { useEffect, useRef, useState } from 'react'

import { TwitterBirdIcon } from './TwitterBirdIcon'
import { XIcon } from './XIcon'

const INIT_PAUSE = 2000

export function AnimatedXTwitterIcon({ size = 34 }: { size?: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const [showBird, setShowBird] = useState(false)
  const [isFlipping, setIsFlipping] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const pauseTimeRef = useRef(INIT_PAUSE)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)

          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }

          setShowBird(false)
          setIsFlipping(false)
          pauseTimeRef.current = INIT_PAUSE

          const runAnimation = () => {
            setTimeout(() => {
              setIsFlipping(true)

              setTimeout(() => {
                setShowBird(true)
                setIsFlipping(false)

                setTimeout(() => {
                  setIsFlipping(true)

                  setTimeout(() => {
                    setShowBird(false)
                    setIsFlipping(false)
                    pauseTimeRef.current = pauseTimeRef.current * 2
                  }, 125)
                }, 1000)
              }, 125)
            }, pauseTimeRef.current)
          }

          const scheduleNext = () => {
            const totalTime = pauseTimeRef.current + 1250
            intervalRef.current = setTimeout(() => {
              runAnimation()
              scheduleNext()
            }, totalTime)
          }

          runAnimation()
          scheduleNext()
        } else if (!entry.isIntersecting && isVisible) {
          setIsVisible(false)
          if (intervalRef.current) {
            clearTimeout(intervalRef.current)
            intervalRef.current = null
          }
          setShowBird(false)
          setIsFlipping(false)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
      if (intervalRef.current) {
        clearTimeout(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isVisible])

  return (
    <div
      ref={ref}
      className="relative"
      style={{
        width: size,
        height: size,
        perspective: '1000px',
      }}
    >
      <div
        className={`
          relative w-full h-full
          transition-transform duration-[250ms] ease-in-out
          ${isFlipping ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'}
        `}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {showBird ? <TwitterBirdIcon size={size} /> : <XIcon size={size} />}
        </div>
      </div>
    </div>
  )
}
