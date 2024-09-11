import { openai } from '../openai.client.ts'
import { DatabaseSchema } from '../../xata/xata'
import { metadata } from '@/app/layout.tsx'

import {
  createMessage,
  formatRelatedItems,
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

export const checkRelevanceWithAI = async ({
  subject,
  relatedItems,
}: {
  subject: any
  relatedItems: any[]
}) => {
  await openai.beta.threads.messages.create(
    ENTITY_RELATION_RELEVANCE_THREAD_THREAD_ID,
    {
      role: 'user',
      content: `${createMessage(relatedItems)} ${formatRelatedItems(relatedItems)} related to ${subject?.name}? Return your response in JSON with each item containing the fields: "Relation to Subject:", "Evidence:", "Relevance Score:"`,
    }
  )

  const stream = await openai.beta.threads.runs.stream(
    ENTITY_RELATION_RELEVANCE_THREAD_THREAD_ID,
    {
      assistant_id: DISCLOSURE_ASSISTANT_ID,
      metadata,
      additional_instructions: INSTRUCTIONS,
    }
  )

  let answer: any
  let payload = []

  let assistantAnswer: any
  let error

  for await (const step of stream) {
    payload.push(step.data)

    if (step.event === 'thread.run.completed') answer = step.data
    if (step.event === 'thread.message.completed') assistantAnswer = step.data
    if (step.event.includes('error')) {
      console.error('Error occurred:', step.data)
      error = step.data
    }
  }

  if (error) {
    return {
      error,
      connections: null,
    }
  }

  console.log('assistantAnswer: ', assistantAnswer)

  const { content } = assistantAnswer
  const [data] = content
  const { text } = data

  const { connections }: any = parseApiResponse({ text })

  console.log('connections: ', connections)
  return {
    text,
    assistantAnswer,
    connections,
    payload,
  }
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
