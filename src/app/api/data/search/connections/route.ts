import { getXataClient } from '@/lib/xata'
import { flattenArray } from '@/utils/functions'

import { NextRequest, NextResponse } from 'next/server'
import { objectMapToSingular, objectMapPlural } from '@/utils/model.utils'
const xata: any = getXataClient()

const connectionMapByEntityType: any = {
  events: [
    { table: 'event-subject-matter-experts', target: 'event' },
    { table: 'event-topic-subject-matter-experts', target: 'event' },
    { table: 'testimonies', target: 'event' },
  ],
  testimonies: [{ table: 'topics-testimonies', target: 'testimony' }],
  personnel: [
    {
      table: 'event-subject-matter-experts',
      target: 'subject-matter-expert',
    },
    {
      table: 'event-topic-subject-matter-experts',
      target: 'subject-matter-expert',
    },
    { table: 'organization-members', target: 'member' },
    {
      table: 'topic-subject-matter-experts',
      target: 'subject-matter-expert',
    },
    { table: 'testimonies', target: 'witness' },
  ],
  organizations: [
    // #TODO: Might be more record relations here
    { table: 'organization-members', target: 'organization' },
  ],
  topics: [
    { table: 'topics-testimonies', target: 'topic' },
    { table: 'topic-subject-matter-experts', target: 'topic' },
    { table: 'event-topic-subject-matter-experts', target: 'topic' },
  ],
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  console.log('searchParams: ', searchParams)
  const id = searchParams.get('id')
  console.log('id: ', id)
  const type: any = searchParams.get('type')
  console.log('type: ', type)
  const tables: any = connectionMapByEntityType[type]
  console.log('tables: ', tables)
  const originalRecordTypeSingular = objectMapToSingular[type]

  const { totalCount, records } = await xata.search.all(`${id}`, {
    tables: tables.map(
      ({ table, target }: { table: strng; target: string }) => {
        return {
          table: `${table}`,
          target: [{ column: `${target}`, weight: 10 }],
        }
      }
    ),
    fuzziness: 0,
    prefix: 'phrase',
  })

  const connectionRecords: Set<any> = new Set()
  for (const item of records) {
    console.log('item: ', item)
    const {
      record: { xata: xataObject, ...restOfRecord },
    } = item
    console.log('restOfRecord: ', restOfRecord)

    if (
      restOfRecord[originalRecordTypeSingular] &&
      restOfRecord[originalRecordTypeSingular].id === id
    ) {
      delete restOfRecord[originalRecordTypeSingular]
    }
    const { id: recordId, ...rest } = restOfRecord
    console.log('rest: ', rest)

    const [connectionType] = Object.keys(rest)
    console.log('connectionType: ', connectionType)
    const table = objectMapPlural[connectionType]
    console.log('table: ', table)

    const connectionId = rest[connectionType].id
    console.log('connectionId: ', connectionId)
    const connection: any = await xata.db[table].read(connectionId)
    console.log('connection: ', connection)
    connectionRecords.add(connection)
  }
  console.log('connectionRecords: ', Array.from(connectionRecords))

  return NextResponse.json({ data: Array.from(connectionRecords), totalCount })
}
