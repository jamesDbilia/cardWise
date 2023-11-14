const username = process.env.NORMAL_USERNAME
const password = process.env.NORMAL_PASSWORD
export const crawlSite = async (url: string) => {
  const body = {
    source: 'universal',
    url,
    geo_location: 'United States',
    render: 'html'
  }

  const response: any = await fetch('https://realtime.oxylabs.io/v1/queries', {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')
    }
  })

  const { results } = await response.json()
  return results[0].content
}
