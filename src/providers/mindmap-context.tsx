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
  type Viewport,
  useStoreApi,
  MarkerType,
  useHandleConnections,
  Position,
  useNodesData,
  getOutgoers,
  useInternalNode,
} from '@xyflow/react'

import { nextTick, wait } from '@/utils/functions'
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

  const updateChildNodeBatchIndex = (type: RootNodeKey) => {
    setRootNodeState((rootNodeState: any) => ({
      ...rootNodeState,
      [type]: {
        lastIndex: rootNodeState[type].lastIndex + childNodeBatchSize,
      },
    }))
  }

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
        zIndex: 20,
      },

      // type: 'entityEdge',
      sourceHandle: `handle:${id}`,
    }
  }, [])

  const createRootNodeEdge = useCallback(
    (rootNodeChildNode: any, source: string) => {
      console.log('source: ', source)
      const sourceNode = getNode(source)
      console.log('sourceNode: ', sourceNode)

      const { id: target, data } = rootNodeChildNode
      console.log('target: ', target)
      const firstNodeType = rootNodeChildNode?.data?.type
      const sourceType: any = sourceNode?.data?.type || source.split('-')[0]
      console.log('sourceType: ', sourceType)

      const id = `${source}:${target}`
      console.log('id: ', id)
      console.log('id: ', id)
      const sourceIsRootNode = source.includes('root')

      const edgeType =
        sourceIsRootNode || firstNodeType.includes('root')
          ? 'rootEdge'
          : 'siblingEdge'
      console.log('edgeType: ', edgeType)
      const connectionLabel = `${rootNodeChildNode.data.name}::${sourceNode?.data.name}`
      console.log('connectionLabel: ', connectionLabel)
      return {
        id,
        source,
        target,
        animated: true,

        type: edgeType,
        markerEnd: 'custom-marker',
        style: {
          stroke: DOMAIN_MODEL_COLORS[sourceType],
          zIndex: 1,
        },
        label: sourceIsRootNode ? sourceType : connectionLabel,
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

  const createGroupNodeLayout = useCallback(
    ({ groupId, rootNode, childNodes }: any) => {
      const initialConfig = {
        id: groupId,
        type: 'entityGroupNode',
        initialHeight: GROUP_NODE_DIMENSIONS.height,
        initialWidth: GROUP_NODE_DIMENSIONS.width,

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
          hidden: false,
          parentId: groupId,
          className: groupId,
          extent: 'parent',
        })
      )

      groupNode.data.children = [...groupNodeChildren]
      console.log('groupNodeChildren: ', groupNodeChildren)

      return { groupNode, groupNodeChildren }
    },
    [assignPositionsToChildNodes]
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

  const addConnectionNodesFromSearch = useCallback(
    ({ source, searchResults }: any) => {
      const siblingSourceNode: any = getNode(source.id)

      // !#TODO: Need to add logic to check if some connected records already have nodes on the graph and then add the new nodes to the existing nodes

      const incomingNodes: any = []
      const incomingRootEdges: any = []
      const incomingSiblingEdges: any = []
      const rootNodeIds: any = []
      const rootNodeMap: any = {}

      searchResults.forEach((result: any, i: any) => {
        const { type } = result
        const routeSource: any = `${type}-root-node`
        const rootNode: any = getNode(routeSource)
        // Should not be position search results relative to their entity type but instead
        // to the source node that triggered the search
        // const { x, y, childNodeDirection } = ROOT_NODE_POSITIONS[type]
        // const parentNode = {
        //   id: routeSource,
        //   position: rootNode.position || {
        //     x,
        //     y,
        //   },
        //   childNodeDirection,
        // }
        let node = graph[type].nodes.find(
          (node: { id: any }) => node?.id === result.id
        )

        const degrees = i * (360 / 8)
        const radians = degrees * (Math.PI / 180)
        const x = 250 * Math.cos(radians) + siblingSourceNode.position.x
        const y = 250 * Math.sin(radians) + siblingSourceNode.position.y
        const positionedNode = {
          ...node,
          position: {
            x,
            y,
          },
        }
        // const [positionedNode] = assignPositionsToChildNodes(parentNode, [node])

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
    [createRootNodeEdges, getNode, getNodes, graph] // runForceSimulation
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
          zIndex: i + 1,
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
      const nodeState = rootNodeState[source]

      const { lastIndex } = nodeState
      // #TODO - add handling for if batch size is greater than remaining child nodes
      const childNodes = graph[type].nodes.slice(
        lastIndex,
        lastIndex + childNodeBatchSize
      )

      // const { x, y, childNodeDirection } = ROOT_NODE_POSITIONS[type]
      const rootNode: any = getNode(source)
      const groupId = `${type}-group-${lastIndex}`

      const { groupNode, groupNodeChildren }: any = createGroupNodeLayout({
        groupId,
        rootNode,
        childNodes,
      })
      console.log('groupNodeChildren: ', groupNodeChildren)
      console.log('groupNode: ', groupNode)

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
      rootNode.data = {
        ...rootNode.data,

        handles: rootNode.data?.handles?.length
          ? [...rootNode.data.handles, ...incomingHandles]
          : incomingHandles,
        children: rootNode?.data?.children
          ? [...rootNode?.data?.children, groupNode]
          : [groupNode],
      }

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
      createGroupNodeLayout,
      createRootNodeEdges,
      getNode,
      getNodes,
      graph,
      rootNodeState,
    ] // runForceSimulation
  )

  const onNodeClick: any = useCallback(
    (node: any) => {
      // const { target } = event
      console.log('node: ', node)
      const {
        data: { type },
      } = node
      console.log('type: ', type)

      const {
        childNodes: { groupdNodeChildren },
      }: any = getRootNodeChildren(node?.data.type)

      if (type === 'events') {
        addLocationsToVisualize(groupdNodeChildren)
      }

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
    [addLocationsToVisualize, getRootNodeChildren, zoomOut]
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
    setNodes(IN)
    // setInitialNodes(IN)
    setEdges([])
  }, [createRootNode, createRootNodeChild, graph3d])

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
        fitView,
        setNodes,
        getEdges,
        useInternalNode,
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
        onNodeClick,
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
