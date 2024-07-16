'use client'
import { CopilotPopup } from '@copilotkit/react-ui'
import { useKeyPress } from '@xyflow/react'
import * as React from 'react'
import { useEffect } from 'react'
import useKeyboardJs from 'react-use/lib/useKeyboardJs'

export interface CopilotProps {}

export const CopilotPopUpUI: React.FC<CopilotProps> = (props: CopilotProps) => {
  const [isPressed] = useKeyboardJs('cmd + /')
  console.log('isPressed: ', isPressed)
  useEffect(() => {}, [isPressed])

  return (
    <CopilotPopup
      labels={{
        title: 'Party Martian: Warden of UltraTerrestrial',
        initial: 'Greetings Earthling',
      }}
      shortcut='cmd+/'
    />
  )
}
