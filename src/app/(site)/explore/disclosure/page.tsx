import * as React from 'react'

import { getEntityNetworkGraphData, NetworkGraphPayload } from '@/lib/xata'

import { Suspense } from 'react'

import { MindMap } from '@/features/mindmap'

import { InAppNavbar } from '@/components/navbar'
import { StateOfDisclosureProvider } from '@/providers'

export default async function Index() {
  const data: NetworkGraphPayload = await getEntityNetworkGraphData()

  const { graphData } = data

  return (
    <Suspense fallback={null}>
      {/* <InAppNavbar color='white' /> */}

      <StateOfDisclosureProvider stateOfDisclosure={data}>
        <MindMap allEntityGraphData={graphData} />
      </StateOfDisclosureProvider>
    </Suspense>
  )
}
