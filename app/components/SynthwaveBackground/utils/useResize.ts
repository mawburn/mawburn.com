import type { RefObject } from 'react'
import { useEffect, useState } from 'react'

type Size = {
  width: number
  height: number
}

export function useResize(ref: RefObject<HTMLDivElement | null>) {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 })

  useEffect(() => {
    if (!ref.current) return

    const updateSize = () => {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect()
        setSize({ width, height })
      }
    }

    updateSize()

    const element = ref.current
    const observer = new ResizeObserver(updateSize)
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [ref])

  return size
}
