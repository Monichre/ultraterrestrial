import { getTopicPersonnelAndEventGraphData } from '@/lib/xata'

import { GraphVisualization } from '@/components/diagram/graph-visualization'
// import { RootConnectionGraph } from '@/components/diagram/root-connection-graph'
// import { getConnectionModels } from '@/lib/xata/models'

// const getData = async () => {
//   const models: any = await getConnectionModels()
//   const data: any = {}

//   for (let key in models) {
//     data[key] = models[key].map(({ xata, ...model }: any) => {
//       return { ...model }
//     })
//   }

//   console.log('data: ', data)
//   return data
// }

export default async function Index() {
  // const serializedRecords = records.toSerializable();
  const data = await getTopicPersonnelAndEventGraphData()
  console.log('data: ', data)

  // const { events, personnel, topics, testimonies, organizations } =
  //   await getData()
  const models = {
    events: data?.events?.withConnections?.toSerializable(),
    topics: data?.topics?.withConnections?.toSerializable(),
    // testimonies: testimonies?.withConnections?.toSerializable(),
    // organizations: organizations?.withConnections?.toSerializable(),
    personnel: data?.personnel?.all?.toSerializable(),
  }

  return <GraphVisualization models={models} />
}
