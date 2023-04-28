import fs from 'fs'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'
import { MDXResult } from 'src/components'

const getPostData = async (id: string): Promise<MDXResult> => {
  const fullPath = path.join(process.cwd(), `src/posts/${id}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const mdxSource = await serialize(fileContents)

  return mdxSource
}

export default getPostData
