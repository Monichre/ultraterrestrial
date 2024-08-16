'use  client'

import { ScanSearch } from 'lucide-react'
import React, { memo, useState, type FunctionComponent } from 'react'

import { BookmarkIcon, BookmarkFilledIcon } from '@radix-ui/react-icons'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { AddNote } from '@/components/note/AddNote'
import { Button } from '@/components/ui/button/button'

interface EntityCardUtilityMenuProps {
  handleSave: any
  bookmarked: boolean

  saveNote: any
  userNote: any
  findConnectedNodes?: any
}

export const EM: FunctionComponent<EntityCardUtilityMenuProps> = ({
  handleSave,
  userNote,
  bookmarked,
  saveNote,
  findConnectedNodes,
}) => {
  const gradientOne =
    'bg-[radial-gradient(50%_86.9%_at_50%_100%,_rgba(255,_255,_255,_0.2)_0%,_rgba(255,_255,_255,_0)_100%)] bg-black'
  const gradientTwo =
    'bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'

  return (
    <>
      {findConnectedNodes && (
        <div>
          <Button variant='ghost' size='icon' onClick={findConnectedNodes}>
            <ScanSearch />
          </Button>
        </div>
      )}
      <div>
        <TooltipProvider>
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
        </TooltipProvider>
      </div>

      <div>
        <AddNote saveNote={saveNote} userNote={userNote} />
      </div>
    </>
  )
}
EM.displayName = 'EntityCardUtilityMenu'
export const EntityCardUtilityMenu = memo(EM)
