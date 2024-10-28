'use client'

import {
  CoreNodeAvatar,
  CoreNodeBottom,
  CoreNodeContainer,
  CoreNodeContent,
} from '@/features/mindmap/nodes/core-node-ui'

import { useMindMap } from '@/providers'
import { useUser } from '@clerk/nextjs'
import { Handle, Position } from '@xyflow/react'
import { SparklesIcon, WaypointsIcon } from 'lucide-react'
import { forwardRef, memo, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'


import { cn, DOMAIN_MODEL_COLORS } from '@/utils'
import Image from "next/image"

import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion"
import { AskAI } from '@/features/mindmap/components/ask-ai'
import { MemoizedMarkdown } from '@/features/ai'
import { LetterFx } from '@/components/animated/text-effect/letter-glitch'
import { useEntity } from '@/hooks'
import { useGroupNode } from '@/features/mindmap/hooks/useGroupNode'
import type { Node, NodeProps } from '@xyflow/react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { ConnectionsIcon, GroupIcon } from '@/components/icons'
import { AddNote } from '@/components/note/AddNote'
import rehypeExternalLinks from 'rehype-external-links'
import remarkGfm from 'remark-gfm'
import { AnimatedBeam } from '@/components/animated'
import { p } from '@liveblocks/react/dist/suspense-fYGGJ3D9'
import { shadow } from 'deck.gl'
import { center } from 'maath/dist/declarations/src/buffer'
import { z } from 'zod'

export const ResultAvatars = ( {
  entities,
}: {
  entities: {
    id: number
    name: string

    image: string
  }[]
} ) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>( null )
  const springConfig = { stiffness: 100, damping: 5 }
  const x = useMotionValue( 0 ) // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform( x, [-100, 100], [-45, 45] ),
    springConfig
  )
  // translate the tooltip
  const translateX = useSpring(
    useTransform( x, [-100, 100], [-50, 50] ),
    springConfig
  )
  const handleMouseMove = ( event: any ) => {
    const halfWidth = event.target.offsetWidth / 2
    x.set( event.nativeEvent.offsetX - halfWidth ) // set the x value, which is then used in transform and rotate
  }

  return (
    <>
      {entities.map( ( item, idx ) => (
        <div
          className="-mr-8 relative group w-min"
          key={item.id}
          onMouseEnter={() => setHoveredIndex( item.id )}
          onMouseLeave={() => setHoveredIndex( null )}
        >
          <AnimatePresence mode="popLayout">
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs  flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2"
              >
                <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
                <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
                <div className="font-bold text-white relative z-30 text-base">
                  {item.name}
                </div>
                <div className="text-white text-xs">{item.name}</div>
              </motion.div>
            )}
          </AnimatePresence>
          <Image
            onMouseMove={handleMouseMove}
            height={24}
            width={24}
            src={item.image || '/astro-3.png'}
            alt={item.name}
            className="object-cover !m-0 !p-0 object-top rounded-full h-10 w-10 border-2 group-hover:scale-105 group-hover:z-30 border-white  relative transition duration-500"
          />
        </div>
      ) )}
    </>
  )
}
{/* <div className="h-20 w-[260px] max-w-sm animate-pulse rounded-md bg-gray-300" />
<div className='hint' onMouseEnter={handleHover}>
      <span className='hint-radius'></span>
      <span className='hint-dot'></span>
      <div className='hint-content do--split-children'>
        
        <p
          style={{ color: '#78efff', letterSpacing: '0.05em' }}
          className={`font-firaCode text-[#78efff]`}
        >
          {coordinates[0]}, {coordinates[1]}
        </p>
      </div>
    </div> */}

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>( ( { className, children }, ref ) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-16 items-center justify-center rounded-full p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] anchor-node-icon",
        className,
      )}
    >
      <div className='hint'>

        <span className='hint-radius'></span>
        {/* <span className='hint-dot'></span> */}
        {children}
      </div>
    </div>
  )
} )

Circle.displayName = "Circle"


export const UserInputNode = memo( ( props: NodeProps ) => {
  const containerRef = useRef<HTMLDivElement>( null )
  const anchorRef = useRef<HTMLDivElement>( null )
  const nodeRef = useRef<HTMLDivElement>( null )
  const [prompt, setPrompt] = useState( null )
  // @ts-ignore
  const { handles, node }: any = useGroupNode( { node: { ...props } } )
  const [analysis, setAnalysis] = useState<any>( null )
  const updateAnalysis = useCallback( ( analysis: any ) => {
    setAnalysis( analysis )
  }, [] )

  const { saveNote, updateNote, userNote, findConnections } = useEntity( { card: node } )

  const { user } = useUser()
  // const image = {
  //   url: user?.hasImage ? user?.imageUrl : '/astro-3.png',
  // }

  const askQuestion = ( { entities, input, type }: any ) => {
    const names = entities.join( ', ' )
    console.log( "🚀 ~ askQuestion ~ names:", names )
    return `Given the following ${type}s: ${names}, what are some related data points and related avenues worth exploring in regard to their story in its own right and their role in the state of disclosure as we know it??`
  }


  return (
    <>
      <div ref={containerRef} className='relative flex flex-col items-center align-center justify-center w-full'>
        {/* <div className='my-12 relative'> */}
        <div className='mb-[35px] w-full flex justify-center'>
          <Circle className='' ref={anchorRef}>
            <svg

              className='w-12 h-12'
              viewBox='0 0 75 75'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M37.7725 38.1035C57.9016 38.0973 74.1008 37.833 74.1008 37.5079C74.1008 37.1878 58.3991 36.9267 38.7043 36.9128C48.417 27.1776 55.9586 19.3752 55.7994 19.2161C55.6377 19.0544 47.5927 26.8355 37.6459 36.7671C37.6396 16.6467 37.3754 0.45752 37.0504 0.45752C36.7253 0.45752 36.461 16.657 36.4548 36.7863C26.4992 26.8456 18.4439 19.0543 18.2822 19.2161C18.123 19.3753 25.6646 27.1777 35.3773 36.9128C15.6914 36.9269 0 37.188 0 37.5079C0 37.8329 16.1889 38.0971 36.309 38.1035C26.1513 48.2685 18.118 56.569 18.2822 56.7333C18.444 56.895 26.4995 49.1036 36.4553 39.1627C36.4692 58.8571 36.7303 74.5583 37.0504 74.5583C37.3703 74.5583 37.6314 58.8673 37.6455 39.1819C47.5924 49.1136 55.6377 56.895 55.7994 56.7333C55.9636 56.5691 47.9302 48.2685 37.7725 38.1035Z'
                fill='currentColor'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M37.7725 38.1035C57.9016 38.0973 74.1008 37.833 74.1008 37.5079C74.1008 37.1878 58.3991 36.9267 38.7043 36.9128C48.417 27.1776 55.9586 19.3752 55.7994 19.2161C55.6377 19.0544 47.5927 26.8355 37.6459 36.7671C37.6396 16.6467 37.3754 0.45752 37.0504 0.45752C36.7253 0.45752 36.461 16.657 36.4548 36.7863C26.4992 26.8456 18.4439 19.0543 18.2822 19.2161C18.123 19.3753 25.6646 27.1777 35.3773 36.9128C15.6914 36.9269 0 37.188 0 37.5079C0 37.8329 16.1889 38.0971 36.309 38.1035C26.1513 48.2685 18.118 56.569 18.2822 56.7333C18.444 56.895 26.4995 49.1036 36.4553 39.1627C36.4692 58.8571 36.7303 74.5583 37.0504 74.5583C37.3703 74.5583 37.6314 58.8673 37.6455 39.1819C47.5924 49.1136 55.6377 56.895 55.7994 56.7333C55.9636 56.5691 47.9302 48.2685 37.7725 38.1035Z'
                fill='currentColor'
                fill-opacity='0.2'
              />
            </svg>
          </Circle>
        </div>


        <AnimatedBeam
          className='ml-[-15px]'
          containerRef={containerRef}
          fromRef={anchorRef}
          toRef={nodeRef}
          duration={3}
          // curvature={-75}
          startYOffset={5}
          endXOffset={-10}
          startXOffset={-10}
        />

        <CoreNodeContainer id={props.id} className='motion-scale-in-0 motion-opacity-in-0' ref={nodeRef} >
          {/* <div ref={nodeRef} className='w-full absolute top-0 left-[calc(50%-15px)]'></div> */}

          <CoreNodeContent className='min-h-[100xp] w-full'>
            <p className='text-sm text-white font-source-sans'>

              {props.data.input || ''}

            </p>
            <AnimatePresence>


              {analysis && analysis.text && (
                <motion.div className='w-full' key='wrapper'>
                  <MemoizedMarkdown
                    rehypePlugins={[
                      [rehypeExternalLinks, { target: '_blank' }],
                    ]}
                    remarkPlugins={[remarkGfm]}
                    className='prose-sm prose-neutral prose-a:text-accent-foreground/50 transition-all duration-300 will-change-transform line-clamp-3 hover:line-clamp-none'
                    components={{
                      // Map `h1` (`# heading`) to use `h2`s.
                      h1: 'h2',
                      // Rewrite `em`s (`*like so*`) to `i` with a red foreground color.
                      pre: ( props ) => {
                        return (
                          // @ts-ignore
                          <div {...props} />
                        )
                      },
                      code: ( props ) => {
                        return (
                          // @ts-ignore
                          <p {...props} />
                        )
                      },
                      p: ( props ) => {
                        return (
                          // @ts-ignore
                          <p {...props} className="transition-all duration-300 will-change-transform line-clamp-3 hover:line-clamp-none" />
                        )
                      },
                    }}
                  >
                    {analysis.text}
                  </MemoizedMarkdown>
                </motion.div>
              )}
            </AnimatePresence>

          </CoreNodeContent>
          <CoreNodeBottom>
            {( node?.data?.entities?.length > 0 && props.data.type && props.data.input ? (

              <AskAI question={askQuestion( { entities: node?.data?.entities?.map( ( { data }: any ) => data?.name ), input: props.data.input, type: props.data.type } )} table={props?.data?.type} updateAnalysis={updateAnalysis} >
                <WaypointsIcon stroke={DOMAIN_MODEL_COLORS.personnel} className='w-4 h-4 stroke-1' />
              </AskAI>
            ) : null )}
            <div className='flex justify-end gap-2 width-[50%]'>
              <div className='w-auto flex'>
                <Button variant='ghost' onClick={findConnections} className='p-0'>
                  <GroupIcon stroke={'#fff'} className='w-6 h-6 stroke-1' />
                </Button>
                {/* @ts-ignore */}
                <Separator orientation='vertical' className='ml-4' />
                <AddNote saveNote={saveNote} userNote={userNote} updateNote={updateNote} />
              </div>
            </div>
          </CoreNodeBottom>
        </CoreNodeContainer>

        {handles && handles?.length
          ? handles.map( ( id: string ) => (
            <Handle
              key={id}
              type='source'
              position={Position.Bottom}
              id={id}
              isConnectable={true}
            />
          ) )
          : null}
        <Handle
          type='source'
          position={Position.Bottom}
          isConnectable={true}
        />

      </div>
    </>
  )
} )
UserInputNode.displayName = 'UserInputNode'
