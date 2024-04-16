// import { FlowChart } from '@/features/mind-map'
// import 'reactflow/dist/style.css'
import { getXataClient } from '@/lib/xata'
const xata = getXataClient()

import { WordCloud } from '@/components/word-cloud'
// import { MindMap } from '@/features/mind-map'

export default async function Investigate() {
  const events = await xata.db.events
    .select(['name', 'id'])
    .getAll()
    .then((res) =>
      res.map(({ xata, ...rest }: any) => ({ ...rest, type: 'event' }))
    )
  console.log('events: ', events)
  const topics = await xata.db.topics
    .select(['name', 'id'])
    .getAll()
    .then((res) =>
      res.map(({ xata, ...rest }: any) => ({ ...rest, type: 'topic' }))
    )
  console.log('topics: ', topics)
  // const personnel = await xata.db.personnel
  //   .select(['name', 'id'])
  //   .getAll()
  //   .then((res) => res.map(({ xata, ...rest }: any) => ({ ...rest })))
  // console.log('personnel: ', personnel)
  const records = [...events, ...topics]
  return <WordCloud records={records} />
}
