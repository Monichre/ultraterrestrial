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
  MarkerType,
  Position,
} from '@xyflow/react'
import {
  CHILD_DIMENSIONS,
  NODE_SPACE,
  PADDING,
  ROOT_DIMENSIONS,
  ROOT_NODE_HEIGHT,
  ROOT_NODE_POSITIONS,
  ROOT_NODE_WIDTH,
} from '@/utils/constants/nodes'
import * as d3 from 'd3'
// import { simulation } from '@/features/graph/utils/force-directed'

const GraphContext: any = createContext({
  nodes: [],
  setNodes: (nodes: any) => {},
  edges: [],
  setEdges: (edges: any) => {},
  graph: [],
  createRootNodeEdges: (nodes: any) => {},
  addRootNodeChildren: (type: string) => {},
  initialNodes: [],
  store: null,
})
export type RootNodeKey =
  | 'events-root-node'
  | 'personnel-root-node'
  | 'testimonies-root-node'
  | 'topics-root-node'
export const GraphProvider = ({
  children,
  allEntityGraphData,
}: {
  children: React.ReactNode
  allEntityGraphData: any
}) => {
  const {
    getNodes,
    fitView,
    getEdges,
    addNodes,
    addEdges,
    getNode,
    screenToFlowPosition,
  } = useReactFlow()
  const store = useStoreApi()

  const { graph3d }: any = use3DGraph({ allEntityGraphData })
  const [nodes, setNodes]: any = useState<Node[]>([])
  const [edges, setEdges]: any = useState<Edge[]>([])
  const [graph, setGraph]: any = useState({})

  const [initialNodes, setInitialNodes]: any = useState()
  const [rootNodeState, setRootNodeState]: any = useState({
    'events-root-node': {
      lastIndex: 0,
    },
    'personnel-root-node': {
      lastIndex: 0,
    },
    'testimonies-root-node': {
      lastIndex: 0,
    },
    'topics-root-node': {
      lastIndex: 0,
    },
  })
  const childNodeBatchSize = 10
  console.log('graph: ', graph)

  const updateChildNodeBatchIndex = (type: RootNodeKey) => {
    setRootNodeState((rootNodeState: any) => ({
      ...rootNodeState,
      [type]: {
        lastIndex: rootNodeState[type].lastIndex + childNodeBatchSize,
      },
    }))
  }
  const createRootNode = useCallback((node: any, index: number) => {
    const { id, label, name, fill, data } = node
    const title = label || name
    const childCount = node?.childNodes ? node?.childNodes?.length : 0
    return {
      id,
      type: 'rootNode',
      position: ROOT_NODE_POSITIONS[data.type],

      data: {
        childCount,
        ...data,
        label: title,
        fill,
      },
    }
  }, [])

  const createRootNodeEdge = (rootNodeChildNode: any, source: any) => {
    const { id: target, data } = rootNodeChildNode
    const id = `${source}:${target}`

    return {
      id,
      source,
      target,
      animated: true,
      // type: 'entityEdge',
      sourceHandle: `handle:${id}`,
    }
  }

  const createRootNodeEdges = useCallback(
    (rootNodeChildNodes: Node[], source: any) => {
      const rootNodeEdges = rootNodeChildNodes.map((node) =>
        createRootNodeEdge(node, source)
      )
      return rootNodeEdges
    },
    []
  )

  //  Root Node Children --------------------------------------------------------------------------------------
  const createRootNodeChild = useCallback((node: any, index: any) => {
    const { id, label, name, fill, data } = node
    const title = label || name
    return {
      id,

      data: {
        ...data,
        label: title,
        fill,
        parentId: `${data.type}-root-node`,
      },
      type: 'entityNode',
    }
  }, [])

  const updateNodes = useCallback((newNodes: any) => {
    setNodes(newNodes)
  }, [])

  function dedupeArrayObjects(arr: any[], key: string): any[] {
    const unique = new Map(arr.map((item) => [item[key], item]))
    return Array.from(unique.values())
  }

  const addRootNodeChildren = useCallback(
    (type: any) => {
      const { nodes: incomingNodes } = graph[type]
      const total = incomingNodes.length
      const parentNodePosition = ROOT_NODE_POSITIONS[type]
      const parentWidth = ROOT_NODE_WIDTH

      const space = 100
      const totalArea = total * parentWidth + space * (total - 1)
      const xStartPos = parentNodePosition.x - totalArea / 2
      const yStartPos = parentNodePosition.y + parentWidth

      let y = yStartPos + 380

      const positionedNodes = incomingNodes.map((node: Node, index: any) => {
        return {
          ...node,
          position: {
            x: 0,
            y,
          },
        }
      })

      const source = `${type}-root-node`
      const incomingEdges = createRootNodeEdges(positionedNodes, source)

      addNodes(positionedNodes)
      addEdges(incomingEdges)
      return {
        nodes: positionedNodes,
      }
    },
    [addEdges, addNodes, createRootNodeEdges, graph] // runForceSimulation
  )
  type NodePosition = {
    position: {
      x: number
      y: number
    }
  }

  const assignPositionsToChildNodes = useCallback(
    (parentNode: NodePosition, childNodes: any[]): any[] => {
      let currentX = parentNode.position.x
      let currentY = parentNode.position.y + ROOT_DIMENSIONS.height + PADDING

      return childNodes.map((childNode) => {
        const positionedNode = {
          ...childNode,
          position: screenToFlowPosition({ x: currentX, y: currentY }),
        }

        currentX += CHILD_DIMENSIONS.width + PADDING
        if (currentX + CHILD_DIMENSIONS.width > parentNode.position.x + 500) {
          // Adjust this value if needed for different layouts
          currentX = parentNode.position.x
          currentY += CHILD_DIMENSIONS.height + PADDING
        }

        return positionedNode
      })
    },
    [screenToFlowPosition]
  )

  const getRootNodeChildren = useCallback(
    (type: any) => {
      const source: any = `${type}-root-node`
      console.log('source: ', source)
      const nodeState = rootNodeState[source]
      console.log('nodeState: ', nodeState)
      const { lastIndex } = nodeState
      // #TODO - add handling for if batch size is greater than remaining child nodes
      const childNodes = graph[type].nodes.slice(
        lastIndex,
        lastIndex + childNodeBatchSize
      )
      console.log('childNodes: ', childNodes)
      console.log('childNodes length ', childNodes.length)

      const parentNodePosition = ROOT_NODE_POSITIONS[type]
      const parentNode = {
        position: {
          ...parentNodePosition,
        },
      }

      const positionedNodes = assignPositionsToChildNodes(
        parentNode,
        childNodes
      )
      console.log('positionedNodes: ', positionedNodes)

      const incomingEdges = createRootNodeEdges(positionedNodes, source)
      updateChildNodeBatchIndex(source)
      const rootNode: any = getNode(source)
      const initialRootNodes = [
        ...getNodes().filter((node) => node.id !== rootNode.id),
        {
          ...rootNode,
          data: {
            ...rootNode.data,
            handles: incomingEdges.map((edge) => edge.sourceHandle),
          },
        },
      ]
      setNodes((nds: any) => [...initialRootNodes, ...positionedNodes])
      setEdges(incomingEdges)
      return {
        childNodes,
        edges: incomingEdges,
      }
    },
    [
      assignPositionsToChildNodes,
      createRootNodeEdges,
      getNode,
      getNodes,
      graph,
      rootNodeState,
    ] // runForceSimulation
  )

  //  Graph State Functions --------------------------------------------------------------------------------------

  const onNodesChange: OnNodesChange = useCallback(
    (chs) => {
      setNodes((nds: Node[]) => applyNodeChanges(chs, nds))
    },
    [setNodes]
  )

  const onEdgesChange: OnEdgesChange = useCallback((chs) => {
    setEdges((eds: Edge[]) => applyEdgeChanges(chs, eds))
  }, [])

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds: any) => addEdge(params, eds)),
    []
  )

  //  useEffects --------------------------------------------------------------------------------------
  useEffect(() => {
    const formattedGraphNodesObject: any = {}

    for (let key in graph3d) {
      // @ts-ignore
      const graphModel = graph3d[key]

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

    setGraph(formattedGraphNodesObject)

    const IN = graph3d.root.nodes.map(createRootNode)
    setNodes(IN)
    setInitialNodes(IN)
    setEdges([])
  }, [createRootNode, createRootNodeChild, graph3d])

  return (
    <GraphContext.Provider
      value={{
        nodes,
        addRootNodeChildren,
        updateNodes,
        edges,
        setEdges,
        graph,
        createRootNodeEdges,
        getRootNodeChildren,
        onNodesChange,
        onEdgesChange,
        onConnect,
        getNodes,
        fitView,
        setNodes,
        getEdges,
        initialNodes,
        store,
      }}
    >
      {children}
    </GraphContext.Provider>
  )
}

export const useGraph: any = () => {
  const context = useContext(GraphContext)

  if (!context) {
    throw new Error('useGraph must be used within a UfologyProvider')
  }
  return context
}