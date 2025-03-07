// @ts-nocheck
import type { Edge, Node } from '@xyflow/react'

import * as d3 from 'd3'

export const runForceDirectedSimulation = (nodes: any[], edges: Edge[]) => {
  const simulation = d3
    .forceSimulation(nodes)
    .force(
      'link',
      d3.forceLink(edges).id((d: any) => d.id)
    )
    .force('charge', d3.forceManyBody().strength(-500))
    .force(
      'center',
      d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2)
    )
    .force('collide', d3.forceCollide().radius(75))
    .stop()

  simulation.tick(300)

  return nodes.map((node: any) => ({
    ...node,
    position: {
      x: (node?.x || node?.position?.x) - 75,
      y: (node?.y || node?.position?.y) - 25,
    },
  }))
}
