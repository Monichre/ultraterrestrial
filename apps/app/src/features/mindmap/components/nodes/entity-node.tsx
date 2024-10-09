/* eslint-disable react/display-name */
'use client'
import { memo, useEffect, useState } from 'react'

import { Handle, Position } from '@xyflow/react'

import { BlurAppear } from '@/components/animated/animated-wrappers'
import { renderEntity } from '@/features/mindmap/components/cards/render-entity-card'
import { useMindMap } from '@/providers'

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
  const component = renderEntity({
    type: node.data.type,
    data: {
      ...node.data,
      id: node.id,
    },
  })

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
    <BlurAppear className={`w-full parent-node-${node.parentId}`} id={node.id}>
      <Handle type='target' position={Position.Top} />

      {component}

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
    </BlurAppear>
  )
})

export const EntityNode = memo(EN)
