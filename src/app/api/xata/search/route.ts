import { getXataClient } from '@/lib/xata'

import { type NextRequest } from 'next/server'
const xata: any = getXataClient()

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  console.log('searchParams: ', searchParams)
  const query = searchParams.get('query')
  console.log('query: ', query)

  const { records } = await xata.db[`${query}`].getPaginated({
    pagination: {
      size: 20,
    },
  })
  // .getAll()
  console.log('records: ', records)

  return Response.json({ records })

  // query is "hello" for /api/search?query=hello
}
