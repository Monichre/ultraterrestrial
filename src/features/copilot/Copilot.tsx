'use client'
import { CopilotPopup } from '@copilotkit/react-ui'
import { useKeyPress } from '@xyflow/react'
import * as React from 'react'
import { useEffect, useState } from 'react'
import useKeyboardJs from 'react-use/lib/useKeyboardJs'

export interface CopilotProps {}

export const CopilotPopUpUI: React.FC<CopilotProps> = (props: CopilotProps) => {
  const [isPressed, setIsPressed] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      console.log('event: ', event)
      if (event.key === '/' && event.metaKey) {
        setOpen((open) => !open)

        // Handle the keyboard press combination here
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [isPressed])
  console.log('open: ', open)
  return (
    <CopilotPopup
      labels={{
        title: 'Party Martian: Warden of UltraTerrestrial',
        initial: 'Greetings Earthling',
      }}
      shortcut='Command-/'
    />
  )
}
