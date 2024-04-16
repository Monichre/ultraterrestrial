import { getXataClient } from '@/lib/xata'

import { type NextRequest } from 'next/server'
const xata: any = getXataClient()

// Maybe do a vector search for connected records?
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  console.log('searchParams: ', searchParams)
  const query = searchParams.get('query')
  console.log('query: ', query)

  // query is "hello" for /api/search?query=hello
}
