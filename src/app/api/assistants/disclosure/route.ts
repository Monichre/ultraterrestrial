import OpenAI from 'openai'
import { AssistantResponse } from 'ai'
import { DISCLOSURE_ASSISTANT_ID } from '@/lib/openai/assistants/config'
import { openai } from '@/lib/openai/openai.client'

export async function POST(req: Request) {
  const input: {
    threadId: string | null
    message: string
  } = await req.json()

  const threadId = input.threadId ?? (await openai.beta.threads.create({})).id

  const createdMessage = await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content: input.message,
  })

  return AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ({ forwardStream }) => {
      const runStream = openai.beta.threads.runs.stream(threadId, {
        assistant_id:
          DISCLOSURE_ASSISTANT_ID ??
          (() => {
            throw new Error('ASSISTANT_ID environment is not set')
          })(),
      })

      await forwardStream(runStream)
    }
  )
}