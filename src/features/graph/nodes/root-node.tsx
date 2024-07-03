'use client'

import { useCallback, useState } from 'react'
import {
  Handle,
  Position,
  type Node,
  useUpdateNodeInternals,
} from '@xyflow/react'

import { Input } from '@/components/ui/input'

import {
  LockIcon,
  BoltIcon,
  StarIcon,
  ArrowUpIcon,
  ImageIcon,
} from 'lucide-react'

import { BellRing, Check } from 'lucide-react'

import { capitalize, cn } from '@/utils'
import { Button, ShinyButton } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { useGraph } from '@/contexts/graph/graph-context'
import { OpenAILogo } from '@/components/ui/icons'
import { Separator } from '@/components/ui/separator'

type CardProps = React.ComponentProps<typeof Card>

import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from 'lucide-react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
import {
  DotGridBackground,
  DotGridBackgroundBlack,
} from '@/components/ui/backgrounds'
// import { useLayoutedElements } from '@/features/graph/graph'

export function CommandDemo() {
  return (
    <Command className='rounded-lg border shadow-md bg-black text-white cmd'>
      <CommandInput
        className='text-xs text-white'
        placeholder='Search all our records...'
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          <CommandItem className='text-xs text-white'>
            <Smile className='mr-2 h-2 w-2' />
            <span className='text-xs text-white'>
              Visualize Relevant Data Connections
            </span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup>
          <CommandItem className='text-xs text-white'>
            <Settings className='mr-2 h-2 w-2' />
            <span className='text-xs text-white'>Ask AI</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export type NodeProps<T = any> = {
  id: string
  data: T
  dragHandle?: boolean
  type?: string
  selected?: boolean
  isConnectable?: boolean
  zIndex?: number
  xPos: number
  yPos: number
  dragging: boolean
  targetPosition?: Position
  sourcePosition?: Position
}

function RootNodeCard({ nodeData, onClick }: any) {
  const { childCount, label, type, fill, id, ...rest } = nodeData
  const handleClick = () => {
    onClick(label)
  }
  const nodeProps = {
    ...rest,
    zIndex: 5000,
  }

  return (
    <Card
      {...nodeProps}
      className={cn(
        'w-[280px]',
        'relative',
        'overflow-hidden',
        // '!bg-transparent'
        'bg-black',
        `root-node`
      )}
    >
      <DotGridBackgroundBlack />
      <CardHeader className='p-2 relative z-20'>
        <div className='flex align-middle content-center items-center justify-between'>
          <h3 className={`!font-source`}>
            {capitalize(label) || capitalize(type)}
          </h3>
          <div className='flex align-middle content-center items-center justify-between space-x-2 rounded-md border p-2'>
            <div className='flex align-middle content-center items-center justify-between space-x-2 '>
              <div className='h-4 w-4'>
                <OpenAILogo className='h-full w-full' />
              </div>
              <p className='text-xs font-source leading-none'>AI</p>
            </div>

            <Switch />
          </div>
        </div>

        <CardDescription className='text-xs relative z-20'>
          There are {childCount} {capitalize(label)}
        </CardDescription>
      </CardHeader>
      <CardContent className='p-2 relative z-20'>
        <CommandDemo />
      </CardContent>
      <CardFooter className='p-2 relative z-20'>
        <Button
          className='w-full'
          onClick={handleClick}
          size='sm'
          variant='ghost'
        >
          Show All {capitalize(label)}
        </Button>
      </CardFooter>
    </Card>
  )
}

export const RootNode = (props: Node) => {
  const { addRootNodeChildren } = useGraph()

  // const updateNodeInternals = useUpdateNodeInternals(props.id)

  const { data, ...rest }: any = props

  const [handleCount, setHandleCount] = useState(0)

  const onClick = (type: any) => {
    addRootNodeChildren(type)
    // toggle()
  }

  return (
    <>
      {Array.from({ length: handleCount }).map((_, index) => (
        <Handle
          key={index}
          type='target'
          position={Position.Bottom}
          id={`handle-${index}`}
        />
      ))}
      <div className='relative'>
        <RootNodeCard nodeData={{ ...data, ...rest }} onClick={onClick} />
      </div>
    </>
  )
}
