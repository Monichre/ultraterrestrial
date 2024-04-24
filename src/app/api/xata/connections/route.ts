import { getConnectionModels } from '@/lib/xata/models'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const records = await getConnectionModels()
  // .getAll()
  console.log('records: ', records)

  return Response.json({ records })

  // query is "hello" for /api/search?query=hello
}
