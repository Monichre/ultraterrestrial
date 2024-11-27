
"use client"

import { Avatars } from "@/components/Avatars"
import { Badge } from "@/components/Badge"
import { useSelf } from "@liveblocks/react/suspense"

import "tldraw/tldraw.css"
import { DefaultStylePanel, Tldraw, useStorageStore } from "./useStorageStore"

/**
 * IMPORTANT: LICENSE REQUIRED
 * To remove the watermark, you must first purchase a license
 * Learn more: https://tldraw.dev/community/license
 */

export function StorageTldraw() {
  // Getting authenticated user info. Doing this using selectors instead
  // of just `useSelf()` to prevent re-renders on Presence changes
  const id = useSelf( ( me ) => me.id )
  const info = useSelf( ( me ) => me.info )

  const store = useStorageStore( {
    user: { id, color: info.color, name: info.name },
  } )

  return (
    <div className='flex flex-row h-full w-[75vw]'>
      <div className='h-full w-full'>
        <Tldraw
          store={store}
          components={{
            // Render a live avatar stack at the top-right
            StylePanel: () => (
              <div
                style={{
                  display: "flex-column",
                  marginTop: 4,
                }}
              >
                <Avatars />
                <DefaultStylePanel />
                <Badge />
              </div>
            ),
          }}
          autoFocus
        />
      </div>

    </div>
  )
}