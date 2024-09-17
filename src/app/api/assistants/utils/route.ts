import { openai } from '@/lib/openai/openai.client'
export const runtime = 'nodejs'

// Create a new assistant
export async function GET() {
  const assistant = await openai.beta.assistants.retrieve('asst_abc123')
  return Response.json({ assistant })
}
