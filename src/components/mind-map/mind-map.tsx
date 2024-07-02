'use client'

import { Graph } from '@/features/graph/graph'

import type { NetworkGraphPayload } from '@/lib/xata'
import { GraphProvider } from '@/providers/graph-provider'

export interface MindMapProps {
  allEntityGraphData: NetworkGraphPayload['graphData']
}

export const MindMap: React.FC<MindMapProps> = ({
  allEntityGraphData,
}: MindMapProps) => {
  return (
    <GraphProvider initialGraphData={allEntityGraphData}>
      <Graph />
    </GraphProvider>
  )
}
