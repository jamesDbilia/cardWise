const cron = require('node-cron')

cron.schedule('0 */6 * * *', () => {
  
  async resolve({ input, ctx }) {

  const cards = await ctx.prisma.card.findMany()
  }
})
