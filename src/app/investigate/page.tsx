// import { FlowChart } from '@/features/mind-map'
// import 'reactflow/dist/style.css'
// import { getXataClient } from '@/lib/xata'
// const xata = getXataClient()

import { WordCloud } from '@/components/word-cloud'
import { MindMap } from '@/features/mind-map'

export default async function Investigate() {
  // const events = await xata.db.events.getAll()
  // console.log('events: ', events)
  // const topics = await xata.db.topics.getAll()
  // console.log('topics: ', topics)
  // const personnel = await xata.db.personnel.getAll()
  // console.log('personnel: ', personnel)
  // <MindMap />
  return <WordCloud />
}
