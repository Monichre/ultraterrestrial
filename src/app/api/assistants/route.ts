import OpenAI from 'openai'

const openai: any = new OpenAI()

export const runtime = 'nodejs'

// Create a new assistant
export async function GET() {
  const assistants = await openai.beta.assistants.list({
    order: 'desc',
    limit: '20',
  })
  return Response.json({ assistants })
}
