'use client'

import { useReportWebVitals } from 'next/web-vitals'
import { Graph } from '@/features/graph/graph'

import type { NetworkGraphPayload } from '@/lib/xata'
import { UfologyProvider } from '@/providers/ufology-provider'

export interface MindMapProps {
  allEntityGraphData: NetworkGraphPayload['graphData']
}

export const MindMap: React.FC<MindMapProps> = ({
  allEntityGraphData,
}: MindMapProps) => {
  useReportWebVitals((metric) => {
    console.log(metric)
  })
  return (
    <>
      <UfologyProvider ufologyData={allEntityGraphData}>
        <Graph />
      </UfologyProvider>
    </>
  )
}
