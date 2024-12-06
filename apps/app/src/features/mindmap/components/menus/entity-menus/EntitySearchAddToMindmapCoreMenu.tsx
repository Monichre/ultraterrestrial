
'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export const EntitySearchAddToMindmapCoreMenu = ( { activeModel, setActiveModel, modelActions, modelActionMap }: any ) => {
  const [isExpanded, setIsExpanded] = useState( false )

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
    collapsed: ( i: number ) => ( {
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15 },
    } ),
    expanded: ( i: number ) => ( {
      opacity: 0,
      y: 20,
      transition: { delay: i * 0.15 },
    } ),
  }

  const close = () => {
    setIsExpanded( false )
    setActiveModel( null )
  }
  const [dialogOpen, setDialogOpen] = useState<boolean>( false )

  useEffect( () => {
    const handleKeyDown = ( event: KeyboardEvent ) => {
      // event.preventDefault()
      if ( event.metaKey && event.key === 'k' && !dialogOpen ) {
        setDialogOpen( true )
      }
      // event.preventDefault()
      if ( event.metaKey && event.key === 'k' && dialogOpen ) {
        setDialogOpen( false )
      }
    }

    window.addEventListener( 'keydown', handleKeyDown )

    return () => {
      window.removeEventListener( 'keydown', handleKeyDown )
      // setQuery('')
    }
  }, [dialogOpen] )
  return (
    <div className='h-3/4 w-3/4 flex items-end justify-center'>
      <motion.div
        initial='collapsed'
        animate={isExpanded ? 'expanded' : 'collapsed'}
        variants={containerVariants}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className='rounded-[30px] overflow-hidden border bg-white dark:bg-black relative'>
        <AnimatePresence>
          {isExpanded && activeModel && (
            <motion.div
              key='content'
              initial='collapsed'
              animate='expanded'
              exit='collapsed'
              variants={contentVariants}
              className='text-white mt-6 px-10 flex flex-col gap-4'>
              <motion.div className='flex items-center justify-between align-middle content-center'>
                {activeModel && (
                  <h3 className='w-fit  font-bebasNeuePro text-white'>
                    {capitalize( activeModel )}
                  </h3>
                )}
                <ShinyButton
                  onClick={modelActionMap[activeModel].loadAction}
                  className='load-records-button cursor-pointer ml-auto'>
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
                    }}>
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
                   hover:bg-neutral-700/80 transition-all duration-300 '>
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
          className='h-[60px] flex items-center w-full gap-2 justify-evenly px-8 cursor-pointer absolute bottom-0 left-0 right-0 mx-auto'>
          {modelActions.map( ( item, index ) => {
            // some code here
            console.log( { item } )
            return (
              <motion.div
                key={index}
                custom={index}
                variants={iconVariants}
                onClick={item.buttonAction}
                className='
                  h-10 w-10 center flex flex-col justify-center align-middle items-center transition-all duration-300'>
                {item.icon}
              </motion.div>
            )
          } )}
          {/* <AddNoteFloatingPanelInput /> */}
          {/* <motion.div className='h-10 center flex justify-center align-middle items-center transition-all duration-300'> */}
          {/* </motion.div> */}
        </motion.div>
      </motion.div>
    </div>
  )
}
