import AddCard from '@/components/AddCard'
import { trpc } from '@/utils/trpc'
import type { NextPage } from 'next'
const cron = require('node-cron')

const Home: NextPage = () => {
  cron.schedule('0 */6 * * *', () => {
    const { data } = trpc.useQuery(['ebay.get-listings'])
  })
  // const { data } = trpc.useQuery([
  //   'ebay.get-listings',
  //   {
  //     url: 'https://www.ebay.ca/itm/266472870667?hash=item3e0b05530b%3Ag%3AYVsAAOSwmUFlOW-f&amdata=enc%3AAQAIAAAA8NQwtrwoquvVaUN8Rqwqw8nPAUCVApokpxACbzsBpSJnRDWy3ElB4BVLWtACMZbVVu21iOVpf9bT9uslHVw8AvR52Ug6RPXFwL%2F5zVN2ehVst0bNRswggMR5zbeB0My3cDsUcOMsJ06EvEJsji8foNb1xthb2eCzHduF7YuzkVqFRXHgxXeRX6kTKgTqKYcRuY9KrkxKk4CaUWru1r5PjIVbHptkU58e41eppokJ2Ka0gv1o%2B2JU5nRXGX%2F926uhgFnzp%2FQUa0Bag6lHOT8uFkDtdyhgMAlyXdo2JqOsyYrk3q%2Fqg39O6JhfBP8rTxSEYA%3D%3D%7Ctkp%3ABk9SR5ziqZX0Yg&LH_Auction=1'
  //   }
  // ])
  return (
    <>
      <AddCard />
    </>
  )
}

export default Home
