'use client'

import { XyFlowGraph } from '@/features/xyflow/xyflow-graph'

import type { NetworkGraphPayload } from '@/lib/xata'
import { XyFlowProvider } from '@/providers/xyflow-provider'

export interface MindMapProps {
  allEntityGraphData: NetworkGraphPayload['graphData']
}

export const MindMap: React.FC<MindMapProps> = ({
  allEntityGraphData,
}: MindMapProps) => {
  return (
    <XyFlowProvider>
      <XyFlowGraph initialGraphData={allEntityGraphData} />
    </XyFlowProvider>
  )
}
