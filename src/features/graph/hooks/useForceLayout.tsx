'use client'

import { useGraph } from '@/contexts/graph/graph-context'
import {
  type ReactFlowState,
  useReactFlow,
  useNodesInitialized,
} from '@xyflow/react'
import { forceSimulation, forceManyBody, forceLink, forceX, forceY } from 'd3'
import { useCallback, useEffect } from 'react'

type UseForceLayoutOptions = {
  strength: number
  distance: number
}

export const useForceLayout = () => {
  const { getNode, screenToFlowPosition } = useReactFlow()
  const { nodes, edges, setNodes }: any = useGraph()

  const checkPreviousNodeAndMerge = useCallback(
    (node: any, index: any) => {
      console.log('index: ', index)
      let count = index === 0 ? 1 : index
      const prev: any = getNode(node.id)
      console.log('prev: ', prev)
      const position = screenToFlowPosition({
        x: node.position.x,
        y: node.position.y + 300 * count,
      })
      console.log('position: ', position)
      const merged = Object.assign(prev, {
        ...node,
        position,
      })
      console.log('merged: ', merged)
      return merged
    },
    [getNode, screenToFlowPosition]
  )

  useEffect(() => {
    // const nodes = getNodes()
    // const edges = getEdges()

    // .force(
    //   'center',
    //   d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2)
    // )
    // .force('collide', d3.forceCollide().radius(ROOT_NODE_WIDTH / 2))
    // .nodes(simulationNodes)
    const strength = 1000
    const distance = 150
    const simulation = forceSimulation(nodes)
      .force('charge', forceManyBody().strength(strength))
      .force(
        'link',
        forceLink(edges)
          .id((d: any) => d.id)
          .strength(0.05)
          .distance(distance)
      )
      .force('x', forceX().x(0).strength(0.08))
      .force('y', forceY().y(0).strength(0.08))
      .on('tick', () => {
        setNodes((nodes: any) => nodes.map(checkPreviousNodeAndMerge))
      })
      .stop()

    return () => {
      simulation.stop()
    }
  }, [setNodes, nodes, edges, checkPreviousNodeAndMerge])
}
