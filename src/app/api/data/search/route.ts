import { getXataClient } from '@/lib/xata'
import { flattenArray } from '@/utils'

import { NextRequest, NextResponse } from 'next/server'
const xata: any = getXataClient()

const objectMap = {
  events: 'event',
  testimonies: 'testimony',
  personnel: 'personnel',
  organizations: 'organization',
  topics: 'topic',

  // Add more mappings here as needed
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  console.log('searchParams: ', searchParams)
  const id = searchParams.get('id')
  console.log('id: ', id)
  const type: any = searchParams.get('type')
  console.log('type: ', type)
  const tables = searchParams.get('tables')?.split(',') || []
  console.log('tables: ', tables)
  const singularType = objectMap[type] || type
  console.log('singularType: ', singularType)
  // const {}
  // /api/data/search?query=connections&id=123456789012345678901234&type=events&tables=event-subject-matter-experts,event-topic-subject-matter-experts,testimonies
  // console.log('query: ', query)

  const { totalCount, records } = await xata.search.all(`${id}`, {
    tables: [
      ...tables.map((table) => {
        return {
          table,
          target: [singularType],
        }
      }),
    ],
    fuzziness: 1,
    prefix: 'phrase',
  })

  const data = await Promise.all(
    records.map(async ({ record }: { record: any }) => {
      const smeId =
        record && record['subject-matter-expert']?.id
          ? record['subject-matter-expert']?.id
          : null
      const topicId = record?.topic?.id || null
      const subjectMatterExpert = smeId
        ? await xata.db.personnel
            .select([
              'name',
              'bio',
              'role',
              'photo',
              'photo.signedUrl',
              'photo.enablePublicUrl',
            ])
            .read(smeId)
        : null

      const eventId = record?.event?.id || null
      const event = eventId
        ? await xata.db.events
            .select([
              'name',
              'description',
              'location',
              'latitude',
              'photos',
              'photos.signedUrl',
              'photos.enablePublicUrl',
              'longitude',
              'date',
            ])
            .read(eventId)
        : null
      const organization = record?.organization?.id
        ? await xata.db.organizations.read(record?.organization?.id)
        : null
      const topic = topicId ? await xata.db.topics.read(topicId) : null
      const testimony = record?.testimony?.id
        ? await xata.db.testimonies.read(record?.testimony?.id)
        : null

      const recordConnections = [
        subjectMatterExpert,
        topic,
        event,
        organization,
        testimony,
      ].filter((connection) => connection && connection.id !== id)

      return {
        ...record,
        connections: recordConnections,
      }
    })
  )
  const sources = flattenArray(data.map(({ connections }) => connections))

  /* The code snippet `const connections = await Promise.all(async (rec)` seems to have a syntax error.
  It looks like there is a missing closing parenthesis and curly braces. */
  // const connections = await Promise.all(async (rec)

  return NextResponse.json({ data: sources, totalCount })
}
