'use client'
import { GraphProvider } from '@/providers/graph-context'
import { ReactFlowProvider } from '@xyflow/react'

interface UfologyProvider {
  children: any
  ufologyData: any
}

export const UfologyProvider: React.FC<UfologyProvider> = ({
  ufologyData,
  children,
}) => {
  return (
    <ReactFlowProvider>
      <GraphProvider allEntityGraphData={ufologyData}>{children}</GraphProvider>
    </ReactFlowProvider>
  )
}
