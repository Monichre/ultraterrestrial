

import { Suspense } from 'react'
import { EntityNetworkGraph3D } from '@/features/3d/entity-network-graph-3d'
import { getEntityNetworkGraphData, type NetworkGraphPayload } from '@/features/mindmap/api/get-entity-network-graph-data'

export default async function Index() {
  const data: NetworkGraphPayload = await getEntityNetworkGraphData()
  console.log( 'data: ', data )

  // {/* <Graph models={models} /> */}

  return (
    <Suspense fallback={null}>
      <EntityNetworkGraph3D {...data} />
    </Suspense>
  )
}
