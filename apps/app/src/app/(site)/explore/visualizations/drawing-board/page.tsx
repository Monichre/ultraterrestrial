

import { Suspense } from 'react'
import { D3DrawingBoard } from '@/features/3d/drawing-board'
import { getEntityNetworkGraphData, type NetworkGraphPayload } from '@/features/mindmap/api/get-entity-network-graph-data'

export default async function Index() {
  const data: NetworkGraphPayload = await getEntityNetworkGraphData()

  return (
    <Suspense fallback={null}>
      <D3DrawingBoard allEntityGraphData={data.graphData} />
    </Suspense>
  )
}
