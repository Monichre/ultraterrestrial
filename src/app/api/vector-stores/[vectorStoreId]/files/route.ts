import OpenAI from 'openai'
const openai = new OpenAI()

// #TODO: Fix this

export async function POST(req) {
  const myVectorStoreFile = await openai.beta.vectorStores.files.create(
    'vs_abc123',
    {
      file_id: 'file-abc123',
    }
  )
  console.log(myVectorStoreFile)
  return Response.json({ record })
}