'use client'

import { use3DGraph } from '@/hooks/use3dGraph'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Edge,
  getOutgoers,
  getStraightPath,
  type Node,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
  useInternalNode,
  useNodes,
  useNodesData,
  useReactFlow,
  useStoreApi,
  useUpdateNodeInternals,
} from '@xyflow/react'

import {
  BASE_ENTITY_NODE_HEIGHT,
  BASE_ENTITY_NODE_WIDTH,
  CHILD_DIMENSIONS,
  GROUP_NODE_DIMENSIONS,
  GROUP_NODE_LANDSCAPE,
  PADDING,
  ROOT_DIMENSIONS,
  ROOT_NODE_HEIGHT,
  ROOT_NODE_POSITIONS,
  ROOT_NODE_WIDTH,
} from '@/features/mindmap/config/index.config'

import { saveUserMindMap } from '@/features/user/api/save-event'
import { useStateOfDisclosure } from '@/providers/state-of-disclosure-provider'
import { DOMAIN_MODEL_COLORS } from '@/utils'
import { capitalize } from '@/utils/functions'

// import { simulation } from '@/features/mindmap/utils/force-directed'

type AddConnectionNodesFromSearchParams = {
  source: {
    id: string
    [key: string]: any // Generic field for other potential properties
  }
  searchResults: Array<{
    id?: string
    type?: string
    [key: string]: any // Generic field for other potential properties
  }>
}
const MindMapContext: any = createContext( {
  nodes: [],
  setNodes: ( nodes: any ) => { },
  edges: [],
  setEdges: ( edges: any ) => { },
  graph: [],
  createRootNodeEdges: ( nodes: any ) => { },
  // addRootNodeChildren: (type: string) => {},
  initialNodes: [],
  store: null,
} )
export type RootNodeKey =
  | 'events-root-node'
  | 'personnel-root-node'
  | 'testimonies-root-node'
  | 'topics-root-node'

export const MindMapProvider = ( { children }: { children: React.ReactNode } ) => {
  const {
    getNodes,
    fitView,
    getEdges,
    addNodes,
    addEdges,
    getNode,
    screenToFlowPosition,
    setViewport,
    getNodesBounds,
    zoomIn,
    updateNode,
    zoomOut,
    updateNodeData,
    getIntersectingNodes,
    isNodeIntersecting,
    zoomTo,
    setCenter,
  } = useReactFlow()

  // const user: { userId: string | null } = auth()

  const { mindMapIntialGraphState } = useStateOfDisclosure()

  const store = useStoreApi()

  const { graph3d }: any = use3DGraph( { mindMapIntialGraphState } )

  const [nodes, setNodes]: any = useState<Node[]>( [] )
  const [edges, setEdges]: any = useState<Edge[]>( [] )
  const [graph, setGraph]: any = useState( {} )
  // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)

  const [rootNodeState, setRootNodeState]: any = useState( {
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
    'documents-root-node': {
      lastIndex: 0,
    },
    'artifacts-root-node': {
      lastIndex: 0,
    },
  } )
  const [mindMapInstance, setMindMapInstance]: any = useState( null )
  const [conciseViewActive, setConciseViewActive]: any = useState( true )

  const toggleConciseView = () =>
    setConciseViewActive( ( conciseViewActive: any ) => !conciseViewActive )
  const turnOffConciseView = () => setConciseViewActive( false )
  const turnOnConciseView = () => setConciseViewActive( true )

  const updateMindMapInstance = ( instance: any ) => setMindMapInstance( instance )

  const flowKey = `mindmap-cache`
  const saveMindMap = useCallback( async () => {
    if ( mindMapInstance ) {
      const json = mindMapInstance.toObject()
      console.log( 'json: ', json )
      const file = await saveUserMindMap( {
        user: {},
        mindMap: { json, fileName: flowKey },
      } )
      console.log( 'file: ', file )
      // localStorage.setItem(flowKey, JSON.stringify(flow))
    }
  }, [flowKey, mindMapInstance] )

  const restore = useCallback( () => {
    const restoreFlow = async () => {
      // @ts-ignore
      const flow = JSON.parse( localStorage.getItem( flowKey ) ) || null

      if ( flow ) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport
        setNodes( flow.nodes || [] )
        setEdges( flow.edges || [] )
        setViewport( { x, y, zoom } )
      }
    }

    restoreFlow()
  }, [flowKey, setViewport] )

  const childNodeBatchSize = 3

  const [showLocationVisualization, setShowLocationVisualization] = useState( false )

  const closeLocationVisualization = useCallback( () => {
    setShowLocationVisualization( false )
  }, [] )
  const toggleLocationVisualization = useCallback(
    () => setShowLocationVisualization( ( showLocationVisualization ) => !showLocationVisualization ),
    []
  )

  const [activeNode, setActiveNode] = useState( null )
  const updateActiveNode = ( node: any ) => {
    setActiveNode( node )
  }

  const [locationsToVisualize, setLocationsToVisualize]: any = useState( [] )

  const addLocationsToVisualize = useCallback( ( locations: any[] ) => {
    setLocationsToVisualize( ( locationsToVisualize: any[] ) => [
      ...locationsToVisualize,
      ...locations,
    ] )
  }, [] )

  const updateChildNodeBatchIndex = useCallback( ( type: RootNodeKey ) => {
    console.log( '🚀 ~ file: mindmap-context.tsx:196 ~ updateChildNodeBatchIndex ~ type:', type )
    // if (rootNodeState[type]) {
    //   const { lastIndex } = rootNodeState[type]
    //   const newIndex = lastIndex + childNodeBatchSize
    // }
    setRootNodeState( ( rootNodeState: any ) => ( {
      ...rootNodeState,
      [type]: {
        lastIndex: rootNodeState[type].lastIndex + childNodeBatchSize,
      },
    } ) )
  }, [] )

  const detectNodeOverlap = ( node: { id: string } ) => {
    const source: any = getNode( node.id )
    const intersections = getIntersectingNodes( source )
    console.log( 'intersections: ', intersections )

    intersections.forEach( ( intersection: any ) => {
      const { id: nodeId } = intersection.target
      const node = getNode( nodeId )

      if ( node ) {
        const { position } = node
        const newPosition = { ...position }

        // Adjust the position of the node to avoid overlap
        newPosition.x += CHILD_DIMENSIONS.width + PADDING
        newPosition.y += CHILD_DIMENSIONS.height + PADDING

        // Check if the new position overlaps with any other node
        let newIntersections: any = getIntersectingNodes( {
          ...node,
          position: newPosition,
        } )

        // Keep adjusting the position until there are no more overlaps
        while ( newIntersections.length > 0 ) {
          newPosition.x += CHILD_DIMENSIONS.width + PADDING
          newPosition.y += CHILD_DIMENSIONS.height + PADDING

          newIntersections = getIntersectingNodes( {
            ...node,
            position: newPosition,
          } )
        }

        // Update the position of the node in the updatedNodes array
        const updatedNode = {
          ...node,
          position: newPosition,
        }

        // const nodeIndex = updatedNodes.findIndex((n) => n.id === nodeId)
        // updatedNodes[nodeIndex] = updatedNode
      }
    } )
    return intersections
  }

  const createRootNode = useCallback( ( node: any, index: number ) => {
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
  }, [] )

  const createSiblingEdge = useCallback( ( sourceNode: any, targetNode: any, type?: string ) => {
    const id = `${sourceNode.id}:${targetNode.id}`

    const edgeType = type || 'siblingEdge'

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
  }, [] )

  const createRootNodeEdge = useCallback(
    ( rootNodeChildNode: any, source: any ) => {
      console.log( 'rootNodeChildNode: ', rootNodeChildNode )
      console.log( 'source: ', source )
      const isObject = typeof source === 'object'
      console.log( 'isObject: ', isObject )
      const isString = typeof source === 'string'
      console.log( 'isString: ', isString )
      const sourceNode: any = isString ? getNode( source ) : isObject ? source : getNode( source.id )

      console.log( "🚀 ~ file: mindmap-context.tsx:309 ~ sourceNode:", sourceNode )

      const sourceId = sourceNode.id
      console.log( 'sourceId: ', sourceId )
      // console.log('sourceNode: ', sourceNode)

      const { id: target, data } = rootNodeChildNode

      console.log( "🚀 ~ file: mindmap-context.tsx:317 ~ target:", target )

      // console.log('target: ', target)
      // const firstNodeType = rootNodeChildNode?.data?.type
      // const sourceType: any = sourceNode?.data?.type || source.split('-')[0]
      // console.log('sourceType: ', sourceType)

      const id = `${sourceId}:${target}`
      // console.log('id: ', id)
      console.log( '🚀 ~ file: mindmap-context.tsx:320 ~ id:', id )
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
    ( rootNodeChildNodes: Node[], source: any ) => {
      const rootNodeEdges = rootNodeChildNodes.map( ( node ) => createRootNodeEdge( node, source ) )
      return rootNodeEdges
    },
    [createRootNodeEdge]
  )

  //  Root Node Children --------------------------------------------------------------------------------------

  const assignPositionsToChildNodes = useCallback( ( parentNode: any, childNodes: any[] ): any[] => {
    const existingChildren = parentNode?.data?.children
    const bounds = existingChildren ? getNodesBounds( existingChildren ) : null

    console.log( 'bounds: ', bounds )
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
    const newKids = childNodes.map( ( childNode ) => {
      currentX += CHILD_DIMENSIONS.width + PADDING
      if ( currentX + CHILD_DIMENSIONS.width > rectX + 500 ) {
        // Adjust this value if needed for different layouts
        currentX = rectX
        currentY += CHILD_DIMENSIONS.height + PADDING
      }
      const positionedNode = {
        ...childNode,

        position: { x: currentX, y: currentY },
      }

      return positionedNode
    } )
    return newKids
  }, [] )

  const createRootNodeChild = useCallback( ( node: any, index: any ) => {
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
  }, [] )

  const updateNodes = useCallback( ( newNodes: any ) => {
    setNodes( newNodes )
  }, [] )

  const createSearchResultsLayout = useCallback(
    ( { sourceNode, searchResults }: any ) => {
      const searchResultNodes: any = []
      const searchResultEdges: any = []
      searchResults.forEach( ( result: any, i: any ) => {
        const { type } = result

        let node = graph[type].nodes.find( ( node: { id: any } ) => node?.id === result.id )

        const degrees = i * ( 360 / 8 )
        const radians = degrees * ( Math.PI / 180 )
        const x = 250 * Math.cos( radians ) + sourceNode.position.x
        const y = 250 * Math.sin( radians ) + sourceNode.position.y
        const searchResultNode = {
          ...node,
          position: {
            x,
            y,
          },
        }
        const siblingEdge = createSiblingEdge( searchResultNode, sourceNode, 'floating' )
        console.log( 'siblingEdge: ', siblingEdge )
        // const [positionedNode] = assignPositionsToChildNodes(parentNode, [node])
        searchResultNodes.push( searchResultNode )
        searchResultEdges.push( siblingEdge )
      } )

      const searchResultHandles: any = searchResultEdges.map( ( edge: any ) => edge.sourceHandle )
      updateNodeData( sourceNode.id, {
        handles: sourceNode.data.handles
          ? [...sourceNode.data.handles, ...searchResultHandles]
          : searchResultHandles,
      } )
      // We then need to replace/mutate the corresponding root node is the current state of the graph in order to have Reactflow update the node accordingly

      // So now we set the root nodes with the relevant root node having updated handles, then set the rest of the existing nodes, and then the newest positioned child nodes
      addNodes( searchResultNodes )

      addEdges( searchResultEdges )

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
  function calculateDiagonal( width: number, height: number ) {
    return Math.sqrt( width ** 2 + height ** 2 )
  }
  function calculateCircumcircleRadius( width: number, height: number ): number {
    const diagonal = calculateDiagonal( width, height )
    return diagonal / 2
  }

  const positionAdjacentNodesRadially = ( {
    sourceNode,
    adjacentNodes,
  }: {
    sourceNode: any
    adjacentNodes: any
  } ) => {
    const searchResultNodes: any = []
    const searchResultEdges: any = []
    adjacentNodes.forEach( ( result: any, i: any ) => {
      const { type } = result
      let node = graph[type].nodes.find( ( node: { id: any } ) => node?.id === result.id )

      console.log( '🚀 ~ file: mindmap-context.tsx:479 ~ adjacentNodes.forEach ~ node:', node )
      console.log( '🚀 ~ file: mindmap-context.tsx:476 ~ adjacentNodes.forEach ~ result:', result )

      const degrees = i * ( 360 / adjacentNodes.length )
      const radians = degrees * ( Math.PI / 180 )
      const x = 250 * Math.cos( radians ) + sourceNode.position.x
      const y = 250 * Math.sin( radians ) + sourceNode.position.y
      const positionedNode = {
        ...node,
        position: {
          x,
          y,
        },
      }
      searchResultNodes.push( positionedNode )
      const siblingEdge = createSiblingEdge( sourceNode, positionedNode, 'floating' )
      searchResultEdges.push( siblingEdge )
    } )
    return { searchResultNodes, searchResultEdges }
  }

  const addConnectionNodesFromSearch = useCallback(
    ( { source, searchResults }: any ) => {
      console.log(
        '🚀 ~ file: mindmap-context.tsx:510 ~ assignPositionsToChildNodes ~ searchResults:',
        searchResults
      )
      console.log(
        '🚀 ~ file: mindmap-context.tsx:510 ~ assignPositionsToChildNodes ~ source:',
        source
      )
      const siblingSourceNode: any = getNode( source.id )
      console.log(
        '🚀 ~ file: mindmap-context.tsx:511 ~ assignPositionsToChildNodes ~ siblingSourceNode:',
        siblingSourceNode
      )

      const incomingNodes: any = []
      const incomingEdges: any = []
      const existingNodes = [...getNodes().filter( ( node: any ) => node.id !== siblingSourceNode.id )]
      const nodeRadius = calculateCircumcircleRadius( ROOT_NODE_WIDTH, ROOT_NODE_HEIGHT ) // Radius of the node (adjust as needed)
      const circleRadius = searchResults.reduce( ( sum: number, result: any ) => {
        const { type } = result
        const node = graph[type].nodes.find( ( node: { id: any } ) => node?.id === result.id )
        return sum + calculateCircumcircleRadius( node.width, node.height )
      }, 0 )

      searchResults.forEach( ( result: { id?: any; type?: any }, i: number ) => {
        const { type } = result

        let node = graph[type].nodes.find( ( node: { id: any } ) => node?.id === result.id )

        // Calculate initial angle
        const totalNodes = searchResults.length
        const angleIncrement = ( 2 * Math.PI ) / totalNodes
        let angle = i * angleIncrement

        // Initialize position
        let x: number = siblingSourceNode.position.x
        let y: number = siblingSourceNode.position.y
        let positionFound = false
        let attempts = 0
        const maxAttempts = 10 // To prevent infinite loops

        while ( !positionFound && attempts < maxAttempts ) {
          // Calculate position around the circle
          x = circleRadius * Math.cos( angle ) + siblingSourceNode.position.x
          y = circleRadius * Math.sin( angle ) + siblingSourceNode.position.y

          // Check for overlap
          const overlaps = existingNodes.some( ( existingNode ) => {
            const dx = existingNode.position.x - x
            const dy = existingNode.position.y - y
            const distance = Math.sqrt( dx * dx + dy * dy )
            return distance < nodeRadius * 2 // Adjust if nodes are larger
          } )

          if ( !overlaps ) {
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
        const edgeId = `${siblingSourceNode.id}:${positionedNode.id}`

        const edgeType = 'floating' // || 'siblingEdge'

        // const connectionLabel = `${rootNodeChildNode.data.name}::${sourceNode?.data.name}`
        // console.log('connectionLabel: ', connectionLabel)
        const siblingEdge = {
          id: edgeId,
          source: positionedNode.id,
          target: siblingSourceNode.id,
          animated: true,

          type: edgeType,
          markerEnd: 'custom-marker',
          style: {
            stroke: DOMAIN_MODEL_COLORS[type],
            // zIndex: 20,
          },

          // type: 'entityEdge',
          sourceHandle: `handle:${edgeId}`,
        }
        // const edge = createRootNodeEdge(siblingSourceNode, positionedNode)
        // const [siblingEdge] = createRootNodeEdges([positionedNode], siblingSourceNode)
        console.log( 'siblingEdge: ', siblingEdge )

        incomingNodes.push( positionedNode )
        incomingEdges.push( siblingEdge )

        // Add the new node to existingNodes for future overlap checks
      } )

      const incomingSiblingHandles: any = incomingEdges.map( ( edge: any ) => edge.sourceHandle )

      existingNodes.push( {
        ...siblingSourceNode,
        data: {
          ...siblingSourceNode.data,
          handles: siblingSourceNode.data?.handles?.length
            ? [...siblingSourceNode.data.handles, ...incomingSiblingHandles]
            : incomingSiblingHandles,
        },
      } )

      setNodes( ( nds: any ) => [...existingNodes, ...incomingNodes] )

      setEdges( ( edges: any ) => [...edges, ...incomingEdges] )

      return {
        siblingNodes: incomingNodes,
        edges: incomingEdges,
      }
    },
    [createRootNodeEdges, getNode, getNodes, graph]
  )

  const animateRootNodeConcision = useMemo(
    () =>
      ( {
        targetX,

        childlessRootNodes,
      }: any ) => {
        const animations = childlessRootNodes.map( ( rootNode: any ) => {
          console.log( 'rootNode: ', rootNode )
          const selector = `.react-flow__node[data-id="${rootNode.id}"]`
          const domNode: any = document.querySelector( selector )
          console.log( 'domNode: ', domNode )

          const [path, labelX, labelY, offsetX, offsetY, ...restOfPath] = getStraightPath( {
            sourceX: rootNode.position.x,
            sourceY: rootNode.position.y,
            targetX: targetX,
            targetY: 0,
          } )
          console.log( 'labelX: ', labelX )
          console.log( 'restOfPath: ', restOfPath )
          console.log( 'offsetX: ', offsetX )
          console.log( 'path: ', path )

          domNode.style.offsetPath = `path('${path}')`
          domNode.style.offsetRotate = '0deg'

          const keyframes = [{ offsetDistance: '0%' }, { offsetDistance: '100%' }]

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
        } )

        const start = () => {
          animations.forEach( ( animation: any ) => {
            const anim = animation.domNode.animate( animation.keyframes, animation.animation )
            // anim.stop()
          } )
        }

        return { start, animations }
      },
    []
  )
  const renderRootNodeConciseLayout = useMemo(
    () => ( childlessRootNodes: any[] ) => {
      const firstChildlessNode = childlessRootNodes[0]
      console.log( 'firstChildlessNode: ', firstChildlessNode )

      const {
        position: { x },
      } = firstChildlessNode

      const targetX = x || 0
      console.log( 'targetX: ', targetX )
      const targetY = 0

      const positionedChildlessNodes = childlessRootNodes.map( ( childlessRootNode, i ) => ( {
        ...childlessRootNode,
        // zIndex: i + 1,
      } ) )

      const sequence = animateRootNodeConcision( {
        targetX,
        targetY,
        childlessRootNodes,
      } )

      return {
        positionedChildlessNodes,
        sequence,
      }
    },
    [animateRootNodeConcision]
  )
  const addUserInputNode = ( { input, user, position }: any ) => {
    const newNode = {
      id: `user-input-node-${Math.random().toString( 36 ).substr( 2, 9 )}`,
      type: 'userInputNode',
      position: position || { x: 0, y: 0 },
      data: { label: 'New User Input Node', input, user },
    }
    addNodes( newNode )
    return newNode
  }
  const createGroupNodeLayoutWithoutRootNode = useCallback(
    ( { groupId, childNodes }: any ) => {
      const model = groupId.split( '-' )[0]
      const isPersonnel = model === 'personnel'
      const personnelGroupNodeConfig = {
        id: groupId,
        type: 'personnelGroupNode',
        initialHeight: 150,
        initialWidth: 450,
        // zIndex: 1,
        style: {
          width: '450px',
          height: '150px',
          background: 'none',
          border: 'none',
        },
        data: {
          label: groupId,
          name: groupId,
        },
      }

      const constrainedConfig = {
        id: groupId,
        type: 'entityGroupNode',
        data: {
          label: groupId,
          name: groupId,
          type: 'base-config-group',
        },
        initialHeight: GROUP_NODE_DIMENSIONS.height,
        initialWidth: GROUP_NODE_DIMENSIONS.width,
        // zIndex: 1,
        style: {
          width: `${GROUP_NODE_DIMENSIONS.width}px`,
          height: `${GROUP_NODE_DIMENSIONS.height}px`,
        },
      }

      const config = isPersonnel ? personnelGroupNodeConfig : constrainedConfig
      const allNodes = getNodes()

      console.log( "🚀 ~ file: mindmap-context.tsx:784 ~ assignPositionsToChildNodes ~ allNodes:", allNodes )

      const bounds = allNodes?.length ? getNodesBounds( allNodes ) : null

      console.log( "🚀 ~ file: mindmap-context.tsx:788 ~ assignPositionsToChildNodes ~ bounds:", bounds )

      // Decide position of the group node based on existing bounds
      const groupNodePosition = bounds
        ? {
          x: bounds.x + bounds.width + PADDING,
          y: bounds.y,
        }
        : {
          x: 0,
          y: 0,
        }

      const groupNode: any = {
        ...config,
        position: groupNodePosition,
      }

      // Position the child nodes within the group node
      const childNodeWidth = isPersonnel ? 150 : 366.27 // As per the dimensions you provided
      const childNodeHeight = isPersonnel ? 100 : 230.23
      const parentWidth = config.initialWidth
      const parentHeight = config.initialHeight
      const centerX = ( parentWidth - childNodeWidth ) / 2
      const verticalSpacing = 20
      const totalHeight =
        childNodeHeight * childNodes.length + verticalSpacing * ( childNodes.length - 1 )
      let startY = isPersonnel ? 0 : ( parentHeight - totalHeight ) / 2

      const suffix = capitalize( model )
      const groupNodeChildren = childNodes.map( ( childNode: any, index: number ) => {
        startY += childNodeHeight + verticalSpacing
        const cn = {
          ...childNode,
          type: `entityGroupNodeChild${suffix}`,
          position: {
            x: centerX, // Horizontally centered within the group node
            y: isPersonnel ? startY : index * ( childNodeHeight + verticalSpacing ),
          },
          // zIndex: 2,
          hidden: false,
          parentId: groupId,
          className: groupId,
        }
        // if ( !isPersonnel ) {
        cn.extent = 'parent'
        // }
        return cn
      } )

      groupNode.data.children = [...groupNodeChildren]
      return { groupNode, groupNodeChildren }
    },
    [getNodes, getNodesBounds]
  )

  // NOTE: This runs when a user searches from within a root node card



  const renderUserInputResultsLayout = useCallback(
    ( { groupId, sourceNode, results }: any ) => {

      console.log( "🚀 ~ file: mindmap-context.tsx:876 ~ assignPositionsToChildNodes ~ sourceNode:", sourceNode )


      console.log( "🚀 ~ file: mindmap-context.tsx:876 ~ assignPositionsToChildNodes ~ groupId:", groupId )

      const model = capitalize( groupId.split( '-' )[0] )
      const childNodeType = `groupResultsNodeChild${model}`
      const initialConfig = {
        id: groupId,
        type: 'groupResultsNode',
        initialHeight: GROUP_NODE_LANDSCAPE.height,
        initialWidth: GROUP_NODE_LANDSCAPE.width,
        label: groupId,

        // zIndex: 1,
        style: {
          width: `${GROUP_NODE_LANDSCAPE.width}px`,
          height: `${GROUP_NODE_LANDSCAPE.height}px`,
          // height: 'auto',
          // width: 'auto',
        },
        data: {
          sourceNode,
          label: sourceNode.data.type,
          name: groupId,
          type: 'groupResultsNode',
          childrenClassName: childNodeType
        },
      }
      const allNodes = getNodes()
      const bounds = getNodesBounds( allNodes )
      console.log( 'bounds: ', bounds )

      const [{ position }]: any = assignPositionsToChildNodes( sourceNode, [initialConfig] )

      const groupNode: any = {
        ...initialConfig,
        position: {
          y: sourceNode.position.y + sourceNode.initialHeight + 20,
          x: sourceNode.position.x,
        }
      }
      const childNodeWidth = BASE_ENTITY_NODE_WIDTH
      const childNodeHeight = BASE_ENTITY_NODE_HEIGHT
      const parentHeight = GROUP_NODE_LANDSCAPE.height
      const parentWidth = GROUP_NODE_LANDSCAPE.width
      // Horizontal centering (same for all child nodes)
      const centerY = ( parentHeight - childNodeHeight ) / 2

      // Horizontal stacking with spacing (let's assume 20px of spacing between child nodes)
      const horizontalSpacing = 20
      const totalWidth = childNodeWidth * results.length + horizontalSpacing * ( results.length - 1 )
      const startX = ( parentWidth - totalWidth ) / 2

      const groupNodeChildren = results.map( ( childNode: any, index: any ) => ( {
        ...childNode,
        type: childNodeType,
        position: {
          x: startX + index * ( childNodeWidth + horizontalSpacing ), // Horizontal stacking with spacing
          y: centerY, // All child nodes are vertically centered
        },
        style: {
          // transform: `rotateZ(${childNodes.length - index - 1}deg)`,
        },
        // zIndex: 2,
        hidden: false,
        parentId: groupId,
        className: childNodeType,
        extent: 'parent',
      } ) )

      groupNode.data.children = [...groupNodeChildren]

      return { groupNode, groupNodeChildren }
    },
    [assignPositionsToChildNodes, getNodes]
  )

  const addNextEntitiesToMindMap: any = useCallback(
    ( source: any ) => {
      console.log(
        '🚀 ~ file: mindmap-context.tsx:933 ~ assignPositionsToChildNodes ~ source:',
        source
      )
      // const { target } = event
      console.log( 'source: ', source )
      const {
        type: nodeType,
        data: { type: model },
      } = source
      console.log( 'model: ', model )
      const isUserInputNode = nodeType === 'userInputNode'
      console.log(
        '🚀 ~ file: mindmap-context.tsx:941 ~ assignPositionsToChildNodes ~ isUserInputNode:',
        isUserInputNode
      )
      const sourceModelIndex: any = `${model}-root-node`
      console.log( 'sourceModelIndex: ', sourceModelIndex )

      const sourceModelNodesState = rootNodeState[sourceModelIndex]
      const { lastIndex } = sourceModelNodesState

      // Fetch the next batch of child nodes
      const resultNodes = graph[model].nodes.slice( lastIndex, lastIndex + childNodeBatchSize )
      const groupId = `${model}-group-${lastIndex}`

      const { groupNode, groupNodeChildren }: any = isUserInputNode
        ? renderUserInputResultsLayout( { groupId, sourceNode: source, results: resultNodes } )
        : createGroupNodeLayoutWithoutRootNode( { groupId, childNodes: resultNodes } )

      // const incomingEdges = createRootNodeEdge( groupNode, source )
      const edgeId = `${source.id}:${groupId}`


      console.log( "🚀 ~ file: mindmap-context.tsx:964 ~ assignPositionsToChildNodes ~ edgeId:", edgeId )


      const edge = {
        type: 'siblingEdge',
        id: edgeId,
        source: source.id,
        target: groupNode.id,
        sourceHandle: `handle:${edgeId}`,
      }

      const incomingHandles: any = [edge.sourceHandle]//incomingEdges.map( ( edge ) => edge.sourceHandle )

      source.data = {
        ...source.data,

        handles: source.data?.handles?.length
          ? [...source.data.handles, ...incomingHandles]
          : incomingHandles,
        children: source?.data?.children ? [...source?.data?.children, groupNode] : [groupNode],
      }

      updateNodeData( source.id, { ...source.data } )
      // We then need to replace/mutate the corresponding root node is the current state of the graph in order to have Reactflow update the node accordingly
      // const initialRootNodes = [...getNodes().filter( ( node: any ) => node.id !== source.id ), source]

      addNodes( [groupNode, ...groupNodeChildren] )

      // setNodes( ( nds: any ) => [...nds, groupNode, ...groupNodeChildren] )

      setEdges( ( edges: any ) => [...edges, edge] )

      updateChildNodeBatchIndex( sourceModelIndex )

      zoomTo( 2, {
        duration: 500,
      } )
      setCenter( groupNode.position.x, groupNode.position.y, {
        duration: 500,
      } )

      return {
        groupNode,
        groupNodeChildren,
      }
    },
    [
      graph,
      zoomTo,
      setCenter,
      createRootNodeEdges,
      updateChildNodeBatchIndex,
      renderUserInputResultsLayout,
      createGroupNodeLayoutWithoutRootNode,
    ]
  )
  const getRootNodeChildren = useCallback(
    async ( type: any ) => {
      const source: any = `${type}-root-node`
      console.log( 'source: ', source )
      const nodeState = rootNodeState[source]

      const { lastIndex } = nodeState
      // #TODO - add handling for if batch size is greater than remaining child nodes
      const childNodes = graph[type].nodes.slice( lastIndex, lastIndex + childNodeBatchSize )

      // const { x, y, childNodeDirection } = ROOT_NODE_POSITIONS[type]
      const rootNode: any = getNode( source )
      console.log( 'rootNode: ', rootNode )
      const groupId = `${type}-group-${lastIndex}`

      // const { groupNode, groupNodeChildren }: any = createGroupNodeLayout({
      //   groupId,
      //   rootNode,
      //   childNodes,
      // })
      const { groupNode, groupNodeChildren }: any = createGroupNodeLayoutWithoutRootNode( {
        groupId,
        childNodes,
      } )

      const incomingEdges = createRootNodeEdges( [groupNode], source )

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
      const incomingHandles: any = incomingEdges.map( ( edge ) => edge.sourceHandle )
      console.log( 'incomingHandles: ', incomingHandles )
      // rootNode.
      rootNode.data = {
        ...rootNode.data,

        handles: rootNode.data?.handles?.length
          ? [...rootNode.data.handles, ...incomingHandles]
          : incomingHandles,
        children: rootNode?.data?.children ? [...rootNode?.data?.children, groupNode] : [groupNode],
      }

      updateNodeData( rootNode.id, { ...rootNode.data } )

      // const restOfNodes = getNodes().filter(
      //   (node) => !initialNodes.includes(node)
      // )
      // We then need to replace/mutate the corresponding root node is the current state of the graph in order to have Reactflow update the node accordingly
      const initialRootNodes = [...getNodes().filter( ( node: any ) => node.id !== source ), rootNode]

      // So now we set the root nodes with the relevant root node having updated handles, then set the rest of the existing nodes, and then the newest positioned child nodes
      setNodes( ( nds: any ) => [...initialRootNodes, groupNode, ...groupNodeChildren] )

      setEdges( ( edges: any ) => [...edges, ...incomingEdges] )

      updateChildNodeBatchIndex( source )

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

  const [keepLoadedOnMap, setKeepLoadedOnMap] = useState( false )
  const toggleKeepLoaded = useCallback(
    () => setKeepLoadedOnMap( ( keepLoadedOnMap ) => !keepLoadedOnMap ),
    []
  )
  const loadNodesFromTableQuery = useCallback(
    async ( { type, searchResults, searchTerm }: any ) => {
      const source: any = `${type}-root-node`
      const groupId = `${type}-group-${searchTerm}`
      // const { x, y, childNodeDirection } = ROOT_NODE_POSITIONS[type]

      console.log( 'groupId: ', groupId )

      const childNodes = searchResults.map( ( result: any ) => {
        let node = graph[type].nodes.find( ( node: { id: any } ) => node?.id === result.id )
        console.log( 'node: ', node )
        return node
      } )

      const { groupNode, groupNodeChildren }: any = createGroupNodeLayoutWithoutRootNode( {
        groupId,
        childNodes,
      } )

      // Add the group node and its children to the graph
      setNodes( ( nds: any ) => [...nds, groupNode, ...groupNodeChildren] )

      return {
        childNodes: {
          groupNode,
          groupNodeChildren,
        },
      }
    },
    [createGroupNodeLayoutWithoutRootNode, createRootNodeEdges, getNode, getNodes] // runForceSimulation
  )

  const findConnections = useCallback(
    ( node: any ) => {
      const { id } = node
      const { links } = mindMapIntialGraphState
      const currentNodes = getNodes()
      const nodeLinks = links
        .filter( ( link: any ) => link.target === id || link.source === id )
        .map( ( link: any ) => {
          if ( link.target === id ) {
            return link.source
          }
          if ( link.source === id ) {
            return link.target
          }
        } )
      console.log( 'nodeLinks: ', nodeLinks )
      const connections = currentNodes.filter( ( nodeOnMap: any ) => nodeLinks.includes( nodeOnMap.id ) )
      const handles = connections.map( ( connection: any ) => createRootNodeEdge( node, connection ) )
      console.log( 'connections: ', connections )
      console.log( 'handles: ', handles )
      updateNodeData( node.id, { ...node.data, handles } )
      addEdges( handles )
      return connections
    },
    [addEdges, createRootNodeEdge, getNodes, mindMapIntialGraphState, updateNodeData]
  )

  //  useEffects --------------------------------------------------------------------------------------
  useEffect( () => {
    const formattedGraphNodesObject: any = {}

    for ( let key in graph3d ) {
      // @ts-ignore
      const graphModel = graph3d[key]
      console.log( { graphModel } )
      let tempNodes = graphModel.nodes.map( createRootNodeChild )
      let tempLinks = [].concat(
        // @ts-ignore
        ...Object.keys( graphModel.links ).map( ( key ) => {
          const links = graphModel.links[key].connectedTo
          return [...links]
        } )
      )
      formattedGraphNodesObject[key] = {
        nodes: tempNodes,
        edges: tempLinks,
      }
    }

    setGraph( formattedGraphNodesObject )

    const IN = graph3d.root.nodes.map( createRootNode )
    setNodes( [] )
    // setInitialNodes(IN)
    setEdges( [] )
  }, [createRootNode, createRootNodeChild, graph3d] )

  //  Graph State Functions --------------------------------------------------------------------------------------

  const onNodesChange: OnNodesChange = useCallback(
    ( chs ) => {
      setNodes( ( nds: Node[] ) => applyNodeChanges( chs, nds ) )
    },
    [setNodes]
  )

  const onEdgesChange: OnEdgesChange = useCallback( ( chs ) => {
    setEdges( ( eds: Edge[] ) => applyEdgeChanges( chs, eds ) )
  }, [] )

  const onConnect: OnConnect = useCallback(
    ( params ) => setEdges( ( eds: any ) => addEdge( params, eds ) ),
    []
  )

  const adjustViewport = useCallback(
    ( { x, y, zoom = 0, duration = 800 }: any ) => {
      setViewport( { x, y, zoom }, { duration } )
    },
    [setViewport]
  )

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
        loadNodesFromTableQuery,
        keepLoadedOnMap,
        toggleKeepLoaded,
        addLocationsToVisualize,
        showLocationVisualization,
        toggleLocationVisualization,
        locationsToVisualize,
        closeLocationVisualization,
        addUserInputNode,
        findConnections,
        activeNode,
        updateActiveNode,
        addNextEntitiesToMindMap,
        detectNodeOverlap,
        updateMindMapInstance,
        mindMapInstance,
        saveMindMap,
        restore,
        getIntersectingNodes,
        isNodeIntersecting,
        toggleConciseView,
        turnOffConciseView,
        updateNodeData,
        getNodesBounds,
        turnOnConciseView,
        conciseViewActive,
        renderRootNodeConciseLayout,
        createSearchResultsLayout,
      }}>
      <div id='mindmap-container'>{children}</div>
    </MindMapContext.Provider>
  )
}

export const useMindMap: any = () => {
  const context = useContext( MindMapContext )

  return context
}
export type { AddConnectionNodesFromSearchParams }
