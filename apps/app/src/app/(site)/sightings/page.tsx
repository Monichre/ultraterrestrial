import Loading from '@/app/loading'
import { Suspense } from 'react'
import { SightingsGlobe } from '@/features/data-viz/sightings/sightings-globe'

export default async function Index() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:3000`
  const sightingsPayload = await fetch(`${baseUrl}/api/data/sightings`)

  const {
    data: { sightings, militaryBases, ufoPosts },
  } = await sightingsPayload.json()

  return (
    <Suspense fallback={<Loading />}>
      <SightingsGlobe
        sightings={sightings}
        militaryBases={militaryBases}
        ufoPosts={ufoPosts}
      />
    </Suspense>
  )
}
