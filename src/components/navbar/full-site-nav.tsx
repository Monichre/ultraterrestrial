'use client'
import React, { memo, useEffect, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Home, Sparkles, LibraryBig, Crosshair } from 'lucide-react'
import { cn } from '@/utils'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

const transition = {
  type: 'spring',
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
}

export const MenuItem = memo(
  ({
    setActive,
    active,
    item,
    children,
  }: {
    setActive: (item: string) => void
    active: string | null
    item: string
    children?: React.ReactNode
  }) => {
    const [visible, setVisible] = useState(item === active)
    const handleMouseEnter = () => {
      setActive(item)
    }

    useEffect(() => {
      setVisible(item === active)
    }, [active, item])
    return (
      <div
        onMouseEnter={handleMouseEnter}
        className='relative'
        // onMouseLeave={handleMouseExit}
      >
        <LayoutGroup>
          {/* <AnimatePresence> */}
          <motion.p
            key={`${item}-p`}
            transition={{ duration: 0.3 }}
            className='cursor-pointer text-black hover:opacity-[0.9] uppercase text-sm !font-jetbrains tracking-wide'
          >
            {item}
          </motion.p>
          {visible && (
            <motion.div
              key={item}
              style={visible ? {} : { opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{
                staggerChildren: 0.1,
                duration: 0.35,
                ease: 'easeInOut',
              }}
              layout
            >
              <motion.div
                key={`${item}-div-1`}
                className='absolute top-[calc(100%_+_1.2rem)] pt-4'
                style={visible ? {} : { opacity: 0, scale: 0.5, y: 40 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                layout
              >
                <motion.div
                  key={`${item}-div-2`}
                  style={visible ? {} : { opacity: 0, scale: 0.5, y: 40 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  layout
                  className='bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl'
                >
                  <motion.div
                    key={`${item}-div-3`}
                    layout // layout ensures smooth animation
                    className='w-max h-full p-4'
                  >
                    {children}
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </LayoutGroup>
        {/* </AnimatePresence> */}
      </div>
    )
  }
)

MenuItem.displayName = 'FullSiteNavMenuItem'

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void
  children: React.ReactNode
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className='relative flex justify-center space-x-12 px-8 py-6 '
    >
      {children}
    </nav>
  )
}

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className='text-white text-sm !font-jetbrains tracking-wide'
    >
      {children}
    </Link>
  )
}

const navItems = [
  {
    name: 'Home',
    link: '/',
    icon: <Home strokeWidth={1} />,
  },
  {
    name: 'Explore',
    link: '/explore',
    icon: <Sparkles strokeWidth={1} />,
  },
  {
    name: 'History',
    link: '/history',
    icon: <LibraryBig strokeWidth={1} />,
  },
  {
    name: 'Sightings',
    link: '/sightings',
    icon: <Crosshair strokeWidth={1} />,
  },
]
export function FullSiteNav({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null)
  console.log('active: ', active)
  return (
    <div
      className={cn('fixed top-10 inset-x-0 max-w-2xl mx-auto z-50', className)}
    >
      <Menu setActive={setActive}>
        <MenuItem
          setActive={setActive}
          active={active}
          item='Explore'
          key='Explore'
        >
          <div className='flex flex-col space-y-4 text-sm'>
            <HoveredLink className='' href='/explore/ufology'>
              Connect the dots for all things Ufology
            </HoveredLink>
            <HoveredLink className='' href='/explore/key-figures'>
              Key Figures
            </HoveredLink>
            <HoveredLink className='' href='/explore/visualizations'>
              3D Visualizations
            </HoveredLink>
          </div>
        </MenuItem>
        <MenuItem
          setActive={setActive}
          active={active}
          item='History'
          key='History'
        >
          <div className='flex flex-col space-y-4 text-sm'>
            <HoveredLink className='' href='/history'>
              Timeline{' '}
            </HoveredLink>
            <HoveredLink className='' href='/history/gallery'>
              Team
            </HoveredLink>
            <HoveredLink className='' href='/history/events'>
              Historical Events
            </HoveredLink>
          </div>
        </MenuItem>
        <MenuItem
          setActive={setActive}
          active={active}
          item='Sightings'
          key='Sightings'
        >
          <div className='flex flex-col space-y-4 text-sm'>
            <HoveredLink className='' href='/sightings'>
              Hobby
            </HoveredLink>
          </div>
        </MenuItem>
      </Menu>
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  )
}
