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
import { LightsBackground } from '@/features/mindmap/cards/entity-group-card/lights-background'
import { GROUP_NODE_DIMENSIONS } from '@/features/mindmap/config/nodes.config'
import { TimelineSidebar } from '@/layouts/timeline/TimlineSidebarUI'
import { useMindMap } from '@/providers'

import { cn, DOMAIN_MODEL_COLORS, extractUniqueYearsFromEvents } from '@/utils'
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
// after:absolute after:content:"" after:top-[2.5%] after:left-[2.5%]  after:content:"" after:border-l after:border-l-solid after:border-[#FA1E4E] after:h-[95%] after:w-[95%]
export const CardCorners = ({ type }: any) => (
  <>
    <span
      className={` cursor-pointer left-[-2px] absolute top-[-2px] z-10 w-[1px] h-3`}
      style={{
        backgroundColor: DOMAIN_MODEL_COLORS[type],
      }}
    />
    <span
      className={`  cursor-pointer left-[-2px] absolute top-[-2px] z-10 w-3 h-[1px]`}
      style={{
        backgroundColor: DOMAIN_MODEL_COLORS[type],
      }}
    />
    <span
      className={`  bottom-[-2px] cursor-pointer absolute right-[-2px] z-10 w-[1px] h-3`}
      style={{
        backgroundColor: DOMAIN_MODEL_COLORS[type],
      }}
    />
    <span
      className={`  bottom-[-2px] cursor-pointer absolute right-[-2px] z-10 w-3 h-[1px]`}
      style={{
        backgroundColor: DOMAIN_MODEL_COLORS[type],
      }}
    />
    <span
      className={`  bottom-[-2px] cursor-pointer left-[-2px] absolute z-10 w-[1px] h-3`}
      style={{
        backgroundColor: DOMAIN_MODEL_COLORS[type],
      }}
    />
    <span
      className={`  bottom-[-2px] cursor-pointer left-[-2px] absolute z-10 w-3 h-[1px]`}
      style={{
        backgroundColor: DOMAIN_MODEL_COLORS[type],
      }}
    />
    <span
      className={`  cursor-pointer absolute right-[-2px] top-[-2px] z-10 w-[1px] h-3`}
      style={{
        backgroundColor: DOMAIN_MODEL_COLORS[type],
      }}
    />
    <span
      className={`  cursor-pointer absolute right-[-2px] top-[-2px] z-10 w-3 h-[1px]`}
      style={{
        backgroundColor: DOMAIN_MODEL_COLORS[type],
      }}
    />
  </>
)

export const CardTop = ({ children }: any) => (
  <div className='absolute top-0 left-0 z-10 w-full flex justify-between p-2 align-middle items-center'>
    {children}
  </div>
)
export const CardBottom = ({ children }: any) => (
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
    if (groupNodeData?.data.children) {
      const formattedCards = formatNodesForCardDisplay(
        groupNodeData?.data.children
      )
      setGroupCards(formattedCards)
      const formattedYears: any = extractUniqueYearsFromEvents(formattedCards)

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
    <>
      <div
        className={`relative h-min-[${GROUP_NODE_DIMENSIONS.height}] w-[${GROUP_NODE_DIMENSIONS.width}] entity-group-card shadow relative border border-white/60 dark:border-border/30 nowheel transform-gpu bg-black bg-cover bg-center `}
        style={{
          height: GROUP_NODE_DIMENSIONS.height,
          width: GROUP_NODE_DIMENSIONS.width,
          // backgroundPosition: 'center!important',
          // background:
          // 'url(https://res.cloudinary.com/dzl9yxixg/image/upload/sub-grid_hnhyvi.png)',
        }}
        ref={ref}
      >
        <CardTop>
          <h3
            className='capitalize italic'
            style={{
              fontSize: '24px',
              fontFamily: 'var(--font-bebasNeuePro)',

              lineHeight: '32px',
              alignSelf: 'flex-start',
              marginLeft: '80px',
            }}
          >
            {groupNodeData?.id.split('-')[0]}:{' '}
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

        <div className='accent-lines'>
          <div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <CardCorners type={card.id.split('-')[0]} />
      </div>
    </>
  )
}
