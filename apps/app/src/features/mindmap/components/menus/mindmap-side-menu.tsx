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
  FloatingPanelRoot,
  FloatingPanelTrigger
} from '@/components/animated'
import {
  ArtifactsIcon,
  EventsIcon,
  KeyFiguresIcon,
  OrganizationsIcon,
  SketchyGlobe,
  TestimoniesIcon,
  ThinTwinklyStar,
  TopicsIcon,
} from '@/components/icons'
import { Button } from '@/components/ui/button'
import { useMindMap } from '@/contexts/mindmap-context'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDownToLine, FileSearch, Plus } from 'lucide-react'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type JSX,
  type SVGProps,
} from 'react'

const QuickActionsFloatingPanel = () => {

  const idCounter = useRef( 0 )

  // Function to get the next sequential ID
  const getNextId = useCallback( () => {
    idCounter.current += 1
    return `userInputNode-${idCounter.current}`
  }, [] )

  const { addNextEntitiesToMindMap, addNodes, addEdges, screenToFlowPosition, getNodes } = useMindMap()
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

      const userNode: any = {
        // Start of Selection
        id: getNextId(),
        type: 'userInputNode',
        position: {
          ...center
        },
        data: {
          label: 'Your Query',
          input: `Loading ${amount} ${type}.`,
          entities: null,
          type: type,
        },
      }
      addNodes( userNode )

      const nodes = getNodes() // Replace with the appropriate method to retrieve nodes
      const existingUserInputNodes = nodes
        .filter( ( node: any ) => node.type === 'userInputNode' && node.id !== userNode.id )
        .sort( ( a: any, b: any ) => {
          // Assuming IDs are in the format 'userInputNode-<number>'
          const aNum = parseInt( a.id.split( '-' )[1], 10 )
          const bNum = parseInt( b.id.split( '-' )[1], 10 )
          return aNum - bNum
        } )

      // If there is at least one existing userInputNode, create an edge from the last one to the new one
      if ( existingUserInputNodes.length > 0 ) {
        const lastUserInputNode = existingUserInputNodes[existingUserInputNodes.length - 1]
        const edge = {
          id: `${lastUserInputNode.id}-${userNode.id}`,
          source: lastUserInputNode.id,
          target: userNode.id,
          type: 'step'
        }
        addEdges( edge )
      }

      // const
      const { groupNode, groupNodeChildren } = await addNextEntitiesToMindMap( rootNodeSim )

      if ( groupNode && groupNodeChildren ) {
        // const newEdges = groupNodeChildren.map( ( entity: any ) => ( {

        //   id: `${userNode.id}-${entity.id}`,
        //   source: userNode.id,
        //   target: entity.id,
        //   type: 'smooth'


        // } ) )
        const edge = {
          id: `${userNode.id}-${groupNode.id}`,
          source: userNode.id,
          target: groupNode.id,
          type: 'step'
        }
        addEdges( edge )
      }


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

  const actions = [
    {
      icon: <ThinTwinklyStar />,
      label: 'New File',
      action: () => console.log( 'New File' ),
    },
    {
      icon: <ThinTwinklyStar />,
      label: 'Upload Image',
      action: () => console.log( 'Upload Image' ),
    },
    {
      icon: <ThinTwinklyStar />,
      label: 'Edit Colors',
      action: () => console.log( 'Edit Colors' ),
    },
  ]

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
    </div>
  )
}
{
  /* </CultUIPopoverRoot> */
}

function InboxIcon( props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement> ) {
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
      <polyline points='22 12 16 12 14 15 10 15 8 12 2 12' />
      <path d='M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z' />
    </svg>
  )
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

function MenuIcon( props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement> ) {
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
      <line x1='4' x2='20' y1='12' y2='12' />
      <line x1='4' x2='20' y1='6' y2='6' />
      <line x1='4' x2='20' y1='18' y2='18' />
    </svg>
  )
}

function MessageCircleIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
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
      <path d='M7.9 20A9 9 0 1 0 4 16.1L2 22Z' />
    </svg>
  )
}

function ShareIcon( props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement> ) {
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
      <path d='M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8' />
      <polyline points='16 6 12 2 8 6' />
      <line x1='12' x2='12' y1='2' y2='15' />
    </svg>
  )
}
