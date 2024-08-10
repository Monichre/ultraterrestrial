'use client'
import * as React from 'react'

import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { ArrowLeftIcon } from 'lucide-react'
import { useRef, useState, useEffect, useId } from 'react'
import { useClickOutside } from '@/hooks/useClickOutside'
import { Button } from '@/components/ui/button'
import { Pencil2Icon } from '@radix-ui/react-icons'

const TRANSITION = {
  type: 'spring',
  bounce: 0.05,
  duration: 0.3,
}

export const AddNote = ({ saveNote, userNote }: any) => {
  const uniqueId = useId()
  const formContainerRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [noteTitle, setNoteTitle] = useState(userNote.title)
  const [note, setNote] = useState<null | string>(userNote.content)

  const handleSavingNote = () => {
    saveNote({ title: noteTitle, content: note })
  }
  const openMenu = () => {
    setIsOpen(true)
  }

  const closeMenu = () => {
    setIsOpen(false)
    setNote(null)
  }

  useClickOutside(formContainerRef, () => {
    closeMenu()
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <MotionConfig transition={TRANSITION}>
      <div className='relative flex items-center justify-center'>
        <motion.button
          key='button'
          layoutId={`popover-${uniqueId}`}
          // className='flex h-9 items-center border border-zinc-950/10 px-3 text-zinc-950 dark:border-zinc-50/10 '

          onClick={openMenu}
        >
          <motion.span
            layoutId={`popover-label-${uniqueId}`}
            className='text-sm'
          >
            <Button variant='ghost' size='icon'>
              <Pencil2Icon className='h-5 w-5 text-white stroke-1' />
            </Button>
          </motion.span>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={formContainerRef}
              layoutId={`popover-${uniqueId}`}
              className='absolute z-50 h-auto w-[364px] overflow-hidden outline-none dark:bg-black border border-white/60 dark:border-white/30 rounded-[calc(var(--radius))] text-white'
              style={{
                borderRadius: 12,
              }}
            >
              <form
                className='flex h-full flex-col'
                onSubmit={(e) => {
                  e.preventDefault()
                  console.log('Add Note')
                }}
              >
                <motion.span
                  layoutId={`popover-label-${uniqueId}`}
                  aria-hidden='true'
                  style={{
                    opacity: note ? 0 : 1,
                  }}
                  className='absolute right-0 top-0 select-none text-sm text-zinc-500 dark:text-zinc-400'
                >
                  Add Note
                </motion.span>
                <div className='flex flex-col gap-4 w-full divide-y divide-slate-200 p-4'>
                  <div>
                    <input
                      className='h-full w-full resize-none rounded-md bg-transparent px-4 py-3 text-sm outline-none border-b-accent'
                      value={noteTitle}
                      onChange={(e) => setNoteTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <textarea
                      className='h-full w-full resize-none rounded-md bg-transparent px-4 py-3 text-sm outline-none'
                      autoFocus
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>
                </div>
                <div key='close' className='flex justify-between px-4 py-3'>
                  <button
                    type='button'
                    className='flex items-center'
                    onClick={closeMenu}
                    aria-label='Close popover'
                  >
                    <ArrowLeftIcon
                      size={16}
                      className='text-zinc-900 dark:text-zinc-100'
                    />
                  </button>
                  <button
                    className='relative ml-1 flex h-8 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 bg-transparent px-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:text-zinc-50 dark:hover:bg-zinc-800'
                    type='button'
                    aria-label='Submit note'
                    onClick={() => {
                      handleSavingNote()
                      closeMenu()
                    }}
                  >
                    Submit Note
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  )
}
