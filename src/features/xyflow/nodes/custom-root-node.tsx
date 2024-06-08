'use client'

import { useCallback } from 'react'
import { Handle, Position } from 'reactflow'

import { Input } from '@/components/ui/input'

import {
  LockIcon,
  BoltIcon,
  StarIcon,
  ArrowUpIcon,
  ImageIcon,
} from 'lucide-react'

import { BellRing, Check } from 'lucide-react'

import { cn } from '@/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'

const notifications = [
  {
    title: 'Your call has been confirmed.',
    description: '1 hour ago',
  },
  {
    title: 'You have a new message!',
    description: '1 hour ago',
  },
  {
    title: 'Your subscription is expiring soon!',
    description: '2 hours ago',
  },
]

type CardProps = React.ComponentProps<typeof Card>

function EntityCard({ className = null, onClick, data, ...props }: any) {
  console.log('props: ', props)
  console.log('data: ', data)
  const handleClick = () => {
    onClick(data.type)
  }
  return (
    <Card className={cn('w-[380px]', className)} {...props}>
      <CardHeader>
        <CardTitle>{data.label}</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <div className=' flex items-center space-x-4 rounded-md border p-4'>
          <BellRing />
          <div className='flex-1 space-y-1'>
            <p className='text-sm font-medium leading-none'>
              Push Notifications
            </p>
            <p className='text-sm text-muted-foreground'>
              Send notifications to device.
            </p>
          </div>
          <Switch />
        </div>
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className='mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0'
            >
              <span className='flex h-2 w-2 translate-y-1 rounded-full bg-sky-500' />
              <div className='space-y-1'>
                <p className='text-sm font-medium leading-none'>
                  {notification.title}
                </p>
                <p className='text-sm text-muted-foreground'>
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className='w-full' onClick={handleClick}>
          Show All {data.type}
        </Button>
      </CardFooter>
    </Card>
  )
}

export function EntityActionCard() {
  return (
    <Card className='bg-[#000000] rounded-lg p-4'>
      <div className='flex flex-col space-y-4'>
        <Input
          placeholder='Search'
          className='rounded-md bg-[#1a1a1a] text-white placeholder-gray-500'
        />
        <div className='flex justify-between'>
          <Button
            variant='ghost'
            className='flex items-center space-x-2 text-white rounded-md'
          >
            <ImageIcon className='w-4 h-4' />
            <span>Image</span>
          </Button>
          <Button
            variant='ghost'
            className='flex items-center space-x-2 text-white rounded-md'
          >
            <LockIcon className='w-4 h-4' />
            <span>Private</span>
          </Button>

          <Button
            variant='ghost'
            className='flex items-center space-x-2 bg-[#262626] text-white rounded-md'
          >
            <BoltIcon className='w-4 h-4' />
            <span>Speed</span>
          </Button>

          <Button
            variant='ghost'
            className='flex items-center space-x-2 bg-[#262626] text-white rounded-md'
          >
            <StarIcon className='w-4 h-4 text-[#00d084]' />
            <span>Quality</span>
          </Button>

          <Button
            variant='ghost'
            className='flex items-center space-x-2 bg-[#262626] text-white rounded-md'
          >
            <ArrowUpIcon className='w-4 h-4' />
          </Button>
        </div>
      </div>
    </Card>
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

// export interface CustomRootNodeProps extends NodeProps {
// node:
// }

export const CustomRootNode = (props: NodeProps) => {
  const { data, ...rest } = props
  console.log('data: ', data)
  const onClick = useCallback((type: any) => {
    console.log(type)
  }, [])

  return (
    <>
      <Handle type='target' position={Position.Top} />
      <div>
        <EntityCard data={data} onClick={onClick} {...rest} />
      </div>
      <Handle type='source' position={Position.Bottom} />
    </>
  )
}
