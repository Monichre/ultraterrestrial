import {
  getEntityNetworkGraphData,
  NetworkGraphPayload
} from '@/lib/xata'

import { Suspense } from 'react'
import { Spherical3DGraph } from '@/components/visualizations/3d-graph/spherical-3d-graph'

export default async function Index() {
  const data: NetworkGraphPayload =
    await getEntityNetworkGraphData()

  // {/* <Graph models={models} /> */}

  return (
    <Suspense fallback={null}>
      <Spherical3DGraph models={data} />
    </Suspense>
  )
}
