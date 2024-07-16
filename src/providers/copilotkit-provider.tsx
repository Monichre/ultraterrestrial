'use client'
import * as React from 'react'

import {
  CopilotKit,
  useCopilotAction,
  useMakeCopilotReadable,
} from '@copilotkit/react-core'

import { CopilotPopup } from '@copilotkit/react-ui'
import '@copilotkit/react-ui/styles.css'

interface CopilotProviderProps {
  children: any
}

export const CopilotKitProvider: React.FC<CopilotProviderProps> = ({
  children,
}) => {
  return (
    <CopilotKit
      publicApiKey={process.env.NEXT_PUBLIC_COPILOT_CLOUD_API_KEY}
      runtimeUrl='/api/copilotkit'
    >
      {children}
    </CopilotKit>
  )
}
