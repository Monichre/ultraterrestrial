import * as React from 'react'

import { getEntityNetworkGraphData, NetworkGraphPayload } from '@/lib/xata'
import { auth } from '@clerk/nextjs/server'
import { ClerkProvider, RedirectToSignIn, SignedIn } from '@clerk/nextjs'

import { Suspense } from 'react'

import { MindMap } from '@/features/mindmap'

import { StateOfDisclosureProvider } from '@/providers'
import { Loading } from '@/components/loaders/loading'
import { MindMapCursor } from '@/features/mindmap/mindmap-cursor'

export default async function Index() {
  const { userId }: { userId: string | null } = auth()
  console.log('userId: ', userId)

  const data: NetworkGraphPayload = await getEntityNetworkGraphData()

  return (
    <Suspense fallback={<Loading />}>
      <MindMapCursor />
      <StateOfDisclosureProvider stateOfDisclosure={data}>
        <MindMap />
      </StateOfDisclosureProvider>
    </Suspense>
  )
}
