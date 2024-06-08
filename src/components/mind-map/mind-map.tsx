'use client'

import { XyFlowGraph } from '@/features/xyflow/xyflow-graph'

import { useXYFlow } from '@/hooks/useXYFlow'
import type { NetworkGraphPayload } from '@/lib/xata'
import { XyFlowProvider } from '@/providers/xyflow-provider'

export interface MindMapProps {
  allEntityGraphData: NetworkGraphPayload['graphData']
}

export const MindMap: React.FC<MindMapProps> = ({
  allEntityGraphData,
}: MindMapProps) => {
  console.log('allEntityGraphData: ', allEntityGraphData)
  const { flowState } = useXYFlow({ allEntityGraphData })

  console.log('flowState: ', flowState)

  return(
    <XyFlowProvider >
     <XyFlowGraph {...flowState} />
    </XyFlowProvider>
    )
}
