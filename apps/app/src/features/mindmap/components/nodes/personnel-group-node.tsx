/* eslint-disable react/display-name */
'use client'
import { memo, useEffect, useState } from 'react'

import { BlurAppear } from '@/components/animated/animated-wrappers'

import { useMindMap } from '@/providers'

const PN = memo((node: any) => {
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

    if (node?.data?.concise) {
      updateNodeInternals(node.id)
    }
  }, [node, updateNodeInternals, nodeData])

  return (
    <BlurAppear className=''>
      <div {...node} />
    </BlurAppear>
  )
})

export const PersonnelGroupNode = memo(PN)
