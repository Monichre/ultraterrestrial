'use server'
import { getXataClient } from '@/lib/xata'
const xata = getXataClient()

export const generateDataNodes = async () => {
  const events = await xata.db.events.sort('date', 'desc').getAll()
  const topics = await xata.db.topics.getAll()
  const personnel = await xata.db.personnel.getAll()
}
