'use server'

// import { writeLogToFile } from '@/utils/write-log'
import {
  createGraphNode,
  createGraphLink,
  type GraphLink,
  type GraphNode,
} from '../graph/helpers'
import {
  rootNodes,
  topicsRootNode,
  eventsRootNode,
  personnelRootNode,
  testimoniesRootNode,
  organizationsRootNode,
} from '../graph/root-nodes'
import { getXataClient } from '../xata'
const xata = getXataClient()

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
    nodes: GraphNode[]
    links: GraphLink[]
  }
}

/**
 * Retrieves the data required to generate an entity network graph.
 *
 * This function fetches data from the Xata database, including events, topics, testimonies, and personnel. It also fetches connection data between these entities. The function returns an object containing the fetched data, organized into records and graph data structures.
 *
 * @returns {Promise<NetworkGraphPayload>} The data required to generate an entity network graph.
 */
export const getEntityNetworkGraphData = async () => {
  const events = await xata.db.events
    .sort('date', 'desc')
    .select([
      'name',
      'description',
      'location',
      'latitude',
      'photos',
      'photos.signedUrl',
      'photos.enablePublicUrl',
      'longitude',
      'date',
    ])
    .getAll()

  const topics = await xata.db.topics.getAll()

  const testimonies = await xata.db.testimonies
    .select([
      '*',
      'witness.id',
      'witness.name',
      'witness.role',
      'witness.photo',
      'witness.photo.signedUrl',
      'event.id',
      'event.name',
      'event.date',
    ])
    .getAll()

  const organizations = await xata.db.organizations.getAll()

  const personnel = await xata.db.personnel
    .select([
      'name',
      'bio',
      'role',
      'photo',
      'photo.signedUrl',
      'photo.enablePublicUrl',
      'facebook',
      'twitter',
      'website',
      'instagram',
      'rank',
      'credibility',
      'popularity',
    ])
    .getAll()

  const topicsExpertsConnections =
    await xata.db['topic-subject-matter-experts'].getAll()
  const eventsExpertsConnections =
    await xata.db['event-subject-matter-experts'].getAll()

  const organizationsMembers = await xata.db['organization-members'].getAll()

  // This is a 3 way link. How to handle?
  const eventsTopicsExpertsConnections =
    await xata.db['event-topic-subject-matter-experts'].getAll()

  const topicsTestimoniesConnections =
    await xata.db['topics-testimonies'].getAll()

  const records: any = {
    topics: topics.toSerializable(),
    events: events.toSerializable(),
    personnel: personnel.toSerializable(),
    testimonies: testimonies.toSerializable(),
    organizations: organizations.toSerializable(),
  }

  const topicsNodes = records.topics.map((record: any) =>
    createGraphNode({ record, type: 'topics' })
  )
  const eventsNodes = records.events.map((record: any) =>
    createGraphNode({ record, type: 'events' })
  )
  const personnelNodes = records.personnel.map((record: any) =>
    createGraphNode({ record, type: 'personnel' })
  )
  const testimoniesNodes = records.testimonies.map((record: any) =>
    createGraphNode({ record, type: 'testimonies' })
  )

  const organizationsNodes = records.organizations.map((record: any) =>
    createGraphNode({ record, type: 'organizations' })
  )

  const nodes = [
    ...rootNodes,
    ...topicsNodes,
    ...eventsNodes,
    ...personnelNodes,
    ...testimoniesNodes,
    ...organizationsNodes,
  ]

  const rootTopicsConnections = topicsNodes.map((target: any) =>
    createGraphLink({ target, source: topicsRootNode })
  )
  const rootEventsConnections = eventsNodes.map((target: any) =>
    createGraphLink({ target, source: eventsRootNode })
  )
  const rootPersonnelConnections = personnelNodes.map((target: any) =>
    createGraphLink({ target, source: personnelRootNode })
  )
  const rootTestimoniesConnections = testimoniesNodes.map((target: any) =>
    createGraphLink({ target, source: testimoniesRootNode })
  )

  const rootOrganizationsConnections = organizationsNodes.map((target: any) =>
    createGraphLink({ target, source: organizationsRootNode })
  )

  const connections = {
    topicsExpertsConnections: topicsExpertsConnections.toSerializable(),
    eventsExpertsConnections: eventsExpertsConnections.toSerializable(),
    eventsTopicsExpertsConnections:
      eventsTopicsExpertsConnections.toSerializable(),
    topicsTestimoniesConnections: topicsTestimoniesConnections.toSerializable(),
    organizationsPersonnelConnections: organizationsMembers.toSerializable(),
  }

  const connectionLinks = [
    ...connections.topicsExpertsConnections,
    ...connections.eventsExpertsConnections,
  ].map(({ id, ...rest }) => {
    const [sourceData, targetData] = Object.entries(rest)
    console.log('targetData: ', targetData)
    console.log('sourceData: ', sourceData)

    const [sourceType, sourceNode]: any = sourceData
    console.log('sourceNode: ', sourceNode)
    const [targetType, targetNode]: any = targetData
    console.log('targetNode: ', targetNode)

    // Check if source and target nodes exist because occassionally a join record can exist in either table while missing the record referenced by the foreign key
    const sourceNodeExists = sourceNode
      ? nodes.find((node) => node.id === sourceNode.id)
      : null
    const targetNodeExists = targetNode
      ? nodes.find((node) => node.id === targetNode.id)
      : null

    if (sourceNodeExists && targetNodeExists) {
      return createGraphLink({ id, sourceNode, targetNode })
    }
  })

  const links = [
    ...rootTopicsConnections,
    ...rootEventsConnections,
    ...rootPersonnelConnections,
    ...rootTestimoniesConnections,
    ...rootOrganizationsConnections,
    ...connectionLinks,
  ].filter((link) => {
    console.log('link: ', link)
    return link && link.source && link.target
  })

  const graphData = {
    nodes,
    links,
  }

  const payload: NetworkGraphPayload = {
    records,
    connections,
    graphData,
  }

  // await writeLogToFile(payload, 'network-graph-data.json')

  return payload
}
