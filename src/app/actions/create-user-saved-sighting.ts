'use server'
import { getXataClient } from '@/lib/xata'
import type { SightingsRecord } from '@/lib/xata'
import type { CreateUserSavedItemBase } from './actions.types'
const xata = getXataClient()

export interface CreateUserSavedSightingProps extends CreateUserSavedItemBase {
  sighting: SightingsRecord['id']
}

export const createUserSavedSighting = async ({
  sighting,
  userId,
  theory,
  note,
}) => {
  const record = await xata.db[`user-saved-sightings`].create({
    user: userId,
    sighting,
    theory,
    note,
  })
  console.log('record: ', record)
  return record
}
