'use  client'
import React from 'react'
import { Fragment, useEffect, useMemo, useState, useRef } from 'react'
import { formatNodesForCardDisplay } from '@/features/mindmap/cards/card-stack/card-stack'
import {
  GROUP_NODE_WIDTH,
  GROUP_NODE_HEIGHT,
} from '@/features/mindmap/config/nodes.config'

import { useMindMap } from '@/providers'
import { extractUniqueYearsFromEvents, truncate } from '@/utils'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import {
  ChevronsRight,
  RotateCcw,
  Columns3,
  Rows3,
  X,
  LayersIcon,
} from 'lucide-react'

import useMeasure from 'react-use-measure'
import { useMediaQuery, useOnClickOutside } from 'usehooks-ts'
import Link from 'next/link'
import { SketchyGlobe } from '@/components/icons'
import {
  CardTop,
  CardBottom,
  CardCorners,
} from '@/features/mindmap/cards/entity-group-card/entity-group-card'
import { TimelineSidebar } from '@/layouts/timeline/TimlineSidebarUI'
import { Button } from '@/components/ui/button'
import { Gallery } from '@/components/animated/gallery'
export function TopicAndTestimoniesGroupCard({ data }: any) {
  const { positionAbsoluteY, positionAbsoluteX } = data
  const {
    getIntersectingNodes,
    useNodesData,
    toggleLocationVisualization,
    screenToFlowPosition,
  } = useMindMap()

  const groupNodeData = useNodesData(data.id)
  const [groupCards, setGroupCards]: any = useState(
    formatNodesForCardDisplay(groupNodeData?.data.children)
  )

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

  const [alignment, setAlignment] = useState<'columns' | 'rows'>('columns')
  const [activePost, setActivePost] = useState<PostType>(groupCards[0])
  const [clikedPost, setClikedPost] = useState<PostType | null>(null)

  const [isHovered, setIsHovered] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, () => setClikedPost(null))

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setClikedPost(null)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const matches = useMediaQuery('(max-width: 640px)')

  useEffect(() => {
    if (matches) {
      setAlignment('rows')
    }
  }, [matches])

  const initialRotation = useMemo(() => {
    return () =>
      `${Math.random() * 10 > 5 ? '-' : ''}${Math.random() * 10 + 10}deg`
  }, [])

  return (
    <div
      className='relative flex min-h-[700px] w-full items-start justify-center bg-black px-4 py-10 sm:items-center'
      style={{
        height: GROUP_NODE_WIDTH,
        width: GROUP_NODE_HEIGHT,
      }}
    >
      <CardTop>
        <h3
          className='capitalize'
          style={{
            fontSize: '24px',
            fontFamily: 'var(--font-bebasNeuePro)',

            lineHeight: '32px',
          }}
        >
          {groupNodeData?.id.split('-')[0]}
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
      <div className='relative flex w-full flex-col items-center justify-center'>
        <LayoutGroup>
          <AnimatePresence>
            {clikedPost && !matches && alignment === 'columns' && (
              <motion.div
                className='fixed inset-0 z-50 flex items-center justify-center bg-transparent p-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className='relative w-full max-w-lg rounded-[32px] bg-black p-6 shadow-xl'
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  layoutId='post-detail'
                  ref={ref}
                >
                  <button
                    onClick={() => setClikedPost(null)}
                    className='absolute right-6 top-6 z-30 rounded-full border-2 border-white bg-white p-2 text-white shadow-md transition-transform duration-300 active:scale-95'
                  >
                    <X />
                  </button>
                  <motion.div className='relative mb-5 shrink-0 cursor-pointer overflow-hidden rounded-3xl bg-white transition-all after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-3xl after:border-[5px] after:border-white/50'>
                    <Gallery images={clikedPost.photos} />
                    {/* <motion.img
                    src={clikedPost.photos[0].url}
                    alt={clikedPost.name}
                    className='aspect-auto h-full w-full object-cover'
                  /> */}
                  </motion.div>
                  <div>
                    <h1 className='text-xl text-black font-bebasNeuePro'>
                      {clikedPost.name}
                    </h1>
                    <p className='flex items-center text-sm text-black'>
                      <ChevronsRight className='mr-1 w-4' />
                      {clikedPost.date}
                    </p>
                  </div>
                  <p className='mt-4 text-sm text-black font-source'>
                    {truncate(clikedPost.summary, 500)}
                  </p>
                  <Link
                    aria-label='Read more'
                    className='group mt-5 flex w-max items-center justify-center gap-2.5 rounded-2xl bg-zinc-700 px-4 py-2.5 text-sm font-[550] text-white active:scale-95 sm:transition-transform'
                    href={`/topics/${activePost.id}`}
                  >
                    <Button
                      className='py-2 px-4 rounded flex items-center gap-2 '
                      variant='ghost'
                    >
                      <span>Learn More</span>
                      <motion.svg
                        width='15'
                        height='15'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <motion.path
                          d='M5 12H19'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          initial={{ opacity: 0, x: -10 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                        <motion.path
                          d='M12 5L19 12L12 19'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          initial={{ x: -7 }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      </motion.svg>
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className='relative flex w-full items-center justify-center'
            style={{
              flexDirection: alignment === 'rows' ? 'column' : 'row',
              gap: alignment === 'rows' ? '1.5rem' : '0',
            }}
          >
            {groupCards.map((card, index) => {
              console.log('card: ', card)
              const image = card?.photos?.length
                ? card?.photos[0]
                : { url: '/foofighters.webp', signedUrl: '/foofighters.webp' }
              return (
                <>
                  <motion.div
                    key={index}
                    whileHover={{
                      zIndex: 5,
                      scale: alignment === 'rows' ? 1 : 1.2,
                    }}
                    style={{
                      marginRight: alignment === 'rows' ? '0' : '-2.5rem',
                      borderRadius: 24,
                    }}
                    layout
                  >
                    <motion.div
                      className='relative'
                      initial={{ opacity: 0, y: 20, scale: 0.9, rotate: 5 }}
                      animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.2,
                      }}
                      onMouseEnter={() => setIsHovered(index)}
                      onMouseLeave={() => setIsHovered(null)}
                    >
                      <motion.div
                        className='ease-bounce group relative shrink-0 cursor-pointer overflow-hidden rounded-3xl bg-black shadow-xl transition-all duration-300 will-change-transform after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-3xl after:border-[5px] after:border-white/50 after:transition-[border] hover:!rotate-0 hover:after:border-8'
                        onMouseEnter={() => setActivePost(card)}
                        onClick={() => setClikedPost(card)}
                        style={{
                          rotate:
                            alignment === 'rows' ? '0' : initialRotation(),
                          width: matches
                            ? 'auto'
                            : alignment === 'rows'
                              ? 512
                              : 214,
                          height: matches
                            ? 'auto'
                            : alignment === 'rows'
                              ? 288
                              : 160,
                        }}
                        layoutId={`${card.name}-image`}
                      >
                        {activePost === card && <IndicatorPoint />}
                        <motion.img
                          src={image.url}
                          alt={card?.name}
                          className='aspect-auto h-full w-full object-cover'
                        />
                      </motion.div>

                      {isHovered === index && (
                        <motion.div
                          className='inset absolute bottom-full mb-1 flex w-full cursor-pointer items-center justify-center'
                          initial={{ scale: 0, y: 10 }}
                          animate={{ scale: 1, y: 0 }}
                          exit={{ scale: 0, y: 10 }}
                          style={{
                            bottom: alignment === 'rows' ? 'auto' : '100%',
                            height: alignment === 'rows' ? '100%' : 'auto',
                            marginBottom:
                              alignment === 'rows' ? '0' : '0.25rem',
                            inset: alignment === 'rows' ? '0' : '',
                          }}
                        >
                          <span className='rounded-lg bg-zinc-900 px-2 py-1.5 text-xs font-medium text-white'>
                            {card.title}
                          </span>
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                  {activePost === card && alignment === 'rows' && (
                    <PostDetail activePost={activePost} alignment={alignment} />
                  )}
                </>
              )
            })}
          </div>
          {alignment === 'columns' && (
            <PostDetail activePost={activePost} alignment={alignment} />
          )}
        </LayoutGroup>
      </div>
      <CardCorners type={data.id.split('-')[0]} />
    </div>
  )
}

const PostDetail = ({
  activePost,
  alignment,
}: {
  activePost: any
  alignment: 'columns' | 'rows'
}) => {
  return (
    <motion.div
      className={`flex w-full justify-between gap-6`}
      layoutId='post-detail'
      style={{
        marginTop: '5rem',
      }}
    >
      <div className='flex w-2/3 flex-col gap-6'>
        <motion.h3
          className='min-h-10 text-xl text-white  font-bebasNeuePro'
          key={activePost.name}
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
        >
          {activePost.name}
        </motion.h3>
      </div>
      <div className='w-full flex flex-col align-end'>
        <motion.p
          className='min-h-32 text-pretty text-sm text-white font-source'
          key={activePost.name}
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
        >
          {truncate(activePost.summary, 800)}
        </motion.p>
        <Link
          aria-label='Read more'
          className='active:scale-95 sm:transition-transform mt-4 ml-auto'
          href={`/topics/${activePost.id}`}
          target='_blank'
        >
          <Button
            className='py-2 px-4 rounded flex items-center gap-2 '
            variant='ghost'
          >
            <span>Learn More</span>
            <motion.svg
              width='15'
              height='15'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <motion.path
                d='M5 12H19'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.path
                d='M12 5L19 12L12 19'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                initial={{ x: -7 }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.2 }}
              />
            </motion.svg>
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}

const IndicatorPoint = () => {
  return (
    <motion.div className='absolute left-0 top-0 z-10 size-12 opacity-0 transition-opacity delay-500 duration-300 ease-in group-hover:opacity-0 group-hover:delay-0 group-hover:duration-100 sm:opacity-100'>
      <div className='absolute left-0 top-0 size-12 bg-black/25 blur-xl'></div>
      <div className='absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white after:absolute after:h-full after:w-full after:animate-ping after:rounded-full after:bg-white'></div>
    </motion.div>
  )
}
