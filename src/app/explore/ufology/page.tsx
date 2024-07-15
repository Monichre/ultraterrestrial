import { getEntityNetworkGraphData, NetworkGraphPayload } from '@/lib/xata'

import { Suspense } from 'react'

import { MindMap } from '@/features/mindmap'
import { UfologyProvider } from '@/providers/ufology-provider'
import { InAppNavbar } from '@/components/navbar'
export default async function Index() {
  const data: NetworkGraphPayload = await getEntityNetworkGraphData()

  const { graphData } = data

  return (
    <Suspense fallback={null}>
      <InAppNavbar color='white' />

      <UfologyProvider ufologyData={data}>
        <MindMap allEntityGraphData={graphData} />
      </UfologyProvider>
    </Suspense>
  )
}
