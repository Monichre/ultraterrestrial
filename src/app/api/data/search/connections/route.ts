import { getXataClient } from '@/lib/xata'
import { flattenArray } from '@/utils/functions'

import { NextRequest, NextResponse } from 'next/server'
import { objectMapToSingular, objectMapPlural } from '@/utils/model.utils'
import { executeEntityRelationshipInquiry } from '@/lib/openai/assistants/disclosure'
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

  const id = searchParams.get('id')

  const type: any = searchParams.get('type')

  const tables: any = connectionMapByEntityType[type]

  const originalRecordTypeSingular = objectMapToSingular[type]

  const subject = await xata.db[type].read(id)

  const { totalCount, records } = await xata.search.all(`${id}`, {
    tables: tables.map(
      ({ table, target }: { table: string; target: string }) => {
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
    const {
      record: { xata: xataObject, ...restOfRecord },
    } = item

    if (
      restOfRecord[originalRecordTypeSingular] &&
      restOfRecord[originalRecordTypeSingular].id === id
    ) {
      delete restOfRecord[originalRecordTypeSingular]
    }
    const { id: recordId, ...rest } = restOfRecord

    const [connectionType] = Object.keys(rest)

    const table = objectMapPlural[connectionType]

    const connectionId = rest[connectionType].id

    const connection: any = await xata.db[table].read(connectionId)

    connectionRecords.add(connection)
  }

  const { connections, error } = await executeEntityRelationshipInquiry({
    subject,
    relatedItems: Array.from(connectionRecords),
  })
  console.log('connections: ', connections)
  if (error) {
    return NextResponse.json({ data: error })
  }

  const merged = Array.from(connectionRecords).map((record) => {
    return { ...record, evaluation: { ...connections[record.name] } }
  })
  console.log('merged: ', merged)

  return NextResponse.json({ data: merged })
}
