import { getXataClient } from '@/lib/xata'

import { type NextRequest } from 'next/server'
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

  const connections = records.map(({ record }: { record: any }) => record)
  console.log('connections: ', connections)
  return Response.json({ connections })
}
