
import { clerkMiddleware } from '@clerk/nextjs/server'
export default clerkMiddleware()

export const config = {

  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    {
      source:
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },

    {
      source:
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
      has: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },

    {
      source:
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
      has: [{ type: 'header', key: 'x-present' }],
      missing: [{ type: 'header', key: 'x-missing', value: 'prefetch' }],
    },
  ],
}



// const redis = new Redis( {
//   url: process.env.KV_URL,
//   token: process.env.KV_TOKEN,
// } )

// export const cacheMiddleware: LanguageModelV1Middleware = {
//   wrapGenerate: async ( { doGenerate, params } ) => {
//     const cacheKey = JSON.stringify( params )

//     const cached = ( await redis.get( cacheKey ) ) as Awaited<
//       ReturnType<LanguageModelV1['doGenerate']>
//     > | null

//     if ( cached !== null ) {
//       return {
//         ...cached,
//         response: {
//           ...cached.response,
//           timestamp: cached?.response?.timestamp
//             ? new Date( cached?.response?.timestamp )
//             : undefined,
//         },
//       }
//     }

//     const result = await doGenerate()

//     redis.set( cacheKey, result )

//     return result
//   },
//   wrapStream: async ( { doStream, params } ) => {
//     const cacheKey = JSON.stringify( params )

//     // Check if the result is in the cache
//     const cached = await redis.get( cacheKey )

//     // If cached, return a simulated ReadableStream that yields the cached result
//     if ( cached !== null ) {
//       // Format the timestamps in the cached response
//       const formattedChunks = ( cached as LanguageModelV1StreamPart[] ).map( p => {
//         if ( p.type === 'response-metadata' && p.timestamp ) {
//           return { ...p, timestamp: new Date( p.timestamp ) }
//         } else return p
//       } )
//       return {
//         stream: simulateReadableStream( {
//           initialDelayInMs: 0,
//           chunkDelayInMs: 10,
//           chunks: formattedChunks,
//         } ),
//         rawCall: { rawPrompt: null, rawSettings: {} },
//       }
//     }

//     // If not cached, proceed with streaming
//     const { stream, ...rest } = await doStream()

//     const fullResponse: LanguageModelV1StreamPart[] = []

//     const transformStream = new TransformStream<
//       LanguageModelV1StreamPart,
//       LanguageModelV1StreamPart
//     >( {
//       transform( chunk, controller ) {
//         fullResponse.push( chunk )
//         controller.enqueue( chunk )
//       },
//       flush() {
//         // Store the full response in the cache after streaming is complete
//         redis.set( cacheKey, fullResponse )
//       },
//     } )

//     return {
//       stream: stream.pipeThrough( transformStream ),
//       ...rest,
//     }
//   },
// }
