import * as React from 'react'

import { getEntityNetworkGraphData, NetworkGraphPayload } from '@/lib/xata'

import { Suspense } from 'react'

import { MindMap } from '@/features/mindmap'

import { StateOfDisclosureProvider } from '@/providers'
import { Loading } from '@/components/ui/loading'

export default async function Index() {
  const data: NetworkGraphPayload = await getEntityNetworkGraphData()

  const { graphData } = data

  return (
    <Suspense fallback={<Loading />}>
      <MindMapCursor />
      <StateOfDisclosureProvider stateOfDisclosure={data}>
        <MindMap allEntityGraphData={graphData} />
      </StateOfDisclosureProvider>
    </Suspense>
  )
}
