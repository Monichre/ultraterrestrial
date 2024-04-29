import {
  getTopicPersonnelAndEventGraphData,
  TopicPersonnelAndEventGraphDataPayload,
} from '@/lib/xata'

import { Graph } from '@/components/graph'
import { Suspense } from 'react'

export default async function Index() {
  const data: TopicPersonnelAndEventGraphDataPayload =
    await getTopicPersonnelAndEventGraphData()

  const models = {
    events: {
      // @ts-ignore
      all: data?.events?.all.toSerializable(),
      // @ts-ignore
      withConnections: data?.events?.withConnections?.toSerializable(),
    },
    topics: {
      // @ts-ignore
      all: data?.topics?.all?.toSerializable(),
      // @ts-ignore
      withConnections: data?.topics?.withConnections?.toSerializable(),
    },
    // @ts-ignore
    personnel: data?.personnel?.all?.toSerializable(),
  }

  return (
    <Suspense fallback={null}>
      <Graph models={models} />
    </Suspense>
  )
}
