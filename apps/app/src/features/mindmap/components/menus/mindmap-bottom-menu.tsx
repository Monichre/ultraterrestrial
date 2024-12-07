'use client'
import {
  EventsIcon,
  KeyFiguresIcon,
  OrganizationsIcon,
  TestimoniesIcon,
  TopicsIcon,
} from '@/components/icons/entity-icons'
import { useMindMap } from '@/contexts'
import { initiateDatabaseTableQuery } from '@/features/mindmap/api/search'
import { DOMAIN_MODEL_COLORS } from '@/utils/constants'
// import { x, y } from '@liveblocks/react/dist/suspense-fYGGJ3D9'
import { useCallback, useRef } from 'react'
// import { computed } from 'tldraw'
import { v4 as uuidv4 } from 'uuid'



import { EnhanceAIInput } from '@/features/ai/components/ai-inputs/enhance-ai-input'


export const MindMapBottomMenu = () => {

  const {
    addNextEntitiesToMindMap,
    loadNodesFromTableQuery,
    addConnectionNodesFromSearch,
    addUserInputNode,
    addNodes,
    updateNodeData,
    addEdges,
    screenToFlowPosition,
    retrieveEntitiesFromStore,
    organizeLayout,
    setEdges,
    setNodes,
    getNodes,
    updateNode,
    getNodesBounds
  } = useMindMap()


  // const [isExpanded, setIsExpanded] = useState( false )
  const idCounter = useRef( 0 )
  const getNextId = useCallback( () => {
    idCounter.current += 1
    return `userInputNode-${idCounter.current}`
  }, [] )

  const calculateCenterOfScreen = useCallback( () => {
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    return { x: centerX, y: centerY }
  }, [] )


  const handleLoadingRecords = useCallback(
    ( { data: { type } }: any ) => {
      const amount = type === 'events' ? '4' : '3'





      const center = screenToFlowPosition( calculateCenterOfScreen() )


      // Function to get the next sequential ID
      const entities = retrieveEntitiesFromStore( type )
      const potentialUserNode: any = {
        // id: uuidv4(),
        id: getNextId(),
        type: 'userInputNode',
        position: {
          ...center
        },
        data: {
          label: 'Your Query',
          input: `Beginning your exploration by loading 3 ${type}. Fetching Data...`,
          entities,
          type: type,
        },
      }

      const nodes = getNodes() // Replace with the appropriate method to retrieve nodes
      const existingUserInputNodes = nodes
        .filter( ( node: any ) => node.type === 'userInputNode' && node.id !== potentialUserNode.id )
        .sort( ( a: any, b: any ) => {
          // Assuming IDs are in the format 'userInputNode-<number>'
          const aNum = parseInt( a.id.split( '-' )[1], 10 )
          const bNum = parseInt( b.id.split( '-' )[1], 10 )
          return aNum - bNum
        } )

      // If there is at least one existing userInputNode, create an edge from the last one to the new one
      let lastUserInputNode = existingUserInputNodes.length > 0 ? existingUserInputNodes[existingUserInputNodes.length - 1] : null


      if ( !lastUserInputNode ) {
        lastUserInputNode = potentialUserNode
        addNodes( lastUserInputNode )
      }


      let x = -600
      console.log( "🚀 ~ file: mindmap-bottom-menu.tsx:135 ~ MindMapBottomMenu ~ x:", x )
      setNodes( nds => [...nds, ...entities.map( ( entity: any ) => ( {
        ...entity,
        type: 'entityNode',
        position: {
          x: x += 200,
          y: 350
        },
        parentId: lastUserInputNode?.id || null,

      } ) )] )


      setEdges( edges => [...edges, ...entities.map( ( entity: any ) => ( {
        id: `${lastUserInputNode?.id}-${entity.id}`,
        source: lastUserInputNode?.id,
        target: entity.id,
        type: 'smoothstep'
      } ) )] )

      // organizeLayout()

      // setNodes( nds => [...nds, ...childNodes] )


      // for ( const childNode of childNodes ) {
      //   console.log( "🚀 ~ file: mindmap-command-center.tsx:94 ~ MindMapBottomMenu ~ childNode:", childNode )
      //   addMindmapChildNode( { parentNode: userNode, type, childNode, } )
      // }


      // addNextEntitiesToMindMap( userNode )
    },
    [, retrieveEntitiesFromStore, screenToFlowPosition, updateNode, addNodes, setNodes, setEdges]
  )

  const runSearch = useCallback(
    async ( { type, searchTerm }: any ) => {

      const userNode: any = {
        id: uuidv4(),
        type: 'userInputNode',
        position: { x: 0, y: 0 },
        data: { label: 'Your Query', input: searchTerm },
      }
      addNodes( userNode )
      // relatedRecords: relatedResults

      const response: any = await initiateDatabaseTableQuery( {
        table: type,
        keyword: searchTerm,
      } )

      const {
        suggestedSearchResult: { record },
        relatedResults,
        totalCount,
      } = response

      const childNode: any = {
        id: record?.id,
        type: `${type}Node`,
        data: {
          type,
          ...record,
        },
        position: {
          x: 0,
          y: userNode.position.y + 380,
        },
      }
      const edgeId = `${userNode.id}-${childNode.id}`
      const sourceHandle = `handle:${edgeId}`

      const edge: any = {
        id: edgeId,
        source: userNode.id,
        target: childNode.id,
        sourceHandle: sourceHandle,
        animated: true,
        type: 'sequential',
        label: `You searched for ${searchTerm} within ${type}`,
        style: {
          stroke: DOMAIN_MODEL_COLORS[type],
        },
      }
      updateNodeData( userNode.id, { handles: [sourceHandle] } )

      addNodes( childNode )
      addEdges( edge )

      // addConnectionNodesFromSearch({
      //   source,
      //   searchResults: [record],
      // })
      // loadNodesFromTableQuery({
      //   type,
      //   searchResults: results,
      //   searchTerm: searchTerm.trim().replace(/ /g, ''),
      // })
    },
    [addConnectionNodesFromSearch, addNodes, addEdges,]
  )

  const modelActions = [
    {
      icon: <EventsIcon className='w-4 h-4' />,
      label: 'Add Events',
      name: 'Events',
      searchAction: async ( searchTerm: string ) => {
        const res = await runSearch( { type: 'events', searchTerm } )

      },


    },
    {
      icon: <TopicsIcon className='w-4 h-4' />,
      label: 'Add Topics',
      name: 'Topics',
      searchAction: async ( searchTerm: string ) => {
        const res = await runSearch( { type: 'topics', searchTerm } )

      },




    },
    {
      icon: <KeyFiguresIcon className='w-4 h-4' />,
      label: 'Add KeyFigures',
      name: 'personnel',
      searchAction: async ( searchTerm: string ) => {
        const res = await runSearch( { type: 'personnel', searchTerm } )

      },




    },
    {
      icon: <TestimoniesIcon className='w-4 h-4' />,
      label: 'Add Testimonies',
      name: 'Testimonies',
      searchAction: async ( searchTerm: string ) => {
        const res = await runSearch( { type: 'testimonies', searchTerm } )

      },




    },
    {
      icon: <OrganizationsIcon className='w-4 h-4' />,
      label: 'Add Organizations',
      name: 'Organizations',
      searchAction: async ( searchTerm: string ) => {
        const res = await runSearch( { type: 'organizations', searchTerm } )

      },




    },
  ]


  const addDataToMindMap = ( model: string ) => {
    handleLoadingRecords( { data: { type: model } } )
  }


  return (

    <div className='flex justify-center w-full'>

      {/* <AiCommandInput /> */}
      <EnhanceAIInput addDataToMindMap={addDataToMindMap} modelActions={modelActions}
      />
      {/* <Oracle modelActions={modelActions} modelActionMap={modelActionMap} activeModel={activeModel} /> */}
      {/* EnhancedAIInput */}

    </div>
  )
}
