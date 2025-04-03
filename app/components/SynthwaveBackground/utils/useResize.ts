import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

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
    
    const observer = new ResizeObserver(updateSize)
    observer.observe(ref.current)
    
    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [ref])

  return size
}