'use client'

// import { TopicPersonnelAndEventGraphDataPayload } from '@/lib/xata'
import { DOMAIN_MODEL_COLORS } from '@/utils/colors'
import { useState, useEffect, useMemo } from 'react'

interface ModelNodesProps {
  models: any
}

const rootNodes = [
  {
    label: 'topics',
    id: 'topics',
    fill: DOMAIN_MODEL_COLORS.topics,

    data: {
      x: 0,
      y: 1,
      size: 15,
      color: DOMAIN_MODEL_COLORS.topics,
    },
  },
  {
    label: 'events',
    id: 'events',
    fill: DOMAIN_MODEL_COLORS.events,
    data: {
      x: 0,
      y: 1,
      size: 15,
      color: DOMAIN_MODEL_COLORS.events,
    },
  },
  {
    label: 'personnel',
    id: 'personnel',
    fill: DOMAIN_MODEL_COLORS.personnel,
    data: {
      x: 0,
      y: 1,
      size: 15,
      color: DOMAIN_MODEL_COLORS.personnel,
    },
  },
]
const rootEdges: any = []

export const useModelNodes = ({ models }: ModelNodesProps) => {
  const {
    events: {
      all: allEventModels,
      withConnections: eventsSubjectMatterExpertsEdges,
    },
    topics: { all: allTopics, withConnections: topicsSubjectMatterExpertEdges },
    personnel: personnelModels,
  }: any = models
  console.log(
    'eventsSubjectMatterExpertsEdges: ',
    eventsSubjectMatterExpertsEdges
  )
  console.log('allEventModels: ', allEventModels)

  const [topicsRootNode, eventsRootNode, personnelRootNode]: any = rootNodes
  const [keyFigures, setKeyFigures] = useState(personnelModels)
  const [topics, setTopics] = useState(allTopics)
  const [events, setEvents] = useState(allEventModels)

  const [nodes, edges] = useMemo(() => {
    const tempNodes: any = rootNodes
    const tempEdges: any = rootEdges

    personnelModels.forEach(({ id, ...person }: any) => {
      const personnelNode: any = {
        id: id,
        label: person?.name,
        fill: DOMAIN_MODEL_COLORS.personnel,
        data: {
          ...person,
          color: DOMAIN_MODEL_COLORS.personnel,
          type: 'key figures',
          segment: 'key figures',
        },
      }
      tempNodes.push(personnelNode)
      const rootPersonnelToChildNodeEdge = {
        source: personnelRootNode.id,
        target: id,
        id: `${personnelRootNode.id}->${id}`,
        // label: `${personnelRootNode.id}->>${personnelNode.id}`,
      }
      tempEdges.push(rootPersonnelToChildNodeEdge)
    })

    allTopics.forEach(({ id, ...topic }: any) => {
      const topicNode: any = {
        id: id,
        label: topic?.name,

        fill: DOMAIN_MODEL_COLORS.topics,
        data: {
          ...topic,
          type: 'topic',
          segment: 'topics',
        },
      }
      tempNodes.push(topicNode)
      const rootTopicToChildTopicNodeEdge: GraphEdge = {
        source: topicsRootNode.id,
        target: id,
        id: `${topicsRootNode.id}->${id}`,
      }

      tempEdges.push(rootTopicToChildTopicNodeEdge)
    })

    topicsSubjectMatterExpertEdges.forEach((edge) => {
      console.log('edge: ', edge)
      tempEdges.push({
        source: edge.topic,
        target: edge['subject-matter-expert'],
        id: edge.id,
      })
    })

    allEventModels.forEach((event) => {
      console.log('event: ', event)
      const eventNode = {
        id: event?.id,
        label: event?.name,
        fill: DOMAIN_MODEL_COLORS?.events,
        data: {
          ...event,
          type: 'event',
          segment: 'events',
        },
      }
      tempNodes.push(eventNode)

      const rootEventToChildEventEdge = {
        source: eventsRootNode?.id,
        target: event?.id,
        id: `${eventsRootNode.id}->${event.id}`,
      }
      tempEdges.push(rootEventToChildEventEdge)
    })

    eventsSubjectMatterExpertsEdges.forEach(({ id, event, ...rest }) => {
      const target: any = rest['subject-matter-expert']

      const eventToPersonnelEdge = {
        source: event,
        target,
        id,
      }
      tempEdges.push(eventToPersonnelEdge)
    })

    return [tempNodes, tempEdges]
  }, [])

  return {
    nodes,
    edges,
  }
}
