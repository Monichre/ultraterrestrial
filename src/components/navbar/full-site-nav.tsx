'use client'
import React, { memo, useEffect, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { Link } from 'next-view-transitions'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Home, Sparkles, LibraryBig, Crosshair } from 'lucide-react'
import { cn } from '@/utils'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from '@clerk/nextjs'

import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { UltraterrestrialLogo } from '@/components/navbar/ut-logo'
import { UltraLogoAlt } from '@/components/navbar/ut-logo-alt'

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
        className='relative cursor-pointer z-50'
        // onMouseLeave={handleMouseExit}
      >
        <LayoutGroup>
          {/* <AnimatePresence> */}
          <motion.p
            key={`${item}-p`}
            transition={{ duration: 0.3 }}
            className='cursor-pointer text-black dark:text-white hover:opacity-[0.9] uppercase text-sm font-nunito tracking-wide'
          >
            {item}
          </motion.p>
          {visible && (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              // exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={transition}
            >
              <div className='absolute top-[calc(100%_+_1.2rem)] pt-4'>
                <motion.div
                  key={`${item}-div-2`}
                  transition={transition}
                  layoutId='active' // layoutId ensures smooth animation
                  className='bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] shadow-xl hover-menu'
                >
                  <motion.div
                    key={`${item}-div-3`}
                    layout // layout ensures smooth animation
                    className='w-max h-full p-4'
                  >
                    {children}
                  </motion.div>
                </motion.div>
              </div>
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
      className='cursor-pointer text-black dark:text-white hover:opacity-[0.9] uppercase text-sm !font-nunito tracking-wide'
    >
      {children}
    </Link>
  )
}

//just move open/close state to parent component
export const SideMenuBtn = ({ open }: any) => {
  const [crossed, setCrossedState] = useState(open)

  useEffect(() => {
    setCrossedState(open)
  }, [open])

  return (
    <DropdownMenuTrigger asChild>
      <button
        aria-expanded={crossed}
        className={
          'flex aspect-square h-fit select-none flex-col items-center justify-center rounded-full'
        }
      >
        <motion.div
          style={{
            width: '20px',
            borderTop: '2px solid #fff',
            transformOrigin: 'center',
          }}
          initial={{ translateY: '-3px' }}
          animate={
            crossed
              ? { rotate: '45deg', translateY: '1px' }
              : { translateY: '-3px', rotate: '0deg' }
          }
          transition={{ bounce: 0, duration: 0.1 }}
        />
        <motion.div
          transition={{ bounce: 0, duration: 0.1 }}
          style={{
            width: '20px',
            borderTop: '2px solid #fff',
            transformOrigin: 'center',
          }}
          initial={{ translateY: '3px' }}
          animate={
            crossed
              ? { rotate: '-45deg', translateY: '-1px' }
              : { translateY: '3px', rotate: '0deg', scaleX: 1 }
          }
        />
      </button>
    </DropdownMenuTrigger>
  )
}

export function DropdownMenuDemo({ isAdmin }: any) {
  const [open, setOpen] = useState(false)
  const handleOpen = (isOpen: boolean) => setOpen(isOpen)
  return (
    <DropdownMenu onOpenChange={handleOpen} open={open}>
      <SideMenuBtn open={open} />

      <DropdownMenuContent
        className='w-56 bg-white dark:bg-black text-black dark:text-white'
        align='end'
        alignOffset={0}
      >
        <SignedOut>
          <DropdownMenuItem>
            <SignInButton>
              <Button
                className='cursor-pointer text-black dark:text-white hover:opacity-[0.9] uppercase text-sm !font-nunito tracking-wide'
                variant='ghost'
              >
                Sign In
              </Button>
            </SignInButton>
          </DropdownMenuItem>
        </SignedOut>
        {isAdmin && (
          <DropdownMenuItem>
            <Button variant='ghost' className='p-0'>
              <Link className='' href='/admin'>
                Admin
              </Link>
            </Button>
          </DropdownMenuItem>
        )}

        <SignedIn>
          <DropdownMenuItem>
            <div className='flex align-middle items-center justify-between w-full'>
              <span className=''>Account</span>
              <UserButton />
            </div>
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function FullSiteNav({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null)

  const pathname = usePathname()
  const { user }: any = useUser()

  const role = user?.publicMetadata?.role || 'guest'
  const isAdmin = role === 'admin'
  const page = pathname.split('/')[pathname.split('/').length - 1]
  if (pathname === '/explore/disclosure' || pathname === '/admin') {
    return null
  }
  className = `${className} ${page}`
  return (
    <motion.div
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, staggerChildren: 0.1 },
      }}
      initial={{ opacity: 0, y: 10 }}
      className={cn(
        'fixed top-0 inset-x-0 z-50 w-full flex justify-center content-center items-center align-center fullsite-nav',
        className
      )}
    >
      <div className='absolute left-10 z-[100] flex-initial w-fit flex items-center content-center justify-self-end align-middle'>
        <UltraterrestrialLogo />
        {/* Remove or comment out the UltraLogoAlt component if it's not defined */}
        {/* <UltraLogoAlt /> */}
      </div>
      <div className='max-w-2xl mx-auto flex-auto'>
        <Menu setActive={setActive}>
          <MenuItem
            setActive={setActive}
            active={active}
            item='Explore'
            key='Explore'
          >
            <div className='flex flex-col space-y-4'>
              <HoveredLink className='' href='/explore/disclosure'>
                The State of Disclosure
              </HoveredLink>
              <HoveredLink className='' href='/explore/key-figures'>
                Key Figures
              </HoveredLink>
              <HoveredLink className='' href='/explore/visualizations'>
                3D Interactive Timeline
              </HoveredLink>
              {isAdmin && (
                <>
                  <HoveredLink className='' href='/explore/visualizations'>
                    3D Model Network Graph
                  </HoveredLink>
                  <HoveredLink
                    className=''
                    href='/explore/visualizations/3d-grid'
                  >
                    3D Grid
                  </HoveredLink>
                  <HoveredLink
                    className=''
                    href='/explore/visualizations/drawing-board'
                  >
                    Drawing Board
                  </HoveredLink>
                  <HoveredLink
                    className=''
                    href='/explore/visualizations/word-cloud'
                  >
                    Word Cloud
                  </HoveredLink>
                </>
              )}
            </div>
          </MenuItem>
          <MenuItem
            setActive={setActive}
            active={active}
            item='History'
            key='History'
          >
            <div className='flex flex-col space-y-4'>
              <HoveredLink className='' href='/timeline'>
                Timeline{' '}
              </HoveredLink>
              <HoveredLink className='' href='/history/gallery'>
                Team
              </HoveredLink>
              <HoveredLink className='' href='/history/events'>
                Historical Events
              </HoveredLink>
              {isAdmin && (
                <>
                  <HoveredLink className='' href='/history'>
                    Scroll Through 3D
                  </HoveredLink>
                </>
              )}
            </div>
          </MenuItem>
          <MenuItem
            setActive={setActive}
            active={active}
            item='Sightings'
            key='Sightings'
          >
            <div className='flex flex-col space-y-4'>
              <HoveredLink className='' href='/sightings'>
                UFO Sightings
              </HoveredLink>
            </div>
          </MenuItem>
        </Menu>
      </div>
      <div className='absolute right-20 flex-initial w-fit flex items-center content-center justify-self-end align-middle sign-in-button'>
        <DropdownMenuDemo isAdmin={isAdmin} />
        {/* <SignedOut>
          <SignInButton>
            <Button
              className='cursor-pointer text-black dark:text-white hover:opacity-[0.9] uppercase text-sm !font-nunito tracking-wide'
              variant='ghost'
            >
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>
        {isAdmin && (
          <Button variant='ghost' className='mx-2'>
            <HoveredLink className='' href='/admin'>
              Admin
            </HoveredLink>
          </Button>
        )}
        <div className='mx-2'>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div> */}
      </div>
    </motion.div>
  )
}
