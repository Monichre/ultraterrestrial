import { DrawingBoard } from '@/components/drawing-board'
import { getXataClient } from '@/lib/xata'
const xata = getXataClient()

export default async function Index() {
  // const serializedRecords = records.toSerializable();
  const events = await xata.db.events.getAll()

  const topics = await xata.db.topics.getAll()

  const testimonies = await xata.db.testimonies.getAll()

  const organizations = await xata.db.organizations.getAll()

  const personnel = await xata.db.personnel.getAll()

  // const { events, personnel, topics, testimonies, organizations } =
  //   await getData()
  const models = {
    events: events.toSerializable(),
    topics: topics.toSerializable(),
    testimonies: testimonies.toSerializable(),
    organizations: organizations.toSerializable(),
    personnel: personnel.toSerializable(),
  }

  return <DrawingBoard models={models} />
}
