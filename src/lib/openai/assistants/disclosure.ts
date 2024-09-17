import { openai } from '../openai.client.ts'
import type { DatabaseSchema } from '../../xata/xata'
import { metadata } from '@/app/layout.tsx'

import {
  createMessage,
  formatRelatedItems,
  formatSubject,
  parseApiResponse,
} from '@/lib/openai/assistants/assistant.utils.ts'
import { AssistantResponse } from 'ai'
import {
  DISCLOSURE_ASSISTANT_ID,
  ENTITY_RELATION_RELEVANCE_THREAD_THREAD_ID,
  INSTRUCTIONS,
} from '@/lib/openai/index.ts'

// Generate generic type for any kind of DatabaseSchema
type AnyDatabaseSchema = DatabaseSchema[keyof DatabaseSchema]

export const askDisclosureAgentToFindRelatedRecords = async ({
  subject,
  type,
}: any) => {
  const threadId = ENTITY_RELATION_RELEVANCE_THREAD_THREAD_ID
  const createdMessage = await openai.beta.threads.messages.create(
    ENTITY_RELATION_RELEVANCE_THREAD_THREAD_ID,
    {
      role: 'user',
      content: `Provide a list of the most interesting related data points that you know of regarding ${JSON.stringify(subject)}. Look across topics, events, key figures, sightings, documents any additional resources at your disposal. Return your response in JSON with each item containing the fields: "Relation to Subject:", "Evidence:", "Relevance Score:"`,
    }
  )

  // const existingRuns = await openai.beta.threads.runs.list(
  //   ENTITY_RELATION_RELEVANCE_THREAD_THREAD_ID
  // )

  return AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ({ forwardStream, sendDataMessage }) => {
      // Run the assistant on the thread
      const runStream = await openai.beta.threads.runs.stream(
        ENTITY_RELATION_RELEVANCE_THREAD_THREAD_ID,
        {
          assistant_id: DISCLOSURE_ASSISTANT_ID,
          metadata,
          additional_instructions: INSTRUCTIONS,
        }
      )

      // forward run status would stream message deltas
      let runResult = await forwardStream(runStream)
      console.log('runResult: ', runResult)

      // status can be: queued, in_progress, requires_action, cancelling, cancelled, failed, completed, or expired
      // while (
      //   runResult?.status === 'requires_action' &&
      //   runResult.required_action?.type === 'submit_tool_outputs'
      // ) {
      //   const tool_outputs =
      //     runResult.required_action.submit_tool_outputs.tool_calls.map(
      //       (toolCall: any) => {
      //         const parameters = JSON.parse(toolCall.function.arguments)
      //         console.log('parameters: ', parameters)

      //         switch (toolCall.function.name) {
      //           // configure your tool calls here

      //           default:
      //             throw new Error(
      //               `Unknown tool call function: ${toolCall.function.name}`
      //             )
      //         }
      //       }
      //     )

      //   runResult = await forwardStream(
      //     openai.beta.threads.runs.submitToolOutputsStream(
      //       threadId,
      //       runResult.id,
      //       { tool_outputs }
      //     )
      //   )
      // }
    }
  )
}

export const checkRelevanceWithAI = async ({
  subject,
  relatedItems,
}: {
  subject: any
  relatedItems: any[]
}) => {
  const createdMessage = await openai.beta.threads.messages.create(
    ENTITY_RELATION_RELEVANCE_THREAD_THREAD_ID,
    {
      role: 'user',
      content: `${createMessage(relatedItems)} ${formatRelatedItems(relatedItems)} related to ${subject?.name}? Return your response in JSON with each item containing the fields: "Relation to Subject:", "Evidence:", "Relevance Score:"`,
    }
  )
  const threadId = ENTITY_RELATION_RELEVANCE_THREAD_THREAD_ID

  return AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ({ forwardStream }) => {
      const runStream = openai.beta.threads.runs.stream(threadId, {
        assistant_id:
          DISCLOSURE_ASSISTANT_ID ??
          (() => {
            throw new Error('ASSISTANT_ID environment is not set')
          })(),
        metadata,
        additional_instructions: INSTRUCTIONS,
      })

      await forwardStream(runStream)
    }
  )
}

export const sendMessageInThreadToDisclosureAssistant = async ({
  threadId,
  content,
}: {
  threadId?: string
  content: string
}) => {
  console.log('threadId: ', threadId)
  console.log('content: ', content)
  if (threadId) {
    const createdMessage = await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content,
    })

    return AssistantResponse(
      { threadId, messageId: createdMessage.id },
      async ({ forwardStream, sendDataMessage }: any) => {
        // Run the assistant on the thread
        const runStream = openai.beta.threads.runs.stream(threadId, {
          assistant_id:
            process.env.ASSISTANT_ID ??
            (() => {
              throw new Error('ASSISTANT_ID is not set')
            })(),
        })

        // forward run status would stream message deltas
        let runResult = await forwardStream(runStream)

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
}

export const sendNewMessageToDisclosureAssistant = async ({
  threadId: idOfThread,
  content,
}: {
  threadId?: string
  content: string
}) => {
  // const thread = await openai.beta.threads.create()
  const threadId = idOfThread ?? (await openai.beta.threads.create({})).id

  // Add a message to the thread
  const createdMessage = await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content: content,
  })

  return AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ({ forwardStream, sendDataMessage }: any) => {
      // Run the assistant on the thread
      const runStream = openai.beta.threads.runs.stream(threadId, {
        assistant_id:
          process.env.ASSISTANT_ID ??
          (() => {
            throw new Error('ASSISTANT_ID is not set')
          })(),
      })

      // forward run status would stream message deltas
      let runResult = await forwardStream(runStream)

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
// sendNewMessageToDisclosureAssistant
