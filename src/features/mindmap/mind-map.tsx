'use client'

import { Graph } from '@/features/mindmap/graph'
import type { NetworkGraphPayload } from '@/lib/xata'

import { MindMapProvider } from '@/providers/mindmap-context'
import { ReactFlowProvider } from '@xyflow/react'

export interface MindMapProps {
  allEntityGraphData: NetworkGraphPayload['graphData']
}

export const MindMap: React.FC<MindMapProps> = ({
  allEntityGraphData,
}: MindMapProps) => {
  return (
    <ReactFlowProvider>
      <MindMapProvider allEntityGraphData={allEntityGraphData}>
        <Graph />
      </MindMapProvider>
    </ReactFlowProvider>
  )
}
