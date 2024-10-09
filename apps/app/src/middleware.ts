import { NextRequest, NextResponse } from 'next/server'
import {
  clerkMiddleware,
  clerkClient,
  createRouteMatcher,
} from '@clerk/nextjs/server'
import { getUserByAuthId } from '@/features/user/get-user-by-auth-id'

const isProtectedRoute = createRouteMatcher( [
  '/explore/(.*)',
  '/history/(.*)',
  '/timeline/(.*)',
  '/drawing-board/(.*)',
] )

const isAdminRoute = createRouteMatcher( ['/admin(.*)'] )

export default clerkMiddleware( ( auth, req ) => {
  if ( isProtectedRoute( req ) ) auth().protect()
  // if (!auth().userId && isAdminRoute(req)) {
  // Add custom logic to run before redirecting

  // return auth().redirectToSignIn()
  // }
} )
