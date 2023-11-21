import z from 'zod'
import { createRouter } from './context'
import { crawlSite } from '../utils/crawlSite'
import { submitPsaData } from '../utils/submitPsaData'
import cheerio from 'cheerio'

export const CardRouter = createRouter().mutation('add-card', {
  input: z.object({
    name: z.string(),
    brand: z.string(),
    year: z.string(),
    psaUrl: z.string(),
    ebayUrl: z.string(),
    notIncludesKeywords: z.string(),
    includesKeywords: z.string()
  }),
  async resolve({ input, ctx }) {
    const {
      name,
      psaUrl,
      ebayUrl,
      brand,
      year,
      notIncludesKeywords,
      includesKeywords
    } = input
    // submit psa url as so with no grade
    // https://www.psacard.com/auctionprices/hockey-cards/1979-o-pee-chee/wayne-gretzky/values/321695
    // if average price is less than 200, stop going down grades

    const card = await ctx.prisma.card.create({
      data: {
        name,
        brand,
        year: Number(year),
        psaUrl,
        ebayUrl,
        includesKeywords,
        notIncludesKeywords
      }
    })

    const valuesArray: number[] = []
    for (let i = 10; i > 0; i -= 0.5) {
      if (i !== 10 && valuesArray.length > 0 && !valuesArray.includes(i)) {
        console.log('BREAK')
        continue
      }
      const siteData = await crawlSite(`${psaUrl}#g=${i}`)

      if (valuesArray.length === 0) {
        const $ = cheerio.load(siteData)
        $('a[data-gradevalue]').each((index, element) => {
          const value = $(element).attr('data-gradevalue')
          valuesArray.push(Number(value))
        })
      }
      console.log('🚀 ~ file: card.ts:56 ~ $ ~ valuesArray:', valuesArray)

      const { normalPrices, offCenterPrices, startDate, endDate } =
        await submitPsaData(siteData)

      let averageNormalPrice = 0
      if (!normalPrices.length && !offCenterPrices.length) continue
      const grade = {
        cardId: card.id,
        grade: i,
        gradingCompany: 'psa'
      }
      if (!!normalPrices.length) {
        console.log(i)
        const totalNormalPrices = normalPrices
          .filter((_, i) => i < 10)
          .map((item) => item.price)
          .reduce((price, newPrice) => price + newPrice, 0)
        console.log(
          '🚀 ~ file: card.ts:75 ~ resolve ~ totalNormalPrices:',
          totalNormalPrices
        )

        averageNormalPrice =
          totalNormalPrices /
          (normalPrices.length > 10 ? 10 : normalPrices.length)

        console.log(
          '🚀 ~ file: card.ts:77 ~ resolve ~ averageNormalPrice:',
          averageNormalPrice
        )

        if (averageNormalPrice < 200) {
          i = 0
          break
        }

        normalPrices.forEach(async ({ price }, i) => {
          if (i > 5) return

          await ctx.prisma.individualGrade.create({
            data: {
              ...grade,
              price,
              type: 'normal'
            }
          })
        })
      }

      let averageOffCenterPrice = 0
      if (!!offCenterPrices.length) {
        offCenterPrices.forEach(async ({ price }, i) => {
          if (i > 5) return
          await ctx.prisma.individualGrade.create({
            data: {
              ...grade,
              price,
              type: 'OC'
            }
          })
        })

        const totalOffCenterPrices = offCenterPrices
          .filter((_, i) => i < 10)
          .map((item) => item.price)
          .reduce((price, newPrice) => price + newPrice, 0)

        averageOffCenterPrice =
          totalOffCenterPrices /
          (offCenterPrices.length > 10 ? 10 : offCenterPrices.length)
        console.log(
          '🚀 ~ file: card.ts:118 ~ resolve ~ averageOffCenterPrice:',
          averageOffCenterPrice
        )
      }

      await ctx.prisma.averageGrade.create({
        data: {
          grade: i,
          cardId: card.id,
          averagePrice: averageNormalPrice,
          averageOffCenterPrice: averageOffCenterPrice,
          startDate,
          endDate,
          gradingCompany: 'psa'
        }
      })
    }
  }
})
