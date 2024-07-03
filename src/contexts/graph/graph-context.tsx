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
  NODE_SPACE,
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
  flowGraph: [],
  createRootNodeEdges: (nodes: any) => {},
  addRootNodeChildren: (type: string) => {},
  store: null,
})

function ViewportChangeLogger() {
  useOnViewportChange({
    onStart: (viewport: Viewport) => console.log('start', viewport),
    onChange: (viewport: Viewport) => console.log('change', viewport),
    onEnd: (viewport: Viewport) => console.log('end', viewport),
  })

  return null
}

export const GraphContextProvider = ({
  children,
  allEntityGraphData,
}: {
  children: React.ReactNode
  allEntityGraphData: any
}) => {
  const { getNodes, fitView, getEdges, addNodes, addEdges, getNode } =
    useReactFlow()
  const store = useStoreApi()

  const { graph }: any = use3DGraph({ allEntityGraphData })
  const [nodes, setNodes]: any = useState<Node[]>([])
  const [edges, setEdges]: any = useState<Edge[]>([])
  const [flowGraph, setFlowGraph]: any = useState({})

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

    return {
      position: {
        x: parentNodePosition.x,
        y: parentNodePosition.y + ROOT_NODE_WIDTH,
      },
    }
  }

  //  Root Node Children --------------------------------------------------------------------------------------
  const createRootNodeChild = useCallback((node: any) => {
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

  const updateNodes = useCallback((newNodes: any) => {
    setNodes(newNodes)
  }, [])

  function dedupeArrayObjects(arr: any[], key: string): any[] {
    const unique = new Map(arr.map((item) => [item[key], item]))
    return Array.from(unique.values())
  }

  /* 

- https://github.com/JanDez/D3_Reactflow/blob/main/src/hooks/useReactCanvasData.ts
- https://github.com/idootop/reactflow-auto-layout/blob/main/src/layout/useAutoLayout.ts

*/
  const addRootNodeChildren = useCallback(
    (type: any) => {
      const { nodes: incomingNodes } = flowGraph[type]

      const notHidden = incomingNodes.map((node: Node) => ({
        ...node,
        hidden: false,
      }))

      const incomingEdges = createRootNodeEdges(notHidden)

      addNodes(notHidden)
      addEdges(incomingEdges)
    },
    [addEdges, addNodes, createRootNodeEdges, flowGraph] // runForceSimulation
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
        store,
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
