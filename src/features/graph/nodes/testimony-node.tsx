'use client'

import React, { memo } from 'react'
import { TestimonyCard } from '../../../components/ui/card/testimony-card'

import { Position, Handle, useUpdateNodeInternals } from '@xyflow/react'
const TN = memo((props: any) => {
  const updateNodeInternals = useUpdateNodeInternals()
  updateNodeInternals(props.id)
  return (
    <>
      <Handle type='target' position={Position.Top} />

      <TestimonyCard {...props} key={props.id} />
    </>
  )
})

TN.displayName = 'TestimonyNode'

export const TestimonyNode = memo(TN)
