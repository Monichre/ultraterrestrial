'use client'
import type { NetworkGraphPayload } from '@/lib/xata'

import { createContext } from 'react'

export type StateOfDisclosureSchema = {
  records: NetworkGraphPayload['records']
  connections: NetworkGraphPayload['connections']
  searchRelatedDataPoints: any
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
  // searchRelatedDataPoints?: ({ id, type }: any) => {},
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
