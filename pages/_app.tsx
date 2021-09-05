import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.documentElement.lang = 'en'
    ;(window as any).dataLayer = (window as any).dataLayer || []

    function gtag() {
      ;(window as any).dataLayer.push(arguments)
    }

    // @ts-ignore
    gtag('js', new Date())

    // @ts-ignore
    gtag('config', 'G-JLP7HLXCFE')
  }, [])

  return <Component {...pageProps} />
}
export default MyApp
