'use server'
import { getXataClient } from '@/lib/xata'

import type { CreateUserSavedItemBase } from './actions.types'
import { TestimoniesRecord } from '@/lib/xata'
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
