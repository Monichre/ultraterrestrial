'use client'

import { Graph } from '@/features/mindmap/graph'

import { MindMapProvider } from '@/providers/mindmap-context'
import { ReactFlowProvider } from '@xyflow/react'

export interface MindMapProps {}

export const MindMap: React.FC<MindMapProps> = () => {
  return (
    <ReactFlowProvider>
      <MindMapProvider>
        <Graph />
      </MindMapProvider>
    </ReactFlowProvider>
  )
}
