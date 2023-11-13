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
      console.log('🚀 ~ file: ebay.ts:27 ~ data ~ elements:', elements)
    })

    console.log(data)

    await browser.close()

    return {
      success: true,
      data
    }
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
// }
// })
