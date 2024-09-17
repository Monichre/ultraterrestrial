import { SketchyGlobe } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  AnimatedMiniCard,
  MINI_CARD_DEFAULT_HEIGHT,
} from '@/features/mindmap/cards/card-stack/animated-mini-card'
import {
  formatNodesForCardDisplay,
  CardStack,
} from '@/features/mindmap/cards/card-stack/card-stack'
import { GROUP_NODE_DIMENSIONS } from '@/features/mindmap/config/nodes.config'
import { TimelineSidebar } from '@/layouts/timeline/TimlineSidebarUI'
import { useMindMap } from '@/providers'

import { cn, extractUniqueYearsFromEvents } from '@/utils'
import { animate, useMotionValue } from 'framer-motion'
import { LayersIcon } from 'lucide-react'
import React from 'react'
import { useEffect, useId, useState } from 'react'
import { useMeasure } from 'react-use'
import { element } from 'three/examples/jsm/nodes/shadernode/ShaderNode'

interface GridPatternProps {
  width?: any
  height?: any
  x?: any
  y?: any
  squares?: Array<[x: number, y: number]>
  strokeDasharray?: any
  className?: string
  [key: string]: any
}

export function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  squares,
  className,
  ...props
}: GridPatternProps) {
  const id = useId()

  return (
    <svg
      aria-hidden='true'
      className={
        'pointer-events-none absolute inset-0 size-full fill-gray-400/30 stroke-gray-400/30'
      }
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits='userSpaceOnUse'
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill='none'
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width='100%' height='100%' strokeWidth={0} fill={`url(#${id})`} />
      {squares && (
        <svg x={x} y={y} className='overflow-visible'>
          {squares.map(([x, y]) => (
            <rect
              strokeWidth='0'
              key={`${x}-${y}`}
              width={width - 1}
              height={height - 1}
              x={x * width + 1}
              y={y * height + 1}
            />
          ))}
        </svg>
      )}
    </svg>
  )
}

const CardCorners = () => (
  <>
    <span className='bg-emerald-300 cursor-pointer left-[-2px] absolute top-[-2px] z-10 w-[1px] h-3' />
    <span className='bg-emerald-300 cursor-pointer left-[-2px] absolute top-[-2px] z-10 w-3 h-[1px]' />
    <span className='bg-emerald-300 bottom-[-2px] cursor-pointer absolute right-[-2px] z-10 w-[1px] h-3' />
    <span className='bg-emerald-300 bottom-[-2px] cursor-pointer absolute right-[-2px] z-10 w-3 h-[1px]' />
    <span className='bg-emerald-300 bottom-[-2px] cursor-pointer left-[-2px] absolute z-10 w-[1px] h-3' />
    <span className='bg-emerald-300 bottom-[-2px] cursor-pointer left-[-2px] absolute z-10 w-3 h-[1px]' />
    <span className='bg-emerald-300 cursor-pointer absolute right-[-2px] top-[-2px] z-10 w-[1px] h-3' />
    <span className='bg-emerald-300 cursor-pointer absolute right-[-2px] top-[-2px] z-10 w-3 h-[1px]' />
  </>
)

const CardTop = ({ children }: any) => (
  <div className='absolute top-0 left-0 z-10 w-full flex justify-between p-2 align-middle items-center'>
    {children}
  </div>
)
const CardBottom = ({ children }: any) => (
  <div className='absolute bottom-0 left-0 z-10 w-full flex justify-between p-2 align-middle items-center'>
    {children}
  </div>
)

interface EntityGroupCardProps {
  card: any
}

export const EntityGroupCard: React.FC<EntityGroupCardProps> = ({ card }) => {
  const { positionAbsoluteY, positionAbsoluteX } = card
  const {
    getIntersectingNodes,
    useNodesData,
    toggleLocationVisualization,
    screenToFlowPosition,
  } = useMindMap()
  const [
    ref,
    { x: parentX, y: parentY, width, height, top, right, bottom, left },
  ]: any = useMeasure()
  console.log('top: ', top)
  console.log('left: ', left)
  console.log('right: ', right)

  console.log('parentY: ', parentY)
  console.log('parentX: ', parentX)
  const groupNodeData = useNodesData(card.id)
  const [groupCards, setGroupCards]: any = useState(
    formatNodesForCardDisplay(groupNodeData?.data.children)
  )

  const [groupEntityType] = card.id.split('-')
  const [years, setYears] = useState(null)

  const [isMaximized, setIsMaximized] = React.useState(false)
  const [isStacked, setIsStacked] = React.useState(true)

  const [isHoveredLogo, setIsHoveredLogo] = React.useState<number | null>(null)

  const [stackedHeight, setStackedHeight] = React.useState(0)
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([])

  const toggleStack = () => setIsStacked(!isStacked)
  const [clones, setClones]: any = useState()
  const removeChildCardClone = (cardId: any) => {
    const existing = [...groupCards]
    const newCards = existing.filter((card) => card.id !== cardId)
    setGroupCards(newCards)
  }
  useEffect(() => {
    const domNodes = document.querySelectorAll(`.${groupNodeData.id}`)
    // const tempClones: any = Array.from(domNodes).map((nodeEl: any) => {
    //   const clone = nodeEl.cloneNode(true)
    //   console.log('clone: ', clone)
    //   nodeEl.style.display = 'none'
    //   return clone.innerHTML
    // })
    // setClones(tempClones)
    // console.log('tempClones: ', tempClones)
    // console.log('domNodes: ', domNodes)
    if (groupNodeData?.data.children) {
      const formattedCards = formatNodesForCardDisplay(
        groupNodeData?.data.children
      )
      setGroupCards(formattedCards)
      const formattedYears: any = extractUniqueYearsFromEvents(formattedCards)
      console.log('formattedYears: ', formattedYears)
      setYears(formattedYears)
    }
  }, [groupNodeData])

  // useEffect(() => {
  //   const domNodes = Array.from(
  //     document.querySelectorAll(`.${groupNodeData.id}`)
  //   )
  //   if (isStacked) {
  //     domNodes.forEach((nodeEl: any, i: any) => {
  //       const rotateZ = domNodes.length - i - 1
  //       animate(nodeEl, {
  //         rotateZ,
  //         y: positionAbsoluteY + 200 + (i + 20),
  //         x: positionAbsoluteX + 250 + (i + 2),
  //         z: i + 1,
  //       })
  //     })
  //   } else {
  //     domNodes.forEach((nodeEl: any, i: any) => {
  //       animate(nodeEl, {
  //         rotateZ: 0,
  //         y: i + (MINI_CARD_DEFAULT_HEIGHT + 20),
  //         x: positionAbsoluteX + 250,
  //       })
  //     })
  //   }
  // }, [isStacked])

  return (
    <div
      className={`relative h-min-[${GROUP_NODE_DIMENSIONS.height}] w--[${GROUP_NODE_DIMENSIONS.width}] shadow relative border border-white/60 dark:border-border/30 bg-black nowheel`}
      style={{
        height: GROUP_NODE_DIMENSIONS.height,
        width: GROUP_NODE_DIMENSIONS.width,
      }}
      ref={ref}
    >
      <div
        className='absolute top-0 left-0 z-0 h-full w-full'
        style={{
          // background: `radial-gradient(36.46% 50% at 50% 50%, rgba(123, 143, 221, 0.08) 0%, rgba(5, 5, 11, 0.00) 100%), radial-gradient(38.81% 50% at 50% 50%, rgba(123, 143, 221, 0.12) 0%, rgba(5, 5, 11, 0.00) 100%)`,

          background: `radial-gradient(75% 75% at 50% 91.9%, #121212 0%, #0D0D0D 100%)`,
          boxShadow: `0px 1.5px 0.5px 2.5px rgba(0, 0, 0, 0.40), 0px 0px 0.5px 1px #000, 0px 2px 1px 1px rgba(0, 0, 0, 0.25) inset, 0px 1px 1px 1px rgba(255, 255, 255, 0.20) inset`,
        }}
      />
      <CardTop>
        <h3 className='text-sm italic'>
          Events:{' '}
          {years && (
            <span className=''>
              {' '}
              {years[0]} - {years[years?.length - 1]}
            </span>
          )}
        </h3>

        <div className='text-bg-emerald-green-300 cursor-pointer text-xs'>
          <Button
            variant='ghost'
            className='text-bg-emerald-green-300 m-2'
            onClick={toggleStack}
          >
            <LayersIcon className='h8 w-8 stroke-1 stroke-white text-white' />
          </Button>
        </div>
      </CardTop>
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
          {/* <CardStack
            mindmapCards={groupCards}
            stacked={isStacked}
            toggleStack={toggleStack}
            removeChildCardClone={removeChildCardClone}
          /> */}
        </div>
      </div>
      <CardBottom>
        <div></div>
        <div className='cursor-pointer  w-8 h-8'>
          <Button
            variant='ghost'
            className='ml-auto'
            onClick={toggleLocationVisualization}
          >
            <SketchyGlobe className='stroke-1 h-5 w-5 block' fill='#78efff' />
          </Button>
        </div>
      </CardBottom>

      <CardCorners />
    </div>
  )
}
/*
import { SketchyGlobe } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { MINI_CARD_DEFAULT_HEIGHT } from '@/features/mindmap/cards/card-stack/animated-mini-card'
import {
  formatNodesForCardDisplay,
  CardStack,
} from '@/features/mindmap/cards/card-stack/card-stack'
import { GROUP_NODE_DIMENSIONS } from '@/features/mindmap/config/nodes.config'
import { TimelineSidebar } from '@/layouts/timeline/TimlineSidebarUI'
import { useMindMap } from '@/providers'

import { cn, extractUniqueYearsFromEvents } from '@/utils'
import { animate, useMotionValue } from 'framer-motion'
import { LayersIcon } from 'lucide-react'
import React, { useCallback } from 'react'
import { useEffect, useId, useState } from 'react'

interface GridPatternProps {
  width?: any
  height?: any
  x?: any
  y?: any
  squares?: Array<[x: number, y: number]>
  strokeDasharray?: any
  className?: string
  [key: string]: any
}

export function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  squares,
  className,
  ...props
}: GridPatternProps) {
  const id = useId()

  return (
    <svg
      aria-hidden='true'
      className={
        'pointer-events-none absolute inset-0 size-full fill-gray-400/30 stroke-gray-400/30'
      }
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits='userSpaceOnUse'
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill='none'
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width='100%' height='100%' strokeWidth={0} fill={`url(#${id})`} />
      {squares && (
        <svg x={x} y={y} className='overflow-visible'>
          {squares.map(([x, y]) => (
            <rect
              strokeWidth='0'
              key={`${x}-${y}`}
              width={width - 1}
              height={height - 1}
              x={x * width + 1}
              y={y * height + 1}
            />
          ))}
        </svg>
      )}
    </svg>
  )
}

const CardCorners = () => (
  <>
    <span className='bg-emerald-300 cursor-pointer left-[-2px] absolute top-[-2px] z-10 w-[1px] h-3' />
    <span className='bg-emerald-300 cursor-pointer left-[-2px] absolute top-[-2px] z-10 w-3 h-[1px]' />
    <span className='bg-emerald-300 bottom-[-2px] cursor-pointer absolute right-[-2px] z-10 w-[1px] h-3' />
    <span className='bg-emerald-300 bottom-[-2px] cursor-pointer absolute right-[-2px] z-10 w-3 h-[1px]' />
    <span className='bg-emerald-300 bottom-[-2px] cursor-pointer left-[-2px] absolute z-10 w-[1px] h-3' />
    <span className='bg-emerald-300 bottom-[-2px] cursor-pointer left-[-2px] absolute z-10 w-3 h-[1px]' />
    <span className='bg-emerald-300 cursor-pointer absolute right-[-2px] top-[-2px] z-10 w-[1px] h-3' />
    <span className='bg-emerald-300 cursor-pointer absolute right-[-2px] top-[-2px] z-10 w-3 h-[1px]' />
  </>
)

const CardTop = ({ children }: any) => (
  <div className='absolute top-0 left-0 z-10 w-full flex justify-between p-2 align-middle items-center'>
    {children}
  </div>
)
const CardBottom = ({ children }: any) => (
  <div className='absolute bottom-0 left-0 z-10 w-full flex justify-between p-2 align-middle items-center'>
    {children}
  </div>
)

interface EntityGroupCardProps {
  card: any
}

export const EntityGroupCard: React.FC<EntityGroupCardProps> = ({ card }) => {
  const { getIntersectingNodes, useNodesData, toggleLocationVisualization } =
    useMindMap()
  const groupNodeData = useNodesData(card.id)
  const [groupCards, setGroupCards]: any = useState(
    formatNodesForCardDisplay(groupNodeData?.data.children)
  )

  const [groupEntityType] = card.id.split('-')
  const [years, setYears] = useState(null)

  const [isMaximized, setIsMaximized] = React.useState(false)
  const [isStacked, setIsStacked] = React.useState(false)

  const [isHoveredLogo, setIsHoveredLogo] = React.useState<number | null>(null)

  const [stackedHeight, setStackedHeight] = React.useState(0)
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([])

  const toggleStack = () => setIsStacked(!isStacked)

  useEffect(() => {
    if (groupNodeData?.data.children) {
      const formattedCards = formatNodesForCardDisplay(
        groupNodeData?.data.children
      )

      setGroupCards(formattedCards)
      const formattedYears: any = extractUniqueYearsFromEvents(formattedCards)
      console.log('formattedYears: ', formattedYears)
      setYears(formattedYears)
    }
  }, [getIntersectingNodes, groupNodeData])

  function triggerAnimation(
    isOpen: boolean,
    el: Element,
    i: number,
    rotateZ: undefined
  ) {
    if (isOpen) {
      animate(
        el,
        {
          y: i * (MINI_CARD_DEFAULT_HEIGHT + 20),
          x: 0,
          rotateZ: 0,
          // top: '16%',
          z: 0,
        },
        {
          type: 'spring',
          stiffness: 200,
          damping: 30,
        }
      )
    } else {
      animate(
        el,
        {
          y: i + 20,
          x: i + 2,
          rotateZ: rotateZ,
          // top: '25%',
          z: i + 1,
        },
        {
          type: 'spring',
          stiffness: 200,
          damping: 30,
        }
      )
    }
  }

  //   const animateCards = useCallback(() => {
  // const childNodes = groupCards.map((card) => {
  //   const dataId = card.id
  //   const domNode = document.querySelectorAll(`.${groupNodeData.id}`)
  //   console.log('domNode: ', domNode)
  //   return domNode
  // })
  // console.log('childNodes: ', childNodes);
  //   }, [])

  useEffect(() => {
    const childNodes = Array.from(
      document.querySelectorAll(`.${groupNodeData.id}`)
    )
    console.log('childNodes: ', childNodes);

    childNodes.forEach((item, i) => {
      console.log('item: ', item)
      const rotateZ: any = childNodes.length - i - 1
      triggerAnimation(isStacked, item, i, rotateZ)
    })

    if (isStacked && itemRefs.current[0]) {
      const itemHeight = itemRefs.current[0].offsetHeight
      const itemPadding = parseInt(
        window.getComputedStyle(itemRefs.current[0]).paddingTop
      )
      const totalHeight = itemHeight + itemPadding * (groupCards.length - 1)
      setStackedHeight(totalHeight)
    }

  }, [groupCards.length, isStacked])

  // useEffect(() => {
  //   if (isStacked) {
  //     const childNodes = Array.from(
  //       document.querySelectorAll(`.${groupNodeData.id}`)
  //     )
  //     console.log('childNodes: ', childNodes)

  //     childNodes.forEach((item, i) => {
  //       console.log('item: ', item)
  //       const rotateZ: any = childNodes.length - i - 1
  //       triggerAnimation(isStacked, item, i, rotateZ)
  //     })
  //   }
  // }, [isStacked])
  return (
    <div
      className={`relative h-[${GROUP_NODE_DIMENSIONS.height}] w-[${GROUP_NODE_DIMENSIONS.width}]  shadow relative border border-white/60 dark:border-border/30 bg-black nowheel`}
      style={{
        height: GROUP_NODE_DIMENSIONS.height,
        width: GROUP_NODE_DIMENSIONS.width,
      }}
    >
      <CardTop>
        <h3 className='text-sm italic'>
          Events:{' '}
          {years && (
            <span className=''>
              {' '}
              {years[0]} - {years[years?.length - 1]}
            </span>
          )}
        </h3>

        <div className='text-bg-emerald-green-300 cursor-pointer text-xs'>
          <Button
            variant='ghost'
            className='text-bg-emerald-green-300 m-2'
            onClick={toggleStack}
          >
            <LayersIcon className='h8 w-8 stroke-1' />
          </Button>
        </div>
      </CardTop>
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
      <CardBottom>
        <div></div>
        <div className='cursor-pointer  w-8 h-8'>
          <Button
            variant='ghost'
            className='ml-auto'
            onClick={toggleLocationVisualization}
          >
            <SketchyGlobe className='stroke-1 h-5 w-5 block' fill='#78efff' />
          </Button>
        </div>
      </CardBottom>

      <CardCorners />
    </div>
  )
}

*/
