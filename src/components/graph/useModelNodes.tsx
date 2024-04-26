'use client'

import { DOMAIN_MODEL_COLORS } from '@/utils/colors'
import { useState, useEffect, useMemo } from 'react'
import { GraphNode, GraphEdge } from 'reagraph'

export const useModelNodes = ({ models }: any) => {
  const {
    events: eventModels,
    topics: topicModels,
    personnel: personnelModels,
  } = models

  const { all: allTopics, withConnections: topicsSubjectMatterExpertEdges } =
    topicModels

  const rootNodes = [
    {
      label: 'ultraterrestrial',
      id: 'ultraterrestrial',
      fill: DOMAIN_MODEL_COLORS.root,
      data: {
        x: 0,
        y: 1,
        size: 15,
        color: DOMAIN_MODEL_COLORS.root,
      },
    },
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
  const rootEdges = [
    {
      source: rootNodes[0].id,
      target: rootNodes[1].id,
      id: `${rootNodes[0].id}->${rootNodes[1].id}`,
      label: `${rootNodes[0].id}->${rootNodes[1].id}`,
    },
    {
      source: rootNodes[0].id,
      target: rootNodes[2].id,
      id: `${rootNodes[0].id}-${rootNodes[2].id}`,
      label: `${rootNodes[0].id}-${rootNodes[2].id}`,
    },
    {
      source: rootNodes[0].id,
      target: rootNodes[3].id,
      id: `${rootNodes[0].id}-${rootNodes[3].id}`,
      label: `${rootNodes[0].id}-${rootNodes[3].id}`,
    },
  ]

  const [root, topics, events, personnelRootNode] = rootNodes

  // const [nodes, edges] = useMemo(() => {
  //   const n = rootNodes
  //   const e = rootEdges
  //   for (const node of topicModels) {
  //     if (!n.find(nn => nn.id === node.id)) {
  //       n.push({
  //         id: node.id,
  //         label: node.name,
  //         data: {...node}
  //       });
  //     }
  //   }
  //   for (const edge of mitreTechniquesAll.links) {
  //     if (n.find(nn => nn.id === edge.source) && n.find(nn => nn.id === edge.target)) {
  //       e.push({
  //         id: `${edge.source}-${edge.target}`,
  //         source: edge.source,
  //         target: edge.target
  //       });
  //     }
  //   }
  //   return [n, e];
  // }, []);
  const [nodes, edges] = useMemo(() => {
    const tempNodes: any = rootNodes
    const tempEdges: any = rootEdges

    personnelModels.forEach(({ id, ...person }: any) => {
      const personnelNode: GraphNode = {
        id: id,
        label: person?.name,

        data: {
          ...person,
          color: DOMAIN_MODEL_COLORS.personnel,
          type: 'personnel',
          segment: 'personnel',
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
      const topicNode: GraphNode = {
        id: id,
        label: topic?.name,

        data: {
          ...topic,
          color: DOMAIN_MODEL_COLORS.topics,
          type: 'topic',
          segment: 'topics',
        },
      }
      tempNodes.push(topicNode)
      const rootTopicToChildTopicNodeEdge: GraphEdge = {
        source: topics.id,
        target: id,
        id: `${topics.id}->${id}`,
        // label: `${topics.id}->>${topicNode.id}`,
      }

      tempEdges.push(rootTopicToChildTopicNodeEdge)
    })

    topicsSubjectMatterExpertEdges.forEach((edge) => {
      console.log('edge: ', edge)
      if (edge?.topic && edge['subject-matter-expert']) {
        const newEdge = {
          source: edge['topic'].id,
          target: edge['subject-matter-expert'].id,
          id: edge?.id,
        }
        tempEdges.push(newEdge)
      }
    })

    return [tempNodes, tempEdges]
  }, [])

  return {
    nodes,
    edges,
  }
}
