'use client'

import { FC, useCallback, useRef } from 'react'
import { ForceGraph3D } from 'react-force-graph'
import { useModelNodes } from '../graph/useModelNodes'
// import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import {
  CSS2DObject,
  CSS2DRenderer,
} from 'three/examples/jsm/renderers/CSS2DRenderer'
interface Spherical3DGraphProps {
  models: any
}
function forceRadius(nodes: any, R = 1) {
  return () => {
    for (const n of nodes) {
      const r = Math.hypot(n.x, n.y, n.z)
      const u = Math.pow(r ? Math.sqrt(R / r) : 1, 0.05)
      n.x *= u
      n.y *= u
      n.z *= u
    }
  }
}

export const Spherical3DGraph: FC<Spherical3DGraphProps> = ({
  models,
}: any) => {
  const graphRef: any = useRef()
  const { nodes,  links } = useModelNodes({ models })

  // const handleNodeClick = useCallback(
  //   (node: any) => {
  //     console.log('node: ', node)
  //     // Aim at node from outside it
  //     const distance = 40
  //     const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z)

  //     graphRef.current.cameraPosition(
  //       { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
  //       node, // lookAt ({ x, y, z })
  //       3000 // ms transition duration
  //     )
  //   },
  //   [graphRef]
  // )

  return (
    <ForceGraph3D
      ref={graphRef}
      graphData={{ nodes, links }}
      nodeLabel={(node) => `${node.label}`}
      nodeColor={(n) => n.color || n.fill}
      // nodeRelSize={20}
      linkColor={(link) => link?.color}
      // onNodeClick={handleNodeClick}
    />
  )
}
