import { getXataClient, searchRelatedRecords } from '@/lib/xata'

import { NextRequest, NextResponse } from 'next/server'
import {
  objectMapToSingular,
  objectMapPlural,
  connectionMapByEntityType,
} from '@/utils/model.utils'
// import { checkRelevanceWithAI } from '@/lib/openai/assistants/disclosure'
// const xata: any = getXataClient()

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const id = searchParams.get('id')

  const type: any = searchParams.get('type')
  const connectionRecords = await searchRelatedRecords({ id, type })
  // const tables: any = connectionMapByEntityType[type]

  // const originalRecordTypeSingular = objectMapToSingular[type]

  // const subject = await xata.db[type].read(id)

  // const { totalCount, records } = await xata.search.all(`${id}`, {
  //   tables: tables.map(
  //     ({ table, target }: { table: string; target: string }) => {
  //       return {
  //         table: `${table}`,
  //         target: [{ column: `${target}`, weight: 10 }],
  //       }
  //     }
  //   ),
  //   fuzziness: 0,
  //   prefix: 'phrase',
  // })

  // const connectionRecords: Set<any> = new Set()

  // for (const item of records) {
  //   const {
  //     record: { xata: xataObject, ...restOfRecord },
  //   } = item

  //   if (
  //     restOfRecord[originalRecordTypeSingular] &&
  //     restOfRecord[originalRecordTypeSingular].id === id
  //   ) {
  //     delete restOfRecord[originalRecordTypeSingular]
  //   }
  //   const { id: recordId, ...rest } = restOfRecord

  //   const [connectionType] = Object.keys(rest)

  //   const table = objectMapPlural[connectionType]

  //   const connectionId = rest[connectionType].id

  //   const connection: any = await xata.db[table].read(connectionId)
  //   if (!connectionRecords.has(connection)) {
  //     connectionRecords.add({ ...connection, type: table })
  //   }
  // }
  console.log('connectionRecords: ', connectionRecords)

  // This is taking a long time to get a response. The solution is probably to rendering the stream back to the client but Im lazy atm
  // const { connections, error } = await checkRelevanceWithAI({
  //   subject,
  //   relatedItems: Array.from(connectionRecords),
  // })
  // console.log('connections: ', connections)
  // if (error) {
  //   return NextResponse.json({ data: error })
  // }
  // const data = Object.keys(connections).map((name) => {
  //   const databasedRecord = Array.from(connectionRecords).find(
  //     (record) => record.name === name
  //   )
  //   console.log('databasedRecord: ', databasedRecord)
  //   const evaluatedRecord = {
  //     ...databasedRecord,
  //     evaluation: connections[name],
  //   }
  //   console.log('evaluatedRecord: ', evaluatedRecord)
  //   return evaluatedRecord
  // })

  // console.log('data: ', data)

  return NextResponse.json({ data: Array.from(connectionRecords) })
}
