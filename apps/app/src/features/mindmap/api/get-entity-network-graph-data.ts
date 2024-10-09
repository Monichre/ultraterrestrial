import {
  getAllArtifacts,
  getAllDocuments,
  getAllEvents,
  getAllEventsExpertsConnections,
  getAllEventsTopicsExpertsConnections,
  getAllOrganizations,
  getAllOrganizationsMembers,
  getAllPersonnel,
  getAllTestimonies,
  getAllTopics,
  getAllTopicsExpertsConnections,
  getAllTopicsTestimoniesConnections,
} from '@/services/xata/db/models'

export const eventsRootNode = {
  label: 'events',
  id: 'events-root-node',
  data: {
    type: 'events',
  },
}
export const topicsRootNode = {
  label: 'topics',
  id: 'topics-root-node',
  data: {
    type: 'topics',
  },
}
export const personnelRootNode = {
  label: 'personnel',
  id: 'personnel-root-node',
  data: {
    type: 'personnel',
  },
}
export const testimoniesRootNode = {
  label: 'testimonies',
  id: 'testimonies-root-node',
  data: {
    type: 'testimonies',
  },
}

export const organizationsRootNode = {
  label: 'organizations',
  id: 'organizations-root-node',
  data: {
    type: 'organizations',
  },
}
export const documentsRootNode = {
  label: 'documents',
  id: 'documents-root-node',
  data: {
    type: 'documents',
  },
}
export const artifactsRootNode = {
  label: 'artifacts',
  id: 'artifacts-root-node',
  data: {
    type: 'artifacts',
  },
}

export const rootNodes = [
  eventsRootNode,
  topicsRootNode,
  personnelRootNode,
  testimoniesRootNode,
  organizationsRootNode,
  documentsRootNode,
  artifactsRootNode,
]
const formatGraphNode = ({ record, type }: any) => {
  const { id, name, label, ...rest } = record
  const title = name || label

  const node: any = {
    id,
    label: title,
    data: {
      ...rest,
      name: title,
      label: title,
      // color,
      type,
    },
  }
  return node
}
const formatGraphEdge = ({ targetNode, sourceNode }: any) => {
  const edge = {
    source: sourceNode?.id,
    target: targetNode?.id,
    id: `${sourceNode.id}->${targetNode.id}`,
  }
  return edge
}

export type NetworkGraphPayload = {
  records: {
    topics: Record<string, any>[]
    events: Record<string, any>[]
    personnel: Record<string, any>[]
    testimonies: Record<string, any>[]
    organizations: Record<string, any>[]
  }
  connections: {
    topicsExpertsConnections: Record<string, any>[]
    eventsExpertsConnections: Record<string, any>[]
    eventsTopicsExpertsConnections: Record<string, any>[]
    topicsTestimoniesConnections: Record<string, any>[]
    organizationsPersonnelConnections: Record<string, any>[]
  }
  graphData: {
    nodes: any[]
    links: any[]
  }
}

export const getEntityNetworkGraphData = async () => {
  const events = await getAllEvents()
  const topics = await getAllTopics()

  const testimonies = await getAllTestimonies()

  const organizations = await getAllOrganizations()

  const personnel = await getAllPersonnel()

  const topicsExpertsConnections = await getAllTopicsExpertsConnections()
  const eventsExpertsConnections = await getAllEventsExpertsConnections()

  const organizationsMembers = await getAllOrganizationsMembers()

  // This is a 3 way link. How to handle?
  const eventsTopicsExpertsConnections =
    await getAllEventsTopicsExpertsConnections()

  const topicsTestimoniesConnections =
    await getAllTopicsTestimoniesConnections()

  const artifacts = await getAllArtifacts()

  const documents = await getAllDocuments()

  const records: any = {
    topics,
    events,
    personnel,
    testimonies,
    organizations,
    documents,
    artifacts,
  }

  const topicsNodes = records.topics.map((record: any) =>
    formatGraphNode({ record, type: 'topics' })
  )
  const eventsNodes = records.events.map((record: any) =>
    formatGraphNode({ record, type: 'events' })
  )
  const personnelNodes = records.personnel.map((record: any) =>
    formatGraphNode({ record, type: 'personnel' })
  )
  const testimoniesNodes = records.testimonies.map((record: any) =>
    formatGraphNode({ record, type: 'testimonies' })
  )

  const organizationsNodes = records.organizations.map((record: any) =>
    formatGraphNode({ record, type: 'organizations' })
  )

  const documentsNodes = records.documents.map((record: any) =>
    formatGraphNode({ record, type: 'documents' })
  )

  const artifactsNodes = records.artifacts.map((record: any) =>
    formatGraphNode({ record, type: 'artifacts' })
  )

  const nodes = [
    ...rootNodes,
    ...topicsNodes,
    ...eventsNodes,
    ...personnelNodes,
    ...testimoniesNodes,
    ...organizationsNodes,
    ...documentsNodes,
    ...artifactsNodes,
  ]

  const connections = {
    topicsExpertsConnections: topicsExpertsConnections,
    eventsExpertsConnections: eventsExpertsConnections,
    eventsTopicsExpertsConnections: eventsTopicsExpertsConnections,
    topicsTestimoniesConnections: topicsTestimoniesConnections,
    organizationsPersonnelConnections: organizationsMembers,
  }

  const links = [
    ...connections.eventsExpertsConnections,
    ...connections.topicsExpertsConnections,
    ...connections.eventsTopicsExpertsConnections,
    ...connections.topicsTestimoniesConnections,
    ...connections.organizationsPersonnelConnections,
  ]
    .map(({ id, ...rest }) => {
      const [sourceData, targetData] = Object.entries(rest)

      const [sourceType, sourceNode]: any = sourceData

      const [targetType, targetNode]: any = targetData

      // Check if source and target nodes exist because occassionally a join record can exist in either table while missing the record referenced by the foreign key
      const sourceNodeExists = sourceNode
        ? nodes.find((node) => node.id === sourceNode.id)
        : null
      const targetNodeExists = targetNode
        ? nodes.find((node) => node.id === targetNode.id)
        : null

      if (sourceNodeExists && targetNodeExists) {
        return formatGraphEdge({ id, sourceNode, targetNode })
      }
    })
    .filter((link) => {
      return link && link.source && link.target
    })

  const payload: NetworkGraphPayload = {
    records,
    connections,
    graphData: {
      nodes,
      links,
    },
  }

  return payload
}
