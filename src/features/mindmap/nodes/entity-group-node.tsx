/* eslint-disable react/display-name */
'use client'
import * as React from 'react'
import { memo, useCallback, useEffect, useState } from 'react'

import {
  Handle,
  Position,
  useHandleConnections,
  useNodesData,
  useUpdateNodeInternals,
  NodeToolbar,
} from '@xyflow/react'

import { MindMapEntityCard } from '@/features/mindmap/cards/entity-card/entity-card'
import { GraphCard } from '@/features/mindmap/cards/graph-card/graph-card'
import { GraphNodeCard } from '@/components/ui/card/graph-node-card'
import { BlurAppear } from '@/components/animated/animated-wrappers'
import { useMindMap } from '@/providers'
import {
  useMotionValue,
  motion,
  useMotionTemplate,
  useTransform,
} from 'framer-motion'
import { Layers, Layers3, LayersIcon, Maximize2, Minimize2 } from 'lucide-react'
import {
  CardStack,
  formatNodesForCardDisplay,
} from '@/features/mindmap/cards/card-stack/card-stack'
import { TimelineSidebar } from '@/layouts/timeline/TimlineSidebarUI'
import { Button } from '@/components/ui/button'
import { SketchyGlobe } from '@/components/icons'
import { extractUniqueYearsFromEvents } from '@/utils'
import {
  GROUP_NODE_DIMENSIONS,
  GROUP_NODE_HEIGHT,
  GROUP_NODE_WIDTH,
} from '@/features/mindmap/config/nodes.config'
import { CanvasRevealEffect } from '@/features/mindmap/cards/entity-group-card/entity-group-card-bg'
import { EntityGroupCard } from '@/features/mindmap/cards/entity-group-card/entity-group-card'
import {
  TestimonyGroupCard,
  TopicAndTestimoniesGroupCard,
} from '@/features/mindmap/cards/entity-group-card/topic-group-card'

const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)
interface Photo {
  id: string
  name: string
  mediaType: string
  enablePublicUrl: boolean
  signedUrlTimeout: number
  uploadUrlTimeout: number
  size: number
  version: number
  url: string
}

const GN = memo((node: any) => {
  const { useUpdateNodeInternals, useNodesData, updateNode } = useMindMap()
  const updateNodeInternals = useUpdateNodeInternals()
  const [handles, setHandles]: any = useState([])
  const nodeData = useNodesData(node.id)
  console.log('nodeData: ', nodeData)
  const type = nodeData.id.split('-')[0]

  useEffect(() => {
    if (node?.data?.handles && node.data?.handles.length) {
      const { data } = node

      setHandles(data.handles)
      updateNodeInternals(node.id)
    }

    // if (node?.data?.concise) {
    //   updateNodeInternals(node.id)
    // }
  }, [node, updateNodeInternals, nodeData])

  useEffect(() => {
    if (type === 'testimonies') {
      updateNode(node.id, {
        style: {
          height: GROUP_NODE_WIDTH,
          width: GROUP_NODE_HEIGHT,
        },
      })
    }
  }, [node.id, type, updateNode])

  return (
    <BlurAppear className=''>
      {handles && handles?.lengthmindmap
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

      <Handle type='target' position={Position.Top} />
      {type === 'testimonies' || type === 'topics' ? (
        <TopicAndTestimoniesGroupCard data={nodeData} />
      ) : (
        <EntityGroupCard card={node} />
      )}
      {/* <div className='absolute right-5 top-0 h-px w-80 bg-gradient-to-l from-transparent via-white/30 via-10% to-transparent' /> */}
    </BlurAppear>
  )
})

export const EntityGroupNode = memo(GN)
