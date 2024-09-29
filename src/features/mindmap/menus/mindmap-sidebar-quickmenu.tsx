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
  FloatingPanelLabel,
  FloatingPanelRoot,
  FloatingPanelSubmitButton,
  FloatingPanelTextarea,
  FloatingPanelTrigger,
} from '@/components/animated'
import {
  DoubleDonut,
  EventsIcon,
  KeyFiguresIcon,
  OrganizationsIcon,
  SketchyGlobe,
  TestimoniesIcon,
  ThinTwinklyStar,
  TopicsIcon,
} from '@/components/icons'
import { AddNote } from '@/components/note/AddNote'
import { Button } from '@/components/ui/button'
import { OpenAILogo } from '@/components/ui/icons'
import { useMindMap } from '@/providers/mindmap-context'
import { Pencil2Icon } from '@radix-ui/react-icons'
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@radix-ui/react-tooltip'
import { AnimatePresence, motion } from 'framer-motion'
import { ImageIcon, Paintbrush, Plus, PlusIcon } from 'lucide-react'
import {
  useCallback,
  useEffect,
  useState,
  type JSX,
  type SVGProps,
} from 'react'

const QuickActionsFloatingPanel = () => {
  const { addDataToMindMap } = useMindMap()
  const handleLoadingRecords = useCallback(
    async (rootNodeSim: any) => {
      // const
      await addDataToMindMap(rootNodeSim)
    },
    [addDataToMindMap]
  )
  const actions = [
    {
      icon: <EventsIcon className='w-4 h-4' />,
      label: 'Add Events',
      action: async () => {
        await handleLoadingRecords({ data: { type: 'events' } })
      },
    },
    {
      icon: <TopicsIcon className='w-4 h-4' />,
      label: 'Add Topics',
      action: async () => {
        await handleLoadingRecords({ data: { type: 'topics' } })
      },
    },
    {
      icon: <KeyFiguresIcon className='w-4 h-4' />,
      label: 'Add KeyFigures',
      action: async () => {
        await handleLoadingRecords({ data: { type: 'personnel' } })
      },
    },
    {
      icon: <TestimoniesIcon className='w-4 h-4' />,
      label: 'Add Testimonies',
      action: async () => {
        await handleLoadingRecords({ data: { type: 'testimonies' } })
      },
    },
    {
      icon: <OrganizationsIcon className='w-4 h-4' />,
      label: 'Add Organizations',
      action: async () => {
        await handleLoadingRecords({ data: { type: 'organizations' } })
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
            {actions.map((action, index) => (
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
            ))}
          </AnimatePresence>
        </FloatingPanelBody>
        <FloatingPanelFooter>
          <FloatingPanelCloseButton />
        </FloatingPanelFooter>
      </FloatingPanelContent>
    </FloatingPanelRoot>
  )
}
export function AddNoteFloatingPanelInput() {
  const handleSubmit = (note: string) => {
    console.log('Submitted note:', note)
  }

  return (
    <FloatingPanelRoot>
      <FloatingPanelTrigger
        title=''
        className='flex items-center space-x-2 px-4 py-2 '
      >
        <Pencil2Icon className='h-5 w-5 text-white stroke-1' />
      </FloatingPanelTrigger>

      <FloatingPanelContent className='w-80'>
        <FloatingPanelForm onSubmit={handleSubmit}>
          <FloatingPanelBody>
            <FloatingPanelLabel htmlFor='note-input'>Note</FloatingPanelLabel>
            <FloatingPanelTextarea id='note-input' className='min-h-[100px]' />
          </FloatingPanelBody>
          <FloatingPanelFooter>
            <FloatingPanelCloseButton />
            <FloatingPanelSubmitButton />
          </FloatingPanelFooter>
        </FloatingPanelForm>
      </FloatingPanelContent>
    </FloatingPanelRoot>
  )
}

export function MindMapSidebarQuickMenu() {
  const {
    showLocationVisualization,
    locationsToVisualize,
    toggleLocationVisualization,
    conciseViewActive,
    toggleConciseView,
  } = useMindMap()

  const actions = [
    {
      icon: <ThinTwinklyStar />,
      label: 'New File',
      action: () => console.log('New File'),
    },
    {
      icon: <ThinTwinklyStar />,
      label: 'Upload Image',
      action: () => console.log('Upload Image'),
    },
    {
      icon: <ThinTwinklyStar />,
      label: 'Edit Colors',
      action: () => console.log('Edit Colors'),
    },
  ]

  const [isConcise, setIsConcise] = useState(conciseViewActive)
  const pressed = isConcise
    ? {
        color: `rgb(244 244 245 / var(--tw-text-opacity)) `,
        backgroundColor: `rgb(75 85 99 / var (--tw-bg-opacity))`,
      }
    : {}

  useEffect(() => {
    setIsConcise(conciseViewActive)
  }, [conciseViewActive])
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
      <div className='flex flex-col items-center'>
        <AddNoteFloatingPanelInput />
      </div>

      <div className='flex flex-col items-center '>
        <QuickActionsFloatingPanel />
        <Button
          variant='ghost'
          size='icon'
          className='text-zinc-100 rounded-full hover:bg-gray-600 hover:text-zinc-100 m-2'
          onClick={toggleLocationVisualization}
        >
          <SketchyGlobe className='stroke-1 h-5 w-5 block' fill='#78efff' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </div>
    </div>
  )
}
{
  /* </CultUIPopoverRoot> */
}

function InboxIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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

function LayersIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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

function ShareIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
