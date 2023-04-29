import { GetServerSideProps } from 'next'

const EXTERNAL_DATA_URL = 'https://mawburn.com'

function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${EXTERNAL_DATA_URL}/</loc>
    </url>
    <url>
      <loc>${EXTERNAL_DATA_URL}/resume</loc>
    </url>
  </urlset>
 `
}

export const getServerSideProps: GetServerSideProps = async context => {
  const res = context.res!

  // const posts = ['test']
  // const projects = ['test2']

  const sitemap = generateSiteMap()

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

function SiteMap() {}

export default SiteMap
