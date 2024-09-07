'use client'
import React, { useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'

export const TimelineSidebar = React.memo(({ years }: any) => {
  console.log('years: ', years)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selected, setSelected] = useState<number | null>(null)

  const handleMouseEnter = useCallback((index: number) => {
    setHoveredIndex(index)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null)
  }, [])

  const calculateScale = useCallback(
    (index: number) => {
      if (hoveredIndex === null) return 0.4
      const distance = Math.abs(index - hoveredIndex)
      return Math.max(1 - distance * 0.2, 0.4)
    },
    [hoveredIndex]
  )

  const scaleVariants = useMemo(
    () => ({
      initial: { scale: 0.4 },
      animate: (i: number) => ({
        scale: calculateScale(i),
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }),
    }),
    [calculateScale]
  )

  const textVariants = {
    initial: { opacity: 0, filter: `blur(4px)`, scale: 0.4 },
    animate: {
      opacity: 1,
      filter: `blur(0px)`,
      scale: 1,
      transition: { duration: 0.15, delay: 0.1 },
    },
  }

  return (
    <div className='flex flex-col justify-center'>
      {years.map((year, i) => {
        console.log('year: ', year)
        const isSelected = selected === i

        return (
          <button
            key={year}
            className='relative inline-flex items-end justify-center py-1'
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
            onClick={() => setSelected(i)}
            onTouchStart={() => handleMouseEnter(i)}
            onTouchEnd={handleMouseLeave}
          >
            <motion.div
              className={`h-[2px] w-10 rounded-[4px] bg-white`}
              custom={i}
              variants={scaleVariants}
              initial='initial'
              animate='animate'
            />
            {hoveredIndex === i ? (
              <motion.span
                className={`absolute -top-0.5 left-12 text-[11px] text-white `}
                variants={textVariants}
                initial='initial'
                animate='animate'
              >
                {year}
              </motion.span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
})
