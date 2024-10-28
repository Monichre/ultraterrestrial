'use server'


import { askXataWithAi, xata } from '@/services/xata'
import { askDisclosureAgentToFindRelatedRecords } from '@/services/openai/assistants/disclosure'



export const askAIAction = async ( { question, prompt, table }: any ) => {

  try {
    const dbResponse = await askXataWithAi( { question, table, prompt } )
    console.log( 'dbResponse: ', dbResponse )
    const plainData = JSON.parse( JSON.stringify( dbResponse ) )
    console.log( 'plainData: ', plainData )
    // const assistantResponse = await askDisclosureAgentToFindRelatedRecords( { subject: question, type: table } )
    // !TODO: figure out how to process the response
    const response = {
      dbResponse: plainData
      // assistantResponse
    }
    console.log( 'response: ', response )
    return response
  } catch ( error ) {
    console.error( 'Error in askAIAction:', error )
    throw error
  }
}
