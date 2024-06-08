'use client'
import { ReactFlowProvider } from 'reactflow'

interface XyFlowProviderProps {
  children: any
}

export const XyFlowProvider: React.FC<XyFlowProviderProps> = ({ children }) => {
  return <ReactFlowProvider>{children}</ReactFlowProvider>
}
