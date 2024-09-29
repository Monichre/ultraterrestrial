// 'use server'

// // import 'server-only'

// import { getXataClient } from '@/services/xata'
// import type { EventsRecord } from '@/services/xata'
// import type { CreateUserSavedItemBase } from './actions.types'

// const xata = getXataClient()
// export interface CreateUserSavedEventProps extends CreateUserSavedItemBase {
//   event: EventsRecord['id']
// }

// export const createUserSavedEvent = async ({
//   userNote,
//   event,
//   theory,
//   userId,
// }: CreateUserSavedEventProps) => {
//   console.log('event: ', event)
//   console.log('userId: ', userId)
//   console.log('theory: ', theory)

//   const record = await xata.db[`user-saved-events`].create({
//     user: userId,
//     event,
//     theory,
//     note: userNote?.content,
//     'note-title': userNote?.title,
//   })

//   console.log('user-saved-events', record)
//   return record
// }
