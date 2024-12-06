// import {
//   clerkMiddleware,
//   createRouteMatcher
// } from '@clerk/nextjs/server'

// const isProtectedRoute = createRouteMatcher( [
//   '/explore/(.*)',
//   '/history/(.*)',
//   '/timeline/(.*)',
//   '/drawing-board/(.*)',
// ] )

// const isAdminRoute = createRouteMatcher( ['/admin(.*)'] )

// export default clerkMiddleware( ( auth, req ) => {
//   // if ( isProtectedRoute( req ) ) auth().protect()
//   // if (!auth().userId && isAdminRoute(req)) {
//   // Add custom logic to run before redirecting

//   // return auth().redirectToSignIn()
//   // }
// } )
import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}