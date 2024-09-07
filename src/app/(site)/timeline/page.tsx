import { EventChronologyTimeline } from '@/layouts/timeline/EventChronologyTimeline'
import { getXataClient } from '@/lib/xata'
const xata = getXataClient()
export default async function Index() {
  const events: any = await xata.db.events
    .sort('date', 'desc')
    .select([
      'name',
      'description',
      'location',
      'latitude',
      'longitude',
      'date',
      'photos',
      'photos.signedUrl',
      'photos.enablePublicUrl',
      {
        name: '<-event-subject-matter-experts.event',
        columns: ['*'],
        as: 'experts',
      },
    ])
    .getAll()
    .then((data) => data.toSerializable())
  return (
    <div className='timeline-page'>
      <EventChronologyTimeline events={events} />
    </div>
  )
}
