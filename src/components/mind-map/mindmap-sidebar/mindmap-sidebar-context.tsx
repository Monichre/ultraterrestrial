'use client'

import React, { useContext, useState, createContext } from 'react'

interface SidebarContextProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export const MindMapSidebarContext = createContext<
  SidebarContextProps | undefined
>(undefined)

export const useMindMapSidebar = () => {
  const context = useContext(MindMapSidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

export const MindMapSidebarProvider: any = ({ children }: any) => {
  const [open, setOpen] = useState(false)

  return (
    <MindMapSidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </MindMapSidebarContext.Provider>
  )
}
