import OpenAI from 'openai'

const openai: any = new OpenAI()

export const runtime = 'nodejs'

// Create a new assistant
export async function GET() {
  const assistant = await openai.beta.assistants.retrieve('asst_abc123')
  return Response.json({ assistant })
}
