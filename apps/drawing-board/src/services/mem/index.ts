

// const MemoryClient = require( 'mem0ai' )

import { Users } from "react-feather"

// export const mem0AI = new MemoryClient(
//   process.env.REACT_APP_MEM0_API_KEY || ''
// )

// OPENAI_API_KEY=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
// OPENAI_ASSISTANT_ID=asst_sdNxYC9p05iGpeKXtL496cyh  #Party Martian Assistant
// OPENAI_VECTOR_STORE_ID=vs_meWOEnUiUxtQWf0W6NBsNpCG #UFO Data Store

// const addMemory = async ( messages: any, options: any ) => {
//   try {
//     return await mem0AI.add( messages, {
//       output_format: 'v1.1',
//       ...options
//     } )
//   } catch ( error ) {
//     console.error( 'Error adding memory:', error )
//     throw error
//   }
// }

// export const addCustomizedMemory = async ( {
//   messages,
//   includes
// }: {
//   messages: any
//   includes: string
// } ) => {
//   return await addMemory( messages, {
//     includes,
//     agent_id: 'asst_sdNxYC9p05iGpeKXtL496cyh'
//   } )
// }




export const addCustomizedMemory = async ( {
  messages,
  includes
}: {
  messages: any
  includes: string
} ) => {

  const data = await fetch( 'https://api.mem0.ai/v1/memories/', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${process.env.REACT_APP_MEM0_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( {
      messages,
      includes,
      user_id: 'admin',
      agent_id: 'agent-stream'
    } )
  } )

  console.log( "🚀 ~ file: index.ts:61 ~ data:", data )

  return data
}

// postgresql://ultraterrestrial_owner:8bG1keYsHCfz@ep-billowing-salad-a5m9dnhh.us-east-2.aws.neon.tech/ultraterrestrial-prod?sslmode=require
// pg_restore 



// postgresql://ultraterrestrial_owner:8bG1keYsHCfz@
// ep-billowing-salad-a5m9dnhh.us-east-2.aws.neon.tech/ultraterrestrial-prod?sslmode=require