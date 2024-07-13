'use client'

import React, { useContext, useState, createContext } from 'react'

interface SidebarContextProps {
  open: boolean
  setOpen: (open: boolean) => void
  handleSidebarOpen: ({ node, isOpen }: any) => void
  currentNode: any
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
  const [currentNode, setCurrentNode] = useState(null)

  const handleSidebarOpen = ({ node, isOpen }: any) => {
    console.log('node: ', node)
    setOpen(isOpen)
    setCurrentNode(node)
  }

  return (
    <MindMapSidebarContext.Provider
      value={{ open, setOpen, handleSidebarOpen, currentNode }}
    >
      {children}
    </MindMapSidebarContext.Provider>
  )
}
