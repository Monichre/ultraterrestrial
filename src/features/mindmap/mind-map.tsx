'use client'

import type { NetworkGraphPayload } from '@/lib/xata'

import { GraphProvider } from '@/providers/graph-context'
import { ReactFlowProvider } from '@xyflow/react'

export interface MindMapProps {
  allEntityGraphData: NetworkGraphPayload['graphData']
}

export const MindMap: React.FC<MindMapProps> = ({
  allEntityGraphData,
}: MindMapProps) => {
  return (
    <ReactFlowProvider>
      <GraphProvider allEntityGraphData={allEntityGraphData}>
        <Graph />
      </GraphProvider>
    </ReactFlowProvider>
  )
}
