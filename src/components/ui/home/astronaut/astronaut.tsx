'use client'
import { FunctionComponent } from 'react'

import Image from 'next/image'

import { motion } from 'framer-motion'
const words = 'UltraTerrestrial'
export function LetterPullUp({ visible, status }: any) {
  const letters = words.split('')

  const pullupVariant = {
    initial: { y: 100, opacity: 0 },
    animate: (i: any) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1, // Delay each letter's animation by 0.05 seconds
      },
    }),
  }
  // left-0 top-[400px]
  // absolute
  return (
    <div
      className={`flex justify-center self-center align-center w-full mt-auto`}
    >
      {letters.map((letter, i) => (
        <motion.h1
          key={i}
          variants={pullupVariant}
          initial='initial'
          animate='animate'
          custom={i}
          className={`text-center font-display text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem] `}
        >
          {letter === ' ' ? <span>&nbsp;</span> : letter}
        </motion.h1>
      ))}
    </div>
  )
}

interface AstronautProps {
  children?: any
}

export const Astronaut: FunctionComponent<AstronautProps> = ({
  children,
}: any) => {
  const handleNavClick = () => {}
  // animate('.item', { x: 300 }, { delay: stagger(0.1) })
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
