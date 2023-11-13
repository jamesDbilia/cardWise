const browserObject = require('./browser')

export const scrape = async (url: string, target: string) => {
  console.log('🚀 ~ file: pageController.ts:5 ~ scrape ~ target:', target)
  try {
    let browser = await browserObject.startBrowser()
    let page = await browser.newPage()
    console.log(`Navigating to ${url}...`)
    await page.goto(url, { waitUntil: 'domcontentloaded' })
    // Wait for the required DOM to be rendered
    // Get the link to all the required books
    // Get page data
    await page.waitForSelector('.srp-river-results')

    const quotes = await page.evaluate(() => {
      // Fetch the first element with class "quote"
      const quote = document.querySelector('.srp-river-results')
      return quote
    })

    console.log('🚀 ~ file: pageController.js:25 ~ urls ~ urls:', quotes)
    await browser.close()
    return quotes
  } catch (err) {
    console.log('Could not resolve the browser instance => ', err)
  }
}
