'use client'

import React, {
  memo,
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  useCallback,
} from 'react'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useMindMapSidebar } from './mindmap-sidebar-context'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { AnimatedList, AnimatedListItem } from '@/components/ui/animated-list'
import { Waypoints } from 'lucide-react'
import splitText from '@/utils/split-text.js'

import { searchConnections } from '@/api/search'
import {
  AnimatePresence,
  motion,
  stagger,
  useAnimate,
  usePresence,
} from 'framer-motion'
import { cn } from '@/utils'

gsap.registerPlugin(splitText)
export interface MindmapSidebarProps {
  children?: any
}

const ConnectionCard = ({ connection }: any) => {
  return (
    <div className='bg-[radial-gradient(50%_86.9%_at_50%_100%,_rgba(255,_255,_255,_0.2)_0%,_rgba(255,_255,_255,_0)_100%)] w-full p-2 connection-card'>
      <div className='flex w-full p-2'>
        <span>
          <Waypoints color='#fff' />
        </span>
        <span
          className='cursor-pointer text-lg font-light px-1 pt-1 uppercase bg-gray-800'
          style={{
            fontKerning: 'none',
          }}
        >
          {connection?.name || connection?.title}
        </span>
      </div>
    </div>
  )
}

interface Item {
  name: string
  description: string
  icon: string
  color: string
  time: string
}
const staggerMenuItems = stagger(0.1, { startDelay: 0.5 })

function useMenuAnimation(connectionsPresent: boolean) {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate(
      '.connection-card',
      connectionsPresent
        ? { opacity: 1, scale: 1, filter: 'blur(0px)', y: 1 }
        : { opacity: 0, scale: 0.3, filter: 'blur(20px)', y: 0 },
      {
        duration: 0.5,
        delay: connectionsPresent ? staggerMenuItems : 1,
      }
    )
  }, [connectionsPresent])

  return scope
}

interface ConnectionListProps {
  connections: any
}

const ConnectionList: React.FC<ConnectionListProps> = ({
  connections,
}: any) => {
  const [isPresent, safeToRemove] = usePresence()
  const scope = useMenuAnimation(isPresent)

  return (
    <div className='h-full w-full' ref={scope}>
      <div className='connection-list'>
        {connections.map((connection: any) => (
          <div key={connection.id} className='w-full p-2 connection-card'>
            <p className='cursor-pointer font-jetbrains text-white flex font-light text-sm align-center items-center tracking-wide'>
              <span>
                <Waypoints className='h-4 w-4' strokeWidth={'1'} color='#fff' />
              </span>
              <span className='ml-4'>
                {connection?.name || connection?.title}
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* <AnimatePresence>
 
    </AnimatePresence> */}
    </div>
  )
}

export const MindmapSidebar: React.FC<MindmapSidebarProps> = ({
  children,
}: MindmapSidebarProps) => {
  const { open, setOpen, currentNode } = useMindMapSidebar()
  console.log('currentNode: ', currentNode)

  const handleOpen = (isOpen: boolean) => {
    setOpen(isOpen)
  }
  const [connections, setConnections]: any = useState(null)
  console.log('connections: ', connections)

  useEffect(() => {
    const getConnections = async ({ id, type }: any) => {
      const payload = await searchConnections({
        id,
        type,
      })
      console.log('payload: ', payload)

      return payload?.data
    }

    if (open && currentNode && !connections?.length) {
      const { id, type } = currentNode
      getConnections({ id, type }).then((res) => {
        console.log('res: ', res)
        setConnections(res)
      })
    }
    // https://www.youtube.com/watch?v=g_wPr0LUeg0&list=PLyyu-kB5uDRekzb1Og6AUeq84-AepM7p5&index=5
    // // @ts-ignore
    // const cols = Array.from(document.querySelector('.hover-effect') ?? [])
    // cols.forEach((col) => {
    //   console.log('col: ', col)
    //   var split = new SplitText(col, { type: 'chars' })
    //   console.log('split: ', split)
    //   //now animate each character into place from 100px above, fading in:
    //   gsap.from(split.chars, {
    //     duration: 1,
    //     y: 100,
    //     autoAlpha: 0,
    //     stagger: 0.05,
    //   })
    // })
  }, [currentNode, open, connections])

  return (
    <Sheet open={open} onOpenChange={handleOpen} className='mindmap-sidebar'>
      <SheetContent side={'left'} className='mindmap-sidebar'>
        <SheetHeader>
          <SheetTitle>Connections</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        {connections && <ConnectionList connections={connections} />}
      </SheetContent>
    </Sheet>
  )
}

{
  /* <ConnectionList connections={connections} /> */
}
