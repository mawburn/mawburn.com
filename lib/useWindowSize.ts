import { useState, useEffect } from 'react'
import v from '../styles/exports.module.scss'

interface Size {
  screen: 'phone' | 'tablet' | 'small' | 'desktop'
  width: number | undefined
  height: number | undefined
  isPhone: boolean
  isTablet: boolean
  isSmall: boolean
  isDesktop: boolean
}

const makeInt = (size: string): number => Number(size.replace('px', ''))

const sizes = {
  phone: makeInt(v.sizePhone),
  tablet: makeInt(v.sizeTablet),
  small: makeInt(v.sizeSmall),
  desktop: makeInt(v.sizeDesktop),
}

const useWindowSize = (): Size => {
  const [windowSize, setWindowSize] = useState<Size>({
    screen: 'phone',
    width: undefined,
    height: undefined,
    isPhone: false,
    isTablet: false,
    isSmall: false,
    isDesktop: false,
  })

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth

      const screen =
        width <= sizes.phone
          ? 'phone'
          : width <= sizes.tablet
          ? 'tablet'
          : width <= sizes.small
          ? 'small'
          : 'desktop'

      setWindowSize({
        screen,
        width,
        height: window.innerHeight,
        isPhone: screen === 'phone',
        isTablet: screen === 'tablet',
        isSmall: screen === 'small',
        isDesktop: screen === 'desktop',
      })
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

export default useWindowSize
