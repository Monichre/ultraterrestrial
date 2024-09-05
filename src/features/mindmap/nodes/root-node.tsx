/* eslint-disable react/display-name */
'use client'

import { memo, useCallback, useEffect, useState } from 'react'
import {
  Handle,
  Position,
  type Node,
  type NodeProps,
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
// import { useGraph } from '@/contexts/graph/graph-context'
import { OpenAILogo } from '@/components/ui/icons'
import { Separator } from '@/components/ui/separator'

type CardProps = React.ComponentProps<typeof Card>

import {
  DotGridBackground,
  DotGridBackgroundBlack,
} from '@/components/ui/backgrounds'
import { RootNodeCard } from '@/features/mindmap/cards/root-node-card/root-node-card'
import { motion } from 'framer-motion'
import { BlurFade } from '@/components/animations/blur-fade'
import { BlurAppear } from '@/components/animations/animated-wrappers'
// import { useLayoutedElements } from '@/features/mindmap/graph'

type NumberNode = Node<{ number: number }, 'number'>

export type RootNode = Node<{
  data: {
    name: string
    type: string
    childCount: number
    label: string
    url: string
    handles: string[]
    concise?: boolean
  }
  handles?: string[]
}>

const RN = (node: RootNode) => {
  console.log('node: ', node)
  const updateNodeInternals = useUpdateNodeInternals()
  const [handles, setHandles]: any = useState([])

  useEffect(() => {
    if (node?.data?.handles && node.data?.handles.length) {
      const { data } = node

      setHandles(data.handles)
      updateNodeInternals(node.id)
    }

    // if (node?.data?.concise) {
    //   updateNodeInternals(node.id)
    // }
  }, [node, updateNodeInternals])
  const container = {
    hidden: { opacity: 0, height: 0, width: 0 },
    show: {
      opacity: 1,
      height: 'auto',
      width: 'auto',
      transition: {
        delayChildren: 0.5,
        type: 'spring',
        stiffness: 100,
      },
    },
  }
  return (
    <BlurAppear>
      <div className='border border-white/50 rounded-[calc(var(--radius)-2px)] relative w-fit h-fit'>
        {handles && handles?.length
          ? handles.map((id: string) => (
              <Handle
                key={id}
                type='source'
                position={Position.Bottom}
                id={id}
                isConnectable={true}
              />
            ))
          : null}
        <RootNodeCard nodeData={node} />
      </div>
    </BlurAppear>
  )
}

export const RootNode = memo(RN)
