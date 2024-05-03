import { NextResponse, type NextRequest } from 'next/server'
import { headers } from 'next/headers'

export async function GET(request: NextRequest, response: NextResponse) {
  console.log('request: ', request)
  const searchParams = request.nextUrl.searchParams
  console.log('searchParams: ', searchParams)
  const imageUrl: any = searchParams.get('imageUrl')

  console.log('imageUrl: ', imageUrl)

  try {
    const data: any = await fetch(imageUrl)
    console.log('data: ', data)
    const imageBuffer = await data.blob()
    console.log('imageBuffer: ', imageBuffer)
    // console.log('imageBlob: ', imageBlob)
    // const objUrl = URL.createObjectURL(imageBlob)
    // console.log('objUrl: ', objUrl)
    return new Response(imageBuffer, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  } catch (error) {
    console.log('er4or: ', error)
    return new Response('Error', {
      status: 500,
    })
  }
}
