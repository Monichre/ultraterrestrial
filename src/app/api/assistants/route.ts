import { openai } from '@/lib/openai/openai.client'

// Create a new assistant
export async function GET() {
  // @ts-ignore
  const assistants = await openai.beta.assistants.list({
    order: 'desc',
    limit: '20',
  })
  return Response.json({ assistants })
}
