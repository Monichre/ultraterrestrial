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

export interface MindmapSidebarProps {
  children: any
  node: any
}

export const MM: React.FC<MindmapSidebarProps> = memo(
  ({ children, node }: MindmapSidebarProps) => {
    console.log('node: ', node)
    const { open, setOpen } = useMindMapSidebar()
    const handleOpen = (isOpen: boolean) => {
      console.log('isOpen: ', isOpen)
      setOpen(isOpen)
    }
    return (
      <Sheet key={'entity-card'} open={open} onOpenChange={handleOpen}>
        {children}
        <SheetContent side={'left'}>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Name
              </Label>
              <Input id='name' value='Pedro Duarte' className='col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='username' className='text-right'>
                Username
              </Label>
              <Input id='username' value='@peduarte' className='col-span-3' />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type='submit'>Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    )
  }
)
MM.displayName = 'MindmapSidebar'
export const MindmapSidebar = memo(MM)
