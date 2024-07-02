'use client'
import { ReactFlowProvider } from '@xyflow/react'
import { GraphContextProvider } from '@/contexts/graph/GraphContext'

interface XyFlowProviderProps {
  children: any
  initialGraphData: any
}

export const GraphProvider: React.FC<XyFlowProviderProps> = ({
  initialGraphData,
  children,
}) => {
  return (
    <ReactFlowProvider>
      <GraphContextProvider allEntityGraphData={initialGraphData}>
        {children}
      </GraphContextProvider>
    </ReactFlowProvider>
  )
}
