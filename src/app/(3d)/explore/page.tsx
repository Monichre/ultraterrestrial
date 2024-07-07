import { getEntityNetworkGraphData, NetworkGraphPayload } from '@/lib/xata'

import { Suspense } from 'react'
import { EntityNetworkGraph3D } from '@/features/3d/entity-network-graph-3d'

export default async function Index() {
  const data: NetworkGraphPayload = await getEntityNetworkGraphData()
  console.log('data: ', data)

  // {/* <Graph models={models} /> */}

  return (
    <Suspense fallback={null}>
      <EntityNetworkGraph3D {...data} />
    </Suspense>
  )
}
