'use  client'

import { ScanSearch } from 'lucide-react'
import React, { memo, useState, type FunctionComponent } from 'react'

import { AddNote } from '@/components/note/AddNote'
import { Button } from '@/components/ui/button/button'

interface EntityCardUtilityMenuProps {
  updateNote: any
  bookmarked: boolean

  saveNote: any
  userNote: any
  findConnections?: any
}

export const EM: FunctionComponent<EntityCardUtilityMenuProps> = ({
  updateNote,
  userNote,
  bookmarked,
  saveNote,
  findConnections,
}) => {
  const gradientOne =
    'bg-[radial-gradient(50%_86.9%_at_50%_100%,_rgba(255,_255,_255,_0.2)_0%,_rgba(255,_255,_255,_0)_100%)] bg-black'
  const gradientTwo =
    'bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'

  return (
    <>
      {findConnections && (
        <Button variant='ghost' onClick={findConnections}>
          <ScanSearch className='h-5 w-5 text-white stroke-1' />
        </Button>
      )}
      {/* 
      <DynamicSettings
        handleSave={handleSave}
        saveNote={saveNote}
        userNote={userNote}
      /> */}
      <AddNote saveNote={saveNote} userNote={userNote} />
      {/* <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='ghost' size='icon' onClick={handleSave}>
                {bookmarked ? (
                  <BookmarkFilledIcon className='h-5 w-5 text-neutral-200 stroke-1' />
                ) : (
                  <BookmarkIcon className='h-5 w-5 text-neutral-200 stroke-1' />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Bookmark Node</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider> */}

      {/* 
      <div>
        
      </div> */}
    </>
  )
}
EM.displayName = 'EntityCardUtilityMenu'
export const EntityCardUtilityMenu = memo(EM)
