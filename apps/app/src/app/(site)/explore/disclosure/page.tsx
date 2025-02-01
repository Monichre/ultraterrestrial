import { Suspense } from 'react'

import { MindMap } from '@/features/mindmap'

import { Loading } from '@/components/loaders/loading'
import { getEntityNetworkGraphData, type NetworkGraphPayload } from '@/features/mindmap/api/get-entity-network-graph-data'

import { StateOfDisclosureProvider } from '@/contexts'
import { MindMapCursor } from '@/components/cursors'


export default async function Index() {



  const data: NetworkGraphPayload = await getEntityNetworkGraphData()

  return (
    <Suspense fallback={<Loading />}>
      <MindMapCursor type='gooey' />
      <StateOfDisclosureProvider stateOfDisclosure={data}>
        <MindMap />
      </StateOfDisclosureProvider>
    </Suspense>
  )
}
