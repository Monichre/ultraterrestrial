import { openai } from '@/lib/openai/openai.client'

export const runtime = 'nodejs'

// Create a new thread
export async function POST() {
  const thread = await openai.beta.threads.create()
  return Response.json({ threadId: thread.id })
}
