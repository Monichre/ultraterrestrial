import { getXataClient } from '@/lib/xata/client'
import { DOMAIN_MODEL_COLORS } from '@/utils/constants/colors'

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
    nodes:Record<string, any>[]
    links: Record<string, any>[]
  }
}

const createGraphNode = (
  { record, type }: any
) => {
  const {id, name: label, ...rest} = record
  // @ts-ignore
  const color = DOMAIN_MODEL_COLORS[type]
  const node = {
    id,
    label,
    fill: color,
    data: {
      ...rest,
      color,
      type,
    },
  }
  return node
}

export const createGraphRootEdge = ({record, type='events'}: any) => {
  const color = DOMAIN_MODEL_COLORS[type]
  const edge = {
    color,
    source: type,
    target: record?.id,
    id: `${type}->${record.id}`,
  }
  return edge
}

export const createGraphLink = ({ targetNode, sourceNode }: any) => {
  // How to handle two way linking between nodes?
  const link = {
    source: sourceNode?.id,
    target: targetNode?.id,
  }
  return link
}
export const createGraphEdge = ({ targetNode, sourceNode }: any) => {
  // const color = DOMAIN_MODEL_COLORS[type]
  const edge = {
    // color,
    source: sourceNode?.id,
    target: targetNode?.id,
    id: `${sourceNode.id}->${targetNode.id}`,
  }
  return edge
}

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
  console.log('personnel: ', personnel)

  const topicsExpertsConnections =
    await xata.db['topic-subject-matter-experts'].getAll()
  const eventsExpertsConnections =
    await xata.db['event-subject-matter-experts'].getAll()

    // This is a 3 way link. How to handle?
  const eventsTopicsExpertsConnections =
    await xata.db['event-topic-subject-matter-experts'].getAll()

  const topicsTestimoniesConnections =
    await xata.db['topics-testimonies'].getAll()

    const records: any =  {
      topics: topics.toSerializable(),
      events: events.toSerializable(),
      personnel: personnel.toSerializable(),
      testimonies: testimonies.toSerializable(),
      // organizations: organizations.toSeriali
    }
    const connections = {
        topicsExpertsConnections: topicsExpertsConnections.toSerializable(),
        eventsExpertsConnections: eventsExpertsConnections.toSerializable(),
        eventsTopicsExpertsConnections:
          eventsTopicsExpertsConnections.toSerializable(),
        topicsTestimoniesConnections:
          topicsTestimoniesConnections.toSerializable(),
    }

    const graphData = {
      nodes: [...records.topics, ...records.events, ...records.personnel, ...records.testimonies].map(record => createGraphNode({record, type: 'root'})),
      links: [...connections.topicsExpertsConnections, ...connections.eventsExpertsConnections].map(record => {
        const [root, sourceData, targetData] = Object.entries(record)
        const [sourceType, sourceNode] = sourceData
        const [targetType, targetNode] = targetData
        return createGraphLink({sourceNode, targetNode})
      })
    }

      const payload: NetworkGraphPayload = {
        records,
connections,
graphData

      }
    
  return payload
}
