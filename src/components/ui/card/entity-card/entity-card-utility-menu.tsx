'use  client'

import { Command, Bold, Italic, Underline } from 'lucide-react'
import React, { memo, useState, type FunctionComponent } from 'react'

import {
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from 'cmdk'
import {
  ArrowRightIcon,
  BookmarkIcon,
  BookmarkFilledIcon,
  DrawingPinFilledIcon,
  DotsVerticalIcon,
  Pencil2Icon,
  Share1Icon,
} from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { useMindMapSidebar } from '@/features/mindmap/mindmap-sidebar'
import { useAuth } from '@clerk/nextjs'

interface EntityCardUtilityMenuProps {
  node: any
  onSave: any
}

export const EM: FunctionComponent<EntityCardUtilityMenuProps> = ({ node }) => {
  const { userId, sessionId, isLoaded } = useAuth()
  console.log('userId: ', userId)
  console.log('isLoaded: ', isLoaded)
  console.log('sessionId: ', sessionId)
  const gradientOne =
    'bg-[radial-gradient(50%_86.9%_at_50%_100%,_rgba(255,_255,_255,_0.2)_0%,_rgba(255,_255,_255,_0)_100%)] bg-black'
  const gradientTwo =
    'bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'

  const [bookmarked, setBookmarked] = useState(false)
  const bookMarkNode = () => {
    setBookmarked(true)
    // #TODO: Run some save logic (BIG ASK. Loaded Feature with zero configuration in place)
  }
  const { open, handleSidebarOpen } = useMindMapSidebar()
  const handleOpen = () => {
    handleSidebarOpen({ node: node, isOpen: true })
  }
  return (
    <div
      className={`absolute top-[-50px] z-[-2] w-full h-auto flex align-center items-center justify-center bg-none`}
    >
      <div className={`flex p-1 rounded ${gradientOne}`}>
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant='ghost' size='icon' onClick={bookMarkNode}>
                  {bookmarked ? (
                    <BookmarkFilledIcon className='h-5 w-5 text-neutral-200' />
                  ) : (
                    <BookmarkIcon className='h-5 w-5 text-neutral-200' />
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant='ghost' size='icon' onClick={handleOpen}>
                  <Share1Icon className='h-5 w-5 text-neutral-200' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>See Connections</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <Pencil2Icon className='h-5 w-5 text-neutral-200' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Make a note</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}
EM.displayName = 'EntityCardUtilityMenu'
export const EntityCardUtilityMenu = memo(EM)
