'use client'

import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { Illustration } from '@/components/backgrounds/stars-background'

export type StarsCardProps = {
  className?: string
  children?: React.ReactNode
}
export const StarsCard = ({ className, children }: StarsCardProps) => {
  const [mouseEnter, setMouseEnter] = useState(false)

  return (
    <div
      onMouseEnter={() => {
        setMouseEnter(true)
      }}
      onMouseLeave={() => {
        setMouseEnter(false)
      }}
      className={cn(
        'bg-[linear-gradient(110deg,#333_0.6%,#222)] p-4 max-w-md max-h-[20rem] h-full w-full rounded-xl border border-[#eaeaea] dark:border-neutral-600',
        className
      )}
    >
      <div className='flex justify-center items-center'>
        <Illustration mouseEnter={mouseEnter} />
      </div>
      <div className='px-2 pb-6'>{children}</div>
    </div>
  )
}

export const StarsCardDescription = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <p className={cn('text-base text-white max-w-[16rem]', className)}>
      {children}
    </p>
  )
}

export const StarsCardTitle = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <h2 className={cn('font-bold text-2xl text-[#eaeaea]', className)}>
      {children}
    </h2>
  )
}
