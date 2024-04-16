import { getXataClient } from '@/lib/xata'

import { type NextRequest } from 'next/server'
const xata: any = getXataClient()

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  console.log('searchParams: ', searchParams)
  const type = searchParams.get('type')
  console.log('type: ', type)

  const records = await xata.db[`${type}`].getAll()
  // .getAll()
  console.log('records: ', records)

  return Response.json({ records })

  // query is "hello" for /api/search?query=hello
}
