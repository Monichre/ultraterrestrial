import { assistantEventHandler } from '@/app/api/assistants/disclosure/message/event-handler'
import {
  DISCLOSURE_ASSISTANT_ID
} from '@/services/openai/config'
import { openai } from '@/services/openai/openai.client'
import { AssistantResponse } from 'ai'

export async function POST( req: Request ) {
  const input: {
    threadId: string | null
    message: string
  } = await req.json()
  console.log( 'input: ', input )



  const threadId = input.threadId ?? ( await openai.beta.threads.create( {
    tool_resources: {
      "file_search": {
        "vector_store_ids": ["vs_meWOEnUiUxtQWf0W6NBsNpCG"]
      }
    }
  } ) ).id

  console.log( "🚀 ~ file: route.ts:24 ~ POST ~ threadId:", threadId )


  const createdMessage = await openai.beta.threads.messages.create( threadId, {
    role: 'user',
    content: input.message,
  } )



  return AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ( { forwardStream, sendDataMessage }: any ) => {

      const runStream = openai.beta.threads.runs
        .stream( threadId, {
          include: ['step_details.tool_calls[*].file_search.results[*].content'],
          tool_choice: { "type": "file_search" },
          assistant_id:
            DISCLOSURE_ASSISTANT_ID ??
            ( () => {
              throw new Error( 'ASSISTANT_ID environment is not set' )
            } )(),
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
        }, assistantEventHandler )

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
}
