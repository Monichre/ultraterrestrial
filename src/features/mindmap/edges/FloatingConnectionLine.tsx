'use client'
import React from 'react'
import { getBezierPath } from '@xyflow/react'
import { getEdgeParams } from '@/features/mindmap/mindmap.config'

export function FloatingConnectionLine({
  toX,
  toY,
  fromPosition,
  toPosition,
  fromNode,
  targetNode,
}: {
  toX: number
  toY: number
  fromPosition: string // Replace 'any' with the appropriate type
  toPosition: string
  fromNode: any // Replace 'any' with the appropriate type
  targetNode: {
    id: string
    measured: {
      width: number
      height: number
    }
    internals: {
      positionAbsolute: { x: number; y: number }
    }
  }
}) {
  if (!fromNode) {
    return null
  }

  const { sx, sy } = getEdgeParams(fromNode, targetNode)
  const [edgePath] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: fromPosition,
    targetPosition: toPosition,
    targetX: toX,
    targetY: toY,
  })

  return (
    <g>
      <path
        fill='none'
        stroke='#222'
        strokeWidth={1.5}
        className='animated'
        d={edgePath}
      />
      <circle
        cx={toX}
        cy={toY}
        fill='#fff'
        r={3}
        stroke='#222'
        strokeWidth={1.5}
      />
    </g>
  )
}