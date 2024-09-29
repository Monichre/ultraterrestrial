'use server'
import { getXataClient } from '@/services/xata'
import type { PersonnelRecord } from '@/services/xata'
import type { CreateUserSavedItemBase } from './actions.types'
const xata = getXataClient()

export interface CreateUserSavedKeyFigureProps extends CreateUserSavedItemBase {
  keyFigure: PersonnelRecord['id']
}
export const createUserSavedKeyFigure = async ({
  userId,
  keyFigure,
  note,
  theory,
}: CreateUserSavedKeyFigureProps) => {
  const record = await xata.db[`user-saved-key-figure`].create({
    user: userId,
    'key-figure': keyFigure,
    note,
    theory,
  })
  console.log('record: ', record)
}
