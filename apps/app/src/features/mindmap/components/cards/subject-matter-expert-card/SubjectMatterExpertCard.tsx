import { AiStarIcon } from '@/components/icons/icons'
import { AddNote } from '@/components/note/AddNote'
import { Button } from '@/components/ui/button'
import { PillCard } from '@/components/ui/card/pill-card'
import { Separator } from '@/components/ui/separator'
import { CoreNodeBottom, CoreNodeContainer, CoreNodeContent } from '@/features/mindmap/nodes/core-node-ui'
import { useEntity } from '@/hooks'
import { AnimatePresence, motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { useState } from 'react'
export function SubjectMatterExpertCard( { card }: any ) {
  const {
    handleHoverLeave,
    entity,
    showMenu,
    setShowMMenu,
    bookmarked,
    setBookmarked,
    relatedDataPoints,
    saveNote,
    updateNote,
    userNote,
    connectionListConnections,
    handleHoverEnter,
    findConnections,
  } = useEntity( { card } )
  console.log( 'personnel card:', card )
  console.log( 'personel entity:', entity )
  const test = false
  const { popularity, rank, photo, name, role }: any = entity

  const image: any = photo[0] || { url: '/astro-3.png' }

  const [step, setStep] = useState( 1 )
  const handleClick = () => setStep( prev => ( prev % 3 ) + 1 )
  if ( test ) {
    return <PillCard card={card} />
  }
  return (
    // <CoreNodeContainer className='motion-scale-in-0 motion-opacity-in-0'  >

    //   <CoreNodeContent className='min-h-[100xp] w-full'>
    <>
      <motion.div

        className='relative flex cursor-pointer items-center justify-center'
        animate={{
          width: step === 1 ? 200 : 300,
          height: step === 1 ? 200 : step === 2 ? 360 : 400,
          y: step === 1 ? 0 : step === 2 ? -80 : 0,
        }}
        initial={false}
        onClick={handleClick}
      >
        <motion.img
          src={image?.url}
          alt='image'
          className='z-[2] h-full w-full bg-zinc-600 object-cover'
          width={300}
          height={300}
          style={{
            borderRadius: 16,
            // border: `1px solid ${ card?.color }`
          }}
        />
        <AnimatePresence mode='wait'>
          {step === 2 && (
            <>
              <motion.div
                key={`content-${step}`}
                className='absolute -bottom-28 w-[320px] bg-black px-5 pb-4 pt-40'
                style={{
                  borderRadius: 16,
                }}
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -20 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.25 }}
                layoutId='content'
              >
                <div className='flex w-full items-center justify-between'>
                  <motion.span
                    className='font-semibold font-bebasNeuePro'
                    layoutId='title'
                  >
                    {name}
                  </motion.span>
                  <motion.span
                    className='font-semibold text-blue-500 opacity-75 font-nunito'
                    layoutId='url'
                  >
                    <span>popularity: {popularity}</span>{' '}
                    <Separator orientation='vertical' />
                    <span>Rank: {rank}</span>
                  </motion.span>
                </div>
                <motion.p
                  className='my-1 text-sm opacity-90'
                  layoutId='description'
                >
                  {role}
                </motion.p>
              </motion.div>
              <motion.div
                className='absolute z-[3] flex h-full w-full items-end justify-center'
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                key={`play-${step}`}
              >
                <motion.div
                  className='-mb-7 flex size-14 items-center justify-center bg-white'
                  style={{ borderRadius: 999 }}
                  layoutId='play'
                >
                  <Play size={24} className='text-blue-500' />
                </motion.div>
              </motion.div>
            </>
          )}
          {step === 3 && (
            <>
              <motion.div
                key={`content-${step}`}
                className='absolute h-[420px] w-[320px] bg-white'
                style={{
                  borderRadius: 20,
                }}
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.15 }}
                layoutId='content'
              ></motion.div>
              <motion.div
                className='absolute z-[3] flex h-full w-full flex-col items-center justify-end gap-2 bg-gradient-to-b from-transparent to-black p-4'
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                key={`play-${step}`}
                style={{
                  borderRadius: 16,
                }}
              >
                <motion.div
                  className='flex size-14 items-center justify-center bg-white'
                  style={{ borderRadius: 999 }}
                  layoutId='play'
                >
                  <Play size={24} className='text-blue-500' />
                </motion.div>
                <div className='flex w-full flex-col items-center justify-between gap-1'>
                  <motion.span
                    className='font-semibold text-white'
                    layoutId='title'
                  >
                    lndev/ui
                  </motion.span>
                  <motion.span
                    className='font-semibold text-blue-500 opacity-75'
                    layoutId='url'
                  >
                    ui.lndev.me
                  </motion.span>
                </div>
                <motion.p
                  className='mt-1 text-center text-sm text-white opacity-90'
                  layoutId='description'
                >
                  lndev-ui is a collection of components and utilities for
                  building web applications. coded by leonel ngoya.
                </motion.p>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </motion.div>


      <div className='relative'>

        <AiStarIcon stroke={'#fff'} className='w-6 h-6 stroke-1' />

        <AddNote saveNote={saveNote} userNote={userNote} updateNote={updateNote} />

      </div>
    </>



  )
}
