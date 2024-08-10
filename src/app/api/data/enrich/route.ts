import { getXataClient, searchRelatedRecords } from '@/lib/xata'
const xata: any = getXataClient()
import {
  checkRelevanceWithAI,
  filterConnectionsByRelevance,
} from '@/lib/openai/assistants/disclosure'
import { connectionMapByEntityType, objectMapToSingular } from '@/utils'
export async function POST(req: any) {
  const { data } = await req.json()
  console.log('data: ', data)
  const { subject, type } = data
  console.log('type: ', type)
  console.log('subject: ', subject)
  const connectionTables: any = connectionMapByEntityType[type]
  const originalRecordTypeSingular = objectMapToSingular[type]
  const databaseRecords: any = await searchRelatedRecords({
    id: subject.id,
    type,
  })
  console.log('databaseRecords: ', databaseRecords)
  const { text, assistantAnswer, connections, payload } =
    await checkRelevanceWithAI({
      subject,
      relatedItems: Array.from(databaseRecords),
    })
  console.log('payload: ', payload)
  console.log('connections: ', connections)
  console.log('assistantAnswer: ', assistantAnswer)
  console.log('text: ', text)

  const { relevant, irrelevant } = filterConnectionsByRelevance(connections)
  // const result = await xata.db.Tutorial.ask('<question>', {
  //   rules: [
  //     // ...array of strings with the rules for the model...,
  //   ],
  //   searchType: 'keyword|vector',
  //   search: {
  //     fuzziness: 0 | 1 | 2,
  //     prefix: 'phrase|disabled',
  //     target: {
  //       // ...search target options...
  //     },
  //     filter: {
  //       // ...search filter options...
  //     },
  //     boosters: [
  //       // ...search boosters options...
  //     ],
  //   },
  //   vectorSearch: {
  //     column: '<embedding column>',
  //     contentColumn: '<content column>',
  //     filter: {
  //       // ...search filter options...
  //     },
  //   },
  // })

  return Response.json({ text, assistantAnswer, connections, payload })
}

// pages/api/contact.js
