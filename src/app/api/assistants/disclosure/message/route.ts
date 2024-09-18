import { AssistantResponse } from 'ai'
import {
  DISCLOSURE_ASSISTANT_ID,
  ENTITY_RELATION_RELEVANCE_THREAD_THREAD_ID,
} from '@/lib/openai/config'
import { openai } from '@/lib/openai/openai.client'
import { searchDatabaseFunction } from '@/lib/openai/assistants/assistant.utils'

export async function POST(req: Request) {
  const input: {
    threadId: string | null
    message: string
  } = await req.json()

  const threadId = input.threadId ?? ENTITY_RELATION_RELEVANCE_THREAD_THREAD_ID //(await openai.beta.threads.create({})).id

  const createdMessage = await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content: input.message,
  })

  /* This code snippet is defining a function that handles a POST request. It receives input data
containing a threadId and a message. If the threadId is not provided, it defaults to
ENTITY_RELATION_RELEVANCE_THREAD_THREAD_ID. It then creates a new message in the specified thread
using the input message. */
  // return AssistantResponse(
  //   { threadId, messageId: createdMessage.id },
  //   async ({ forwardStream }) => {
  //     const runStream = openai.beta.threads.runs.stream(threadId, {
  //       assistant_id:
  //         DISCLOSURE_ASSISTANT_ID ??
  //         (() => {
  //           throw new Error('ASSISTANT_ID environment is not set')
  //         })(),
  //       tools: [{ type: 'file_search' }, { ...searchDatabaseFunction }],
  //       tool_choice: 'auto',
  //     })

  //     await forwardStream(runStream)
  //   }
  // )

  return AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ({ forwardStream, sendDataMessage }: any) => {
      // Run the assistant on the thread
      const runStream = openai.beta.threads.runs.stream(threadId, {
        assistant_id:
          DISCLOSURE_ASSISTANT_ID ??
          (() => {
            throw new Error('ASSISTANT_ID environment is not set')
          })(),
        tools: [{ type: 'file_search' }, { ...searchDatabaseFunction }],
        tool_choice: 'auto',
      })
      // forward run status would stream message deltas
      let runResult = await forwardStream(runStream)
      console.log('runResult: ', runResult)

      // status can be: queued, in_progress, requires_action, cancelling, cancelled, failed, completed, or expired
      while (
        runResult?.status === 'requires_action' &&
        runResult.required_action?.type === 'submit_tool_outputs'
      ) {
        const tool_outputs =
          runResult.required_action.submit_tool_outputs.tool_calls.map(
            (toolCall: any) => {
              const parameters = JSON.parse(toolCall.function.arguments)

              switch (toolCall.function.name) {
                // configure your tool calls here

                default:
                  throw new Error(
                    `Unknown tool call function: ${toolCall.function.name}`
                  )
              }
            }
          )
        console.log('tool_outputs: ', tool_outputs)

        runResult = await forwardStream(
          openai.beta.threads.runs.submitToolOutputsStream(
            threadId,
            runResult.id,
            { tool_outputs }
          )
        )
      }
    }
  )
}
