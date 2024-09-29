import { NextRequest, NextResponse } from 'next/server'
import { getXataClient } from '@/services/xata'

const xata: any = getXataClient()

export const targetsPerTable = {
  events: ['name', 'date', 'location', 'description'],
  personnel: ['role', 'bio', 'name'],
  topics: ['name', 'summary'],
  testimonies: ['claim', 'summary', 'documentation'],
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  console.log('searchParams: ', searchParams)
  const keyword: any = searchParams.get('keyword')
  console.log('keyword: ', keyword)

  const table: any = searchParams.get('table')
  console.log('table: ', table)
  const columns: any = targetsPerTable[table] || []
  const target = columns
    ? columns.map((column: string) => ({
        column: `${column}`,
      }))
    : null
  console.log('target: ', target)

  const { totalCount, records } = await xata.db[table].search(keyword, {
    target,
    fuzziness: 0,
    prefix: 'phrase',
  })

  console.log('records: ', records)

  return NextResponse.json({ results: records, totalCount })
}
