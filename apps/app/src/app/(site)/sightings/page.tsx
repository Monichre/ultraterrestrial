import Loading from '@/app/loading'
import { SightingsGlobe } from '@/features/data-viz/sightings/sightings-globe'
import { getFullSightingsPayload } from '@/services/sightings/actions/sightings'
import { Suspense } from 'react'

export default async function Index() {

  const { geoJSONSightings }: any = await getFullSightingsPayload()

  console.log( "🚀 ~ file: page.tsx:9 ~ Index ~ geoJSONSightings:", geoJSONSightings )


  // console.log( "🚀 ~ file: page.tsx:9 ~ Index ~ realtimeSightings:", realtimeSightings )


  // const {
  //   data: { sightings, militaryBases, ufoPosts },
  // } = await sightingsPayload.json()

  return (
    <div className="h-screen w-screen">

      <Suspense fallback={<Loading />}>
        {/* <MapboxGlobe sightings={geoJSONSightings?.sightings} /> */}
        <SightingsGlobe
          geoJSONSightings={{ ...geoJSONSightings }}
        // realtimeSightings={realtimeSightings}
        />
      </Suspense>
    </div>
  )
}
