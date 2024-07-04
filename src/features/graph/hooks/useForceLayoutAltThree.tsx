import {
  type ReactFlowState,
  useNodesInitialized,
  useReactFlow,
  useStore,
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
import { useEffect } from 'react'

type UseForceLayoutOptions = {
  strength: number
  distance: number
}

type SimNodeType = SimulationNodeDatum & Node

const elementCountSelector = (state: any) =>
  state?.nodeLookup?.size + state?.edges?.length

const nodesInitializedSelector = (state: ReactFlowState) =>
  Array.from(state.nodeLookup.values()).every(
    (node) => node.width && node.height
  ) && state.nodeLookup.size
const strength = -1000
const distance = 150

export function useForceLayoutAlt() {
  const elementCount = useStore(elementCountSelector)
  console.log('elementCount: ', elementCount)
  const nodesInitialized = useStore(nodesInitializedSelector)
  console.log('nodesInitialized: ', nodesInitialized)
  const { setNodes, getNodes, getEdges } = useReactFlow()

  // const simulation = forceSimulation()
  //   .force('charge', forceManyBody().strength(strength))
  //   .force('x', forceX().x(0).strength(0.08))
  //   .force('y', forceY().y(0).strength(0.08))

  useEffect(() => {
    const nodes = getNodes()
    const edges = getEdges()
    if (!nodes.length || !nodesInitialized) {
      return
    }

    const simulationNodes: any[] = nodes.map((node) => ({
      ...node,
      x: node.position.x,
      y: node.position.y,
    }))
    console.log('simulationNodes: ', simulationNodes)

    const simulationLinks: SimulationLinkDatum<SimNodeType>[] = edges.map(
      (edge) => edge
    )
    console.log('simulationLinks: ', simulationLinks)
    const simulation = forceSimulation()
      .nodes(simulationNodes)
      .force('charge', forceManyBody().strength(strength))
      .force(
        'link',
        forceLink(simulationLinks)
          .id((d: any) => d.id)
          .strength(0.05)
          .distance(distance)
      )
      .force('x', forceX().x(0).strength(0.08))
      .force('y', forceY().y(0).strength(0.08))
      .on('tick', () => {
        setNodes(
          simulationNodes.map((node) => ({
            id: node.id,
            data: node.data,
            position: { x: node.x ?? 0, y: node.y ?? 0 },
            className: node.className,
          }))
        )
      })
    // simulation
    //   .nodes(simulationNodes)
    //   .force(
    //     'link',
    //     forceLink(simulationLinks)
    //       .id((d: any) => d.id)
    //       .strength(0.05)
    //       .distance(distance)
    //   )
    //   .on('tick', () => {
    //     console.log('tick')
    //     setNodes((nodes) =>
    //       nodes.map((node) => ({
    //         ...node,
    //         // position: { x: node.position.x ?? 0, y: node.position.y ?? 0 },
    //       }))
    //     )
    //   })

    // simulation.tick(100)

    // return () => {
    //   simulation.stop()
    // }
  }, [elementCount, setNodes, nodesInitialized, getNodes, getEdges])

  // return { simulation }
}
