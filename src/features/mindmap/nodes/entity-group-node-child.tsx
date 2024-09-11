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
import { BlurAppear } from '@/components/animated'
import { MiniCard } from '@/features/mindmap/cards/card-stack/mini-card'
import { createPortal } from 'react-dom'

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

const ENC = memo((props: any) => {
  console.log('props: ', props)
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
  const domNode: any = document.querySelector(
    `.react-flow__node[data-id="${props.parentId}"]`
  )
  console.log('domNode: ', domNode)

  const markUp = (
    <BlurAppear
      className={`rounded-[calc(var(--radius)-2px)] relative h-auto ${props.parentId} ${props.className} w-full`}
    >
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

      <MiniCard
        card={{
          id: props.id,
          ...props.data,
        }}
        key={props.id}
      />
    </BlurAppear>
  )

  // if (domNode) {
  //   return createPortal(markUp, domNode)
  // }

  return markUp
})

export const EntityGroupNodeChild = memo(ENC)
