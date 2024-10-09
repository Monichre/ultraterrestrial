import { type NextRequest } from 'next/server'

import { getXataClient } from '../../../lib/xata'
const xata = getXataClient()

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  console.log('searchParams: ', searchParams)
  const query: any = searchParams.get('query')
  console.log('query: ', query)

  const record = await xata.db.personnel.read(query)
  console.log(record)

  return Response.json({ record })
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
