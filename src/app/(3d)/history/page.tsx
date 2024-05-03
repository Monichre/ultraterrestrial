import { SpatialGallery } from '@/components/visualizations/spatial-gallery'
import { Suspense } from 'react'
import { getXataClient } from '@/lib/xata'
import { transformImage } from '@xata.io/client'
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
      // 'photos.base64Content',
    ])
    .getAll()

  const spatialData = [
    { position: [0, 0, 1.5], rotation: [0, 0, 0] },
    { position: [-0.8, 0, -0.6], rotation: [0, 0, 0] },
    { position: [0.8, 0, -0.6], rotation: [0, 0, 0] },
    { position: [-1.75, 0, 0.25], rotation: [0, Math.PI / 2.5, 0] },
    { position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0] },
    { position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0] },
    { position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0] },
    { position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0] },
    { position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0] },
  ]

  const events = records
    .toSerializable()
    .filter((event) => event?.photos?.length)
    .slice(0, 9)
    .map(({ id, photos, xata, ...rest }: any, i) => {
      const { position, rotation } = spatialData[i]

      const [photo] = photos

      // Apply transformations to a Xata image URL
      const url = transformImage(photo.url, {
        height: 750,
        width: 1260,
        dpr: 2,
        // download: `${rest?.name.toLowerCase().replace(/\s+/g, '')}.jpg`,
        format: 'jpeg',
      })
      console.log('url: ', url)

      return {
        id,
        photo: {
          ...photo,
          url,
        },
        position,
        rotation,
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
