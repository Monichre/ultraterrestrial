'use server'
import { getXataClient } from '@/lib/xata'
import type { EventsRecord } from '@/lib/xata'
import type { CreateUserSavedItemBase } from './actions.types'
import { TopicsRecord } from '../../lib/xata/xata'
const xata = getXataClient()

export interface CreateUserSavedTopicProps extends CreateUserSavedItemBase {
  topic: TopicsRecord['id']
}

export const createUserSavedTopic = async ({
  userId,
  topic,
  note,
  theory,
}: CreateUserSavedTopicProps) => {
  const record = await xata.db[`user-saved-topics`].create({
    user: userId,
    topic,
    note,
    theory,
  })
  console.log('record: ', record)
  return record
}
