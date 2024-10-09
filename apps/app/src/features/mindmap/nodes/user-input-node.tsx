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
import { memo, useEffect, useState } from 'react'

import { DOMAIN_MODEL_COLORS } from '@/utils'
import Image from "next/image"

import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion"
import { AskAI } from '@/features/mindmap/components/ask-ai'
import { LetterFx } from '@/components/animated/text-effect/letter-glitch'
import { useEntity } from '@/hooks'
import { useGroupNode } from '@/features/mindmap/hooks/useGroupNode'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { ConnectionsIcon, GroupIcon } from '@/components/icons'
import { AddNote } from '@/components/note/AddNote'

export const ResultAvatars = ( {
  results,
}: {
  results: {
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
      {results.map( ( item, idx ) => (
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




interface UserInputNodeProps { }

interface UserInputNodeProps {
  id: string
  data: {
    type: string
    handles?: any[]
    input: string
  }
}

export const UserInputNode = memo( ( node: any ) => {
  const { useUpdateNodeInternals, useNodesData } = useMindMap()
  const updateNodeInternals = useUpdateNodeInternals()
  const [handles, setHandles]: any = useState( [] )
  const nodeData = useNodesData( node.id )
  const {
    handles: groupHandles,
    childNodeIds,
    hideChildren,
    showChildren,
    positionChildNodes,
    getClonePosition,
    node: groupNode
  } = useGroupNode( { node } )

  useEffect( () => {
    if ( groupHandles && groupHandles.length > 0 ) {
      setHandles( groupHandles )
      updateNodeInternals( node.id )
    }


  }, [groupHandles, childNodeIds, node.id, updateNodeInternals] )

  const { saveNote, updateNote, userNote, findConnections } = useEntity( { card: node } )

  const { user } = useUser()
  // const image = {
  //   url: user?.hasImage ? user?.imageUrl : '/astro-3.png',
  // }

  const createPrompt = ( input: string, type: string ) => {
    return `Given the following ${type}s, ${input} what are some connections between them?`
  }

  useEffect( () => {
    updateNodeInternals( node.id )
    if ( nodeData?.handles?.length ) {
      setHandles( nodeData.handles )

    }
  }, [nodeData, updateNodeInternals] )

  return (
    <>
      <CoreNodeContainer id={nodeData.id} className='motion-scale-in-0 motion-opacity-in-0'>
        <CoreNodeContent>
          <p className='text-sm text-white font-nunito'>
            <LetterFx>

              {node?.data?.input}
            </LetterFx>
          </p>

        </CoreNodeContent>
        <CoreNodeBottom>
          <AskAI records={node?.data?.results} prompt={createPrompt( node?.data?.input, node?.data?.type )} table={node?.data?.type} >
            <WaypointsIcon stroke={DOMAIN_MODEL_COLORS.personnel} className='w-9 h-9 stroke-1' />
          </AskAI>
          <div className='flex justify-end gap-2 width-[50%]'>
            <div className='w-auto flex'>
              <Button variant='ghost' onClick={findConnections} className='p-0'>
                <GroupIcon stroke={'#fff'} className='w-9 h-9 stroke-1' />
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
    </>
  )
} )
UserInputNode.displayName = 'UserInputNode'
