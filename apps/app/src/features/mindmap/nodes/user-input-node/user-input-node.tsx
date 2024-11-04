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


import { chroma, cn, DOMAIN_MODEL_COLORS, wait } from '@/utils'
import Image from "next/image"

import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useInView,
  delay,
} from "framer-motion"
import { AskAI } from '@/features/mindmap/components/ask-ai'
import { MemoizedMarkdown } from '@/features/ai'
import { LetterFx } from '@/components/animated/text-effect/letter-glitch'
import { useEntity } from '@/hooks'
import { useGroupNode } from '@/features/mindmap/hooks/useGroupNode'
import type { Node, NodeProps } from '@xyflow/react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { AiStarIcon, ConnectionsIcon, GroupIcon } from '@/components/icons'
import { AddNote } from '@/components/note/AddNote'
import rehypeExternalLinks from 'rehype-external-links'
import remarkGfm from 'remark-gfm'
import { AnimatedBeam } from '@/components/animated'
import { p, type d } from '@liveblocks/react/dist/suspense-fYGGJ3D9'
import { shadow } from 'deck.gl'
import { center } from 'maath/dist/declarations/src/buffer'
import { z } from 'zod'
import { path, svg, type transition } from 'd3'
import type { type } from 'os'
import type { fill } from 'three/src/extras/TextureUtils'
import { Anchor } from '@/features/mindmap/nodes/user-input-node/anchor'

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
  const [showAnchor, setShowAnchor] = useState( false )

  useEffect( () => {
    wait( 2 ).then( () => setShowAnchor( true ) )
  }, [] )
  // const image = {
  //   url: user?.hasImage ? user?.imageUrl : '/astro-3.png',
  // }

  const askQuestion = ( { entities, input, type }: any ) => {
    const names = entities.join( ', ' )
    console.log( "🚀 ~ askQuestion ~ names:", names )
    return `Given the following ${type}s: ${names}, what are some related data points and related avenues worth exploring in regard to their story in its own right and their role in the state of disclosure as we know it??`
  }


  return (

    <motion.div ref={containerRef} className='relative flex flex-col items-center align-center justify-center w-full'>
      <AnimatePresence>
        {showAnchor && (
          <>
            <motion.div className='mb-[35px] w-full flex justify-center'>
              <Anchor className='' ref={anchorRef} />
            </motion.div>
            <AnimatedBeam
              className='w-full'
              containerRef={containerRef}
              fromRef={anchorRef}
              toRef={nodeRef}
              duration={3}
            />
          </>
        )}
      </AnimatePresence>

      <CoreNodeContainer id={props.id} className='motion-scale-in-0 motion-opacity-in-0' ref={nodeRef} >

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
          <div className='flex justify-end width-[50%] gap-2 align-center items-center'>




            <Button variant='ghost' onClick={findConnections} className=''>
              <GroupIcon stroke={'#fff'} className='w-6 h-6 stroke-1' />
            </Button>
            <AddNote saveNote={saveNote} userNote={userNote} updateNote={updateNote} />

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

    </motion.div>

  )
} )
UserInputNode.displayName = 'UserInputNode'
