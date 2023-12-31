import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { loggerLink } from '@trpc/client/links/loggerLink'
import { withTRPC } from '@trpc/next'
import superjson from 'superjson'
import type { AppRouter } from '@/server/router'
import type { AppProps } from 'next/app'
import React from 'react'
import { type NextComponentType } from 'next'
import { type PageLayoutType } from '@/types/global'
import 'tailwindcss/tailwind.css'

function App({
  Component,
  pageProps
}: AppProps<{}> & {
  Component: NextComponentType & { layoutType?: PageLayoutType }
}) {
  const { ...componentPageProps } = pageProps

  return (
    <main className='space-y-4 h-full'>
      <Component {...componentPageProps} />
    </main>
  )
}

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '' // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3020}` // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
  config({}) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`

    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error)
        }),
        httpBatchLink({ url })
      ],
      url,
      transformer: superjson
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },

      // To use SSR properly you need to forward the client's headers to the server
      // headers: () => {
      //   if (ctx?.req) {
      //     const headers = ctx?.req?.headers;
      //     delete headers?.connection;
      //     return {
      //       ...headers,
      //       "x-ssr": "1",
      //     };
      //   }
      //   return {};
      // }
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false
})(App)
