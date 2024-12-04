/**
 * v0 by Vercel.
 * @see https://v0.dev/t/aLUPWlh
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  FloatingPanelBody,
  FloatingPanelButton,
  FloatingPanelCloseButton,
  FloatingPanelContent,
  FloatingPanelFooter,
  FloatingPanelForm,
  FloatingPanelRoot,
  FloatingPanelSubmitButton,
  FloatingPanelTextarea,
  FloatingPanelTrigger
} from '@/components/animated'

import {
  ArtifactsIcon,
  EventsIcon,
  KeyFiguresIcon,
  OrganizationsIcon,
  SketchyGlobe,
  TestimoniesIcon,
  TopicsIcon
} from '@/components/icons'
import { Button } from '@/components/ui/button'
import { useMindMap } from '@/contexts/mindmap-context'
import { saveEventForUser } from '@/features/user/api/save-event'
import { useAuth } from '@clerk/nextjs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDownToLine, FileSearch, Lightbulb, Plus } from 'lucide-react'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type JSX,
  type SVGProps,
} from 'react'

export const QuickActionsFloatingPanel = () => {

  const idCounter = useRef( 0 )

  // Function to get the next sequential ID
  const getNextId = useCallback( () => {
    idCounter.current += 1
    return `userInputNode-${idCounter.current}`
  }, [] )

  const { addNextEntitiesToMindMap, addNodes, retrieveEntitiesFromStore, addEdges, screenToFlowPosition, getNodes, setNodes, setEdges } = useMindMap()
  //cc:loadingRecordsIntoMindMap[MindMapSideMenu]#1;handleLoadingRecord => addNextEntitiesToMindMap
  const handleLoadingRecords = useCallback(
    async ( rootNodeSim: any ) => {


      const calculateCenterOfScreen = () => {
        const centerX = window.innerWidth / 2
        const centerY = window.innerHeight / 2
        return { x: centerX, y: centerY }
      }


      const center = screenToFlowPosition( calculateCenterOfScreen() )

      const { data: { type } } = rootNodeSim
      const amount = type === 'events' ? '4' : '3'

      // const userNode: any = {
      //   // Start of Selection
      //   id: getNextId(),
      //   type: 'userInputNode',
      //   position: {
      //     ...center
      //   },
      //   data: {
      //     label: 'Your Query',
      //     input: `Loading ${amount} ${type}.`,
      //     entities: null,
      //     type: type,
      //   },
      // }
      // addNodes( userNode )
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
      // if ( lastUserInputNode ) {
      //   const edge = {
      //     id: `${lastUserInputNode.id}-${userNode.id}`,
      //     source: lastUserInputNode.id,
      //     target: userNode.id,
      //     type: 'step'
      //   }
      //   addEdges( edge )
      // }

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
      // const
      // const { groupNode, groupNodeChildren } = await addNextEntitiesToMindMap( rootNodeSim )

      // if ( groupNode && groupNodeChildren ) {
      //   // const newEdges = groupNodeChildren.map( ( entity: any ) => ( {

      //   //   id: `${userNode.id}-${entity.id}`,
      //   //   source: userNode.id,
      //   //   target: entity.id,
      //   //   type: 'smooth'


      //   // } ) )
      //   const edge = {
      //     id: `${userNode.id}-${groupNode.id}`,
      //     source: userNode.id,
      //     target: groupNode.id,
      //     type: 'step'
      //   }
      //   addEdges( edge )
      // }


    },
    [addEdges, addNextEntitiesToMindMap, addNodes, screenToFlowPosition]
  )



  const actions = [
    {
      icon: <EventsIcon className='w-4 h-4' />,
      label: 'Events',
      action: async () => {
        await handleLoadingRecords( { data: { type: 'events' } } )
      },
    },
    {
      icon: <TopicsIcon className='w-4 h-4' />,
      label: 'Topics',
      action: async () => {
        await handleLoadingRecords( { data: { type: 'topics' } } )
      },
    },
    {
      icon: <KeyFiguresIcon className='w-4 h-4' />,
      label: 'KeyFigures',
      action: async () => {
        await handleLoadingRecords( { data: { type: 'personnel' } } )
      },
    },
    {
      icon: <TestimoniesIcon className='w-4 h-4' />,
      label: 'Testimonies',
      action: async () => {
        await handleLoadingRecords( { data: { type: 'testimonies' } } )
      },
    },
    {
      icon: <OrganizationsIcon className='w-4 h-4' />,
      label: 'Organizations',
      action: async () => {
        await handleLoadingRecords( { data: { type: 'organizations' } } )
      },
    },
    {
      icon: <FileSearch className='w-4 h-4' />,
      label: 'Case Files',
      action: async () => {
        await handleLoadingRecords( { data: { type: 'documents' } } )
      },
    },
    {
      icon: <ArtifactsIcon className='w-4 h-4' />,
      label: 'Historical Artifacts',
      action: async () => {
        await handleLoadingRecords( { data: { type: 'artifacts' } } )
      },
    },
  ]

  return (
    <FloatingPanelRoot>
      <FloatingPanelTrigger
        title='Entity Menu'
        className='flex items-center space-x-4 px-4 py-2 dark:bg-black text-white rounded-md transition-colors text-center'
      >
        <Plus className='w-5 h-5 stroke-1' />
      </FloatingPanelTrigger>
      <FloatingPanelContent className='w-56 bg-black'>
        <FloatingPanelBody>
          <AnimatePresence>
            {actions.map( ( action, index ) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: index * 0.1 }}
              >
                <FloatingPanelButton
                  onClick={action.action}
                  className='w-full flex items-center space-x-1 space-y-2 px-2 py-1 bg-black text-white'
                >
                  {action.icon}
                  <span>{action.label}</span>
                </FloatingPanelButton>
              </motion.div>
            ) )}
          </AnimatePresence>
        </FloatingPanelBody>
        <FloatingPanelFooter>
          <FloatingPanelCloseButton />
        </FloatingPanelFooter>
      </FloatingPanelContent>
    </FloatingPanelRoot>
  )
}

export function MindMapSideMenu() {
  const {
    showLocationVisualization,
    locationsToVisualize,
    toggleLocationVisualization,
    conciseViewActive,
    toggleConciseView,
    saveMindMap,
  } = useMindMap()

  const [bookmarked, setBookmarked] = useState( false )
  const [noteTitle, setNoteTitle] = useState( '' )
  const [note, setNote] = useState<any | string>( '' )

  const saveNote = async () => {
    setBookmarked( true )
    // const model = objectMapToSingular[card?.type]

    const saved = await saveEventForUser( {
      user,
      event: { id: null },
      userNote: { title: noteTitle, content: note },
      theory: 'test',
    } )
  }


  const updateNote = ( { target: { value } }: any ) => {
    setNote( value )
  }

  const user: any = useAuth()

  const [isConcise, setIsConcise] = useState( conciseViewActive )
  const pressed = isConcise
    ? {
      color: `rgb(244 244 245 / var(--tw-text-opacity)) `,
      backgroundColor: `rgb(75 85 99 / var (--tw-bg-opacity))`,
    }
    : {}

  useEffect( () => {
    setIsConcise( conciseViewActive )
  }, [conciseViewActive] )



  const handleSavingNote = () => {
    saveNote()
  }

  const handleSubmit = () => {
    handleSavingNote()

  }

  return (
    // max-w-max m-auto
    // <CultUIPopoverRoot>

    <div className='flex flex-col shadow items-center justify-between rounded-full p-1 border border-white/80 dark:border-neutral-700/80 text-neutral-500 bg-gradient-to-b from-card/70 rounded-[calc(var(--radius)-2px)]'>

      <div className='flex flex-col'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                style={pressed}
                size='icon'
                className='text-zinc-100 rounded-full hover:bg-gray-600 hover:text-zinc-100 m-2'
                onClick={toggleConciseView}
              >
                <LayersIcon className='h-5 w-5 stroke-1' />
                <span className='sr-only'>Stack</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Keep opened cards on drawing board</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className='flex flex-col items-center '>
        <QuickActionsFloatingPanel />
        <Button
          variant='ghost'
          size='icon'
          className='text-zinc-100 rounded-full hover:bg-gray-600 hover:text-zinc-100 m-2'
          onClick={toggleLocationVisualization}
        >
          <SketchyGlobe className='stroke-1 h-5 w-5 block' />
          <span className='sr-only'>Open menu</span>
        </Button>

        <Button
          variant='ghost'
          size='icon'
          className='text-zinc-100 rounded-full hover:bg-gray-600 hover:text-zinc-100 m-2'
          onClick={saveMindMap}
        >
          <ArrowDownToLine className='stroke-1 h-5 w-5 block' />
          <span className='sr-only'>Open menu</span>
        </Button>




      </div>
      <div className='flex flex-col items-center '>
        <FloatingPanelRoot>

          <Button
            variant='ghost'
            size='icon'
            className='text-zinc-100 bg-black m-2'
            onClick={saveMindMap}
          >

            <FloatingPanelTrigger className='bg-black'> <Lightbulb className='text-white stroke-1' size='16' /></FloatingPanelTrigger>
          </Button>
          <FloatingPanelContent className='bg-black text-white border border-indigo-500/20'>
            <FloatingPanelForm onSubmit={handleSubmit}>
              {/* <FloatingPanelLabel htmlFor="note-input">Add Note</FloatingPanelLabel> */}
              <FloatingPanelTextarea id="note-input" />
              <FloatingPanelFooter>
                <FloatingPanelCloseButton />
                <FloatingPanelSubmitButton />
              </FloatingPanelFooter>
            </FloatingPanelForm>
          </FloatingPanelContent>


        </FloatingPanelRoot>
      </div>
    </div>
  )
}

{
  /* </CultUIPopoverRoot> */
}



function LayersIcon( props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement> ) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z' />
      <path d='m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65' />
      <path d='m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65' />
    </svg>
  )
}
