import { createRouter } from './context'
import { z } from 'zod'
import puppeteer from 'puppeteer'
import fetch from 'node-fetch'
import cheerio from 'cheerio'
export const EbayRouter = createRouter().query('get-listings', {
  input: z.object({
    url: z.string()
  }),
  async resolve({ input, ctx }) {
    const { url } = input
    const username = process.env.NORMAL_USERNAME
    const password = process.env.NORMAL_PASSWORD
    const body = {
      source: 'universal',
      url,
      geo_location: 'United States'
    }

    const response = await fetch('https://realtime.oxylabs.io/v1/queries', {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')
      }
    })

    const { results }: any = await response.json()

    const htmlString = results[0].content

    const $ = cheerio.load(htmlString)
    const itemsData: any = []
    // Find all 'li' elements within the specified class
    $('.s-item').each((index, element) => {
      // For each item, find the price, bids, and time left using the specified classes.
      const title = $(element).find('.s-item__title').text().trim()
      const wordToFind = 'charizard'
      let regex = new RegExp(`\\b${wordToFind}\\b`, 'i') // 'i' for case-insensitive

      if (regex.test(title)) {
        const price = $(element).find('.s-item__price').text().trim()
        const bids = $(element)
          .find('.s-item__bids.s-item__bidCount')
          .text()
          .trim()
        const timeLeft = $(element).find('.s-item__time-left').text().trim()
        // Add the extracted data to your array.
        itemsData.push({ price, bids, timeLeft })
      }
    })
  }
})
// .query('get-event', {
//   input: z.object({
//     eventId: z.string()
//   }),
//   async resolve({ input, ctx }) {
//     const { eventId } = input
//     const { prisma } = ctx

//     try {
//       const res = await prisma.event.findFirst({
//         where: { eventId }
//       })

//       return {
//         success: true,
//         payload: res
//       }
//     } catch (e) {
//       return {
//         error: 'event not found',
//         status: 404
//       }
//     }
//   }
// })
// // Grabs the next 5 events
// .query('get-upcoming-events', {
//   async resolve({ ctx }) {
//     const { prisma } = ctx

//     try {
//       const res = await prisma.event.findMany({
//         where: {
//           endTime: {
//             gte: new Date()
//           },
//           hasBeenClosed: false
//         },
//         orderBy: {
//           startTime: 'asc'
//         },
//         take: 20
//       })

//       return {
//         success: true,
//         payload: res
//       }
//     } catch (e) {
//       return {
//         error: 'event not found',
//         status: 404
//       }
//     }
//   }
// })
// .query('get-past-events', {
//   async resolve({ ctx }) {
//     const { prisma } = ctx

//     try {
//       const res = await prisma.event.findMany({
//         where: {
//           OR: [
//             {
//               endTime: {
//                 lte: new Date()
//               }
//             },
//             { hasBeenClosed: true }
//           ]
//         },
//         orderBy: {
//           startTime: 'asc'
//         }
//       })

//       return {
//         success: true,
//         payload: res
//       }
//     } catch (e) {
//       return {
//         error: 'event not found',
//         status: 404
//       }
//     }
//   }
// })
// .query('bot-join-event', {
//   input: z.object({
//     eventId: z.string()
//   }),
//   async resolve({ input }) {
//     const { eventId } = input

//     const username = 'recording-bot'

//     const { token } = await sdk100ms.getAppToken({
//       roomId: eventId,
//       role: username,
//       userId: 'bot'
//     })

//     return {
//       username,
//       eventId,
//       token
//     }
//   }
// })
// .mutation('create-group', {
//   input: z.object({
//     eventId: z.string(),
//     members: z.string()
//   }),
//   async resolve({ input, ctx }) {
//     const { prisma, session } = ctx

//     const { eventId, members } = input

//     let groupInfo: EventGroup | null = null

//     if (session?.user?.id) {
//       const { id: userId } = session.user
//       groupInfo = await prisma.eventGroup.upsert({
//         where: {
//           createdById_eventId: { createdById: session.user.id, eventId }
//         },
//         create: { eventId, createdById: session.user.id },
//         update: {}
//       })

//       await prisma.eventGroupMember.upsert({
//         where: { userId_eventId: { userId, eventId } },
//         create: { eventId, userId, groupId: groupInfo.id },
//         update: { groupId: groupInfo.id }
//       })

//       // email friends
//       const emails = members
//         .split(/[ \n,]+/)
//         .map((item: string) => item.trim())

//       console.log('emails :>> ', emails)
//       if (emails.length > 0) {
//         const invites = await prisma.eventInvite.createMany({
//           data: emails.map((email) => ({
//             email,
//             eventId,
//             groupId: groupInfo!.id
//           })),
//           skipDuplicates: true
//         })
//         // send emails
//         // generate link from groupId and eventId
//         // email should navigate friend to signup/in with groupId &|| eventId
//         // on signup,
//         // skip step 2 if user was invited by a friend
//       }
//     }

//     return {
//       success: true,
//       group: groupInfo
//     }
//   }
// })
