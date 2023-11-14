import cheerio from 'cheerio'
import { convertKStringToNumber } from './convertToNumber'
import { PriceInfo } from '@/types'

export const submitPsaData = (response: string) => {
  const $ = cheerio.load(response)
  const normalPrices: PriceInfo[] = []
  const offCenterPrices: PriceInfo[] = []
  const tableRows = $('#itemResults tbody tr')

  const endDate = tableRows.first().find('td').eq(2).text().trim()

  const startDate = tableRows.last().find('td').eq(2).text().trim()

  $('#itemResults tbody tr').each((index, element) => {
    const date = $(element).find('td').eq(2).text().trim()
    const priceText = $(element).find('td').eq(3).text().trim()
    const grade = $(element).find('td').eq(4).text().trim()
    if (date.includes('2022') || date.includes('2023')) {
      const price = parseFloat(priceText.replace(/[$,]/g, ''))
      if (grade.includes('(OC)')) {
        offCenterPrices.push({
          price,
          date,
          grade: Number(grade.split('(')[0])
        })
      } else normalPrices.push({ price, date, grade: Number(grade) })
    }
  })

  return { normalPrices, offCenterPrices, startDate, endDate }
}
