'use client'
import { FunctionComponent, useEffect, useState } from 'react'

import Image from 'next/image'

import { motion } from 'framer-motion'
import { Sparkles } from '@/components/ui/animations/sparkles'
const words = 'UltraTerrestrial'

export function LetterPullUp(props: any) {
  const [visible, setVisible] = useState(false)
  const letters = words.split('')

  const pullupVariant = {
    hide: { y: 100, opacity: 0 },
    show: (i: any) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1, // Delay each letter's animation by 0.05 seconds
      },
      staggerChildren: true,
    }),
  }
  const sparkleAnimation = {
    hide: { y: 200, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 2, // Delay each letter's animation by 0.05 seconds
      },
    },
  }
  // left-0 top-[400px]
  // absolute

  useEffect(() => {
    setVisible(true)
  }, [])
  return (
    <div
      className={`flex self-center align-center w-full mt-auto relative flex-col`}
    >
      <div
        className={`flex justify-center self-center align-center center w-full mt-auto relative`}
      >
        {letters.map((letter, i) => (
          <motion.h1
            key={i}
            variants={pullupVariant}
            // initial='initial'
            animate={visible ? 'show' : 'hide'}
            custom={i}
            className={`text-center !font-ailerons text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem] text-black`}
          >
            {letter === ' ' ? <span>&nbsp;</span> : letter}
          </motion.h1>
        ))}
      </div>
      {/* <motion.div
        variants={sparkleAnimation}
        animate={visible ? 'show' : 'hide'}
        className='w-[40rem] mx-auto relative'
      >
        
        <div className='absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm' />
        <div className='absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4' />
        <div className='absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm' />
        <div className='absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4' />

        
        <Sparkles
          background='transparent'
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className='w-full h-full'
          particleColor='#FFFFFF'
        />

        
        <div className='absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]'></div>
      </motion.div> */}
    </div>
  )
}

interface AstronautProps {
  children?: any
}

export const Astronaut: FunctionComponent<AstronautProps> = ({
  children,
}: any) => {
  return (
    <div className='astronaut h-full w-full relative flex flex-col justify-end align-middle relative overflow-hidden items-center'>
      <div className=' w-full h-full absolute bottom-0 left-0 flex flex-col justify-end items-end align-center center z-10'>
        <LetterPullUp />

        <div className='items-center mt-auto align-center self-center'>
          <Image
            className='mx-auto'
            height={600}
            width={600}
            alt='astronaut'
            src={'/astronaut-2.png'}
          />
        </div>
      </div>
    </div>
  )
}
