/* eslint-disable react/display-name */
'use client'
import * as React from 'react'
import { memo, useCallback, useEffect } from 'react'

import {
  Handle,
  Position,
  useHandleConnections,
  useNodesData,
  useUpdateNodeInternals,
  NodeToolbar,
} from '@xyflow/react'

import { MindMapEntityCard } from '@/components/ui/card/entity-card/entity-card'
import { MindMapSidebarProvider } from '@/components/mind-map/mindmap-sidebar/mindmap-sidebar-context'

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
  return (
    <>
      <Handle type='target' position={Position.Top} />

      <MindMapEntityCard {...props} key={props.id} />
    </>
  )
})

export const EntityNode = memo(EN)
