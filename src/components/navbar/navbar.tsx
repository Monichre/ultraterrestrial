'use client'
import React, { useState } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion'
import { cn } from '@/utils/cn'
import Link from 'next/link'

export const HomePageNav = ({ navItems }: any) => {
  return (
    <div
      className={cn(
        'fixed flex w-full justify-center top-10 inset-x-0 mx-auto z-[5000] p-1'
      )}
    >
      <div className='flex max-w-fit items-center space-between space-x-16 px-4 py-2 m-auto'>
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              'relative items-center flex space-x-1 text-black dark:hover:text-neutral-300 hover:text-neutral-500'
            )}
          >
            <span className='block sm:hidden'>{navItem.icon}</span>
            <span className='hidden sm:block text-sm !font-jetbrains tracking-wide'>
              {navItem.name}
            </span>
          </Link>
        ))}
      </div>
      <button className='border self-end text-sm !font-jetbrains relative border-neutral-200 dark:border-white/[0.2] text-black px-4 py-2 rounded-full'>
        <span>Login</span>
        <span className='absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px' />
      </button>
    </div>
  )
}

export const NavBar = ({
  navItems,
  className,
}: {
  navItems: {
    name: string
    link: string
    icon?: JSX.Element
  }[]
  className?: string
}) => {
  const { scrollYProgress } = useScroll()

  const [visible, setVisible] = useState(true)

  // useMotionValueEvent(scrollYProgress, "change", (current) => {
  //   // Check if current is not undefined and is a number
  //   if (typeof current === "number") {
  //     let direction = current! - scrollYProgress.getPrevious()!;

  //     if (scrollYProgress.get() < 0.05) {
  //       setVisible(false);
  //     } else {
  //       if (direction < 0) {
  //         setVisible(true);
  //       } else {
  //         setVisible(false);
  //       }
  //     }
  //   }
  // });

  return (
    <div
      className={cn(
        'fixed flex max-w-fit top-10 inset-x-0 mx-auto rounded-full border border-white/80 dark:border-border/80 z-[5000] p-1'
      )}
    >
      <div className='flex rounded-full border dark:border-neutral-900 border-neutral-950/20 items-center justify-center space-x-4 px-4 py-2 bg-gradient-to-b from-card/70 to-secondary/50'>
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              'relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500'
            )}
          >
            <span className='block sm:hidden'>{navItem.icon}</span>
            <span className='hidden sm:block text-sm !font-source tracking-wide'>
              {navItem.name}
            </span>
          </Link>
        ))}
        <button className='border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full'>
          <span>Login</span>
          <span className='absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px' />
        </button>
      </div>
    </div>
  )
}
