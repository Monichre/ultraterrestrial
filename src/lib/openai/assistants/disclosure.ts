import { openai } from '../openai.client.ts'
import { DatabaseSchema } from '../../xata/xata'
import { metadata } from '@/app/layout.tsx'
import {
  ENTITY_RELATION_RELEVANCE_THREAD_THREAD_ID,
  DISCLOSURE_ASSISTANT_ID,
  INSTRUCTIONS,
} from '@/lib/openai/assistants/config.ts'

// Generate generic type for any kind of DatabaseSchema
type AnyDatabaseSchema = DatabaseSchema[keyof DatabaseSchema]
export function parseApiResponse({ text }: any): object | null {
  // Extract the message value
  const messageValue = text.value

  // Locate the JSON-like string start and end positions
  const jsonStartIndex = messageValue.indexOf('```json\n') + 8
  const jsonEndIndex = messageValue.indexOf('```', jsonStartIndex)

  // Extract the JSON-like string
  const jsonString = messageValue.substring(jsonStartIndex, jsonEndIndex)

  // Parse the JSON string into an object
  try {
    const parsedObject = JSON.parse(jsonString)
    console.log('parsedObject: ', parsedObject)
    return parsedObject
  } catch (error) {
    console.error('Error parsing JSON string:', error)
    return null
  }
}
// Rest of the code...

const formatRelatedItems = (
  items: {
    type: string
    name: string
    role?: string
    bio?: string
    description?: string
  }[]
) => {
  return items.map((item) => `${item.name} - ${item.role || ''}`).join('\n')
}
export const filterConnectionsByRelevance = (connections: any) => {
  const relevant: any = {}
  const irrelevant: any = {}
  for (const key in connections) {
    if (connections[key]['Relevance Score'] > 5) {
      relevant[key] = connections[key]
    } else {
      irrelevant[key] = connections[key]
    }
  }
  return {
    relevant,
    irrelevant,
  }
}
const createMessage = (items: string | any[]) =>
  items?.length && items?.length < 2 ? `How is` : 'How are'
export const checkRelevanceWithAI = async ({
  subject,
  relatedItems,
}: {
  subject: any
  relatedItems: any[]
}) => {
  console.log('subject: ', subject)
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
}: any) => {
  console.log('threadId: ', threadId)
  console.log('content: ', content)

  await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content,
  })

  const stream = openai.beta.threads.runs.stream(threadId, {
    assistant_id: DISCLOSURE_ASSISTANT_ID,
  })

  let assistantAnswer: any

  for await (const step of stream) {
    if (step.event === 'thread.message.completed') assistantAnswer = step.data
  }
  return assistantAnswer
}

export const sendNewMessageToDisclosureAssistant = async ({ content }: any) => {
  // const thread = await openai.beta.threads.create()
  const thread = await openai.beta.threads.create({
    messages: [{ role: 'user', content }],
  })
  const { id } = thread

  const stream = await openai.beta.threads.runs.stream(id, {
    assistant_id: DISCLOSURE_ASSISTANT_ID,
  })

  let assistantAnswer: any

  for await (const step of stream) {
    // @ts-ignore

    if (step.event === 'thread.message.completed') assistantAnswer = step.data
  }
  return assistantAnswer
}
