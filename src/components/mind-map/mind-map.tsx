'use client'

import { Graph } from '@/features/graph/graph'

import type { NetworkGraphPayload } from '@/lib/xata'
import { UfologyProvider } from '@/providers/ufology-provider'

export interface MindMapProps {
  allEntityGraphData: NetworkGraphPayload['graphData']
}

// cc: Mindmap
// #mindmap:1
export const MindMap: React.FC<MindMapProps> = ({
  allEntityGraphData,
}: MindMapProps) => {
  return (
    <UfologyProvider ufologyData={allEntityGraphData}>
      <Graph />
    </UfologyProvider>
  )
}
