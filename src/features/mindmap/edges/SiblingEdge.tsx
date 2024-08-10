import React from 'react'
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow,
} from '@xyflow/react'
import { NEONS } from '@/utils'

type SiblingEdgeProps = {
  data: { sourceType: string; targetType: string }
}

const TwoWayArrows = () => (
  <svg
    className='w-10 h-10'
    viewBox='0 0 119 88'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M113.4 17.361C89.7749 15.4615 65.0241 16.6174 41.5779 13.361C40.5911 13.224 29.0625 12.6854 31.8001 11.3166C33.5007 10.4663 52.3886 3.44264 52.2445 3.31659C50.1253 1.46242 27.3922 8.25769 25.0445 10.6055C24.8923 10.7577 50.8571 26.8896 54.2001 28.561'
      stroke='currentColor'
      stroke-width='5'
      stroke-linecap='round'
    />
    <path
      d='M3 58.961C35.8611 62.7435 69.5762 69.9485 102.2 71.761C117.812 72.6284 95.7404 64.0866 91 58.161C84.9491 50.5974 106.398 70.7889 115.711 73.4499C119.397 74.5029 88.2736 80.414 86.2001 84.561'
      stroke='currentColor'
      stroke-width='5'
      stroke-linecap='round'
    />
  </svg>
)

export const SiblingEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {
    stroke: NEONS.blue,
  },
  label,
}: EdgeProps & SiblingEdgeProps) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  return (
    <>
      <BaseEdge path={edgePath} style={style} />
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              fontSize: 12,
              // everything inside EdgeLabelRenderer has no pointer events by default
              // if you have an interactive element, set pointer-events: all
              pointerEvents: 'all',
            }}
            className='absolute nodrag nopan'
          >
            <div className='absolute top-0 left-0 h-full w-full flex items-center justify-center'>
              <TwoWayArrows />
            </div>
            <span className='font-jetbrains text-xs text-gray-500 tracking-widest font-light '>
              {label}
            </span>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  )
}
