import { getEntityNetworkGraphData, NetworkGraphPayload } from '@/lib/xata'

import { Suspense } from 'react'

import { MindMap } from '@/components/mind-map'

export default async function Index() {
  const data: NetworkGraphPayload = await getEntityNetworkGraphData()

  console.log('data: ', data)

  const { graphData } = data
  // {/* <Graph models={models} /> */}

  return (
    <Suspense fallback={null}>
      <MindMap allEntityGraphData={graphData} />
    </Suspense>
  )
}
