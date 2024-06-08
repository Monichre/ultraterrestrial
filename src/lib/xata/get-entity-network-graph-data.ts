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
} from '../graph/root-nodes'
import { getXataClient } from './client'
import { writeLogToFile } from '../../utils/write-log'
const xata = getXataClient()

export type NetworkGraphPayload = {
  records: {
    topics: Record<string, any>[]
    events: Record<string, any>[]
    personnel: Record<string, any>[]
    testimonies: Record<string, any>[]
  }
  connections: {
    topicsExpertsConnections: Record<string, any>[]
    eventsExpertsConnections: Record<string, any>[]
    eventsTopicsExpertsConnections: Record<string, any>[]
    topicsTestimoniesConnections: Record<string, any>[]
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
      'longitude',
      'date',
    ])
    .getAll()

  const topics = await xata.db.topics.getAll()

  const testimonies = await xata.db.testimonies.getAll()

  // const organizations = await xata.db.organizations.getAll()

  const personnel = await xata.db.personnel
    .select([
      'name',
      'bio',
      'role',
      'photo',
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
    // organizations: organizations.toSeriali
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

  const nodes = [
    ...rootNodes,
    ...topicsNodes,
    ...eventsNodes,
    ...personnelNodes,
    ...testimoniesNodes,
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

  const connections = {
    topicsExpertsConnections: topicsExpertsConnections.toSerializable(),
    eventsExpertsConnections: eventsExpertsConnections.toSerializable(),
    eventsTopicsExpertsConnections:
      eventsTopicsExpertsConnections.toSerializable(),
    topicsTestimoniesConnections: topicsTestimoniesConnections.toSerializable(),
  }

  const connectionLinks = [
    ...connections.topicsExpertsConnections,
    ...connections.eventsExpertsConnections,
  ].map(({ id, ...rest }) => {
    const [sourceData, targetData] = Object.entries(rest)

    const [sourceType, sourceNode]: any = sourceData
    const [targetType, targetNode]: any = targetData

    const sourceNodeExists = nodes.find((node) => node.id === sourceNode.id)
    const targetNodeExists = nodes.find((node) => node.id === targetNode.id)

    if (sourceNodeExists && targetNodeExists) {
      return createGraphLink({ id, sourceNode, targetNode })
    }
  })

  const links = [
    ...rootTopicsConnections,
    ...rootEventsConnections,
    ...rootPersonnelConnections,
    ...rootTestimoniesConnections,
    ...connectionLinks,
  ].filter((link) => link.source && link.target)

  const graphData = {
    nodes,
    links,
  }

  const payload: NetworkGraphPayload = {
    records,
    connections,
    graphData,
  }

  return payload
}
