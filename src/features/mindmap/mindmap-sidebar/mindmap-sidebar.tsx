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
import { ConnectionList } from './connection-list'
gsap.registerPlugin(splitText)
export interface MindmapSidebarProps {
  children?: any
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
    <Sheet
      open={open}
      onOpenChange={handleOpen}
      className='mindmap-sidebar bg-slate-950 relative'
    >
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]'></div>
      <SheetContent
        side={'left'}
        className='mindmap-sidebar h-[100vh] flex flex-col'
      >
        <SheetHeader className=''>
          <SheetTitle>
            <h3 className='font-centimaSans text-white text-bold text-[16px] tracking-wider'>
              Connections
            </h3>
          </SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        {connections && (
          <ConnectionList
            originalNode={currentNode}
            connections={connections}
          />
        )}
      </SheetContent>
    </Sheet>
  )
}

{
  /* <ConnectionList connections={connections} /> */
}
