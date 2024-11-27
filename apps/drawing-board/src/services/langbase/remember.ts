const apiKey = process.env.LANGBASE_API_KEY

import zod, { z } from 'zod'

const memoryResponseSchema = zod.object( {
  name: zod.string(),
  description: zod.string(),
  owner_login: zod.string(),
  url: zod.string().url(),
} )

type MemoryResponse = zod.infer<typeof memoryResponseSchema>

export async function getSignedUploadUrl( { memoryName, fileName }: any ) {
  const url = 'https://api.langbase.com/beta/org/ultraterrestrial/memorysets/documents'


  const newDoc = {
    memoryName,
    ownerLogin: 'ultraterrestrial',
    fileName
  }

  const response = await fetch( url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify( newDoc ),
  } )

  const res = await response.json()

  return res
}


const uploadDocumentSchema = z.object( {
  signedUrl: z.string().url(),
  filePath: z.string().optional(),
  markdownContent: z.string(),
} )

type UploadDocumentParams = z.infer<typeof uploadDocumentSchema>

async function uploadDocument( { signedUrl, markdownContent }: UploadDocumentParams ) {
  // const file = readFileSync( filePath )
  const buffer = Buffer.from( markdownContent, 'utf-8' )

  const response = await fetch( signedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/pdf',
    },
    body: buffer,
  } )

  return response
}


export async function createNewMemory( { name, description }: { name: string, description: string } ) {
  const url = 'https://api.langbase.com/beta/org/ultraterrestrial/memorysets'


  const memory = {
    name,
    description
  }

  const response = await fetch( url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify( memory ),
  } )

  const newMemory = await response.json()

  console.log( "🚀 ~ file: remember.ts:21 ~ createNewMemory ~ newMemory:", newMemory )

  return newMemory
}
