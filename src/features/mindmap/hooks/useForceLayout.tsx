import { collide } from '@/features/mindmap/utils/collide'
import { nextTick } from '@/utils'
import {
  type ReactFlowState,
  useNodesInitialized,
  useReactFlow,
  useStore,
  useStoreApi,
} from '@xyflow/react'
import {
  type SimulationNodeDatum,
  type SimulationLinkDatum,
  forceSimulation,
  forceManyBody,
  forceLink,
  forceX,
  forceY,
} from 'd3-force'
import { useEffect, useMemo, useRef, useState } from 'react'

type UseForceLayoutOptions = {
  strength: number
  distance: number
}

type SimNodeType = SimulationNodeDatum & Node

const strength = 30
const distance = 1

const runForceSimulation = (nodes: any[], edges: any[], setNodes: any) => {
  console.log('nodes: ', nodes)
  const simulationNodes: any[] = nodes.map(
    (node: { position: { x: any; y: any } }) => ({
      ...node,
      x: node.position.x,
      y: node.position.y,
    })
  )

  const simulationLinks: SimulationLinkDatum<SimNodeType>[] = edges.map(
    (edge: any) => edge
  )

  const simulation = forceSimulation()
    .nodes(simulationNodes)
    .force('charge', forceManyBody().strength(strength))
    .force('x', forceX().x(0).strength(0.05))
    .force('y', forceY().y(0).strength(0.05))
    .on('tick', () => {
      setNodes(
        simulationNodes.map((node) => ({
          ...node,
          position: { x: node.x ?? 0, y: node.y ?? 0 },
        }))
      )
    })
  // .force(
  //   'link',
  //   forceLink(simulationLinks)
  //     .id((d: any) => d.id)
  //     .strength(0.05)
  //     .distance(distance)
  // )
  // .force('x', forceX().x(0).strength(0.05))
  // .force('y', forceY().y(0).strength(0.05))
  return simulation
}

export function useForceLayout(loadChildNodes = false) {
  const { setNodes, getNodes, getEdges } = useReactFlow()
  const nodesInitialized = useNodesInitialized()
  const [layoutedNodes, setLayoutedNodes] = useState(getNodes())
  console.log('layoutedNodes: ', layoutedNodes)
  const simulationRef = useRef()
  // const runIt = () => {
  //   const simulation = runForceSimulation(getNodes(), getEdges(), setNodes)
  //   console.log('simulation: ', simulation)
  //   // simulationRef.current = simulation

  //   nextTick(10).then(() => {
  //     simulation.stop()
  //   })
  //   return simulation
  // }
  useEffect(() => {
    if (loadChildNodes) {
      const simulation = runForceSimulation(getNodes(), getEdges(), setNodes)
      console.log('simulation: ', simulation)
      // simulationRef.current = simulation

      nextTick(10).then(() => {
        simulation.stop()
      })
    }

    // .force('collide', collide())

    // return () => {
    //   simulation.stop()
    // }
  }, [getEdges, setNodes, getNodes, loadChildNodes])
}

// const simulationRef: any = useRef<d3.Simulation<any, undefined>>(null)

// useEffect(() => {
//   if (!simulationRef.current) {
//     simulationRef.current = d3
//       .forceSimulation(nodes)
//       .force(
//         'link',
//         d3
//           .forceLink(edges)
//           .id((d: any) => d.id) // Cast to Node to access the 'id' property
//           .distance(100)
//       )
//       .force('charge', d3.forceManyBody().strength(-500))
// .force(
//   'center',
//   d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2)
// )
// .force('collide', d3.forceCollide().radius(ROOT_NODE_WIDTH / 2))
//       .on('tick', () => {
//         setNodes((nodes: any) => [
//           ...nodes.map((node: any) => ({
//             ...node,
//             position: {
//               x: node.x - ROOT_NODE_WIDTH / 2,
//               y: node.y + ROOT_NODE_WIDTH / 2,
//             },
//           })),
//         ])
//       })
//   }

//   // Optional: Update simulation with new nodes/edges if they change
//   simulationRef.current.nodes(nodes)
//   d3.forceLink(simulationRef.current.force('link')).links(edges)

//   simulationRef.current.tick(150) // Pre-runs the simulation

//   // Cleanup function to stop the simulation when the component unmounts
//   return () => simulationRef.current?.stop()
// }, [simulationRef, nodes, edges, setNodes])

// const { layout, layouting } = useAutoLayoutAlternative()
