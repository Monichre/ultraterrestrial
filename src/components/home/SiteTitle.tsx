'use client'
import { motion } from 'framer-motion-3d'
import * as React from 'react'
import { useState, useEffect } from 'react'

export function SiteTitle(props: any) {
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
      className={`flex self-center align-center w-full auto mb-[86px] relative flex-col`}
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
            className={`text-center !font-ailerons text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem] text-black`}
          >
            {letter === ' ' ? <span>&nbsp;</span> : letter}
          </motion.h1>
        ))}
      </div>
    </div>
  )
}
