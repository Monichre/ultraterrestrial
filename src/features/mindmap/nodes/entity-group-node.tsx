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
import { BlurAppear } from '@/components/animations/animated-wrappers'
import { useMindMap } from '@/providers'
import { useMotionValue, motion, useMotionTemplate } from 'framer-motion'
import { Layers, Layers3, Maximize2, Minimize2 } from 'lucide-react'
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

const GN = memo((node: any) => {
  const { getIntersectingNodes, useNodesData } = useMindMap()
  const groupNodeData = useNodesData(node.id)
  const [groupCards, setGroupCards] = useState(groupNodeData?.data.children)
  console.log('groupNodeData: ', groupNodeData)
  console.log('node: ', node)
  const updateNodeInternals = useUpdateNodeInternals()
  updateNodeInternals(node.id)
  const [handles, setHandles]: any = useState([])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const [isMaximized, setIsMaximized] = React.useState(false)
  const [isStacked, setIsStacked] = React.useState(false)

  const [isHoveredLogo, setIsHoveredLogo] = React.useState<number | null>(null)

  const [stackedHeight, setStackedHeight] = React.useState(0)
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([])

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
      setGroupCards(groupNodeData?.data.children)
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
  }, [isStacked])
  // relative min-w-[300px] !w-[300px]
  {
    /* // <BlurAppear> */
  }
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
      <div className='absolute right-5 top-0 h-px w-80 bg-gradient-to-l from-transparent via-white/30 via-10% to-transparent' />
      <div
        className={`absolute -inset-2 rounded-lg bg-gradient-to-r from-[#78efff] via-[#E393E6] to-[#79FFE1] opacity-50 blur w-full h-full`}
      />

      <div
        className='w-[420px] h-[420px] border border-white/20 rounded-[calc(var(--radius)-2px)] relative group overflow-hidden rounded-xl bg-neutral-950'
        onMouseMove={(e) => {
          const { left, top } = e.currentTarget.getBoundingClientRect()

          mouseX.set(e.clientX - left)
          mouseY.set(e.clientY - top)
        }}
      >
        <div className='absolute right-5 top-0 h-px w-80 bg-gradient-to-l from-transparent via-white/30 via-10% to-transparent' />
        <motion.div
          className='pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100'
          style={{
            background: useMotionTemplate`
						radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(38, 38, 38, 0.4), transparent 80%)
					`,
          }}
        />
        <div className='relative h-full  w-full rounded-xl border border-white/10 px-4 py-5'>
          <motion.div
            className='w-full flex items-center justify-center'
            style={{
              flexDirection: isMaximized ? 'column' : 'row',
              gap: isMaximized ? '8px' : '0px',
              height: isStacked ? stackedHeight : 'auto',
            }}
            layout
          >
            {groupCards.map((item: any, index: any) => {
              const {
                data: {
                  description,
                  latitude,
                  location,
                  longitude,
                  date: unformattedDate,
                  photos,
                  photo,
                  name,
                  role,
                  color,
                  type,
                  label,
                  fill,
                },
              } = item

              const date = dayjs(unformattedDate).format('MMM DD, YYYY')
              const image: any = photos?.length
                ? photos[0]
                : photo?.length
                  ? photo[0]
                  : { url: '/foofighters.webp', signedUrl: '/foofighters.webp' }

              image.src - image.url
              return (
                <motion.div
                  ref={(el) => (itemRefs.current[index] = el)}
                  key={name}
                  className='relative flex items-start space-x-4 border p-4 rounded-2xl bg-white'
                  layout
                  style={{
                    position: isStacked ? 'absolute' : 'static',
                    width: isStacked ? `calc(100% - ${index * 20}px)` : 'auto',
                    zIndex: isMaximized ? groupCards.length - index : 1,
                    top: isStacked ? `${index * 10}px` : 'auto',
                    border: isMaximized ? '1px solid #f0f0f0' : 'none',
                    overflow: isMaximized ? 'hidden' : 'visible',
                  }}
                >
                  <motion.div
                    className={`relative flex items-center justify-center w-10 h-10 sm:w-16 sm:h-16 shrink-0`}
                    style={{
                      borderRadius: '14px',
                    }}
                    layout
                    onMouseEnter={() => setIsHoveredLogo(index)}
                    onMouseLeave={() => setIsHoveredLogo(null)}
                  >
                    <motion.img
                      src={image.src}
                      alt={item.name}
                      className='w-full h-full object-cover'
                      style={{
                        borderRadius: '14px',
                      }}
                      layout
                    />
                    {isHoveredLogo === index && !isMaximized && !isStacked && (
                      <motion.div
                        className='absolute bottom-full mb-1 px-2 py-1.5 text-xs text-white bg-zinc-900 font-medium rounded-lg'
                        initial={{ scale: 0, y: 10 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0, y: 10 }}
                      >
                        {name}
                      </motion.div>
                    )}
                  </motion.div>
                  <motion.div
                    style={{
                      display: isMaximized ? 'block' : 'none',
                      width: isMaximized ? '100%' : '0',
                      opacity: isMaximized ? 1 : 0,
                      height: isMaximized ? 'auto' : '0',
                    }}
                    className='overflow-hidden'
                  >
                    <div className='flex items-center justify-start gap-2'>
                      <h2 className='text-lg sm:text-xl font-semibold'>
                        {name}
                      </h2>
                      <span className='w-1 h-1 rounded-full bg-slate-800 line-clamp-1'></span>
                      {/* <p className='text-sm text-gray-600 line-clamp-1'>
                      {enterprise}
                    </p> */}
                    </div>
                    <p className='text-xs sm:text-sm text-gray-500 mt-1 mb-2 line-clamp-2'>
                      {description}
                    </p>
                    <p className='text-xs text-gray-400 w-full text-right pr-4'>
                      {date}
                    </p>
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
          <motion.div className='flex items-center gap-4' layout>
            <button
              className='z-10 p-3 bg-zinc-900 text-white rounded-full shadow-md active:scale-90 duration-300 transition-transform disabled:opacity-50'
              disabled={isStacked}
              onClick={() => {
                setIsMaximized((prev) => !prev)
              }}
            >
              {isMaximized ? <Minimize2 /> : <Maximize2 />}
            </button>
            <button
              className='z-10 p-3 bg-zinc-900 text-white rounded-full shadow-md active:scale-90 duration-300 transition-transform disabled:opacity-50'
              disabled={!isMaximized}
              onClick={() => {
                setIsStacked((prev) => !prev)
              }}
            >
              {isStacked ? <Layers3 /> : <Layers />}
            </button>
          </motion.div>
        </div>
      </div>
    </BlurAppear>
  )
})

export const EntityGroupNode = memo(GN)
