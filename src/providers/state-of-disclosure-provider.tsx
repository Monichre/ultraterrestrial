'use client'
import type { NetworkGraphPayload } from '@/lib/xata'
import { GraphProvider } from '@/providers/graph-context'
import { connections } from '@/stories/data/entity-data'
import { ReactFlowProvider } from '@xyflow/react'
import { createContext } from 'react'
import { searchConnections } from '@/api/search'
export type StateOfDisclosureSchema = {
  records: NetworkGraphPayload['records']
  connections: NetworkGraphPayload['connections']
  getConnections: any
}

export const StateOfDisclosureContext: any = createContext({
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

export interface StateOfDisclosureProviderProps {
  children: any
  stateOfDisclosure: any
}

export const StateOfDisclosureProvider: React.FC<
  StateOfDisclosureProviderProps
> = ({ stateOfDisclosure, children }) => {
  const { records, connections } = stateOfDisclosure
  const typeMap: any = {
    events: 'event',
    personnel: 'subject-matter-expert',
    topics: 'topic',
    organizations: 'organization',
  }

  return (
    <StateOfDisclosureContext.Provider value={{ records, connections }}>
      {children}
    </StateOfDisclosureContext.Provider>
  )
}
