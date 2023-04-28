import fs from 'fs'
import path from 'path'
import { remark } from 'remark'
import html from 'remark-html'

const getPostData = async (id: string) => {
  const fullPath = path.join(process.cwd(), `/posts/${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const processedContent = await remark().use(html).process(fileContents)
  const contentHtml = processedContent.toString()

  return contentHtml
}

export default getPostData
