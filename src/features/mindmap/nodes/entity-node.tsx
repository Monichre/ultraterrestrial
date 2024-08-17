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
import { BlurAppear } from '@/components/animations/animated-wrappers'

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

const EN = memo((props: any) => {
  const updateNodeInternals = useUpdateNodeInternals()
  updateNodeInternals(props.id)
  const [handles, setHandles]: any = useState([])

  useEffect(() => {
    if (props?.data?.handles && props.data?.handles.length) {
      const { data } = props

      setHandles(data.handles)
      updateNodeInternals(props.id)
    }
  }, [props, updateNodeInternals])
  // relative min-w-[300px] !w-[300px]
  {
    /* // <BlurAppear> */
  }
  return (
    <div className='w-full border border-white/20 rounded-[calc(var(--radius)-2px)] !min-w-[450px] relative h-auto max-w-[400px]'>
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
      <Handle type='target' position={Position.Top} />

      <GraphCard {...props} key={props.id} />
      {/* <GraphNodeCard {...props} key={props.id} /> */}
    </div>
  )
})

export const EntityNode = memo(EN)
