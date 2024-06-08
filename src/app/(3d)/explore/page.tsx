import {
  getEntityNetworkGraphData,
  NetworkGraphPayload
} from '@/lib/xata'

import { Suspense } from 'react'
import { EntityNetworkGraph } from '@/components/3d/entity-network-graph'

export default async function Index() {
  const data: NetworkGraphPayload =
  await getEntityNetworkGraphData()
  console.log('data: ', data);

  // {/* <Graph models={models} /> */}

  return (
    <Suspense fallback={null}>
      <EntityNetworkGraph {...data}/>
    </Suspense>
  )
}
