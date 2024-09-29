'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlusIcon, SearchIcon, X } from 'lucide-react'
import {
  EventsIcon,
  TopicsIcon,
  KeyFiguresIcon,
  TestimoniesIcon,
  OrganizationsIcon,
} from '@/components/icons/entity-icons'
import { useMindMap } from '@/providers'
import { InputWithVanishAnimation } from '@/features/mindmap/cards/root-node-card/InputWithVanishAnimation'
import { searchTable } from '@/features/ai/search'
import { capitalize } from '../../../utils/functions'
import { Button, ShinyButton } from '@/components/ui/button'
import { AiAssistedSearch } from '@/features/ai'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { Separator } from '@/components/ui/separator'
import { AddNote } from '@/components/note/AddNote'
import { AddNoteFloatingPanelInput } from '@/features/mindmap/menus/mindmap-sidebar-quickmenu'

export const MindMapEntityMenu = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { addDataToMindMap, addChildNodesFromSearch } = useMindMap()
  const [activeModel, setActiveModel]: any = useState('events')

  const handleLoadingRecords = useCallback(
    async (rootNodeSim: any) => {
      // const
      await addDataToMindMap(rootNodeSim)
    },
    [addDataToMindMap]
  )
  const runSearch = useCallback(
    async ({ type, searchTerm }: any) => {
      const { results } = await searchTable({
        table: type,
        keyword: searchTerm,
      })

      addChildNodesFromSearch({
        type,
        searchResults: results,
        searchTerm: searchTerm.trim().replace(/ /g, ''),
      })
    },
    [addChildNodesFromSearch]
  )

  const modelActions = [
    {
      icon: <EventsIcon className='w-4 h-4' />,
      label: 'Add Events',
      name: 'Events',
      searchAction: async (searchTerm: string) => {
        const res = await runSearch({ type: 'events', searchTerm })
        close()
      },
      buttonAction: () => {
        setActiveModel('events')
        setIsExpanded(true)
      },
      loadAction: async () => {
        await handleLoadingRecords({ data: { type: 'events' } })
        close()
      },
    },
    {
      icon: <TopicsIcon className='w-4 h-4' />,
      label: 'Add Topics',
      name: 'Topics',
      searchAction: async (searchTerm: string) => {
        const res = await runSearch({ type: 'topics', searchTerm })
        close()
      },
      buttonAction: () => {
        setActiveModel('topics')
        setIsExpanded(true)
      },
      loadAction: async () => {
        await handleLoadingRecords({ data: { type: 'topics' } })
        close()
      },
    },
    {
      icon: <KeyFiguresIcon className='w-4 h-4' />,
      label: 'Add KeyFigures',
      name: 'personnel',
      searchAction: async (searchTerm: string) => {
        const res = await runSearch({ type: 'personnel', searchTerm })
        close()
      },
      buttonAction: () => {
        setActiveModel('personnel')
        setIsExpanded(true)
      },
      loadAction: async () => {
        await handleLoadingRecords({ data: { type: 'personnel' } })
        close()
      },
    },
    {
      icon: <TestimoniesIcon className='w-4 h-4' />,
      label: 'Add Testimonies',
      name: 'Testimonies',
      searchAction: async (searchTerm: string) => {
        const res = await runSearch({ type: 'testimonies', searchTerm })
        close()
      },
      buttonAction: () => {
        setActiveModel('testimonies')
        setIsExpanded(true)
      },
      loadAction: async () => {
        await handleLoadingRecords({ data: { type: 'testimonies' } })
        close()
      },
    },
    {
      icon: <OrganizationsIcon className='w-4 h-4' />,
      label: 'Add Organizations',
      name: 'Organizations',
      searchAction: async (searchTerm: string) => {
        const res = await runSearch({ type: 'organizations', searchTerm })
        close()
      },
      buttonAction: () => {
        setActiveModel('organizations')
        setIsExpanded(true)
      },
      loadAction: async () => {
        await handleLoadingRecords({ data: { type: 'organizations' } })
        close()
      },
    },
  ]

  const modelActionMap = modelActions.reduce((acc: any, curr: any) => {
    const type = curr.name.toLowerCase()
    acc[type] = curr
    return acc
  }, {})

  const containerVariants = {
    collapsed: { height: 60, width: 600 },
    expanded: { height: '100%', width: 700 },
    transition: { duration: 0.5, ease: 'easeInOut' },
  }

  const contentVariants = {
    collapsed: { opacity: 0 },
    expanded: { opacity: 1, transition: { delay: 0.3 } },
  }

  const iconsContainerVariants = {
    collapsed: { y: 0 },
    expanded: { y: '100%', transition: { delay: 0.2 } },
  }

  const iconVariants = {
    collapsed: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15 },
    }),
    expanded: (i: number) => ({
      opacity: 0,
      y: 20,
      transition: { delay: i * 0.15 },
    }),
  }

  const close = () => {
    setIsExpanded(false)
    setActiveModel(null)
  }
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // event.preventDefault()
      if (event.metaKey && event.key === 'k' && !dialogOpen) {
        setDialogOpen(true)
      }
      // event.preventDefault()
      if (event.metaKey && event.key === 'k' && dialogOpen) {
        setDialogOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      // setQuery('')
    }
  }, [dialogOpen])

  return (
    <div className='h-full center w-full'>
      <div className='h-3/4 w-3/4 flex items-end justify-center'>
        <motion.div
          initial='collapsed'
          animate={isExpanded ? 'expanded' : 'collapsed'}
          variants={containerVariants}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className=' rounded-[30px] overflow-hidden border bg-white dark:bg-black relative'
        >
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                key='content'
                initial='collapsed'
                animate='expanded'
                exit='collapsed'
                variants={contentVariants}
                className='text-white mt-6 px-10 flex flex-col gap-4'
              >
                <motion.div className='flex items-center justify-between align-middle content-center'>
                  {activeModel && (
                    <h3 className='w-fit  font-bebasNeuePro text-white'>
                      {capitalize(activeModel)}
                    </h3>
                  )}
                  <ShinyButton
                    onClick={modelActionMap[activeModel].loadAction}
                    className='load-records-button cursor-pointer ml-auto'
                  >
                    <PlusIcon className='h-6 w-6 text-white' />
                  </ShinyButton>
                </motion.div>
                <Separator className='my-1 w-full' />
                {/* <div className='h-14 border-b border-muted-foreground/80'>
                  {activeModel && (
                    <InputWithVanishAnimation
                      onSubmit={modelActionMap[activeModel].searchAction}
                      type={activeModel}
                      close()
                      placeholders={['Roswell', 'USS Nimitz']}
                    />
                  )}
                </div> */}
                {/* {modelActions.map((item, index) => ( */}
                <div className='flex flex-col gap-2'>
                  <div className=''>
                    <p
                      className=' mb-4'
                      style={{
                        fontFamily: '__bebasNeue_7c842f',
                        letterSpacing: '2px',
                      }}
                    >
                      Search
                    </p>
                    {activeModel && (
                      <InputWithVanishAnimation
                        onSubmit={modelActionMap[activeModel].searchAction}
                        type={activeModel}
                        placeholders={['Roswell', 'USS Nimitz']}
                      />
                    )}
                  </div>
                  <Separator className='my-4 w-full' />
                  <motion.div className='flex w-full my-4 justify-end'>
                    <Button
                      variant='ghost'
                      onClick={close}
                      className='border-muted-foreground/80 text-neutral-400 cursor-pointer
                   hover:bg-neutral-700/80 transition-all duration-300 '
                    >
                      Close
                    </Button>
                  </motion.div>
                </div>
                {/* ))} */}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            variants={iconsContainerVariants}
            className='h-[60px] flex items-center w-full gap-2 justify-evenly px-8 cursor-pointer absolute bottom-0 left-0 right-0 mx-auto'
          >
            {modelActions.map((item, index) => {
              // some code here

              return (
                <motion.div
                  key={index}
                  custom={index}
                  variants={iconVariants}
                  onClick={item.buttonAction}
                  className='
                  h-10 w-10 center flex flex-col justify-center align-middle items-center transition-all duration-300'
                >
                  {item.icon}
                </motion.div>
              )
            })}
            {/* <AddNoteFloatingPanelInput /> */}
            {/* <motion.div className='h-10 center flex justify-center align-middle items-center transition-all duration-300'> */}
            {/* </motion.div> */}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
