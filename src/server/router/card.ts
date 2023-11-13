import z from 'zod'
import { createRouter } from './context'
import { crawlSite } from '../utils/crawlSite'
import { submitPsaData } from '../utils/submitPsaData'

export const CardRouter = createRouter().mutation('add-card', {
  input: z.object({
    psaUrl: z.string(),
    searchUrl: z.string()
    // notIncludesKeywords: z.string()
  }),
  async resolve({ input, ctx }) {
    const { psaUrl, searchUrl } = input

    const data = await crawlSite(psaUrl)

    await submitPsaData(data)
  }
})
