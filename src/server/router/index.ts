// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { EbayRouter } from './ebay'
import { PsaRouter } from './psa'
import { CardRouter } from './card'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('ebay.', EbayRouter)
  .merge('psa.', PsaRouter)
  .merge('auctionCheck.', auctionCheckRouter)
  .merge('card.', CardRouter)

export type AppRouter = typeof appRouter
