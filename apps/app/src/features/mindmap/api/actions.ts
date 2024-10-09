'use server'


import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

import { xata } from '@/services/xata'

const askAISchema = z.object( {
  question: z.string().min( 1, 'Question is required' ),
  rules: z.array( z.string() ).optional(), // array of strings with the rules for the model
  searchType: z.enum( ['keyword', 'vector'] ).optional(),
  search: z.object( {
    fuzziness: z.enum( [0, 1, 2] ).optional(),
    prefix: z.enum( ['phrase', 'disabled'] ).optional(),
    target: z.object( {} ).optional(),
    filter: z.object( {} ).optional(),
    boosters: z.array( z.object( {} ) ).optional(),
  } ).optional(),
  vectorSearch: z.object( {
    column: z.string(),
    contentColumn: z.string(),
    filter: z.object( {} ).optional(),
  } ).optional(),
} )

export const askAIAction = async ( req: NextApiRequest, res: NextApiResponse ) => {
  try {
    const { question, rules, searchType, search, vectorSearch } = askAISchema.parse( req.body )
    const { table } = req.query

    const result = await xata.db[table as string].ask( question, {
      rules,
      searchType,
      search,
      vectorSearch,
    } )

    res.status( 200 ).json( result )
  } catch ( error ) {
    if ( error instanceof z.ZodError ) {
      res.status( 400 ).json( { error: error.errors } )
    } else {
      res.status( 500 ).json( { error: 'Internal Server Error' } )
    }
  }
}
