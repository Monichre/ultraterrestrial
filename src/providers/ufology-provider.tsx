'use client'
import type { NetworkGraphPayload } from '@/lib/xata'
import { GraphProvider } from '@/providers/graph-context'
import { connections } from '@/stories/data/entity-data'
import { ReactFlowProvider } from '@xyflow/react'
import { createContext } from 'react'
import { searchConnections } from '@/api/search'
export type UfologyContextSchema = {
  records: NetworkGraphPayload['records']
  connections: NetworkGraphPayload['connections']
  getConnections: any
}

export const UfologyContext: any = createContext({
  records: {
    topics: [],
    events: [],
    personnel: [],
    testimonies: [],
    organizations: [],
  },
  connections: {
    topicsExpertsConnections: [],
    eventsExpertsConnections: [],
    eventsTopicsExpertsConnections: [],
    topicsTestimoniesConnections: [],
    organizationsPersonnelConnections: [],
  },
  // getConnections?: ({ id, type }: any) => {},
})

interface UfologyProvider {
  children: any
  ufologyData: any
}

export const UfologyProvider: React.FC<UfologyProvider> = ({
  ufologyData,
  children,
}) => {
  const { records, connections } = ufologyData
  const typeMap: any = {
    events: 'event',
    personnel: 'subject-matter-expert',
    topics: 'topic',
    organizations: 'organization',
  }

  return (
    <UfologyContext.Provider value={{ records, connections }}>
      {children}
    </UfologyContext.Provider>
  )
}
