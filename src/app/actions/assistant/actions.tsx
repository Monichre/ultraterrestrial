'use server'

import { DISCLOSURE_ASSISTANT_ID } from '@/services/openai/assistants/config'
import { openai } from '@/services/openai/openai.client'
import { generateId } from 'ai'
import { createAI, createStreamableUI, createStreamableValue } from 'ai/rsc'
import { Message } from '@/features/ai/message'
import { ReactNode } from 'react'

export interface ClientMessage {
  id: string
  status: ReactNode
  text: ReactNode
}

let THREAD_ID = ''
let RUN_ID = ''

export async function submitMessage(question: string): Promise<ClientMessage> {
  const statusUIStream = createStreamableUI('thread.init')
  console.log('statusUIStream: ', statusUIStream)

  const textStream: any = createStreamableValue('')
  console.log('textStream: ', textStream)
  const textUIStream = createStreamableUI(
    // @ts-ignore
    <Message textStream={textStream.value} />
  )

  const runQueue: any = []
  console.log('runQueue: ', runQueue)

  if (THREAD_ID) {
    await openai.beta.threads.messages.create(THREAD_ID, {
      role: 'user',
      content: question,
    })

    const run = await openai.beta.threads.runs.create(THREAD_ID, {
      assistant_id: DISCLOSURE_ASSISTANT_ID,
      stream: true,
    })

    runQueue.push({ id: generateId(), run })
  } else {
    const run = await openai.beta.threads.createAndRun({
      assistant_id: DISCLOSURE_ASSISTANT_ID,
      stream: true,
      thread: {
        messages: [{ role: 'user', content: question }],
      },
    })

    runQueue.push({ id: generateId(), run })
  }

  while (runQueue.length > 0) {
    const latestRun = runQueue.shift()

    if (latestRun) {
      for await (const delta of latestRun.run) {
        const { data, event } = delta

        statusUIStream.update(event)

        if (event === 'thread.created') {
          THREAD_ID = data.id
        } else if (event === 'thread.run.created') {
          RUN_ID = data.id
        } else if (event === 'thread.message.delta') {
          data.delta.content?.map((part: any) => {
            if (part.type === 'text') {
              if (part.text) {
                textStream.update(part.text.value as string)
              }
            }
          })
        } else if (event === 'thread.run.failed') {
          console.error(data)
        }
      }
    }
  }

  statusUIStream.done()
  textStream.done()

  console.log('statusUIStream: ', statusUIStream)
  console.log('textUIStream.value: ', textUIStream.value)
  return {
    id: generateId(),
    status: statusUIStream.value,
    text: textUIStream.value,
  }
}

export const AI = createAI({
  actions: {
    handleSubmitMessage: submitMessage,
  },
})
