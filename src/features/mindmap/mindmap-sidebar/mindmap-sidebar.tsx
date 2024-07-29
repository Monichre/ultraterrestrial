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

import splitText from '@/utils/split-text.js'

import { searchConnections } from '@/features/ai/search'
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

  useEffect(() => {
    const getConnections = async ({ id, type }: any) => {
      const payload = await searchConnections({
        id,
        type,
      })

      return payload?.data
    }

    if (open && currentNode && !connections?.length) {
      const { id, type } = currentNode
      getConnections({ id, type }).then((res) => {
        setConnections(res)
      })
    }
  }, [currentNode, open, connections])

  return (
    <Sheet
      open={open}
      onOpenChange={handleOpen}
      // @ts-ignore
      className='mindmap-sidebar bg-slate-950 relative'
    >
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]'></div>
      <SheetContent
        side={'left'}
        className='mindmap-sidebar h-[100vh] flex flex-col !w-[40vw] sm:max-w-[40vw] z-50'
      >
        <SheetHeader className=''>
          <SheetTitle>
            <h3 className='font-centimaSans text-white text-bold text-[16px] tracking-wider'>
              Connections
            </h3>
          </SheetTitle>
          <SheetDescription>
            Relevant data points from our records
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
