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
import { nextTick } from '@/utils/functions'
import { DOMAIN_MODEL_COLORS } from '@/utils'
// import { simulation } from '@/features/mindmap/utils/force-directed'

const MindMapContext: any = createContext({
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

export const MindMapProvider = ({
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
    setViewport,
    zoomIn,
    updateNode,
    zoomOut,
    updateNodeData,
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
    const type = source.split('-')[0]
    const types = [
      'personnel',
      'events',
      'topics',
      'testimonies',
      'organizations',
    ]
    const edgeType = types.includes(type) ? 'rootEdge' : 'siblingEdge'
    return {
      id,
      source,
      target,
      animated: true,
      style: {
        stroke: DOMAIN_MODEL_COLORS[type],
      },
      type: edgeType,
      data: {
        label: data.label || type,
      },
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
      type: `${data.type}Node`,
      style: {
        // height: 320,
        width: 350,
      },
      // type: 'entityNode',
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
  // #TODO: Refactor this function to incorporate the childNodeDirection logic
  /*
    const assignPositionsToChildNodes = useCallback(
  (parentNode: NodePosition, childNodes: any[]): any[] => {
    let currentX = parentNode.position.x
    let currentY = parentNode.position.y
    const positions = [];

    childNodes.forEach((childNode, index) => {
      let positionedNode = { ...childNode };

      switch (parentNode.childNodeDirection) {
        case 'left':
          currentX -= (CHILD_DIMENSIONS.width + PADDING);
          positionedNode.position = screenToFlowPosition({ x: currentX, y: currentY });
          break;
        case 'right':
          currentX += (CHILD_DIMENSIONS.width + PADDING);
          positionedNode.position = screenToFlowPosition({ x: currentX, y: currentY });
          break;
        case 'above':
          currentY -= (CHILD_DIMENSIONS.height + PADDING);
          positionedNode.position = screenToFlowPosition({ x: currentX, y: currentY });
          break;
        case 'below':
          currentY += (CHILD_DIMENSIONS.height + PADDING);
          positionedNode.position = screenToFlowPosition({ x: currentX, y: currentY });
          break;
        default:
          // Default behavior if direction is not specified
          currentY += (CHILD_DIMENSIONS.height + PADDING);
          positionedNode.position = screenToFlowPosition({ x: currentX, y: currentY });
          break;
      }

      positions.push(positionedNode);
    });

    return positions;
  },
  [screenToFlowPosition]
);
    */

  const assignPositionsToChildNodes = useCallback(
    (parentNode: any, childNodes: any[]): any[] => {
      let currentX = parentNode.position.x
      let currentY = parentNode.position.y + ROOT_DIMENSIONS.height + PADDING
      // const { childNodeDirection } = parentNode
      return childNodes.map((childNode) => {
        const positionedNode = {
          ...childNode,

          position: screenToFlowPosition({ x: currentX, y: currentY }),
        }

        // switch (childNodeDirection) {
        //   case 'left':
        //     currentX -= CHILD_DIMENSIONS.width + PADDING
        //     positionedNode.position = screenToFlowPosition({
        //       x: currentX,
        //       y: currentY,
        //     })
        //     break
        //   case 'right':
        //     currentX += CHILD_DIMENSIONS.width + PADDING
        //     positionedNode.position = screenToFlowPosition({
        //       x: currentX,
        //       y: currentY,
        //     })
        //     break
        //   case 'above':
        //     currentY -= CHILD_DIMENSIONS.height + PADDING
        //     positionedNode.position = screenToFlowPosition({
        //       x: currentX,
        //       y: currentY,
        //     })
        //     break
        //   case 'below':
        //     currentY += CHILD_DIMENSIONS.height + PADDING
        //     positionedNode.position = screenToFlowPosition({
        //       x: currentX,
        //       y: currentY,
        //     })
        //     break
        //   default:
        //     // Default behavior if direction is not specified
        //     currentY += CHILD_DIMENSIONS.height + PADDING
        //     positionedNode.position = screenToFlowPosition({
        //       x: currentX,
        //       y: currentY,
        //     })
        //     break
        // }

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

      const nodeState = rootNodeState[source]
      console.log('nodeState: ', nodeState)

      const { lastIndex } = nodeState
      // #TODO - add handling for if batch size is greater than remaining child nodes
      const childNodes = graph[type].nodes.slice(
        lastIndex,
        lastIndex + childNodeBatchSize
      )

      const { x, y, childNodeDirection } = ROOT_NODE_POSITIONS[type]
      const parentNode = {
        position: {
          x,
          y,
        },
        childNodeDirection,
      }

      const positionedNodes = assignPositionsToChildNodes(
        parentNode,
        childNodes
      )

      const incomingEdges = createRootNodeEdges(positionedNodes, source)

      // Note: This is to update the root node that has been clicked with the respective amount of handles to support the edge linking
      const rootNode: any = getNode(source)
      const incomingHandles: any = incomingEdges.map(
        (edge) => edge.sourceHandle
      )
      // const restOfNodes = getNodes().filter(
      //   (node) => !initialNodes.includes(node)
      // )
      // We then need to replace/mutate the corresponding root node is the current state of the graph in order to have Reactflow update the node accordingly
      const initialRootNodes = [
        ...getNodes().filter((node: any) => node.id !== rootNode.id),
        {
          ...rootNode,
          data: {
            ...rootNode.data,
            handles: rootNode.data?.handles?.length
              ? [...rootNode.data.handles, ...incomingHandles]
              : incomingHandles,
          },
        },
      ]

      // So now we set the root nodes with the relevant root node having updated handles, then set the rest of the existing nodes, and then the newest positioned child nodes
      setNodes((nds: any) => [...initialRootNodes, ...positionedNodes])
      // const handleTransform = useCallback(() => {
      //   setViewport({ x: positionedNodes[positionedNodes?.length - 1].x, y: positionedNodes[positionedNodes?.length - 1].y, zoom: 1 }, { duration: 800 });
      // }, [setViewport]);

      setEdges((edges: any) => [...edges, ...incomingEdges])
      updateChildNodeBatchIndex(source)

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
  const addChildNodesFromSearch = useCallback(
    ({ type, searchResults }: any) => {
      const source: any = `${type}-root-node`

      const { x, y, childNodeDirection } = ROOT_NODE_POSITIONS[type]
      const parentNode = {
        position: {
          x,
          y,
        },
        childNodeDirection,
      }
      const childNodes = searchResults.map((result: any) => {
        let node = graph[type].nodes.find(
          (node: { id: any }) => node?.id === result.id
        )
        console.log('node: ', node)
        return node
      })

      const positionedChildNodes = assignPositionsToChildNodes(
        parentNode,
        childNodes
      )

      const incomingEdges = createRootNodeEdges(positionedChildNodes, source)

      // Note: This is to update the root node that has been clicked with the respective amount of handles to support the edge linking
      const rootNode: any = getNode(source)
      const incomingHandles: any = incomingEdges.map(
        (edge) => edge.sourceHandle
      )
      // const restOfNodes = getNodes().filter(
      //   (node) => !initialNodes.includes(node)
      // )
      // We then need to replace/mutate the corresponding root node is the current state of the graph in order to have Reactflow update the node accordingly
      const initialRootNodes = [
        ...getNodes().filter((node: any) => node.id !== rootNode.id),
        {
          ...rootNode,
          data: {
            ...rootNode.data,
            handles: rootNode.data?.handles?.length
              ? [...rootNode.data.handles, ...incomingHandles]
              : incomingHandles,
          },
        },
      ]

      // So now we set the root nodes with the relevant root node having updated handles, then set the rest of the existing nodes, and then the newest positioned child nodes
      setNodes((nds: any) => [...initialRootNodes, ...positionedChildNodes])
      // const handleTransform = useCallback(() => {
      //   setViewport({ x: positionedNodes[positionedNodes?.length - 1].x, y: positionedNodes[positionedNodes?.length - 1].y, zoom: 1 }, { duration: 800 });
      // }, [setViewport]);

      setEdges((edges: any) => [...edges, ...incomingEdges])

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

  const addConnectionNodesFromSearch = useCallback(
    ({ source, searchResults }: any) => {
      const siblingSourceNode: any = getNode(source.id)

      // !#TODO: Need to add logic to check if some connected records already have nodes on the graph and then add the new nodes to the existing nodes

      const incomingNodes: any = []
      const incomingRootEdges: any = []
      const incomingSiblingEdges: any = []
      const rootNodeIds: any = []
      const rootNodeMap: any = {}

      searchResults.forEach((result: any) => {
        const { type } = result
        const routeSource: any = `${type}-root-node`
        const rootNode: any = getNode(routeSource)
        const { x, y, childNodeDirection } = ROOT_NODE_POSITIONS[type]
        const parentNode = {
          position: {
            x,
            y,
          },
          childNodeDirection,
        }
        let node = graph[type].nodes.find(
          (node: { id: any }) => node?.id === result.id
        )

        const [positionedNode] = assignPositionsToChildNodes(parentNode, [node])

        const [siblingEdge] = createRootNodeEdges(
          [positionedNode],
          siblingSourceNode.id
        )

        const [rootEdge] = createRootNodeEdges([positionedNode], rootNode.id)

        incomingNodes.push(positionedNode)
        incomingSiblingEdges.push(siblingEdge)
        incomingRootEdges.push(rootEdge)
        rootNodeIds.push(rootNode.id)
        rootNodeMap[rootNode.id] = rootNode
      })

      const incomingSiblingHandles: any = incomingSiblingEdges.map(
        (edge: any) => edge.sourceHandle
      )
      const incomingRootHandles: any = incomingRootEdges.map(
        (edge: any) => edge.sourceHandle
      )

      // We then need to replace/mutate the corresponding root node is the current state of the graph in order to have Reactflow update the node accordingly
      const initialNodes = [
        ...getNodes().filter(
          (node: any) =>
            node.id !== siblingSourceNode.id && !rootNodeIds.includes(node.id)
        ),
        {
          ...siblingSourceNode,
          data: {
            ...siblingSourceNode.data,
            handles: siblingSourceNode.data?.handles?.length
              ? [...siblingSourceNode.data.handles, ...incomingSiblingHandles]
              : incomingSiblingHandles,
          },
        },
      ]
      rootNodeIds.forEach((id: any) => {
        const rootNodeTemp = {
          ...rootNodeMap[id],
          data: {
            ...rootNodeMap[id].data,
            handles: rootNodeMap[id].data?.handles?.length
              ? [...rootNodeMap[id].data.handles, ...incomingRootHandles]
              : incomingRootHandles,
          },
        }
        initialNodes.push(rootNodeTemp)
      })

      // So now we set the root nodes with the relevant root node having updated handles, then set the rest of the existing nodes, and then the newest positioned child nodes
      setNodes((nds: any) => [...initialNodes, ...incomingNodes])

      setEdges((edges: any) => [
        ...edges,
        ...incomingRootEdges,
        ...incomingSiblingEdges,
      ])

      return {
        siblingNodes: incomingNodes,
        edges: incomingSiblingEdges,
      }
    },
    [assignPositionsToChildNodes, createRootNodeEdges, getNode, getNodes, graph] // runForceSimulation
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

  const adjustViewport = useCallback(
    ({ x, y, zoom = 0, duration = 800 }: any) => {
      setViewport({ x, y, zoom }, { duration })
    },
    [setViewport]
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

  const [keepLoadedOnMap, setKeepLoadedOnMap] = useState(false)
  const toggleKeepLoaded = useCallback(
    () => setKeepLoadedOnMap((keepLoadedOnMap) => !keepLoadedOnMap),
    []
  )

  const findConnections = useCallback(
    (node: any) => {
      const { id } = node
      const { links } = allEntityGraphData
      const currentNodes = getNodes()
      const nodeLinks = links
        .filter((link: any) => link.target === id || link.source === id)
        .map((link: any) => {
          if (link.target === id) {
            return link.source
          }
          if (link.source === id) {
            return link.target
          }
        })
      console.log('nodeLinks: ', nodeLinks)
      const connections = currentNodes.filter((nodeOnMap: any) =>
        nodeLinks.includes(nodeOnMap.id)
      )
      const handles = connections.map((connection: any) =>
        createRootNodeEdge(node, connection)
      )
      console.log('connections: ', connections)
      console.log('handles: ', handles)
      updateNodeData(node.id, { ...node.data, handles })
      addEdges(handles)
      return connections
    },
    [addEdges, allEntityGraphData, getNodes, updateNodeData]
  )

  const [showLocationVisualization, setShowLocationVisualization] =
    useState(false)

  const closeLocationVisualization = useCallback(() => {
    setShowLocationVisualization(false)
  }, [])
  const toggleLocationVisualization = useCallback(
    () =>
      setShowLocationVisualization(
        (showLocationVisualization) => !showLocationVisualization
      ),
    []
  )

  const [activeNode, setActiveNode] = useState(null)
  const updateActiveNode = (node: any) => {
    setActiveNode(node)
  }

  const [locationsToVisualize, setLocationsToVisualize]: any = useState([])

  const addLocationsToVisualize = useCallback((locations: any[]) => {
    setLocationsToVisualize((locationsToVisualize: any[]) => [
      ...locationsToVisualize,
      ...locations,
    ])
  }, [])

  const onNodeClick: any = useCallback(
    (node: any) => {
      // const { target } = event
      const {
        data: { type },
      } = node

      const { childNodes } = getRootNodeChildren(node?.data.type)
      const childNode = childNodes[childNodes.length - 1]
      console.log('childNode: ', childNode)

      if (type === 'events') {
        addLocationsToVisualize(childNodes)
      }

      nextTick(10).then(() => {
        zoomOut({
          // @ts-ignore
          zoom: 0,
          duration: 500,
        })
      })
      // // Ignore any other clicks to the node that are not the load button
      // if (target.classList.contains('load-records-button')) {

      // } else {
      //   updateActiveNode(node)
      // }
    },
    [addLocationsToVisualize, getRootNodeChildren, zoomOut]
  )

  return (
    <MindMapContext.Provider
      value={{
        nodes,
        addRootNodeChildren,
        addNodes,
        assignPositionsToChildNodes,
        addEdges,
        updateNodes,
        edges,
        setEdges,
        graph,
        createRootNodeEdges,
        getRootNodeChildren,
        addConnectionNodesFromSearch,
        onNodesChange,
        onEdgesChange,
        onConnect,
        getNodes,
        fitView,
        setNodes,
        getEdges,
        initialNodes,
        store,
        updateNode,
        getNode,
        adjustViewport,
        zoomIn,
        zoomOut,
        addChildNodesFromSearch,
        keepLoadedOnMap,
        toggleKeepLoaded,
        addLocationsToVisualize,
        showLocationVisualization,
        toggleLocationVisualization,
        locationsToVisualize,
        closeLocationVisualization,
        findConnections,
        activeNode,
        updateActiveNode,
        onNodeClick,
      }}
    >
      {children}
    </MindMapContext.Provider>
  )
}

export const useMindMap: any = () => {
  const context = useContext(MindMapContext)

  if (!context) {
    throw new Error('useGraph must be used within a UfologyProvider')
  }
  return context
}