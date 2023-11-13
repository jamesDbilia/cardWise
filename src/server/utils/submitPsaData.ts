import cheerio from 'cheerio'
import { convertKStringToNumber } from './convertToNumber'

export const submitPsaData = (response: string) => {
  const $ = cheerio.load(response)

  // Initialize an array to store the prices from 2023
  const prices2023: any = []

  // Iterate over each row in the table body
  $('#itemResults tbody tr').each((index, element) => {
    // Extract the date and price from the current row
    const date = $(element).find('td').eq(2).text().trim()
    const priceText = $(element).find('td').eq(3).text().trim()

    // Check if the date contains the year 2023
    if (date.includes('2023')) {
      // Remove the dollar sign and convert the price to a number
      const price = parseFloat(priceText.replace(/[$,]/g, ''))
      // Add the price to the array
      prices2023.push(price)
    }
  })

  console.log(prices2023)
}
