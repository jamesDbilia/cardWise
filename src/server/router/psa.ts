import { createRouter } from './context'
import { z } from 'zod'
import puppeteer from 'puppeteer'

export const PsaRouter = createRouter().query('get-listing', {
  input: z.object({
    // eventId: z.string()
  }),
  async resolve({ input, ctx }) {
    const { prisma } = ctx
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(
      'https://www.ebay.ca/sch/i.html?_from=R40&_trksid=p4432023.m570.l1313&_nkw=wayne+gretzky+rookie+card&_sacat=0'
    )

    // Extract data from the page using DOM manipulation
    const data = await page.evaluate(() => {
      const elements = document.querySelectorAll('s-item s-item__pl-on-bottom')
    })

    await browser.close()

    return {
      success: true,
      data
    }
  }
})
