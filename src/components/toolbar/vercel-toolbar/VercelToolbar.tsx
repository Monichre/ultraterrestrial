'use client'

import React, { useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
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

export const VercelToolbar = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { onNodeClick, addChildNodesFromSearch } = useMindMap()
  const [activeModel, setActiveModel]: any = useState('events')

  const handleLoadingRecords = useCallback(
    async (rootNodeSim: any) => {
      // const
      await onNodeClick(rootNodeSim)
    },
    [onNodeClick]
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
      },
      buttonAction: () => {
        setActiveModel('events')
        setIsExpanded(true)
      },
      loadAction: async () => {
        await handleLoadingRecords({ data: { type: 'events' } })
      },
    },
    {
      icon: <TopicsIcon className='w-4 h-4' />,
      label: 'Add Topics',
      name: 'Topics',
      searchAction: async (searchTerm: string) => {
        const res = await runSearch({ type: 'topics', searchTerm })
      },
      buttonAction: () => {
        setActiveModel('topics')
        setIsExpanded(true)
      },
      loadAction: async () => {
        await handleLoadingRecords({ data: { type: 'topics' } })
      },
    },
    {
      icon: <KeyFiguresIcon className='w-4 h-4' />,
      label: 'Add KeyFigures',
      name: 'personnel',
      searchAction: async (searchTerm: string) => {
        const res = await runSearch({ type: 'personnel', searchTerm })
      },
      buttonAction: () => {
        setActiveModel('personnel')
        setIsExpanded(true)
      },
      loadAction: async () => {
        await handleLoadingRecords({ data: { type: 'personnel' } })
      },
    },
    {
      icon: <TestimoniesIcon className='w-4 h-4' />,
      label: 'Add Testimonies',
      name: 'Testimonies',
      searchAction: async (searchTerm: string) => {
        const res = await runSearch({ type: 'testimonies', searchTerm })
      },
      buttonAction: () => {
        setActiveModel('testimonies')
        setIsExpanded(true)
      },
      loadAction: async () => {
        await handleLoadingRecords({ data: { type: 'testimonies' } })
      },
    },
    {
      icon: <OrganizationsIcon className='w-4 h-4' />,
      label: 'Add Organizations',
      name: 'Organizations',
      searchAction: async (searchTerm: string) => {
        const res = await runSearch({ type: 'organizations', searchTerm })
      },
      buttonAction: () => {
        setActiveModel('organizations')
        setIsExpanded(true)
      },
      loadAction: async () => {
        await handleLoadingRecords({ data: { type: 'organizations' } })
      },
    },
  ]

  const modelActionMap = modelActions.reduce((acc: any, curr: any) => {
    const type = curr.name.toLowerCase()
    acc[type] = curr
    return acc
  }, {})

  const containerVariants = {
    collapsed: { height: 60, width: 400 },
    expanded: { height: '100%', width: 600 },
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
                <motion.div className='flex items-center justify-start'>
                  {activeModel && (
                    <div className='w-fit px-2 font-centimaSans text-white'>
                      {capitalize(activeModel)}
                    </div>
                  )}
                  <Button
                    variant='ghost'
                    onClick={close}
                    className='border-muted-foreground/80 text-neutral-400 cursor-pointer
                   hover:bg-neutral-700/80 transition-all duration-300 ml-auto'
                  >
                    <X className='h-4 w-4' />
                  </Button>
                </motion.div>
                {/* <div className='h-14 border-b border-muted-foreground/80'>
                  {activeModel && (
                    <InputWithVanishAnimation
                      onSubmit={modelActionMap[activeModel].searchAction}
                      type={activeModel}
                      placeholders={['Roswell', 'USS Nimitz']}
                    />
                  )}
                </div> */}
                {/* {modelActions.map((item, index) => ( */}
                <div className='flex flex-col gap-2'>
                  <div className=''>
                    {activeModel && (
                      <InputWithVanishAnimation
                        onSubmit={modelActionMap[activeModel].searchAction}
                        type={activeModel}
                        placeholders={['Roswell', 'USS Nimitz']}
                      />
                    )}
                  </div>
                  <motion.div className='flex w-full my-4 justify-end'>
                    <ShinyButton
                      onClick={modelActionMap[activeModel].loadAction}
                      className='load-records-button cursor-pointer ml-auto'
                    >
                      Load Data
                    </ShinyButton>
                  </motion.div>
                </div>
                {/* ))} */}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            variants={iconsContainerVariants}
            className='h-[60px] flex items-center w-fit gap-2 justify-evenly px-8 cursor-pointer absolute bottom-0 left-0 right-0 mx-auto'
          >
            {modelActions.map((item, index) => {
              // some code here

              return (
                <motion.div
                  key={index}
                  custom={index}
                  variants={iconVariants}
                  onClick={item.buttonAction}
                  className='h-10 w-10 center flex flex-col justify-center align-middle items-center transition-all duration-300'
                >
                  {item.icon}
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
