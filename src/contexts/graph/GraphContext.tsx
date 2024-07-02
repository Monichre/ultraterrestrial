'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import { use3DGraph, type UseGraphProps } from '@/hooks/use3dGraph'
import {
  type Node,
  type Edge,
  useReactFlow,
  useStore,
  applyEdgeChanges,
  applyNodeChanges,
  type EdgeChange,
  type NodeChange,
  type OnConnectStartParams,
  addEdge,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
  useOnViewportChange,
  type Viewport,
  useStoreApi,
} from '@xyflow/react'
import {
  NODE_SPACE,
  ROOT_NODE_HEIGHT,
  ROOT_NODE_POSITIONS,
  ROOT_NODE_WIDTH,
} from '@/utils/constants/nodes'
import * as d3 from 'd3'
// import { simulation } from '@/features/graph/utils/force-directed'
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceX,
  forceY,
} from 'd3-force'
import { collide } from '@/features/graph/utils/collide'
const GraphContext: any = createContext({
  nodes: [],
  setNodes: (nodes: any) => {},
  edges: [],
  setEdges: (edges: any) => {},
  flowGraph: [],
  createRootNodeEdges: (nodes: any) => {},
  addRootNodeChildren: (type: string) => {},
})

function ViewportChangeLogger() {
  useOnViewportChange({
    onStart: (viewport: Viewport) => console.log('start', viewport),
    onChange: (viewport: Viewport) => console.log('change', viewport),
    onEnd: (viewport: Viewport) => console.log('end', viewport),
  })

  return null
}
const simulation = forceSimulation()
  .force('charge', forceManyBody().strength(-1000))
  .force('x', forceX().x(0).strength(0.05))
  .force('y', forceY().y(0).strength(0.05))
  .force('collide', collide())
  .alphaTarget(0.05)
  .stop()

export const GraphContextProvider = ({
  children,
  allEntityGraphData,
}: {
  children: React.ReactNode
  allEntityGraphData: any
}) => {
  const { getNodes, fitView, getEdges } = useReactFlow()
  // const store = useStoreApi()

  const { graph }: any = use3DGraph({ allEntityGraphData })
  const [nodes, setNodes]: any = useState<Node[]>([])
  const [edges, setEdges]: any = useState<Edge[]>([])
  const [flowGraph, setFlowGraph]: any = useState({})

  // const runLayout = () => {
  //   let layoutNodes = getNodes().map((node) => ({
  //     ...node,
  //     x: node.position.x,
  //     y: node.position.y,
  //   }))

  //   simulation.nodes(nodes).force(
  //     'link',
  //     forceLink(edges)
  //       .id((d: { id: any }) => d.id)
  //       .strength(0.05)
  //       .distance(100)
  //   )

  //   // The tick function is called every animation frame while the simulation is
  //   // running and progresses the simulation one step forward each time.
  //   const tick = () => {
  //     getNodes().forEach((node, i) => {
  //       const dragging = Boolean(
  //         document.querySelector(`[data-id="${node.id}"].dragging`)
  //       )

  //       // Setting the fx/fy properties of a node tells the simulation to "fix"
  //       // the node at that position and ignore any forces that would normally
  //       // cause it to move.
  //       nodes[i].fx = dragging ? node.position.x : null
  //       nodes[i].fy = dragging ? node.position.y : null
  //     })

  //     simulation.tick()
  //     setNodes((nodes: any[]) =>
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
  // }

  const updateNodes = useCallback((newNodes: any) => {
    setNodes(newNodes)
  }, [])
  const createRootNode = useCallback((node: any, index: number) => {
    const { id, label, name, fill, data } = node
    const title = label || name
    const childCount = node?.childNodes ? node?.childNodes?.length : 0
    return {
      id,
      type: 'rootNode',
      position: ROOT_NODE_POSITIONS[data.type],
      zIndex: 2000,
      data: {
        childCount,
        ...data,
        label: title,
        fill,
      },
    }
  }, [])

  const createRootNodeEdge = (rootNodeChildNode: any) => {
    const { parentId: source, id: target, data } = rootNodeChildNode
    return {
      id: `${source}:${target}`,
      source,
      target,
      animated: true,
      type: 'entityEdge',
    }
  }

  const createRootNodeEdges = useCallback((rootNodeChildNodes: Node[]) => {
    const rootNodeEdges = rootNodeChildNodes.map(createRootNodeEdge)
    return rootNodeEdges
  }, [])

  //  Positioning Root Node Children --------------------------------------------------------------------------------------
  const calculateChildNodePosition = (childNodeType: any) => {
    const parentNodePosition = ROOT_NODE_POSITIONS[childNodeType]
    console.log('parentNodePosition: ', parentNodePosition)

    return {
      position: {
        x: parentNodePosition.x,
        y: parentNodePosition.y + ROOT_NODE_WIDTH,
      },
    }
  }

  // const runForceSimulation = useCallback((newnodes: any[], newEdges: any) => {
  //   const simulation = d3
  //     .forceSimulation(newnodes)
  //     .force(
  //       'link',
  //       d3
  //         .forceLink(newEdges)
  //         .id((d: any) => d.id)
  //         .distance(400)
  //     )
  //     .force('charge', d3.forceManyBody().strength(-500))
  //     .force(
  //       'center',
  //       d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2)
  //     )
  //     .force('collide', d3.forceCollide().radius(ROOT_NODE_WIDTH / 2))

  //   // Run the simulation
  //   simulation.tick(500)

  //   // Return newnodes with adjusted positions
  //   return newnodes.map((node: any) => ({
  //     ...node,
  //     position: {
  //       x: node.x - ROOT_NODE_WIDTH * 2,
  //       y: node.y + ROOT_NODE_WIDTH * 2,
  //     },
  //   }))
  // }, [])

  //  Root Node Children --------------------------------------------------------------------------------------

  // FIXME: Will need to refactor this function so as to not duplicate nodes in the node state
  const createRootNodeChild = useCallback((node: any, ...rest) => {
    console.log('rest: ', rest)
    const { id, label, name, fill, data } = node
    const title = label || name
    return {
      id,
      hidden: true,
      zIndex: 1000,
      data: {
        ...data,
        label: title,
        fill,
      },
      type: 'entityNode',
      parentId: `${data.type}-root-node`,
      ...calculateChildNodePosition(data.type),
      // extent: 'parent',
    }
  }, [])

  const addRootNodeChildren = useCallback(
    (type: any) => {
      const { nodes: incomingNodes } = flowGraph[type]
      console.log('incomingNodes: ', incomingNodes)
      const notHidden = incomingNodes.map((node: Node) => ({
        ...node,
        hidden: false,
        // position: {
        //   x: node.position.x - ROOT_NODE_WIDTH * 2,
        //   y: node.position.y + ROOT_NODE_WIDTH * 2,
        // },
      }))
      const allNodes = [...nodes, ...notHidden]

      const incomingEdges = createRootNodeEdges(incomingNodes)
      // const newNodes = runForceSimulation(allNodes, incomingEdges)
      // runLayout()
      setNodes(allNodes)
      setEdges(incomingEdges)

      // reactFlow.zoomOut()
    },
    [createRootNodeEdges, flowGraph, nodes] // runForceSimulation
  )

  //  Graph State Functions --------------------------------------------------------------------------------------

  const onNodesChange: OnNodesChange = useCallback(
    (chs) => {
      setNodes((nds: Node[]) => applyNodeChanges(chs, nds))
    },
    [setNodes]
  )

  const onEdgesChange: OnEdgesChange = useCallback(
    (chs) => {
      setEdges((eds: Edge[]) => applyEdgeChanges(chs, eds))
    },
    [setEdges]
  )

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds: any) => addEdge(params, eds)),
    [setEdges]
  )

  //  useEffects --------------------------------------------------------------------------------------
  useEffect(() => {
    const formattedGraphNodesObject: any = {}

    for (let key in graph) {
      // @ts-ignore
      const graphModel = graph[key]

      let tempNodes = graphModel.nodes.map(createRootNodeChild)
      let tempLinks = [].concat(
        // @ts-ignore
        ...Object.keys(graphModel.links).map((key) => {
          const links = graphModel.links[key].connectedTo
          return [...links]
        })
      )
      formattedGraphNodesObject[key] = {
        nodes: tempNodes,
        edges: tempLinks,
      }
    }
    console.log('graph: ', graph)
    console.log('formattedGraphNodesObject: ', formattedGraphNodesObject)
    setFlowGraph(formattedGraphNodesObject)

    const initialNodes = graph.root.nodes.map(createRootNode)
    setNodes(initialNodes)
    setEdges([])
  }, [createRootNode, createRootNodeChild, graph])

  return (
    <GraphContext.Provider
      value={{
        nodes,
        addRootNodeChildren,
        updateNodes,
        edges,
        setEdges,
        flowGraph,
        createRootNodeEdges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        getNodes,
        fitView,
        setNodes,
        getEdges,
        // runLayout,
        // formatNodesWithForceLayout,
      }}
    >
      {children}
      <ViewportChangeLogger />
    </GraphContext.Provider>
  )
}

export const useGraph: any = () => {
  const context = useContext(GraphContext)

  if (!context) {
    throw new Error('useGraph must be used within a GraphProvider')
  }
  return context
}
