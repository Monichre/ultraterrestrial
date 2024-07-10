import { getEntityNetworkGraphData, NetworkGraphPayload } from '@/lib/xata'

import { Suspense } from 'react'

import { MindMap } from '@/components/mind-map'
import { UfologyProvider } from '@/providers/ufology-provider'
import splitText from '@/utils/split-text.js'
import Script from 'next/script'
export default async function Index() {
  const data: NetworkGraphPayload = await getEntityNetworkGraphData()

  console.log('data: ', data)

  const { graphData } = data

  return (
    <Suspense fallback={null}>
      <UfologyProvider ufologyData={data}>
        <MindMap allEntityGraphData={graphData} />
      </UfologyProvider>
      {/* <Script src={splitText} /> */}
    </Suspense>
  )
}
