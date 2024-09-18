'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react'
import { use3DGraph, type UseGraphProps } from '@/hooks/use3dGraph'

import {
  type Node,
  type Edge,
  useReactFlow,
  useStore,
  getNodesBounds,
  getStraightPath,
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
  useNodes,
  type Viewport,
  useStoreApi,
  MarkerType,
  useHandleConnections,
  Position,
  useUpdateNodeInternals,
  useNodesData,
  getOutgoers,
  useInternalNode,
} from '@xyflow/react'

import { capitalize, nextTick, wait } from '@/utils/functions'
import { DOMAIN_MODEL_COLORS } from '@/utils'
import {
  CHILD_DIMENSIONS,
  GROUP_NODE_DIMENSIONS,
  PADDING,
  ROOT_DIMENSIONS,
  ROOT_NODE_IDS,
  ROOT_NODE_POSITIONS,
} from '@/features/mindmap/config/index.config'
import { useStateOfDisclosure } from '@/providers/state-of-disclosure-provider'
import { forceSimulation } from 'd3-force'
import { forceLink, forceManyBody, forceCenter, forceCollide } from 'd3-force'

// import { simulation } from '@/features/mindmap/utils/force-directed'

const MindMapContext: any = createContext({
  nodes: [],
  setNodes: (nodes: any) => {},
  edges: [],
  setEdges: (edges: any) => {},
  graph: [],
  createRootNodeEdges: (nodes: any) => {},
  // addRootNodeChildren: (type: string) => {},
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
}: {
  children: React.ReactNode
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
    getIntersectingNodes,
    isNodeIntersecting,
  } = useReactFlow()

  const { mindMapIntialGraphState } = useStateOfDisclosure()

  const store = useStoreApi()

  const { graph3d }: any = use3DGraph({ mindMapIntialGraphState })
  const [nodes, setNodes]: any = useState<Node[]>([])
  const [edges, setEdges]: any = useState<Edge[]>([])
  const [graph, setGraph]: any = useState({})
  // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)

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
    'organizations-root-node': {
      lastIndex: 0,
    },
  })
  const [mindMapInstance, setMindMapInstance]: any = useState(null)
  const [conciseViewActive, setConciseViewActive]: any = useState(true)

  const toggleConciseView = () =>
    setConciseViewActive((conciseViewActive: any) => !conciseViewActive)
  const turnOffConciseView = () => setConciseViewActive(false)
  const turnOnConciseView = () => setConciseViewActive(true)

  const updateMindMapInstance = (instance: any) => setMindMapInstance(instance)

  const flowKey = `mindmap-cache`
  const saveMindMap = useCallback(() => {
    if (mindMapInstance) {
      const flow = mindMapInstance.toObject()
      localStorage.setItem(flowKey, JSON.stringify(flow))
    }
  }, [flowKey, mindMapInstance])

  const restore = useCallback(() => {
    const restoreFlow = async () => {
      // @ts-ignore
      const flow = JSON.parse(localStorage.getItem(flowKey)) || null

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport
        setNodes(flow.nodes || [])
        setEdges(flow.edges || [])
        setViewport({ x, y, zoom })
      }
    }

    restoreFlow()
  }, [flowKey, setViewport])

  const childNodeBatchSize = 3

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

  const updateChildNodeBatchIndex = useCallback((type: RootNodeKey) => {
    // if (rootNodeState[type]) {
    //   const { lastIndex } = rootNodeState[type]
    //   const newIndex = lastIndex + childNodeBatchSize
    // }
    setRootNodeState((rootNodeState: any) => ({
      ...rootNodeState,
      [type]: {
        lastIndex: rootNodeState[type].lastIndex + childNodeBatchSize,
      },
    }))
  }, [])

  const detectNodeOverlap = (node: { id: string }) => {
    const source: any = getNode(node.id)
    const intersections = getIntersectingNodes(source)
    console.log('intersections: ', intersections)

    intersections.forEach((intersection: any) => {
      const { id: nodeId } = intersection.target
      const node = getNode(nodeId)

      if (node) {
        const { position } = node
        const newPosition = { ...position }

        // Adjust the position of the node to avoid overlap
        newPosition.x += CHILD_DIMENSIONS.width + PADDING
        newPosition.y += CHILD_DIMENSIONS.height + PADDING

        // Check if the new position overlaps with any other node
        let newIntersections: any = getIntersectingNodes({
          ...node,
          position: newPosition,
        })

        // Keep adjusting the position until there are no more overlaps
        while (newIntersections.length > 0) {
          newPosition.x += CHILD_DIMENSIONS.width + PADDING
          newPosition.y += CHILD_DIMENSIONS.height + PADDING

          newIntersections = getIntersectingNodes({
            ...node,
            position: newPosition,
          })
        }

        // Update the position of the node in the updatedNodes array
        const updatedNode = {
          ...node,
          position: newPosition,
        }

        // const nodeIndex = updatedNodes.findIndex((n) => n.id === nodeId)
        // updatedNodes[nodeIndex] = updatedNode
      }
    })
    return intersections
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

  const createSiblingEdge = useCallback((sourceNode: any, targetNode: any) => {
    const id = `${sourceNode.id}:${targetNode.id}`

    const edgeType = 'siblingEdge'

    // const connectionLabel = `${rootNodeChildNode.data.name}::${sourceNode?.data.name}`
    // console.log('connectionLabel: ', connectionLabel)
    return {
      id,
      source: sourceNode.id,
      target: targetNode.id,
      animated: true,

      type: edgeType,
      markerEnd: 'custom-marker',
      style: {
        stroke: '#fff',
        // zIndex: 20,
      },

      // type: 'entityEdge',
      sourceHandle: `handle:${id}`,
    }
  }, [])

  const createRootNodeEdge = useCallback(
    (rootNodeChildNode: any, source: any) => {
      console.log('rootNodeChildNode: ', rootNodeChildNode)
      console.log('source: ', source)
      const isObject = typeof source === 'object'
      console.log('isObject: ', isObject)
      const isString = typeof source === 'string'
      console.log('isString: ', isString)
      const sourceNode: any = isString
        ? getNode(source)
        : isObject
          ? source
          : getNode(source.id)
      const sourceId = sourceNode.id
      console.log('sourceNode: ', sourceNode)
      // console.log('sourceNode: ', sourceNode)

      const { id: target, data } = rootNodeChildNode
      // console.log('target: ', target)
      // const firstNodeType = rootNodeChildNode?.data?.type
      // const sourceType: any = sourceNode?.data?.type || source.split('-')[0]
      // console.log('sourceType: ', sourceType)

      const id = `${sourceId}:${target}`
      // console.log('id: ', id)
      // console.log('id: ', id)
      // const sourceIsRootNode = source.includes('root')

      const edgeType = 'siblingEdge'
      // sourceIsRootNode || firstNodeType.includes('root')
      //   ? 'rootEdge'
      //   : 'siblingEdge'
      // console.log('edgeType: ', edgeType)
      const connectionLabel = `${rootNodeChildNode.data?.label || rootNodeChildNode.data?.name}::${source?.data?.name || source?.data?.label}`

      return {
        id,
        source: sourceId,
        target,
        animated: true,

        type: edgeType,
        markerEnd: 'custom-marker',
        style: {
          stroke: DOMAIN_MODEL_COLORS[sourceNode?.data?.type],
          // zIndex: 2,
        },
        label: connectionLabel || null,
        // type: 'entityEdge',
        sourceHandle: `handle:${id}`,
      }
    },
    [getNode]
  )

  const createRootNodeEdges = useCallback(
    (rootNodeChildNodes: Node[], source: any) => {
      const rootNodeEdges = rootNodeChildNodes.map((node) =>
        createRootNodeEdge(node, source)
      )
      return rootNodeEdges
    },
    [createRootNodeEdge]
  )

  //  Root Node Children --------------------------------------------------------------------------------------

  const assignPositionsToChildNodes = useCallback(
    (parentNode: any, childNodes: any[]): any[] => {
      const existingChildren = parentNode?.data?.children
      const bounds = existingChildren ? getNodesBounds(existingChildren) : null

      console.log('bounds: ', bounds)
      const rectX = bounds ? bounds.x : parentNode.position.x
      const rectY = bounds ? bounds.y : parentNode.position.y
      // for (let i = 0; i < 8; i++) {
      //   const degrees = i * (360 / 8);
      //   const radians = degrees * (Math.PI / 180);
      //   const x = 250 * Math.cos(radians) + center.x;
      //   const y = 250 * Math.sin(radians) + center.y;

      // console.log('bounds: ', bounds)
      let currentX = rectX + ROOT_DIMENSIONS.width + PADDING
      let currentY = rectY + ROOT_DIMENSIONS.height + PADDING
      // const { childNodeDirection } = parentNode
      const newKids = childNodes.map((childNode) => {
        currentX += CHILD_DIMENSIONS.width + PADDING
        if (currentX + CHILD_DIMENSIONS.width > rectX + 500) {
          // Adjust this value if needed for different layouts
          currentX = rectX
          currentY += CHILD_DIMENSIONS.height + PADDING
        }
        const positionedNode = {
          ...childNode,

          position: { x: currentX, y: currentY },
        }

        return positionedNode
      })
      return newKids
    },
    []
  )

  const createRootNodeChild = useCallback((node: any, index: any) => {
    const { id, label, name, fill, data } = node
    const title = label || name
    return {
      id,

      data: {
        ...data,
        label: title,
        fill,
      },
      type: `${data.type}Node`,
      style: {
        // height: 320,
      },
      initialWidth: 350,
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

  const assignNodePositions = useCallback(
    (childNodes: any[]) => {
      // Get the bounds of all existing nodes
      const allNodes = getNodes()
      const existingBounds = getNodesBounds(allNodes)
      console.log('existingBounds:', existingBounds)

      // Decide starting position based on existing bounds
      const startX = existingBounds.x + existingBounds.width + PADDING
      const startY = existingBounds.y

      let currentX = startX
      let currentY = startY

      const newKids = childNodes.map((childNode: any) => {
        const positionedNode = {
          ...childNode,
          position: { x: currentX, y: currentY },
        }

        // Update currentX and currentY for the next node
        currentX += CHILD_DIMENSIONS.width + PADDING
        if (currentX + CHILD_DIMENSIONS.width > startX + MAX_WIDTH) {
          // Adjust MAX_WIDTH as needed
          currentX = startX
          currentY += CHILD_DIMENSIONS.height + PADDING
        }
        return positionedNode
      })
      return newKids
    },
    [getNodes]
  )

  const createSearchResultsLayout = useCallback(
    ({ originNode, searchResults }: any) => {
      const searchResultNodes: any = []
      const searchResultEdges: any = []
      searchResults.forEach((result: any, i: any) => {
        const { type } = result

        let node = graph[type].nodes.find(
          (node: { id: any }) => node?.id === result.id
        )

        const degrees = i * (360 / 8)
        const radians = degrees * (Math.PI / 180)
        const x = 250 * Math.cos(radians) + originNode.position.x
        const y = 250 * Math.sin(radians) + originNode.position.y
        const searchResultNode = {
          ...node,
          position: {
            x,
            y,
          },
        }
        const siblingEdge = createSiblingEdge(originNode, searchResultNode)
        console.log('siblingEdge: ', siblingEdge)
        // const [positionedNode] = assignPositionsToChildNodes(parentNode, [node])
        searchResultNodes.push(searchResultNode)
        searchResultEdges.push(siblingEdge)
      })

      const searchResultHandles: any = searchResultEdges.map(
        (edge: any) => edge.sourceHandle
      )
      updateNodeData(originNode.id, {
        handles: originNode.data.handles
          ? [...originNode.data.handles, ...searchResultHandles]
          : searchResultHandles,
      })
      // We then need to replace/mutate the corresponding root node is the current state of the graph in order to have Reactflow update the node accordingly

      // So now we set the root nodes with the relevant root node having updated handles, then set the rest of the existing nodes, and then the newest positioned child nodes
      addNodes(searchResultNodes)

      addEdges(searchResultEdges)

      return { searchResultNodes, searchResultEdges }
    },
    [addEdges, addNodes, createSiblingEdge, graph, updateNodeData]
  )

  type NodePosition = {
    position: {
      x: number
      y: number
    }
  }

  // const addConnectionNodesFromSearch = useCallback(
  //   ({ source, searchResults }: any) => {
  //     const siblingSourceNode: any = getNode(source.id)

  //     // !#TODO: Need to add logic to check if some connected records already have nodes on the graph and then add the new nodes to the existing nodes

  //     const incomingNodes: any = []
  //     const incomingRootEdges: any = []
  //     const incomingSiblingEdges: any = []
  //     const rootNodeIds: any = []
  //     const rootNodeMap: any = {}

  //     searchResults.forEach((result: any, i: any) => {
  //       const { type } = result
  //       const routeSource: any = `${type}-root-node`
  //       const rootNode: any = getNode(routeSource)
  //       // Should not be position search results relative to their entity type but instead
  //       // to the source node that triggered the search
  //       // const { x, y, childNodeDirection } = ROOT_NODE_POSITIONS[type]
  //       // const parentNode = {
  //       //   id: routeSource,
  //       //   position: rootNode.position || {
  //       //     x,
  //       //     y,
  //       //   },
  //       //   childNodeDirection,
  //       // }
  //       let node = graph[type].nodes.find(
  //         (node: { id: any }) => node?.id === result.id
  //       )

  //       const degrees = i * (360 / 8)
  //       const radians = degrees * (Math.PI / 180)
  //       const x = 250 * Math.cos(radians) + siblingSourceNode.position.x
  //       const y = 250 * Math.sin(radians) + siblingSourceNode.position.y
  //       const positionedNode = {
  //         ...node,
  //         position: {
  //           x,
  //           y,
  //         },
  //       }
  //       // const [positionedNode] = assignPositionsToChildNodes(parentNode, [node])

  //       const [siblingEdge] = createRootNodeEdges(
  //         [positionedNode],
  //         siblingSourceNode.id
  //       )

  //       // const [rootEdge] = createRootNodeEdges([positionedNode], rootNode.id)

  //       incomingNodes.push(positionedNode)
  //       incomingSiblingEdges.push(siblingEdge)
  //       // incomingRootEdges.push(rootEdge)
  //       // rootNodeIds.push(rootNode.id)
  //       // rootNodeMap[rootNode.id] = rootNode
  //     })

  //     const incomingSiblingHandles: any = incomingSiblingEdges.map(
  //       (edge: any) => edge.sourceHandle
  //     )
  //     // const incomingRootHandles: any = incomingRootEdges.map(
  //     //   (edge: any) => edge.sourceHandle
  //     // )

  //     // We then need to replace/mutate the corresponding root node is the current state of the graph in order to have Reactflow update the node accordingly
  //     // const initialNodes = [
  //     //   ...getNodes().filter(
  //     //     (node: any) =>
  //     //       node.id !== siblingSourceNode.id && !rootNodeIds.includes(node.id)
  //     //   ),
  //     //   {
  //     //     ...siblingSourceNode,
  //     //     data: {
  //     //       ...siblingSourceNode.data,
  //     //       handles: siblingSourceNode.data?.handles?.length
  //     //         ? [...siblingSourceNode.data.handles, ...incomingSiblingHandles]
  //     //         : incomingSiblingHandles,
  //     //     },
  //     //   },
  //     // ]
  // const existingNodes = [
  //   ...getNodes().filter((node: any) => node.id !== siblingSourceNode.id),
  //   {
  //     ...siblingSourceNode,
  //     data: {
  //       ...siblingSourceNode.data,
  //       handles: siblingSourceNode.data?.handles?.length
  //         ? [...siblingSourceNode.data.handles, ...incomingSiblingHandles]
  //         : incomingSiblingHandles,
  //     },
  //   },
  // ]

  //     // rootNodeIds.forEach((id: any) => {
  //     //   const rootNodeTemp = {
  //     //     ...rootNodeMap[id],
  //     //     data: {
  //     //       ...rootNodeMap[id].data,
  //     //       handles: rootNodeMap[id].data?.handles?.length
  //     //         ? [...rootNodeMap[id].data.handles, ...incomingRootHandles]
  //     //         : incomingRootHandles,
  //     //     },
  //     //   }
  //     //   initialNodes.push(rootNodeTemp)
  //     // })

  //     // So now we set the root nodes with the relevant root node having updated handles, then set the rest of the existing nodes, and then the newest positioned child nodes
  // setNodes((nds: any) => [...existingNodes, ...incomingNodes])

  // setEdges((edges: any) => [
  //   ...edges,
  //   // ...incomingRootEdges,
  //   ...incomingSiblingEdges,
  // ])

  //     return {
  //       siblingNodes: incomingNodes,
  //       edges: incomingSiblingEdges,
  //     }
  //   },
  //   [createRootNodeEdges, getNode, getNodes, graph] // runForceSimulation
  // )

  const addConnectionNodesFromSearch = useCallback(
    ({ source, searchResults }: any) => {
      const siblingSourceNode: any = getNode(source.id)

      const incomingNodes: any = []
      const incomingEdges: any = []
      const existingNodes = [
        ...getNodes().filter((node: any) => node.id !== siblingSourceNode.id),
      ]
      const nodeRadius = 50 // Radius of the node (adjust as needed)
      const circleRadius = 250 // Radius of the circle around the source node

      searchResults.forEach((result: { id?: any; type?: any }, i: number) => {
        const { type } = result

        let node = graph[type].nodes.find(
          (node: { id: any }) => node?.id === result.id
        )

        // Calculate initial angle
        const totalNodes = searchResults.length
        const angleIncrement = (2 * Math.PI) / totalNodes
        let angle = i * angleIncrement

        // Initialize position
        let x: number = 0
        let y: number = 0 // Initialize y with a default value
        let positionFound = false
        let attempts = 0
        const maxAttempts = 10 // To prevent infinite loops

        while (!positionFound && attempts < maxAttempts) {
          // Calculate position around the circle
          x = circleRadius * Math.cos(angle) + siblingSourceNode.position.x
          y = circleRadius * Math.sin(angle) + siblingSourceNode.position.y

          // Check for overlap
          const overlaps = existingNodes.some((existingNode) => {
            const dx = existingNode.position.x - x
            const dy = existingNode.position.y - y
            const distance = Math.sqrt(dx * dx + dy * dy)
            return distance < nodeRadius * 2 // Adjust if nodes are larger
          })

          if (!overlaps) {
            positionFound = true
          } else {
            // Adjust angle to try a new position
            angle += angleIncrement / 2
            attempts++
          }
        }

        const positionedNode = {
          ...node,
          position: {
            x: x,
            y: y,
          },
        }

        // const edge = createRootNodeEdge(siblingSourceNode, positionedNode)
        const [siblingEdge] = createRootNodeEdges(
          [positionedNode],
          siblingSourceNode.id
        )
        console.log('siblingEdge: ', siblingEdge)

        incomingNodes.push(positionedNode)
        incomingEdges.push(siblingEdge)

        // Add the new node to existingNodes for future overlap checks
      })

      const incomingSiblingHandles: any = incomingEdges.map(
        (edge: any) => edge.sourceHandle
      )

      existingNodes.push({
        ...siblingSourceNode,
        data: {
          ...siblingSourceNode.data,
          handles: siblingSourceNode.data?.handles?.length
            ? [...siblingSourceNode.data.handles, ...incomingSiblingHandles]
            : incomingSiblingHandles,
        },
      })

      setNodes((nds: any) => [...existingNodes, ...incomingNodes])

      setEdges((edges: any) => [...edges, ...incomingEdges])

      return {
        siblingNodes: incomingNodes,
        edges: incomingEdges,
      }
    },
    [createRootNodeEdges, getNode, getNodes, graph]
  )

  const animateRootNodeConcision = useMemo(
    () =>
      ({
        targetX,

        childlessRootNodes,
      }: any) => {
        const animations = childlessRootNodes.map((rootNode: any) => {
          console.log('rootNode: ', rootNode)
          const selector = `.react-flow__node[data-id="${rootNode.id}"]`
          const domNode: any = document.querySelector(selector)
          console.log('domNode: ', domNode)

          const [path, labelX, labelY, offsetX, offsetY, ...restOfPath] =
            getStraightPath({
              sourceX: rootNode.position.x,
              sourceY: rootNode.position.y,
              targetX: targetX,
              targetY: 0,
            })
          console.log('labelX: ', labelX)
          console.log('restOfPath: ', restOfPath)
          console.log('offsetX: ', offsetX)
          console.log('path: ', path)

          domNode.style.offsetPath = `path('${path}')`
          domNode.style.offsetRotate = '0deg'

          const keyframes = [
            { offsetDistance: '0%' },
            { offsetDistance: '100%' },
          ]

          const animation: any = {
            duration: 2000,
            easing: 'ease-in-out',
            iterations: 1,
          }

          return {
            id: rootNode.id,
            domNode,
            keyframes,
            animation,
          }
        })

        const start = () => {
          animations.forEach((animation: any) => {
            const anim = animation.domNode.animate(
              animation.keyframes,
              animation.animation
            )
            // anim.stop()
          })
        }

        return { start, animations }
      },
    []
  )
  const renderRootNodeConciseLayout = useMemo(
    () => (childlessRootNodes: any[]) => {
      const firstChildlessNode = childlessRootNodes[0]
      console.log('firstChildlessNode: ', firstChildlessNode)

      const {
        position: { x },
      } = firstChildlessNode

      const targetX = x || 0
      console.log('targetX: ', targetX)
      const targetY = 0

      const positionedChildlessNodes = childlessRootNodes.map(
        (childlessRootNode, i) => ({
          ...childlessRootNode,
          // zIndex: i + 1,
        })
      )

      const sequence = animateRootNodeConcision({
        targetX,
        targetY,
        childlessRootNodes,
      })

      return {
        positionedChildlessNodes,
        sequence,
      }
    },
    [animateRootNodeConcision]
  )

  const createGroupNodeLayoutWithoutRootNode = useCallback(
    ({ groupId, childNodes }: any) => {
      const initialConfig = {
        id: groupId,
        type: 'entityGroupNode',
        initialHeight: GROUP_NODE_DIMENSIONS.height,
        initialWidth: GROUP_NODE_DIMENSIONS.width,
        // zIndex: 1,
        style: {
          width: `${GROUP_NODE_DIMENSIONS.width}px`,
          height: `${GROUP_NODE_DIMENSIONS.height}px`,
        },
        data: {
          label: groupId,
          name: groupId,
          type: 'group',
        },
      }

      const allNodes = getNodes()
      const bounds = getNodesBounds(allNodes)

      // Decide position of the group node based on existing bounds
      const groupNodePosition = {
        x: bounds.x + bounds.width + PADDING,
        y: bounds.y,
      }

      const groupNode: any = {
        ...initialConfig,
        position: groupNodePosition,
      }

      // Position the child nodes within the group node
      const childNodeWidth = 366.27 // As per the dimensions you provided
      const childNodeHeight = 230.23
      const parentWidth = GROUP_NODE_DIMENSIONS.width
      const parentHeight = GROUP_NODE_DIMENSIONS.height
      const centerX = (parentWidth - childNodeWidth) / 2
      const verticalSpacing = 20
      const totalHeight =
        childNodeHeight * childNodes.length +
        verticalSpacing * (childNodes.length - 1)
      const startY = (parentHeight - totalHeight) / 2

      const type = capitalize(groupId.split('-')[0])
      const groupNodeChildren = childNodes.map(
        (childNode: any, index: number) => ({
          ...childNode,
          type: `entityGroupNodeChild${type}`,
          position: {
            x: centerX, // Horizontally centered within the group node
            y: startY + index * (childNodeHeight + verticalSpacing),
          },
          // zIndex: 2,
          hidden: false,
          parentId: groupId,
          className: groupId,
          extent: 'parent',
        })
      )

      groupNode.data.children = [...groupNodeChildren]

      return { groupNode, groupNodeChildren }
    },
    [getNodes]
  )
  const createGroupNodeLayout = useCallback(
    ({ groupId, rootNode, childNodes }: any) => {
      const initialConfig = {
        id: groupId,
        type: 'entityGroupNode',
        initialHeight: GROUP_NODE_DIMENSIONS.height,
        initialWidth: GROUP_NODE_DIMENSIONS.width,
        // zIndex: 1,
        style: {
          width: `${GROUP_NODE_DIMENSIONS.width}px`,
          height: `${GROUP_NODE_DIMENSIONS.height}px`,
          // height: 'auto',
          // width: 'auto',
        },
        data: {
          label: groupId,
          name: groupId,
          type: 'group',
        },
      }
      const allNodes = getNodes()
      const bounds = getNodesBounds(allNodes)
      console.log('bounds: ', bounds)

      const [{ position }]: any = assignPositionsToChildNodes(rootNode, [
        initialConfig,
      ])

      const groupNode: any = {
        ...initialConfig,
        position,
      }
      const childNodeWidth = 366.27 // As per the dimensions you provided
      const childNodeHeight = 230.23
      const parentWidth = GROUP_NODE_DIMENSIONS.width
      const parentHeight = GROUP_NODE_DIMENSIONS.height
      // Horizontal centering (same for all child nodes)
      const centerX = (parentWidth - childNodeWidth) / 2

      // Vertical stacking with spacing (let's assume 20px of spacing between child nodes)
      const verticalSpacing = 20
      const totalHeight =
        childNodeHeight * childNodes.length +
        verticalSpacing * (childNodes.length - 1)
      const startY = (parentHeight - totalHeight) / 2

      const groupNodeChildren = childNodes.map(
        (childNode: any, index: any) => ({
          ...childNode,
          type: 'entityGroupNodeChild',
          position: {
            x: centerX, // All child nodes are horizontally centered
            y: startY + index * (childNodeHeight + verticalSpacing), // Vertical stacking with spacing
          },
          style: {
            // transform: `rotateZ(${childNodes.length - index - 1}deg)`,
          },
          // zIndex: 2,
          hidden: false,
          parentId: groupId,
          className: groupId,
          extent: 'parent',
        })
      )

      groupNode.data.children = [...groupNodeChildren]

      return { groupNode, groupNodeChildren }
    },
    [assignPositionsToChildNodes, getNodes]
  )

  // NOTE: This runs when a user searches from within a root node card
  const addChildNodesFromSearch = useCallback(
    async ({ type, searchResults, searchTerm }: any) => {
      const source: any = `${type}-root-node`
      const groupId = `${type}-group-${searchTerm}`

      // const { x, y, childNodeDirection } = ROOT_NODE_POSITIONS[type]
      const rootNode: any = getNode(source)
      console.log('rootNode: ', rootNode)

      console.log('groupId: ', groupId)

      const childNodes = searchResults.map((result: any) => {
        let node = graph[type].nodes.find(
          (node: { id: any }) => node?.id === result.id
        )
        console.log('node: ', node)
        return node
      })

      // if(childNodes?.length > 1) {
      const { groupNode, groupNodeChildren }: any = createGroupNodeLayout({
        groupId,
        rootNode,
        childNodes,
      })
      // }

      const incomingEdges = createRootNodeEdges([groupNode], source)

      // Note: This is to update the root node that has been clicked with the respective amount of handles to support the edge linking

      const incomingHandles: any = incomingEdges.map(
        (edge) => edge.sourceHandle
      )

      rootNode.data = {
        ...rootNode.data,

        handles: rootNode.data?.handles?.length
          ? [...rootNode.data.handles, ...incomingHandles]
          : incomingHandles,
        children: rootNode?.data?.children
          ? [...rootNode?.data?.children, groupNode]
          : [groupNode],
      }

      // We then need to replace/mutate the corresponding root node is the current state of the graph in order to have Reactflow update the node accordingly
      const initialRootNodes = [
        ...getNodes().filter((node: any) => node.id !== rootNode.id),
        rootNode,
      ]

      setNodes((nds: any) => [
        ...initialRootNodes,
        groupNode,
        ...groupNodeChildren,
      ])

      setEdges((edges: any) => [...edges, ...incomingEdges])

      return {
        childNodes,
        edges: incomingEdges,
      }
    },
    [createGroupNodeLayout, createRootNodeEdges, getNode, getNodes, graph] // runForceSimulation
  )

  const getRootNodeChildren = useCallback(
    async (type: any) => {
      const source: any = `${type}-root-node`
      console.log('source: ', source)
      const nodeState = rootNodeState[source]

      const { lastIndex } = nodeState
      // #TODO - add handling for if batch size is greater than remaining child nodes
      const childNodes = graph[type].nodes.slice(
        lastIndex,
        lastIndex + childNodeBatchSize
      )

      // const { x, y, childNodeDirection } = ROOT_NODE_POSITIONS[type]
      const rootNode: any = getNode(source)
      console.log('rootNode: ', rootNode)
      const groupId = `${type}-group-${lastIndex}`

      // const { groupNode, groupNodeChildren }: any = createGroupNodeLayout({
      //   groupId,
      //   rootNode,
      //   childNodes,
      // })
      const { groupNode, groupNodeChildren }: any =
        createGroupNodeLayoutWithoutRootNode({
          groupId,
          childNodes,
        })

      const incomingEdges = createRootNodeEdges([groupNode], source)

      // const childlessRootNodes = renderRootNodeConciseLayout(source)

      // Note: This is to update the root node that has been clicked with the respective amount of handles to support the edge linking

      // const restOfRootNodeIds = ROOT_NODE_IDS.filter((id) => id !== source)
      // const childlessRootNodes = restOfRootNodeIds
      //   .map((id: string) => getNode(id))
      //   .filter(
      //     (node: any) => !node.data.handles || node.data.handles.length === 0
      //   )
      // const { sequence, positionedChildlessNodes } =
      //   renderRootNodeConciseLayout(childlessRootNodes)

      // console.log('positionedChildlessNodes: ', positionedChildlessNodes)
      const incomingHandles: any = incomingEdges.map(
        (edge) => edge.sourceHandle
      )
      console.log('incomingHandles: ', incomingHandles)
      // rootNode.
      rootNode.data = {
        ...rootNode.data,

        handles: rootNode.data?.handles?.length
          ? [...rootNode.data.handles, ...incomingHandles]
          : incomingHandles,
        children: rootNode?.data?.children
          ? [...rootNode?.data?.children, groupNode]
          : [groupNode],
      }

      updateNodeData(rootNode.id, { ...rootNode.data })

      // const restOfNodes = getNodes().filter(
      //   (node) => !initialNodes.includes(node)
      // )
      // We then need to replace/mutate the corresponding root node is the current state of the graph in order to have Reactflow update the node accordingly
      const initialRootNodes = [
        ...getNodes().filter((node: any) => node.id !== source),
        rootNode,
      ]

      // So now we set the root nodes with the relevant root node having updated handles, then set the rest of the existing nodes, and then the newest positioned child nodes
      setNodes((nds: any) => [
        ...initialRootNodes,
        groupNode,
        ...groupNodeChildren,
      ])

      setEdges((edges: any) => [...edges, ...incomingEdges])

      updateChildNodeBatchIndex(source)

      return {
        childNodes: {
          groupNode,
          groupNodeChildren,
        },
        edges: incomingEdges,
        // sequence,
        // positionedChildlessNodes,
      }
    },
    [
      rootNodeState,
      graph,
      getNode,
      createGroupNodeLayoutWithoutRootNode,
      createRootNodeEdges,
      updateNodeData,
      getNodes,
      updateChildNodeBatchIndex,
    ] // runForceSimulation
  )

  const renderDataAsNodes = useCallback(
    (type: any) => {
      // Retrieve the lastIndex for the given type from your state management
      const source: any = `${type}-root-node`
      console.log('source: ', source)

      const nodeState = rootNodeState[source]
      console.log('nodeState: ', nodeState)
      const { lastIndex } = nodeState

      // Fetch the next batch of child nodes
      const childNodes = graph[type].nodes.slice(
        lastIndex,
        lastIndex + childNodeBatchSize
      )

      const groupId = `${type}-group-${lastIndex}`

      // Create the group node layout without referencing a root node
      const { groupNode, groupNodeChildren } =
        createGroupNodeLayoutWithoutRootNode({
          groupId,
          childNodes,
        })

      console.log('groupNodeChildren:', groupNodeChildren)
      console.log('groupNode:', groupNode)

      // Add the group node and its children to the graph
      setNodes((nds: any) => [...nds, groupNode, ...groupNodeChildren])

      // Update the lastIndex for the given type

      updateChildNodeBatchIndex(source) // Ensure this function accepts 'type' as an argument

      return {
        childNodes: {
          groupNode,
          groupNodeChildren,
        },
      }
    },
    [
      rootNodeState,
      graph,
      createGroupNodeLayoutWithoutRootNode,
      updateChildNodeBatchIndex,
    ]
  )

  const addDataToMindMap: any = useCallback(
    (node: any) => {
      // const { target } = event
      console.log('node: ', node)
      const {
        data: { type },
      } = node
      console.log('type: ', type)

      // const {
      //   childNodes: { groupdNodeChildren },
      // }: any = getRootNodeChildren(node?.data.type)
      const {
        childNodes: { groupdNodeChildren },
      }: any = renderDataAsNodes(node?.data.type)

      // if (type === 'events') {
      //   addLocationsToVisualize(groupdNodeChildren)
      // }

      nextTick(10).then(() => {
        zoomOut({
          // @ts-ignore
          zoom: 0,
          duration: 500,
        })
      })

      // return { sequence, childNodes }
      // // Ignore any other clicks to the node that are not the load button
      // if (target.classList.contains('load-records-button')) {

      // } else {
      //   updateActiveNode(node)
      // }
    },
    [renderDataAsNodes, zoomOut]
  )

  const [keepLoadedOnMap, setKeepLoadedOnMap] = useState(false)
  const toggleKeepLoaded = useCallback(
    () => setKeepLoadedOnMap((keepLoadedOnMap) => !keepLoadedOnMap),
    []
  )

  const findConnections = useCallback(
    (node: any) => {
      const { id } = node
      const { links } = mindMapIntialGraphState
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
    [
      addEdges,
      createRootNodeEdge,
      getNodes,
      mindMapIntialGraphState,
      updateNodeData,
    ]
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
    // setNodes([])
    // setInitialNodes(IN)
    setEdges([])
  }, [createRootNode, createRootNodeChild, graph3d])

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
  // useEffect(() => {
  //   if (nodes.length === 0) return

  //   // Filter out nodes with a parentId
  //   const nodesWithoutParent = nodes.filter((node) => !node.parentId)

  //   // Clone nodes to avoid mutating state
  //   const simulationNodes = nodesWithoutParent.map((node) => ({
  //     ...node,
  //     x: node.position.x,
  //     y: node.position.y,
  //   }))

  //   // Edges should only connect nodes that are part of the simulation
  //   const simulationEdges = edges.filter(
  //     (edge) =>
  //       nodesWithoutParent.find((node) => node.id === edge.source) &&
  //       nodesWithoutParent.find((node) => node.id === edge.target)
  //   )

  //   const simulation = forceSimulation(simulationNodes)
  //     .force(
  //       'link',
  //       forceLink(simulationEdges)
  //         .id((d) => d.id)
  //         .distance(200)
  //         .strength(1)
  //     )
  //     .force('charge', forceManyBody().strength(-500))
  //     .force('center', forceCenter(0, 0))
  //     .force('collision', forceCollide().radius(50)) // Adjust radius as needed
  //     .on('tick', () => {
  //       setNodes((nds) =>
  //         nds.map((node) => {
  //           // Only update positions of nodes without parentId
  //           if (!node.parentId) {
  //             const simNode = simulationNodes.find((n) => n.id === node.id)
  //             console.log('simNode: ', simNode)
  //             return {s
  //               ...node,
  //               position: {
  //                 x: simNode?.x || simNode?.position.x,
  //                 y: simNode?.y || simNode?.position.y,
  //               },
  //             }
  //           }
  //           // Nodes with parentId remain at their current positions
  //           return node
  //         })
  //       )
  //     })

  //   // Start the simulation
  //   simulation.alpha(1).restart()

  //   // Optional: Fit view when the simulation ends
  //   simulation.on('end', () => {
  //     fitView()
  //   })

  //   // Cleanup on unmount
  //   return () => {
  //     simulation.stop()
  //   }
  // }, [nodes.length, edges.length])
  // const workerRef = useRef(null)

  // useEffect(() => {
  //   if (nodes.length === 0) return

  //   // Initialize the Web Worker
  //   if (!workerRef.current) {
  //     workerRef.current = new Worker('/simulationWorker.js')
  //   }

  //   const worker: any = workerRef.current

  //   worker.postMessage({ nodes, edges })

  //   worker.onmessage = (event) => {
  //     const updatedNodes = event.data
  //     setNodes(updatedNodes)
  //     fitView()
  //   }

  //   // Cleanup
  //   return () => {
  //     worker.terminate()
  //     workerRef.current = null
  //   }
  // }, [nodes.length, edges.length])
  return (
    <MindMapContext.Provider
      value={{
        nodes,
        // addRootNodeChildren,
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
        useUpdateNodeInternals,
        fitView,
        setNodes,
        getEdges,
        useInternalNode,
        useNodes,
        screenToFlowPosition,
        useNodesData,
        getOutgoers,
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
        addDataToMindMap,
        detectNodeOverlap,
        updateMindMapInstance,
        mindMapInstance,
        saveMindMap,
        restore,
        getIntersectingNodes,
        isNodeIntersecting,
        toggleConciseView,
        turnOffConciseView,
        turnOnConciseView,
        conciseViewActive,
        renderRootNodeConciseLayout,
        createSearchResultsLayout,
      }}
    >
      <div id='mindmap-container'>{children}</div>
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
