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
import {
  useMotionValue,
  motion,
  useMotionTemplate,
  useTransform,
} from 'framer-motion'
import { Layers, Layers3, LayersIcon, Maximize2, Minimize2 } from 'lucide-react'
import {
  CardStack,
  formatNodesForCardDisplay,
} from '@/features/mindmap/cards/card-stack/card-stack'
import { TimelineSidebar } from '@/layouts/timeline/TimlineSidebarUI'
import { Button } from '@/components/ui/button'
import { SketchyGlobe } from '@/components/icons'
import { extractUniqueYearsFromEvents } from '@/utils'
import { GROUP_NODE_DIMENSIONS } from '@/features/mindmap/config/nodes.config'
import { CanvasRevealEffect } from '@/features/mindmap/cards/entity-group-card/entity-group-card-bg'

const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)
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

function CardRotate({ children, onSendToBack }: any) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [60, -60])
  const rotateY = useTransform(x, [-100, 100], [-60, 60])

  function handleDragEnd(_: any, info: any) {
    const threshold = 180
    if (
      Math.abs(info.offset.x) > threshold ||
      Math.abs(info.offset.y) > threshold
    ) {
      onSendToBack()
    } else {
      x.set(0)
      y.set(0)
    }
  }

  return (
    <motion.div
      className='absolute h-52 w-52 cursor-grab'
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  )
}

const GN = memo((node: any) => {
  const { getIntersectingNodes, useNodesData, toggleLocationVisualization } =
    useMindMap()
  const groupNodeData = useNodesData(node.id)
  const [groupCards, setGroupCards]: any = useState(
    formatNodesForCardDisplay(groupNodeData?.data.children)
  )

  const [groupEntityType] = node.id.split('-')

  const years =
    groupEntityType === 'events'
      ? extractUniqueYearsFromEvents(groupCards)
      : null

  const updateNodeInternals = useUpdateNodeInternals()
  updateNodeInternals(node.id)
  const [handles, setHandles]: any = useState([])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  // const sendToBack = (id: number) => {
  //   setGroupCards((prev) => {
  //     const newCards = [...prev]
  //     const index = newCards.findIndex((card) => card.id === id)
  //     const [card] = newCards.splice(index, 1)
  //     newCards.unshift(card)
  //     return newCards
  //   })
  // }

  const [isMaximized, setIsMaximized] = React.useState(false)
  const [isStacked, setIsStacked] = React.useState(false)

  const [isHoveredLogo, setIsHoveredLogo] = React.useState<number | null>(null)

  const [stackedHeight, setStackedHeight] = React.useState(0)
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([])

  const toggleStack = () => setIsStacked(!isStacked)

  useEffect(() => {
    if (node?.data?.handles && node.data?.handles.length) {
      const { data } = node

      setHandles(data.handles)
      updateNodeInternals(node.id)
    }
  }, [node, updateNodeInternals])

  useEffect(() => {
    if (groupNodeData?.data.children) {
      console.log(
        'groupNodeData?.data.children: ',
        groupNodeData?.data.children
      )
      setGroupCards(formatNodesForCardDisplay(groupNodeData?.data.children))
      // const intersections = getIntersectingNodes(node)
      // console.log('intersections: ', intersections)
    }
  }, [node, getIntersectingNodes, groupNodeData])

  useEffect(() => {
    if (isStacked && itemRefs.current[0]) {
      const itemHeight = itemRefs.current[0].offsetHeight
      const itemPadding = parseInt(
        window.getComputedStyle(itemRefs.current[0]).paddingTop
      )
      const totalHeight = itemHeight + itemPadding * (groupCards.length - 1)
      setStackedHeight(totalHeight)
    }
  }, [groupCards.length, isStacked])

  return (
    <BlurAppear>
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
      <div
        className={`relative h-[${GROUP_NODE_DIMENSIONS.height}] w-[${GROUP_NODE_DIMENSIONS.width}]  shadow relative border border-white/60 dark:border-border/30 bg-black nowheel`}
      >
        {/* <div className='h-full w-full absolute top-0 left-0 z-0'>
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName='bg-black'
            colors={[
              [236, 72, 153],
              [232, 121, 249],
            ]}
            dotSize={2}
          />
        </div> */}

        <div className='text-bg-emerald-300 items-center cursor-pointer text-xs left-[12px] absolute uppercase top-[12px] z-10 flex'>
          <svg
            className='w-4 h-4'
            fill='none'
            height='1em'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle cx='12' cy='12' fill='none' r='7' stroke='currentColor' />
            <polyline
              fill='none'
              points='12 9 12 12 13.5 13.5'
              stroke='currentColor'
            />
            <path
              d='M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83'
              fill='none'
              stroke='currentColor'
            />
          </svg>

          {years && `${years[0]} - ${years[years.length - 1]}`}
        </div>
        <div className='text-bg-emerald-green-300 cursor-pointer text-xs right-[0.75rem] absolute uppercase right-[12px] bottom-[12px] z-10'>
          <Button
            variant='ghost'
            size='icon'
            className='text-bg-emerald-green-300 m-2'
            onClick={toggleStack}
          >
            <LayersIcon className='h8 w-8 stroke-1' />
          </Button>
        </div>

        <div className='flex justify-stretch w-full h-full relative'>
          {years && (
            <div className='w-[70px] h-auto flex flex-col justify-center align-center content-center items-center '>
              <TimelineSidebar years={years} />
            </div>
          )}
          <div
            className='relative h-full flex flex-col justify-center justify-self-end'
            style={{ perspective: 600, width: 'calc(100% - 70px)' }}
          >
            <CardStack
              mindmapCards={groupCards}
              stacked={isStacked}
              toggleStack={toggleStack}
            />
          </div>
        </div>

        <div className='text-neutral-400 cursor-pointer absolute right-[12px] top-[12px] z-10 w-8 h-8'>
          <Button
            variant='ghost'
            size='icon'
            className='ml-auto'
            onClick={toggleLocationVisualization}
          >
            <SketchyGlobe className='stroke-1 h-5 w-5 block' fill='#78efff' />
          </Button>
        </div>
        <span className='bg-emerald-300 cursor-pointer left-[-2px] absolute top-[-2px] z-10 w-[1px] h-3' />
        <span className='bg-emerald-300 cursor-pointer left-[-2px] absolute top-[-2px] z-10 w-3 h-[1px]' />
        <span className='bg-emerald-300 bottom-[-2px] cursor-pointer absolute right-[-2px] z-10 w-[1px] h-3' />
        <span className='bg-emerald-300 bottom-[-2px] cursor-pointer absolute right-[-2px] z-10 w-3 h-[1px]' />
        <span className='bg-emerald-300 bottom-[-2px] cursor-pointer left-[-2px] absolute z-10 w-[1px] h-3' />
        <span className='bg-emerald-300 bottom-[-2px] cursor-pointer left-[-2px] absolute z-10 w-3 h-[1px]' />
        <span className='bg-emerald-300 cursor-pointer absolute right-[-2px] top-[-2px] z-10 w-[1px] h-3' />
        <span className='bg-emerald-300 cursor-pointer absolute right-[-2px] top-[-2px] z-10 w-3 h-[1px]' />
      </div>

      {/* <div className='absolute right-5 top-0 h-px w-80 bg-gradient-to-l from-transparent via-white/30 via-10% to-transparent' /> */}
    </BlurAppear>
  )
})

export const EntityGroupNode = memo(GN)
