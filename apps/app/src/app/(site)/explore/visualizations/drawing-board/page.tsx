import { getEntityNetworkGraphData, NetworkGraphPayload } from '@/services/xata'

import { Suspense } from 'react'
import { D3DrawingBoard } from '@/features/3d/drawing-board'

export default async function Index() {
  const data: NetworkGraphPayload = await getEntityNetworkGraphData()

  return (
    <Suspense fallback={null}>
      <D3DrawingBoard allEntityGraphData={data.graphData} />
    </Suspense>
  )
}
