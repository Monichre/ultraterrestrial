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



  const handleLoadingRecords = useCallback(
    ( { data: { type } }: any ) => {
      const amount = type === 'events' ? '4' : '3'


      const calculateCenterOfScreen = useCallback( () => {
        const centerX = window.innerWidth / 2
        const centerY = window.innerHeight / 2
        return { x: centerX, y: centerY }
      }, [] )
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
    [addConnectionNodesFromSearch, addNodes, addEdges]
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
      <EnhanceAIInput addDataToMindMap={handleLoadingRecords} modelActions={modelActions}
      />
      {/* <Oracle modelActions={modelActions} modelActionMap={modelActionMap} activeModel={activeModel} /> */}
      {/* EnhancedAIInput */}

    </div>
  )
}

// {/* <div className="react-flow__panel sm:w-96 fixed z-50 overflow-visible m-0 w-full will-change-content duration-200 bottom-safe sm:absolute sm:mx-0 sm:mb-2 bottom center" style="pointer-events: all;"> */}
// const OracleCloneClosed = ()  => {
//   return (
//     <div datatype="disable-hover" className="absolute -top-8 left-1 flex max-w-[calc(100%-4px)] gap-2 px-3 md:px-0" style="transform: none; transform-origin: 50% 50% 0px;"><div datatype="disable-hover" className="cursor-pointer hover:shadow-sm hover:shadow-indigo-500/50 hover:ring-indigo-500/50 group/tab mb-1 relative flex w-fit items-center gap-3 rounded-xl bg-neutral-100 px-2 py-1 text-xs ring-1 ring-neutral-200 duration-200 dark:bg-neutral-800 dark:ring-neutral-700"><div className="group-hover/tab:shadow-sm group-hover/tab:shadow-indigo-500 group-hover/tab:ring-indigo-500/50 pointer-events-none absolute inset-y-0 left-0 flex aspect-square h-full items-center justify-center overflow-hidden rounded-full bg-neutral-200 ring-1 ring-neutral-300 duration-200 dark:bg-neutral-700 dark:ring-neutral-700"><div className="scale-75"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-sparkles size-4"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg></div></div><p className="ml-5 select-none text-opacity-75 duration-200 group-hover/tab:text-opacity-100 line-clamp-1 max-w-full text-ellipsis pointer-events-none" data-state="closed">Oracle Mode</p></div></div><div className="relative flex items-center justify-center"><div className="md:rounded-5/2xl border dark:border-neutral-500/40 bg-neutral-800 dark:bg-neutral-100 border-transparent flex gap-2 items-center relative w-full p-2 px-2.5 duration-200"><button className="relative flex items-center justify-center p-2"><div className="_flo_ring_1c1hr_13 rounded-full size-5 shadow-[0_0_0_0.25rem] shadow-neutral-100 dark:shadow-neutral-900 duration-200 ease-out"></div></button><textarea className="placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-neutral-100 dark:text-neutral-900 mark-scroll-bar bg-transparent placeholder:text-sm text-sm w-full resize-none outline-none" enterkeyhint="send" placeholder="Oracle is ready｜Tap '/' for more options" style="height: 20px !important;" data-listener-added_58f2817e="true"></textarea><sider-quick-compose-btn data-gpts-theme="light"></sider-quick-compose-btn></div></div>
//   )
// }
// const OracleCloneOpen = () => {
//   return (
//     // <div
//     //   className='react-flow__panel bg-neutral-100 ring-1 ring-neutral-200 rounded-3xl p-1.5 sm:w-96 fixed z-50 overflow-visible m-0 w-full will-change-content duration-200 bottom-safe sm:absolute sm:mx-0 sm:mb-2 bottom center'
//     //   style='pointer-events: all;'
//     // >
//       <div
//         datatype='disable-hover'
//         className='absolute -top-8 left-1 flex max-w-[calc(100%-4px)] gap-2 px-3 md:px-0'
//         style='transform: none; transform-origin: 50% 50% 0px;'
//       >
//         <div
//           datatype='disable-hover'
//           className='cursor-pointer hover:shadow-sm hover:shadow-indigo-500/50 hover:ring-indigo-500/50 group/tab mb-1 relative flex w-fit items-center gap-3 rounded-xl bg-neutral-100 px-2 py-1 text-xs ring-1 ring-neutral-200 duration-200 dark:bg-neutral-800 dark:ring-neutral-700'
//         >
//           <div className='group-hover/tab:shadow-sm group-hover/tab:shadow-indigo-500 group-hover/tab:ring-indigo-500/50 pointer-events-none absolute inset-y-0 left-0 flex aspect-square h-full items-center justify-center overflow-hidden rounded-full bg-neutral-200 ring-1 ring-neutral-300 duration-200 dark:bg-neutral-700 dark:ring-neutral-700'>
//             <div className='scale-75'>
//               <svg
//                 xmlns='http://www.w3.org/2000/svg'
//                 width='24'
//                 height='24'
//                 viewBox='0 0 24 24'
//                 fill='none'
//                 stroke='currentColor'
//                 strokeWidth='2'
//                 stroke-linecap='round'
//                 stroke-linejoin='round'
//                 className='lucide lucide-sparkles size-4'
//               >
//                 <path d='m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z'></path>
//                 <path d='M5 3v4'></path>
//                 <path d='M19 17v4'></path>
//                 <path d='M3 5h4'></path>
//                 <path d='M17 19h4'></path>
//               </svg>
//             </div>
//           </div>
//           <p
//             className='ml-5 select-none text-opacity-75 duration-200 group-hover/tab:text-opacity-100 line-clamp-1 max-w-full text-ellipsis pointer-events-none'
//             data-state='closed'
//           >
//             Oracle Mode
//           </p>
//         </div>
//       </div>
//       <div
//         className='relative mb-1.5 space-y-1.5'
//         style='height: auto; opacity: 1; overflow: visible; will-change: auto;'
//       >
//         <p className='flex flex-col rounded-5/2xl bg-neutral-200/50 p-3 px-4 text-sm font-medium ring-1 ring-neutral-200'>
//           <span className='font-mono text-[0.65rem] font-medium leading-3 text-neutral-400'>
//             Goal:
//           </span>
//           <span className='scrollbar-hide line-clamp-5 overflow-y-auto border-b border-transparent text-neutral-500'>
//             Research the Taurid Meteor Shower
//           </span>
//         </p>
//         <div
//           className='scrollbar-hide flex h-48 max-h-48 flex-col items-stretch gap-2 overflow-y-auto rounded-5/2xl bg-white p-3 py-4 shadow outline-none'
//           tabindex='0'
//         >
//           <div
//             className='flex items-center justify-between rounded-xl bg-neutral-100 p-0.5 text-sm font-medium'
//             style=''
//           >
//             <div className='flex h-full flex-1 items-center'>
//               <div
//                 role='button'
//                 tabindex='0'
//                 aria-disabled='false'
//                 aria-roledescription='sortable'
//                 aria-describedby='DndDescribedBy-0'
//                 className='drag-handle my-1 ml-1 inline-flex aspect-square size-6 cursor-grab items-center justify-center rounded-full bg-neutral-200 text-neutral-500'
//               >
//                 <svg
//                   xmlns='http://www.w3.org/2000/svg'
//                   width='24'
//                   height='24'
//                   viewBox='0 0 24 24'
//                   fill='none'
//                   stroke='currentColor'
//                   strokeWidth='2'
//                   stroke-linecap='round'
//                   stroke-linejoin='round'
//                   className='lucide lucide-grip size-3 stroke-[2.5px]'
//                 >
//                   <circle cx='12' cy='5' r='1'></circle>
//                   <circle cx='19' cy='5' r='1'></circle>
//                   <circle cx='5' cy='5' r='1'></circle>
//                   <circle cx='12' cy='12' r='1'></circle>
//                   <circle cx='19' cy='12' r='1'></circle>
//                   <circle cx='5' cy='12' r='1'></circle>
//                   <circle cx='12' cy='19' r='1'></circle>
//                   <circle cx='19' cy='19' r='1'></circle>
//                   <circle cx='5' cy='19' r='1'></circle>
//                 </svg>
//               </div>
//               <textarea
//                 className='h-full flex-1 resize-none bg-neutral-100 px-1.5 py-[0.2rem] text-xs text-neutral-500 font-sans line-clamp-2 overflow-hidden'
//                 readonly=''
//                 style='height: 37.6px !important;'
//               >
//                 Conduct an online search to gather general information about the
//                 Taurid Meteor Shower, including its origin, peak times, location
//                 visibility, and historical significance. Collect data and recent
//                 studies about the frequencies, brightness, and trajectory of
//                 meteors in the Taurid Meteor Shower.
//               </textarea>
//             </div>
//             <button className='flex aspect-square size-6 items-center overflow-hidden justify-center rounded-full p-0.5 mr-1 border bg-white text-neutral-400'>
//               <svg
//                 xmlns='http://www.w3.org/2000/svg'
//                 width='24'
//                 height='24'
//                 viewBox='0 0 24 24'
//                 fill='none'
//                 stroke='currentColor'
//                 strokeWidth='2'
//                 stroke-linecap='round'
//                 stroke-linejoin='round'
//                 className='lucide lucide-trash2 size-3 rounded-full stroke-[2.5px]'
//               >
//                 <path d='M3 6h18'></path>
//                 <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6'></path>
//                 <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2'></path>
//                 <line x1='10' x2='10' y1='11' y2='17'></line>
//                 <line x1='14' x2='14' y1='11' y2='17'></line>
//               </svg>
//             </button>
//           </div>
//           <div
//             className='flex items-center justify-between rounded-xl bg-neutral-100 p-0.5 text-sm font-medium'
//             style=''
//           >
//             <div className='flex h-full flex-1 items-center'>
//               <div
//                 role='button'
//                 tabindex='0'
//                 aria-disabled='false'
//                 aria-roledescription='sortable'
//                 aria-describedby='DndDescribedBy-0'
//                 className='drag-handle my-1 ml-1 inline-flex aspect-square size-6 cursor-grab items-center justify-center rounded-full bg-neutral-200 text-neutral-500'
//               >
//                 <svg
//                   xmlns='http://www.w3.org/2000/svg'
//                   width='24'
//                   height='24'
//                   viewBox='0 0 24 24'
//                   fill='none'
//                   stroke='currentColor'
//                   strokeWidth='2'
//                   stroke-linecap='round'
//                   stroke-linejoin='round'
//                   className='lucide lucide-grip size-3 stroke-[2.5px]'
//                 >
//                   <circle cx='12' cy='5' r='1'></circle>
//                   <circle cx='19' cy='5' r='1'></circle>
//                   <circle cx='5' cy='5' r='1'></circle>
//                   <circle cx='12' cy='12' r='1'></circle>
//                   <circle cx='19' cy='12' r='1'></circle>
//                   <circle cx='5' cy='12' r='1'></circle>
//                   <circle cx='12' cy='19' r='1'></circle>
//                   <circle cx='19' cy='19' r='1'></circle>
//                   <circle cx='5' cy='19' r='1'></circle>
//                 </svg>
//               </div>
//               <textarea
//                 className='h-full flex-1 resize-none bg-neutral-100 px-1.5 py-[0.2rem] text-xs text-neutral-500 font-sans line-clamp-2 overflow-hidden'
//                 readonly=''
//                 style='height: 37.6px !important;'
//               >
//                 Analyze the collected data to identify patterns or noteworthy
//                 information regarding the Taurid Meteor Shower's visibility and
//                 any potential impact on Earth.
//               </textarea>
//             </div>
//             <button className='flex aspect-square size-6 items-center overflow-hidden justify-center rounded-full p-0.5 mr-1 border bg-white text-neutral-400'>
//               <svg
//                 xmlns='http://www.w3.org/2000/svg'
//                 width='24'
//                 height='24'
//                 viewBox='0 0 24 24'
//                 fill='none'
//                 stroke='currentColor'
//                 strokeWidth='2'
//                 stroke-linecap='round'
//                 stroke-linejoin='round'
//                 className='lucide lucide-trash2 size-3 rounded-full stroke-[2.5px]'
//               >
//                 <path d='M3 6h18'></path>
//                 <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6'></path>
//                 <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2'></path>
//                 <line x1='10' x2='10' y1='11' y2='17'></line>
//                 <line x1='14' x2='14' y1='11' y2='17'></line>
//               </svg>
//             </button>
//           </div>
//           <div
//             className='flex items-center justify-between rounded-xl bg-neutral-100 p-0.5 text-sm font-medium'
//             style=''
//           >
//             <div className='flex h-full flex-1 items-center'>
//               <div
//                 role='button'
//                 tabindex='0'
//                 aria-disabled='false'
//                 aria-roledescription='sortable'
//                 aria-describedby='DndDescribedBy-0'
//                 className='drag-handle my-1 ml-1 inline-flex aspect-square size-6 cursor-grab items-center justify-center rounded-full bg-neutral-200 text-neutral-500'
//               >
//                 <svg
//                   xmlns='http://www.w3.org/2000/svg'
//                   width='24'
//                   height='24'
//                   viewBox='0 0 24 24'
//                   fill='none'
//                   stroke='currentColor'
//                   strokeWidth='2'
//                   stroke-linecap='round'
//                   stroke-linejoin='round'
//                   className='lucide lucide-grip size-3 stroke-[2.5px]'
//                 >
//                   <circle cx='12' cy='5' r='1'></circle>
//                   <circle cx='19' cy='5' r='1'></circle>
//                   <circle cx='5' cy='5' r='1'></circle>
//                   <circle cx='12' cy='12' r='1'></circle>
//                   <circle cx='19' cy='12' r='1'></circle>
//                   <circle cx='5' cy='12' r='1'></circle>
//                   <circle cx='12' cy='19' r='1'></circle>
//                   <circle cx='19' cy='19' r='1'></circle>
//                   <circle cx='5' cy='19' r='1'></circle>
//                 </svg>
//               </div>
//               <textarea
//                 className='h-full flex-1 resize-none bg-neutral-100 px-1.5 py-[0.2rem] text-xs text-neutral-500 font-sans line-clamp-2 overflow-hidden'
//                 readonly=''
//                 style='height: 37.6px !important;'
//               >
//                 Summarize the findings in a report, highlighting key aspects of
//                 the Taurid Meteor Shower such as best viewing times, historical
//                 events, and scientific insights.
//               </textarea>
//             </div>
//             <button className='flex aspect-square size-6 items-center overflow-hidden justify-center rounded-full p-0.5 mr-1 border bg-white text-neutral-400'>
//               <svg
//                 xmlns='http://www.w3.org/2000/svg'
//                 width='24'
//                 height='24'
//                 viewBox='0 0 24 24'
//                 fill='none'
//                 stroke='currentColor'
//                 strokeWidth='2'
//                 stroke-linecap='round'
//                 stroke-linejoin='round'
//                 className='lucide lucide-trash2 size-3 rounded-full stroke-[2.5px]'
//               >
//                 <path d='M3 6h18'></path>
//                 <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6'></path>
//                 <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2'></path>
//                 <line x1='10' x2='10' y1='11' y2='17'></line>
//                 <line x1='14' x2='14' y1='11' y2='17'></line>
//               </svg>
//             </button>
//           </div>
//         </div>
//         <div id='DndDescribedBy-0' style='display: none;'>
//           To pick up a draggable item, press the space bar. While dragging, use
//           the arrow keys to move the item. Press space again to drop the item in
//           its new position, or press escape to cancel.
//         </div>
//         <div
//           id='DndLiveRegion-0'
//           role='status'
//           aria-live='assertive'
//           aria-atomic='true'
//           style='position: fixed; width: 1px; height: 1px; margin: -1px; border: 0px; padding: 0px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); clip-path: inset(100%); white-space: nowrap;'
//         ></div>
//         <p className='flex select-none justify-between px-1.5 font-mono text-[0.65rem] text-neutral-400 dark:text-neutral-800'>
//           <span>Review this recipe</span>
//           <button>
//             Share to Community
//             <svg
//               width='15'
//               height='15'
//               viewBox='0 0 15 15'
//               fill='none'
//               xmlns='http://www.w3.org/2000/svg'
//               className='inline size-3.5'
//             >
//               <path
//                 d='M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z'
//                 fill='currentColor'
//                 fill-rule='evenodd'
//                 clip-rule='evenodd'
//               ></path>
//             </svg>
//           </button>
//         </p>
//         <div className='relative w-full overflow-hidden rounded-5/2xl border p-1.5 text-neutral-400'>
//           <div
//             className='absolute left-0 top-0 -z-10 size-full origin-left rounded-5/2xl bg-neutral-200'
//             style='transform: none;'
//           ></div>
//           <div
//             className='flex w-full items-center justify-between rounded-5/2xl text-neutral-400'
//             style='will-change: auto; transform: none;'
//           >
//             <div className='flex items-center gap-1'>
//               <button
//                 className='inline-flex items-center justify-center rounded-full border bg-neutral-50 p-1.5 hover:bg-white'
//                 data-state='closed'
//               >
//                 <svg
//                   xmlns='http://www.w3.org/2000/svg'
//                   width='24'
//                   height='24'
//                   viewBox='0 0 24 24'
//                   fill='none'
//                   stroke='currentColor'
//                   strokeWidth='2'
//                   stroke-linecap='round'
//                   stroke-linejoin='round'
//                   className='lucide lucide-plus inline size-3 stroke-[2.5px]'
//                 >
//                   <path d='M5 12h14'></path>
//                   <path d='M12 5v14'></path>
//                 </svg>
//               </button>
//             </div>
//             <div className='flex items-center gap-1'>
//               <button className='inline-flex items-center justify-center rounded-xl border bg-neutral-50 p-1 px-2 text-[0.65rem] font-medium hover:bg-white'>
//                 Cancel
//               </button>
//               <button className='inline-flex items-center justify-center rounded-xl border bg-neutral-700 p-1 px-2 text-[0.65rem] font-medium text-neutral-200 hover:bg-black disabled:bg-neutral-600'>
//                 Confirm &amp; Run
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className='relative flex items-center justify-center'>
//         <div className='absolute inset-0 scale-50 rounded-full size-full bg-red-500/70 bg-gradient-to-r from-blue-500/70 to-teal-500/70 blur-2xl'></div>
//         <div className='md:rounded-5/2xl border dark:border-neutral-500/40 bg-neutral-800 dark:bg-neutral-100 border-transparent flex gap-2 items-center relative w-full p-2 px-2.5 duration-200'>
//           <button className='relative flex items-center justify-center p-2'>
//             <div className='_flo_ring_1c1hr_13 rounded-full opacity-0 size-5 shadow-[0_0_0_0.25rem] shadow-neutral-100 dark:shadow-neutral-900 duration-200 ease-out'></div>
//             <svg
//               className='absolute left-1 top-1 size-7 stroke-indigo-400 stroke-[16px]'
//               viewBox='0 0 100 100'
//               style='fill: none; stroke-dashoffset: 0; stroke-linecap: round; stroke-linejoin: round; transform: translateZ(0px);'
//             >
//               <circle
//                 cx='50'
//                 cy='50'
//                 r='40'
//                 className='stroke-neutral-500/20'
//                 style='stroke-dasharray: 254.469px, 282.743px; transform: rotate(252deg) scaleY(-1); transition: 1s; transform-origin: 50px 50px;'
//               ></circle>
//               <circle
//                 cx='50'
//                 cy='50'
//                 r='40'
//                 style='stroke-dasharray: 0px, 282.743px; transition: stroke-dasharray 1s, transform; transform: rotate(-90deg); transform-origin: 50px 50px;'
//               ></circle>
//             </svg>
//           </button>
//           <p className='flex flex-col justify-center w-full text-left'>
//             <div className='flex items-center justify-between'>
//               <div className='flex flex-col gap-1 pointer-events-none'>
//                 <span className='overflow-x-auto text-sm scrollbar-hide line-clamp-1 text-neutral-100 dark:text-neutral-900'>
//                   Conduct an online search to gather general information about
//                   the Taurid Meteor Shower, including its origin, peak times,
//                   location visibility, and historical significance. Collect data
//                   and recent studies about the frequencies, brightness, and
//                   trajectory of meteors in the Taurid Meteor Shower.
//                 </span>
//                 <span className='text-xs text-neutral-400 dark:text-neutral-900'>
//                   Oracle is using tools to complete sub-tasks.
//                 </span>
//               </div>
//               <div
//                 className='flex items-center justify-center p-1 duration-200 rounded-full group hover:bg-yellow-200/10 dark:hover:bg-yellow-800/10'
//                 data-state='closed'
//               >
//                 <p className='inline-flex items-center justify-center font-mono text-xs font-semibold duration-200 border-2 rounded-full select-none size-5 shrink-0 border-yellow-200/40 text-yellow-200/40 group-hover:scale-90 dark:border-yellow-800/10 dark:text-yellow-800/40'>
//                   3
//                 </p>
//               </div>
//             </div>
//           </p>
//         </div>
//       </div>
//     // </div>
//   )
// }