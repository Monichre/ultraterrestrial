import * as React from 'react'

import { getEntityNetworkGraphData, NetworkGraphPayload } from '@/lib/xata'

import { Suspense } from 'react'

import { MindMap } from '@/features/mindmap'

import { StateOfDisclosureProvider } from '@/providers'
import { Loading } from '@/components/ui/loading'
import { MindMapCursor } from '@/features/mindmap/mindmap-cursor'

export default async function Index() {
  const data: NetworkGraphPayload = await getEntityNetworkGraphData()

  return (
    <Suspense fallback={<Loading />}>
      <MindMapCursor />
      <StateOfDisclosureProvider stateOfDisclosure={data}>
        <MindMap />
      </StateOfDisclosureProvider>
    </Suspense>
  )
}
