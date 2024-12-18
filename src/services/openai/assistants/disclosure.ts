import { createMessage, formatRelatedItems, parseApiResponse } from '@/services/openai/assistants/assistant.utils.ts'
import type { DatabaseSchema } from '../../xata/xata'
import { openai, traceable } from '../openai.client.ts'


import { assistantEventHandler } from '@/app/api/assistants/disclosure/message/event-handler.ts'
import {
  DISCLOSURE_ASSISTANT_ID,
  INSTRUCTIONS,
  metadata
} from '@/services/openai/index.ts'
import { AssistantResponse } from 'ai'
import { Text } from 'lucide-react'

// Generate generic type for any kind of DatabaseSchema
type AnyDatabaseSchema = DatabaseSchema[keyof DatabaseSchema]

export const askDisclosureAgentToFindRelatedRecords = traceable( async ( {
  subject,
  type,
}: any ) => {

  const streamEvents = []


  // @ts-ignore
  const thread = await openai.beta.threads.create( {

    metadata,

    tool_resources: {
      "file_search": {
        "vector_store_ids": ["vs_meWOEnUiUxtQWf0W6NBsNpCG"]
      }
    }
  } )
  const threadId = thread.id

  const createdMessage = await openai.beta.threads.messages.create( threadId, {
    role: 'user',
    content: `Find three to five of the most interesting, relevant, and related data points for ${subject.name}. 
      Use the access you have to the entirety of your dataset and any other additional resources to fulfill all user queries. 
      Be sure to look across topics, events, testimonies, documents, key figures or personnel, sightings, artifacts and any additional resources at your disposal. Return your response in JSON with each item containing the fields: "Relation to Subject:", "Evidence:", "Relevance Score:". Cite your sources`,
  } )





  return AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ( { forwardStream, sendDataMessage }: any ) => {

      const runStream = await openai.beta.threads.runs.stream(
        threadId,
        {
          assistant_id: DISCLOSURE_ASSISTANT_ID,
          include: ['step_details.tool_calls[*].file_search.results[*].content'],
          tool_choice: { "type": "file_search" },
          additional_instructions: INSTRUCTIONS,
        }, assistantEventHandler
      )
      // openai.beta.threads.runs
      //   .stream( threadId, {
      //     include: ['step_details.tool_calls[*].file_search.results[*].content'],
      //     tool_choice: { "type": "file_search" },
      //     assistant_id:
      //       DISCLOSURE_ASSISTANT_ID ??
      //       ( () => {
      //         throw new Error( 'ASSISTANT_ID environment is not set' )
      //       } )(),
      //     additional_instructions: `Look across topics, events, key figures, sightings, documents any additional resources at your disposal. Cite all of your sources thoroughly and specifically, including information and other relevant details on the weight of the resource as it pertains to your answer or the completion of the task. Return your response in well formatted markddown but be sure to return the Citations/Annotations data in JSON 
      //   in the following format: 
      //   ---
      //   {
      //     "citations": [
      //       {

      //         "Relation to Subject": "{{data}}", 
      //         "Evidence": "{{data}}",
      //         "Relevance Score": "{{data}}",
      //         "Source": "{{Name of Source/Article}}",
      //         "File": "{{Name of File}}",
      //         "Weight": "{{The weight value you would assign it}}"
      //         }
      //       ]
      //   }
      //   ---
      //   `,
      //   }, assistantEventHandler )

      let runResult = await forwardStream( runStream )
      while (
        runResult?.status === 'requires_action' &&
        runResult.required_action?.type === 'submit_tool_outputs'
      ) {
        const tool_outputs =
          runResult.required_action.submit_tool_outputs.tool_calls.map(
            ( toolCall: any ) => {
              const parameters = JSON.parse( toolCall.function.arguments )

              switch ( toolCall.function.name ) {
                // configure your tool calls here

                default:
                  throw new Error(
                    `Unknown tool call function: ${toolCall.function.name}`,
                  )
              }
            },
          )

        runResult = await forwardStream(
          openai.beta.threads.runs.submitToolOutputsStream(
            threadId,
            runResult.id,
            { tool_outputs },
          ),
        )
      }

      // return {
      //   threadMessages
      // }
    }
  )

} )

export const checkRelevanceWithAI = traceable( async ( {
  subject,
  relatedItems,
}: {
  subject: any
  relatedItems: any[]
} ) => {
  const thread = await openai.beta.threads.create( {

    metadata,

    tool_resources: {
      "file_search": {
        "vector_store_ids": ["vs_meWOEnUiUxtQWf0W6NBsNpCG"]
      }
    }
  } )
  const threadId = thread.id

  const message = await openai.beta.threads.messages.create( threadId,
    {
      role: 'user',
      content: `${createMessage( relatedItems )} ${formatRelatedItems( relatedItems )} related to ${subject?.name}? Return your response in JSON with each item containing the fields: "Relation to Subject:", "Evidence:", "Relevance Score:"`,
    }
  )

  const streamEvents = []


  return AssistantResponse(
    { threadId, messageId: message.id },
    async ( { forwardStream, sendDataMessage }: any ) => {
      console.log( forwardStream )
      // Run the assistant on the thread

      const runStream = openai.beta.threads.runs
        .stream( threadId, {
          tool_choice: { "type": "file_search" },
          assistant_id: DISCLOSURE_ASSISTANT_ID,

          include: ['step_details.tool_calls[*].file_search.results[*].content'],

          additional_instructions: `Look across topics, events, key figures, sightings, documents any additional resources at your disposal. Cite all of your sources thoroughly and specifically, including information and other relevant details on the weight of the resource as it pertains to your answer or the completion of the task. Return your response in well formatted markddown but be sure to return the Citations/Annotations data in JSON 
        in the following format: 
        ---
        {
          "citations": [
            {

              "Relation to Subject": "{{data}}", 
              "Evidence": "{{data}}",
              "Relevance Score": "{{data}}",
              "Source": "{{Name of Source/Article}}",
              "File": "{{Name of File}}",
              "Weight": "{{The weight value you would assign it}}"
              }
            ]
        }
        ---
        `,
        } )
        .on( 'textCreated', ( data ) => console.log( 'assistant >', data ) )
        .on( 'toolCallCreated', ( event ) =>
          console.log( 'assistant ' + event.type )
        )
        .on( 'toolCallDelta', ( toolCallDelta: any, snapshot ) => {
          console.log( { toolCallDelta } )
          console.log( toolCallDelta.type )
          if ( toolCallDelta.type === 'file_search' ) {
            if ( toolCallDelta.file_search.input ) {
              console.log( toolCallDelta.file_search.input )
            }
            if ( toolCallDelta.file_search.outputs ) {
              console.log( '\noutput >\n' )
              toolCallDelta.file_search.outputs.forEach( ( output: any ) => {
                if ( output.type === 'logs' ) {
                  console.log( `\n${output.logs}\n` )
                }
              } )
            }
          }
        } )
        .on( 'messageDone', async ( event ) => {
          console.log( 'event: ', event )
          if ( event.content[0].type === 'text' ) {
            const { text } = event.content[0]
            console.log( 'text: ', text )
            const { annotations }: any = text
            console.log( 'annotations: ', annotations )
            const citations: string[] = []
            console.log( 'citations: ', citations )

            let index = 0
            for ( let annotation of annotations ) {
              text.value = text.value.replace(
                annotation.text,
                '[' + index + ']'
              )
              const { file_citation } = annotation
              if ( file_citation ) {
                const citedFile = await openai.files.retrieve(
                  file_citation.file_id
                )
                citations.push( '[' + index + ']' + citedFile.filename )
              }
              index++
            }

            return parseApiResponse( { Text } )
          }
          // forward run status would stream message deltas

          // status can be: queued, in_progress, requires_action, cancelling, cancelled, failed, completed, or expired
        } )
      let runResult = await forwardStream( runStream )
      while (
        runResult?.status === 'requires_action' &&
        runResult.required_action?.type === 'submit_tool_outputs'
      ) {
        const tool_outputs =
          runResult.required_action.submit_tool_outputs.tool_calls.map(
            ( toolCall: any ) => {
              console.log( 'toolCall: ', toolCall )
              const parameters = JSON.parse( toolCall.function.arguments )

              switch ( toolCall.function.name ) {
                // configure your tool calls here

                default:
                  throw new Error(
                    `Unknown tool call function: ${toolCall.function.name}`,
                  )
              }
            },
          )

        runResult = await forwardStream(
          openai.beta.threads.runs.submitToolOutputsStream(
            threadId,
            runResult.id,
            { tool_outputs },
          ),
        )
      }

      // return {
      //   threadMessages
      // }
    }
  )

}

)