'use client'

import React from 'react'
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow,
} from '@xyflow/react'
import { NEONS } from '@/utils'

const StarDoodle = ({ stroke = NEONS.blue }: any) => (
  <svg
    // className='w-30 h-30'
    // viewBox='0 0 82 84'
    className='w-30 h-30' // Increase the size of the SVG
    viewBox='-20 -20 122 124'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M41.5816 1.21606C39.7862 5.82482 40.3852 10.0977 40.5593 14.9633C40.7854 21.2812 40.9774 27.5593 41.4363 33.8661'
      stroke={stroke}
      stroke-width='1.90596'
      stroke-linecap='round'
    />
    <path
      d='M41.0651 45.1798C39.7505 51.5096 40.3418 57.6794 40.8893 64.0791C41.4093 70.1568 42.1389 76.2117 42.8566 82.2682'
      stroke={stroke}
      stroke-width='1.90596'
      stroke-linecap='round'
    />
    <path
      d='M1.13413 46.6647C5.16696 44.8703 8.96881 44.7974 13.3092 44.5029C19.8761 44.0572 26.2025 43.2089 32.656 41.952'
      stroke={stroke}
      stroke-width='1.90596'
      stroke-linecap='round'
    />
    <path
      d='M47.2629 40.0959C58.4139 39.3819 69.3895 37.5305 80.4472 35.9965'
      stroke={stroke}
      stroke-width='1.90596'
      stroke-linecap='round'
    />
    <path
      d='M49.3429 34.6508L52.917 28.1667'
      stroke={stroke}
      stroke-width='1.90596'
      stroke-linecap='round'
    />
    <path
      d='M32.9786 50.3504L28.6387 54.6391'
      stroke={stroke}
      stroke-width='1.90596'
      stroke-linecap='round'
    />
    <path
      d='M52.6361 48.6656L56.9506 51.5758'
      stroke={stroke}
      stroke-width='1.90596'
      stroke-linecap='round'
    />
    <path
      d='M31.549 30.8471C26.8741 29.4323 22.7143 27.3543 18.2738 25.3586'
      stroke={stroke}
      stroke-width='1.90596'
      stroke-linecap='round'
    />
    <circle cx='41' cy='42' fill='none' r='60' stroke={stroke} stroke-width='1'>
      <animate
        attributeName='r'
        from='20'
        to='60'
        dur='1.5s'
        begin='0s'
        repeatCount='indefinite'
      />
      <animate
        attributeName='opacity'
        from='1'
        to='0'
        dur='1.5s'
        begin='0s'
        repeatCount='indefinite'
      />
    </circle>
    <circle cx='41' cy='42' fill='#fff' r='60' stroke={stroke} stroke-width='1'>
      <animate
        attributeName='r'
        from='20'
        to='60'
        dur='1.5s'
        begin='0s'
        repeatCount='indefinite'
      />
      <animate
        attributeName='opacity'
        from='.2'
        to='0'
        dur='1.5s'
        begin='0s'
        repeatCount='indefinite'
      />
    </circle>

    {/* <circle cx='41' cy='42' fill='none' r='30' stroke={stroke} stroke-width='1'>
      <animate
        attributeName='r'
        from='8'
        to='20'
        dur='1.5s'
        begin='0s'
        repeatCount='indefinite'
      />
      <animate
        attributeName='opacity'
        from='1'
        to='0'
        dur='1.5s'
        begin='0s'
        repeatCount='indefinite'
      />
    </circle>
    <circle cx='41' cy='42' fill={stroke} r='10' /> */}
  </svg>
)

type SiblingEdgeProps = {
  data: { sourceType: string; targetType: string }
}

export const RootEdge = ({
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

      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,

            padding: 10,
            borderRadius: 5,
            height: '40px',
            width: '40px',
          }}
          className='nodrag nopan'
        >
          <div className='absolute top-0 left-0 h-full w-full flex items-center justify-center'>
            <StarDoodle stroke={style?.stroke} />
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  )
}
