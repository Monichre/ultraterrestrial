"use client"
// @ts-ignore
import { Room } from "@/features/collab/room"
import dynamic from 'next/dynamic'

const LiveUsers = dynamic( () => import( '@/features/collab/live-users' ).then( mod => mod.LiveUsers ), { ssr: false } )

export default function Page( { params }: { params: { roomId: string } } ) {
  return (
    <Room roomId={params.roomId}>
      <LiveUsers />
    </Room>
  )
}
