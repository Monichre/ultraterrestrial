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

interface EntityCardUtilityMenuProps {
  handleSave: any
  bookmarked: boolean
  getConnections: any
}

export const EM: FunctionComponent<EntityCardUtilityMenuProps> = ({
  getConnections,
  handleSave,
  bookmarked,
}) => {
  const gradientOne =
    'bg-[radial-gradient(50%_86.9%_at_50%_100%,_rgba(255,_255,_255,_0.2)_0%,_rgba(255,_255,_255,_0)_100%)] bg-black'
  const gradientTwo =
    'bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'
  const [note, setNode] = useState('')

  return (
    <>
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='ghost' size='icon' onClick={getConnections}>
                <svg
                  className='scale-150'
                  viewBox='0 0 104 77'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  style={{ transform: 'scale(1.5)' }}
                >
                  <path
                    d='M56.1116 2.82617L56.3001 9.65389C56.3703 12.1972 58.4156 14.2425 60.9589 14.3127L67.7866 14.5012L60.9589 14.6897C58.4156 14.76 56.3703 16.8052 56.3001 19.3485L56.1116 26.1763L55.923 19.3485C55.8528 16.8052 53.8076 14.76 51.2642 14.6897L44.4365 14.5012L51.2642 14.3127C53.8076 14.2425 55.8528 12.1972 55.923 9.65389L56.1116 2.82617Z'
                    fill='currentColor'
                  />
                  <path
                    d='M56.1116 2.82617L56.3001 9.65389C56.3703 12.1972 58.4156 14.2425 60.9589 14.3127L67.7866 14.5012L60.9589 14.6897C58.4156 14.76 56.3703 16.8052 56.3001 19.3485L56.1116 26.1763L55.923 19.3485C55.8528 16.8052 53.8076 14.76 51.2642 14.6897L44.4365 14.5012L51.2642 14.3127C53.8076 14.2425 55.8528 12.1972 55.923 9.65389L56.1116 2.82617Z'
                    fill='currentColor'
                    fill-opacity='0.2'
                  />
                  <path
                    d='M39.6712 50.2412L39.8405 56.3722C39.9036 58.656 41.7401 60.4926 44.0239 60.5556L50.1549 60.7249L44.0239 60.8942C41.7401 60.9573 39.9036 62.7938 39.8405 65.0776L39.6712 71.2086L39.5019 65.0776C39.4389 62.7938 37.6023 60.9573 35.3185 60.8942L29.1875 60.7249L35.3185 60.5556C37.6023 60.4926 39.4389 58.656 39.5019 56.3722L39.6712 50.2412Z'
                    fill='currentColor'
                  />
                  <path
                    d='M39.6712 50.2412L39.8405 56.3722C39.9036 58.656 41.7401 60.4926 44.0239 60.5556L50.1549 60.7249L44.0239 60.8942C41.7401 60.9573 39.9036 62.7938 39.8405 65.0776L39.6712 71.2086L39.5019 65.0776C39.4389 62.7938 37.6023 60.9573 35.3185 60.8942L29.1875 60.7249L35.3185 60.5556C37.6023 60.4926 39.4389 58.656 39.5019 56.3722L39.6712 50.2412Z'
                    fill='currentColor'
                    fill-opacity='0.2'
                  />
                  <path
                    d='M95.4182 22.9335C97.5561 28.8593 94.7036 36.0197 88.217 42.8319C81.7415 49.6327 71.6948 56.0259 59.6091 60.386C47.5234 64.7461 35.7091 66.2397 26.3832 65.1397C17.0414 64.0378 10.2745 60.3477 8.13666 54.4219C5.9988 48.496 8.85124 41.3357 15.3378 34.5234C21.8134 27.7227 31.86 21.3295 43.9457 16.9694C56.0315 12.6092 67.8457 11.1157 77.1717 12.2157C86.5134 13.3176 93.2803 17.0076 95.4182 22.9335Z'
                    stroke='currentColor'
                    stroke-width='0.476532'
                  />
                  <path
                    d='M95.4182 22.9335C97.5561 28.8593 94.7036 36.0197 88.217 42.8319C81.7415 49.6327 71.6948 56.0259 59.6091 60.386C47.5234 64.7461 35.7091 66.2397 26.3832 65.1397C17.0414 64.0378 10.2745 60.3477 8.13666 54.4219C5.9988 48.496 8.85124 41.3357 15.3378 34.5234C21.8134 27.7227 31.86 21.3295 43.9457 16.9694C56.0315 12.6092 67.8457 11.1157 77.1717 12.2157C86.5134 13.3176 93.2803 17.0076 95.4182 22.9335Z'
                    stroke='currentColor'
                    stroke-opacity='0.2'
                    stroke-width='0.476532'
                  />
                </svg>
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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='ghost' size='icon'>
                <Pencil2Icon className='h-5 w-5 text-neutral-200 stroke-1' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Make a note</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  )
}
EM.displayName = 'EntityCardUtilityMenu'
export const EntityCardUtilityMenu = memo(EM)
