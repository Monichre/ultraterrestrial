import Loading from '@/app/loading'
import { Suspense } from 'react'
import { DeckGlGlobe } from '@/features/data-viz/components/globes/deckgl-globe'

export default async function Index() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:3000`
  const payload = await fetch(`${baseUrl}/api/data/sightings`)

  console.log('payload: ', payload)
  const { data } = await payload.json()
  console.log('data payload: ', data)

  return (
    <Suspense fallback={<Loading />}>
      <DeckGlGlobe sightings={data} />
    </Suspense>
  )
}
