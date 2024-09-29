'use server'
import { getXataClient } from '@/services/xata'

import type { CreateUserSavedItemBase } from './actions.types'
import { TestimoniesRecord } from '@/services/xata'
const xata = getXataClient()
export interface CreateUserSavedTestimonyProps extends CreateUserSavedItemBase {
  testimony: TestimoniesRecord['id']
}

export const createUserSavedTestimony = async ({
  note,
  testimony,
  theory,
  userId,
}: CreateUserSavedTestimonyProps) => {
  const record = await xata.db[`user-saved-testimony`].create({
    user: userId,
    testimony,
    theory,
    note,
  })
  console.log('record: ', record)
  return record
}
