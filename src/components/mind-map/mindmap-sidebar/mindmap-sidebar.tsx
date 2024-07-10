'use client'
import React, {
  memo,
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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

import splitText from '@/utils/split-text.js'
import {
  UfologyContext,
  UfologyContextSchema,
} from '@/providers/ufology-provider'
gsap.registerPlugin(splitText)
export interface MindmapSidebarProps {
  children: any
  node: any
}

export const MM: React.FC<MindmapSidebarProps> = memo(
  ({ children, node }: MindmapSidebarProps) => {
    const { open, setOpen } = useMindMapSidebar()
    const { getConnections } = useContext<UfologyContextSchema>(UfologyContext)
    const handleOpen = (isOpen: boolean) => {
      setOpen(isOpen)
    }
    const [connections, setConnections] = useState([])

    useEffect(() => {
      if (open && node) {
        const { id, type } = node
        getConnections({ id, type })
      }
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
    }, [getConnections, node, open])

    return (
      <Sheet key={'entity-card'} open={open} onOpenChange={handleOpen}>
        {children}
        <SheetContent side={'left'}>
          <SheetHeader>
            <SheetTitle>Connections</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div className='h-full w-full'></div>
        </SheetContent>
      </Sheet>
    )
  }
)
MM.displayName = 'MindmapSidebar'
export const MindmapSidebar = memo(MM)
