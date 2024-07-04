'use client'

import { useGraph } from '@/contexts/graph/graph-context'
import { collide } from '@/features/graph/utils/collide'
import {
  type ReactFlowState,
  useReactFlow,
  useNodesInitialized,
  useStore,
} from '@xyflow/react'
// import { forceSimulation, forceManyBody, forceLink, forceX, forceY } from 'd3'
import * as d3 from 'd3'
import { useCallback, useEffect, useMemo } from 'react'

type UseForceLayoutOptions = {
  strength: number
  distance: number
}
const elementCountSelector = (state: any) =>
  state?.nodeInternals?.size + state?.edges?.length

// const simulation = d3
//   .forceSimulation(nodes)
//   .force(
//     'link',
//     d3.forceLink(edges).id((d: any) => d.id)
//   )
//   .force('charge', d3.forceManyBody().strength(-500))
//   .force(
//     'center',
//     d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2)
//   )
//   .force('collide', d3.forceCollide().radius(75))
//   .stop()

export const useForceLayout = () => {
  // EXAMPLE FROM REATLFOW WEBSITE
  // const { getNodes, getNode, setNodes, getEdges, fitView } = useReactFlow()
  // const initialised = useNodesInitialized()
  // console.log('initialised: ', initialised)

  // return useMemo(() => {
  //   let nodes = getNodes().map((node) => ({
  //     ...node,
  //     x: node.position.x,
  //     y: node.position.y,
  //   }))
  //   let edges = getEdges().map((edge) => edge)
  //   console.log('edges: ', edges)
  //   let running = false

  //   // If React Flow hasn't initialised our nodes with a width and height yet, or
  //   // if there are no nodes in the flow, then we can't run the simulation!
  //   if (!initialised || nodes.length === 0) return [false, {}]

  //   simulation.nodes(nodes).force(
  //     'link',
  //     forceLink(edges)
  //       .id((d) => d.id)
  //       .strength(0.05)
  //       .distance(100)
  //   )

  //   // The tick function is called every animation frame while the simulation is
  //   // running and progresses the simulation one step forward each time.
  //   const tick = () => {
  //     // getNodes().forEach((node, i) => {
  //     //   const dragging = Boolean(
  //     //     document.querySelector(`[data-id="${node.id}"].dragging`)
  //     //   )

  //     //   // Setting the fx/fy properties of a node tells the simulation to "fix"
  //     //   // the node at that position and ignore any forces that would normally
  //     //   // cause it to move.
  //     //   console.log('nodes[i]: ', nodes[i])
  //     //   // nodes[i].fx = dragging ? node.position.x : null
  //     //   // nodes[i].fy = dragging ? node.position.y : null
  //     // })

  //     simulation.tick(100)
  //     setNodes(
  //       nodes.map((node) => ({ ...node, position: { x: node.x, y: node.y } }))
  //     )

  //     window.requestAnimationFrame(() => {
  //       // Give React and React Flow a chance to update and render the new node
  //       // positions before we fit the viewport to the new layout.
  //       fitView()

  //       // If the simulation hasn't be stopped, schedule another tick.
  //       tick()
  //     })
  //   }

  //   const toggle = () => {
  //     running = !running
  //     running && window.requestAnimationFrame(tick)
  //   }

  //   const isRunning = () => running

  //   return [simulation, { tick, toggle, isRunning }]

  const { setNodes, getNodes, getEdges } = useReactFlow()
  const strength = -1000
  const distance = 150

  const nodes: any = getNodes()
  console.log('nodes: ', nodes)
  const edges = getEdges()
  console.log('edges: ', edges)

  // const simulationNodes: any = nodes.map((node) => ({
  //   ...node,
  //   x: node.position.x,
  //   y: node.position.y,
  // }))

  // const simulationLinks: any = edges.map((edge) => edge)

  // const simulation = d3.forceSimulation(nodes)
  // .force(
  //   'link',
  //   d3.forceLink(edges)
  //   .id((d: any) => d.id)
  //   .strength(0.05)
  //   .distance(distance)
  // )
  // .force('charge', d3.forceManyBody().strength(strength))
  //   .force('x', d3.forceX().x(0).strength(0.08))
  //   .force('y', d3.forceY().y(0).strength(0.08))
  // .on('tick', () => {
  //   setNodes(
  //     nodes.map((node) => ({
  //       ...node,
  //       position: { x: node.position.x ?? 0, y: node.position.y ?? 0 },
  //     }))
  //   )
  // })
  //   .stop()

  const simulation = d3
    .forceSimulation(nodes)
    .force(
      'link',
      d3.forceLink(edges).id((d: any) => d.id)
    )
    .force('charge', d3.forceManyBody().strength(-500))
    .force('collide', d3.forceCollide().radius(75))
    .on('tick', () => {
      setNodes(
        nodes.map((node: any) => ({
          ...node,
          position: { x: node?.position?.x ?? 0, y: node?.position?.y ?? 0 },
        }))
      )
    })
    .stop()

  simulation.tick()
  useEffect(() => {
    simulation.tick(100)

    return () => {
      simulation.stop()
    }
  }, [edges, nodes, simulation])
}

// const checkPreviousNodeAndMerge = useCallback(
//   (node: any, index: any) => {
//     console.log('index: ', index)
//     let count = index === 0 ? 1 : index
//     const prev: any = getNode(node.id)
//     console.log('prev: ', prev)
//     const position = screenToFlowPosition({
//       x: node.position.x,
//       y: node.position.y + 300 * count,
//     })
//     console.log('position: ', position)
//     const merged = Object.assign(prev, {
//       ...node,
//       position,
//     })
//     console.log('merged: ', merged)
//     return merged
//   },
//   [getNode, screenToFlowPosition]
// )

// useEffect(() => {
//   // const nodes = getNodes()
//   // const edges = getEdges()

//   // .force(
//   //   'center',
//   //   d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2)
//   // )
//   // .force('collide', d3.forceCollide().radius(ROOT_NODE_WIDTH / 2))
//   // .nodes(simulationNodes)
//   const strength = 1000
//   const distance = 150
//   const simulation = forceSimulation(nodes)
//     .force('charge', forceManyBody().strength(strength))
//     .force(
//       'link',
//       forceLink(edges)
//         .id((d: any) => d.id)
//         .strength(0.05)
//         .distance(distance)
//     )
//     .force('x', forceX().x(0).strength(0.08))
//     .force('y', forceY().y(0).strength(0.08))
//     .on('tick', () => {
//       setNodes((nodes: any) => nodes.map(checkPreviousNodeAndMerge))
//     })
//     .stop()

//   return () => {
//     simulation.stop()
//   }
// }, [setNodes, nodes, edges, checkPreviousNodeAndMerge])
