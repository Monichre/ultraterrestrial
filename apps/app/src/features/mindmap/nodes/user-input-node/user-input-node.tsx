'use client'

import {
  CoreNodeBottom,
  CoreNodeContainer,
  CoreNodeContent
} from '@/features/mindmap/nodes/core-node-ui'

import { useUser } from '@clerk/nextjs'
import { Handle, Position } from '@xyflow/react'
import { memo, useCallback, useEffect, useRef, useState } from 'react'

import { wait } from '@/utils'

import { AnimatedBeam } from '@/components/animated'
import { GroupIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { MemoizedMarkdown } from '@/features/ai'
import { useGroupNode } from '@/features/mindmap/hooks/useGroupNode'
import { Anchor } from '@/features/mindmap/nodes/user-input-node/anchor'
import { useEntity } from '@/hooks'
import { getImageUrl } from '@/utils/image.utils'
import type { NodeProps } from '@xyflow/react'
import {
  AnimatePresence,
  motion
} from "framer-motion"
import rehypeExternalLinks from 'rehype-external-links'
import remarkGfm from 'remark-gfm'



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
    wait( .5 ).then( () => setShowAnchor( true ) )
  }, [] )

  console.log( "🚀 ~ file: user-input-node.tsx:59 ~ previewAvatars ~ node?.data?.entities:", node?.data?.entities )
  const previewAvatars = node?.data?.entities?.map( ( { data }: any ) => ( {



    name: data?.name,
    image: getImageUrl( data ),
    id: data?.id,
    designation: data?.role || data?.location,
  } ) )

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
          {/* {( node?.data?.entities?.length > 0 && props.data.type && props.data.input ? (

            <AskAI question={askQuestion( { entities: node?.data?.entities?.map( ( { data }: any ) => data?.name ), input: props.data.input, type: props.data.type } )} table={props?.data?.type} updateAnalysis={updateAnalysis} />
          ) : null )} */}
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

          <div className='flex justify-between w-full align-center items-center'>

            <div className='w-[75%] flex justify-start items-center h-full'>

            </div>
            <div className='w-[25%] flex justify-end items-center'>
              <Button variant='ghost' onClick={findConnections} className='p-0'>
                <GroupIcon stroke={'#fff'} className='w-6 h-6 stroke-1' />
              </Button>
              {/* <AddNote saveNote={saveNote} userNote={userNote} updateNote={updateNote} /> */}
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

    </motion.div>

  )
} )
UserInputNode.displayName = 'UserInputNode'
