import { Tables } from './../../../../lib/supabase/types'
import { getXataClient } from '@/lib/xata'
import { flattenArray } from '@/utils'

import { NextRequest, NextResponse } from 'next/server'
const xata: any = getXataClient()

const objectMapToSingular: any = {
  events: 'event',
  testimonies: 'testimony',
  personnel: 'personnel',
  organizations: 'organization',
  topics: 'topic',

  // Add more mappings here as needed
}
const objectMapPlural: any = {
  event: 'events',
  testimony: 'testimonies',
  personnel: 'personnel',
  'subject-matter-expert': 'personnel',
  organization: 'organizations',
  topic: 'topics',

  // Add more mappings here as needed
}

const tables = [
  'documents',

  'event-subject-matter-experts',

  'event-topic-subject-matter-experts',

  'events',

  'locations',

  'organization-members',

  'organizations',

  'personnel',

  'sightings',

  'testimonies',

  'topic-subject-matter-experts',

  'topics',

  'topics-testimonies',
]

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
      ({ table, target }: { table: string; target: string }) => {
        return {
          table: `${table}`,
          target: [{ column: `${target}` }],
        }
      }
    ),
    fuzziness: 1,
    prefix: 'phrase',
  })
  const connectionRecords = []
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
    const connection = await xata.db[table].read(connectionId)
    console.log('connection: ', connection)
    connectionRecords.push(connection)
  }
  console.log('connectionRecords: ', connectionRecords)

  // await Promise.all(
  //   records.forEach(async ({ record }: { record: any }) => {
  //     console.log('record: ', record)

  //     const smeId =
  //       record && record['subject-matter-expert']?.id
  //         ? record['subject-matter-expert']?.id
  //         : null
  //     const topicId = record?.topic?.id || null
  //     const eventId = record?.event?.id || null

  //     const subjectMatterExpert = smeId
  //       ? await xata.db.personnel.read(smeId, [
  //           'name',
  //           'bio',
  //           'role',
  //           'photo',
  //           'photo.signedUrl',
  //           'photo.enablePublicUrl',
  //         ])
  //       : null

  //     const event = eventId
  //       ? await xata.db.events.read(eventId, [
  //           'name',
  //           'description',
  //           'location',
  //           'latitude',
  //           'photos',
  //           'photos.signedUrl',
  //           'photos.enablePublicUrl',
  //           'longitude',
  //           'date',
  //         ])
  //       : null
  //     const organization = record?.organization?.id
  //       ? await xata.db.organizations.read(record?.organization?.id)
  //       : null
  //     const topic = topicId ? await xata.db.topics.read(topicId) : null
  //     const testimony = record?.testimony?.id
  //       ? await xata.db.testimonies.read(record?.testimony?.id)
  //       : null

  //     const recordConnections = [
  //       subjectMatterExpert,
  //       topic,
  //       event,
  //       organization,
  //       testimony,
  //     ]
  //     console.log('recordConnections: ', recordConnections)

  //     const filteredRecords = recordConnections.filter((connection) => {
  //       const isNotOriginalRecord = connection && connection.id !== id
  //       const notADuplicate =
  //         recordConnections.indexOf(connection) ===
  //         recordConnections.lastIndexOf(connection)
  //       return isNotOriginalRecord && notADuplicate
  //     })
  //     console.log('filteredRecords: ', filteredRecords)

  //     return {
  //       ...record,
  //       connections: filteredRecords,
  //     }
  //   })
  // )
  // const sources = flattenArray(data.map(({ connections }) => connections))

  /* The code snippet `const connections = await Promise.all(async (rec)` seems to have a syntax error.
  It looks like there is a missing closing parenthesis and curly braces. */
  // const connections = await Promise.all(async (rec)

  return NextResponse.json({ data: connectionRecords, totalCount })
}
