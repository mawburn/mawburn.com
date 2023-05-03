import Document, { Head, Html, Main, NextScript } from 'next/document'
import localConfig from 'src/lib/localConfig'

const descr = 'Matt Burnett - Software Engineer' as const

const ogImg = 'https://mawburn.com/img/photo.jpg' as const

class MyDocument extends Document {
  render() {
    return (
      <Html style={{ scrollBehavior: 'smooth' }}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content={descr} />
          <meta property="og:title" content={localConfig.title} />
          <meta property="og:description" content={descr} />
          <meta property="og:image" content={ogImg} />
          <meta property="og:image:url" content={ogImg} />
          <meta property="og:image:secure_url" content={ogImg} />
          <meta property="og:site_name" content={descr} />
          <meta name="twitter:title" content={localConfig.title} />
          <meta name="twitter:description" content={descr} />
          <meta name="twitter:image" content={ogImg} />
          <meta name="twitter:card" content="summary" />
          <meta name="description" content={descr} />
          <meta name="og:description" content={descr} />
          <meta name="twitter:creator" content={`@${localConfig.twitter}`} />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Fira+Mono&family=Permanent+Marker&family=Raleway:ital,wght@0,400;0,700;1,700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
