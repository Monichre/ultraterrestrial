import { getXataClient } from '@/lib/xata'

import { type NextRequest } from 'next/server'
const xata: any = getXataClient()

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  console.log('searchParams: ', searchParams)
  const query = searchParams.get('query')
  console.log('query: ', query)

  // const results = await xata.search.all("search phrase", {
  //   tables: [
  //     {
  //       table: "Actor",
  //       target: ["name"],
  //       filter: {"city": "New York"},
  //       boosters: [{ numericBooster: { column: 'lifetimeBoxOffice', factor: 3 } }]
  //     },
  //     { ... },
  //   ],
  //   fuzziness: 1,
  //   prefix: "phrase"
  // });
}
