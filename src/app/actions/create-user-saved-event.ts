'use server'
import { getXataClient } from '@/lib/xata'
import type { EventsRecord } from '@/lib/xata'
import type { CreateUserSavedItemBase } from './actions.types'
const xata = getXataClient()
export interface CreateUserSavedEventProps extends CreateUserSavedItemBase {
  event: EventsRecord['id']
}

export const createUserSavedEvent = async ({
  note,
  event,
  theory,
  userId,
}: CreateUserSavedEventProps) => {
  console.log('event: ', event)
  console.log('theory: ', theory)
  console.log('note: ', note)
  const record = await xata.db[`user-saved-events`].create({
    user: userId,
    event,
    theory,
    note,
  })

  console.log(record)
  return record
}
