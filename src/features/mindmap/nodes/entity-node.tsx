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
import { TopicCard } from '@/features/mindmap/cards/topic-card'

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

const EN = memo((node: any) => {
  console.log('node: ', node)
  const { useUpdateNodeInternals, useNodesData } = useMindMap()
  const updateNodeInternals = useUpdateNodeInternals()
  const [handles, setHandles]: any = useState([])
  const nodeData = useNodesData(node.id)
  const type = node.data.type

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
  // relative min-w-[300px] !w-[300px]
  {
    /* // <BlurAppear> */
  }
  return (
    <BlurAppear
      className={`w-full border border-white/20 rounded-[calc(var(--radius)-2px)] !min-w-[450px] relative h-auto max-w-[400px] ${node.parentId}`}
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
      {type === 'topics' ? (
        <TopicCard
          card={{
            id: node.id,
            ...node.data,
          }}
          key={node.id}
        />
      ) : (
        <GraphCard
          card={{
            id: node.id,
            ...node.data,
          }}
          key={node.id}
        />
      )}

      {/* <GraphNodeCard {...node} key={node.id} /> */}
    </BlurAppear>
  )
})

export const EntityNode = memo(EN)
