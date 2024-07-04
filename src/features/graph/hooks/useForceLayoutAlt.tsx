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
  const nodesInitialized = useStore(nodesInitializedSelector)
  const { setNodes, getNodes, getEdges } = useReactFlow()

  useEffect(() => {
    const nodes = getNodes()
    const edges = getEdges()

    // if (!nodes.length || !nodesInitialized) {
    //   return
    // }

    const simulationNodes: any[] = nodes.map((node) => ({
      ...node,
      x: node.position.x,
      y: node.position.y,
    }))

    const simulationLinks: SimulationLinkDatum<SimNodeType>[] = edges.map(
      (edge) => edge
    )

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
            ...node,
            position: { x: node.x ?? 0, y: node.y ?? 0 },
          }))
        )
      })

    return () => {
      simulation.stop()
    }
  }, [elementCount, getNodes, getEdges, setNodes, nodesInitialized])
}
