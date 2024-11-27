'use client'
import { Suspense } from "react"

// Start of Selection
import dynamic from "next/dynamic"

const StorageTldraw = dynamic( () => import( "@/components/StorageTldraw" ).then( mod => mod.StorageTldraw ) )
const ConsolePage = dynamic( () => import( "@/components/console" ).then( mod => mod.ConsolePage ) )
const Room = dynamic( () => import( "@/app/Room" ).then( mod => mod.Room ) )


export const Home = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Room>
        <div className='flex flex-row h-[100vh] w-[100vw]'>

          <StorageTldraw />
          <div className='h-full w-[25vw] '>
            <ConsolePage />
          </div>
        </div>
      </Room>

    </Suspense>
  )
}