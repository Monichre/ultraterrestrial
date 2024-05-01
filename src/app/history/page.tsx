import { SpatialGallery } from '@/components/visualizations/spatial-gallery'
import { Suspense } from 'react'
import { getXataClient } from '@/lib/xata'

const xata = getXataClient()

const EventsPage = async () => {
  const records = await xata.db.events
    .filter({
      $none: {
        photos: [],
      },
    })
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
    ])
    .getAll()

  const events = records
    .toSerializable()
    .filter((event) => event?.photos?.length)
    .map(({ id, photos, xata, ...rest }: any) => {
      console.log('photos: ', photos)
      const [photo] = photos
      console.log('photo: ', photo)
      return {
        id,
        photo,
        ...rest,
      }
    })

  return (
    <div
      className='h-[100vh] overflow-scroll'
      style={{ height: '100vh', width: '100vw' }}
    >
      <SpatialGallery items={events} />
    </div>
  )
}

export default EventsPage
