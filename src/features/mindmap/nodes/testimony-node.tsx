'use client'

import React, { memo, useEffect, useState } from 'react'
import { TestimonyCard } from '../cards/testimony-card'

import { Position, Handle, useUpdateNodeInternals } from '@xyflow/react'
import { useMindMap } from '@/providers'
const TN = memo((node: any) => {
  const { useUpdateNodeInternals, useNodesData } = useMindMap()
  const updateNodeInternals = useUpdateNodeInternals()
  const [handles, setHandles]: any = useState([])
  const nodeData = useNodesData(node.id)
  console.log('nodeData: ', nodeData)

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
  return (
    <>
      <Handle type='target' position={Position.Top} />
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

      <TestimonyCard {...node} key={node.id} />
    </>
  )
})

TN.displayName = 'TestimonyNode'

export const TestimonyNode = memo(TN)
