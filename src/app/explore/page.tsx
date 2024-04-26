import { getTopicPersonnelAndEventGraphData } from '@/lib/xata'

import { Graph } from '@/components/graph'
import { Suspense } from 'react'

export default async function Index() {
  const data = await getTopicPersonnelAndEventGraphData()

  const models = {
    events: data?.events?.withConnections?.toSerializable(),
    topics: {
      all: data?.topics?.all?.toSerializable(),
      withConnections: data?.topics?.withConnections?.toSerializable(),
    },
    personnel: data?.personnel?.all?.toSerializable(),
  }

  return (
    <Suspense fallback={null}>
      <Graph models={models} />
    </Suspense>
  )
}
