import { getXataClient, type EventsRecord } from '@/db/xata'
import { HistoricalEventsTimeline } from '@/layouts/historical-events-timeline/historical-events-timeline'
import { JSONData } from '@xata.io/client'

const xata = getXataClient()
export default async function Index() {
  const events: JSONData<EventsRecord>[] = await xata.db.events



    .filter( {
      category: { $includes: "historical" },
    } )
    .sort( 'date', 'desc' )
    .select( [
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
    ] )
    .getAll()
    .then( ( data ) => data.toSerializable() )

  return (
    <div className='timeline-page'>
      <HistoricalEventsTimeline events={events} />
    </div>
  )
}
