'use client'
import { FunctionComponent, useEffect, useState } from 'react'

import Image from 'next/image'

import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles } from '@/components/animations/sparkles'

import { BlurIn } from '@/components/animations/blur-in'
import { nextTick } from '@/utils'
import { BlurFade } from '@/components/animations/blur-fade/BlurFade'

export function LetterPullUp(props: any) {
  const title = 'UltraTerrestrial'
  const [visible, setVisible] = useState(false)
  const letters = title.split('')

  const pullupVariant = {
    hide: { y: 50, opacity: 0 },
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
    hide: { y: 50, opacity: 0 },
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
        // mt-auto
        className={`flex justify-center self-center align-center center w-full  relative`}
      >
        {letters.map((letter, i) => (
          <motion.h1
            key={`${letter}-${i}`}
            variants={pullupVariant}
            initial='hide'
            animate={visible ? 'show' : 'hide'}
            custom={i}
            className={`text-center !font-ailerons text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem] text-black`}
          >
            {letter === ' ' ? <span>&nbsp;</span> : letter}
          </motion.h1>
        ))}
      </div>
    </div>
  )
}

interface AstronautProps {
  children?: any
}

const quoteLines = [
  `The most merciful thing in the world, I think, is the inability of the`,
  `human mind to correlate all its contents. We live on a placid island of`,
  `ignorance in the midst of black seas of infinity, and it was not meant`,
  `that we should voyage far. The sciences, each straining in its own`,
  `direction, have hitherto harmed us little; but some day the piecing`,
  `together of dissociated knowledge will open up such terrifying vistas of`,
  `reality, and of our frightful position therein, that we shall either go`,
  `mad from the revelation or flee from the deadly light into the peace and`,
  `safety of a new dark age.`,
]
const quote = `The most merciful thing in the world, I think, is the inability of the
  human mind to correlate all its contents. We live on a placid island of
  ignorance in the midst of black seas of infinity, and it was not meant
  that we should voyage far. The sciences, each straining in its own
  direction, have hitherto harmed us little; but some day the piecing
  together of dissociated knowledge will open up such terrifying vistas of
  reality, and of our frightful position therein, that we shall either go
  mad from the revelation or flee from the deadly light into the peace and
  safety of a new dark age.`

const words = quote.split(' ')
export const LovecraftQuote = () => {
  return (
    <div>
      <BlurFade inView delay={0}>
        <h2 className='font-centimaSans text-black text-bold text-center mt-4 text-lg'>
          <b>Tracking the State of Disclosure</b>
          <br />
          {/* <i>
            Striving to document, explore and disseminate the past, present and
            future of the UFO topic and its bearing on humanity, the universe
            and our place within it
          </i> */}
        </h2>
      </BlurFade>

      <div className='text-black tracking-wide my-12 mx-auto p-8 text-center w-[800px]'>
        {quoteLines.map((line: string, index: number) => (
          <BlurFade
            inView
            className='inline'
            delay={index === 0 ? 0.2 : index * 0.25}
            key={`${line.replace(/ /g, '-')}-${index}`}
          >
            <span className='font-centimaSans text-black text-bold text-[16px]'>
              {line}{' '}
            </span>
          </BlurFade>
        ))}

        {/* {words.map((line: string, index: number) => (
        <BlurFade
          inView
          className='inline'
          delay={index * 0.1}
          key={`${line.replace(/ /g, '-')}-${index}`}
        >
          <span className='font-jetbrains text-black text-bold'>{line} </span>
        </BlurFade>
      ))} */}
      </div>
    </div>
  )
}

export const Astronaut: FunctionComponent<AstronautProps> = ({
  children,
}: any) => {
  return (
    <div className='astronaut h-full w-full relative flex flex-col justify-between align-middle relative overflow-hidden items-center'>
      {/* <div className=' w-full h-full absolute bottom-0 left-0 flex flex-col justify-evenly items-end align-center center z-10'> */}
      <LetterPullUp />
      <LovecraftQuote />
      <div className='items-center align-bottom self-center'>
        <Image
          className='mx-auto'
          height={600}
          width={600}
          alt='astronaut'
          src={'/astronaut-2.png'}
        />
        {/* </div> */}
      </div>
    </div>
  )
}
