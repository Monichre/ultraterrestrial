'use client'

import React from 'react'
import { EdgeProps, getBezierPath, BaseEdge } from '@xyflow/react'

export const EntityEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  ...rest
}: EdgeProps) => {
  const [edgePath] = getBezierPath({
    // we need this little hack in order to display the gradient for a straight line
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  return <BaseEdge id={id} path={edgePath} {...rest} />
}
