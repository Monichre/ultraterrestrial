import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest, response: NextResponse) {
  const searchParams = request.nextUrl.searchParams
  const imageUrl: any = searchParams.get('imageUrl')

  try {
    const data: any = await fetch(imageUrl)
    const imageBuffer = await data.blob()

    return new Response(imageBuffer, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  } catch (error) {
    return new Response('Error', {
      status: 500,
    })
  }
}
