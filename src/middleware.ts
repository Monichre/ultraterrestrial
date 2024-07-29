import { NextRequest, NextResponse } from 'next/server'
import {
  clerkMiddleware,
  clerkClient,
  createRouteMatcher,
} from '@clerk/nextjs/server'
import { getUserByAuthId } from '@/features/user/get-user-by-auth-id'
const allowedOrigins = [
  'https://us-east-1.storage.xata.sh',
  'https://us-east-1.xata.sh',
  'http://localhost:3000',
  'https://ultraterrestrial.vercel.app',
]

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

// export function middleware(request: NextRequest) {
//   // Check the origin from the request
//   const origin = request.headers.get('origin') ?? ''
//   const isAllowedOrigin = allowedOrigins.includes(origin)

//   // Handle preflighted requests
//   const isPreflight = request.method === 'OPTIONS'

//   if (isPreflight) {
//     const preflightHeaders = {
//       ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
//       ...corsOptions,
//     }
//     return NextResponse.json({}, { headers: preflightHeaders })
//   }

//   // Handle simple requests
//   const response = NextResponse.next()

//   if (isAllowedOrigin) {
//     response.headers.set('Access-Control-Allow-Origin', origin)
//   }

//   Object.entries(corsOptions).forEach(([key, value]) => {
//     response.headers.set(key, value)
//   })

//   return response
// }

// export default clerkMiddleware()
// (auth, req) => {
//   // if (auth().userId) {
//   //   console.log('auth().userId: ', auth().userId)
//   //   const dbUser = getUserByAuthId(auth().userId).then((res) => {
//   //     console.log('res: ', res)
//   //   })
//   // }
// }

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}

const isProtectedRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware((auth, req) => {
  const { has, redirectToSignIn } = auth()
  // Restrict admin routes to users with specific permissions
  const isAdmin = has({ permission: 'org:db:manage' })
  console.log('isAdmin: ', isAdmin)
  if (isProtectedRoute(req) && !has({ permission: 'org:db:manage' })) {
    // Add logic to run if the user does not have the required permissions
    // return redirectToSignIn()
  }
})
