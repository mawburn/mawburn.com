import { createRequestHandler } from 'react-router'

import { preventDataCaching, preventErrorCaching } from '../app/utils/cache'

declare global {
  interface CloudflareEnvironment extends Env {}
}

declare module 'react-router' {
  export interface AppLoadContext {
    cloudflare: {
      env: CloudflareEnvironment
      ctx: ExecutionContext
    }
  }
}

const requestHandler = createRequestHandler(
  () => import('virtual:react-router/server-build'),
  import.meta.env.MODE
)

export default {
  async fetch(request, env, ctx) {
    const response = await requestHandler(request, {
      cloudflare: { env, ctx },
    })
    return preventDataCaching(request, preventErrorCaching(response))
  },
} satisfies ExportedHandler<CloudflareEnvironment>
