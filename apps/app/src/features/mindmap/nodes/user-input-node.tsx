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
import { SparklesIcon } from 'lucide-react'
import { memo, useEffect, useState } from 'react'

export function AiButton() {
  return (
    <button
      className='group flex transform-gpu items-center gap-1 rounded-md px-2 py-1 transition-colors hover:bg-neutral-400/15 active:bg-neutral-400/25'
      type='button'>
      <SparklesIcon aria-hidden='true' className='size-4 text-neutral-400' />
      <span className='w-fit max-w-0 transform-gpu overflow-hidden transition-all duration-500 group-hover:max-w-20'>
        <span className=' transform-gpu whitespace-nowrap text-neutral-400 text-sm opacity-0 transition-opacity duration-500 group-hover:opacity-100'>
          Ask AI
        </span>
      </span>
    </button>
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

  const { user } = useUser()
  const image = {
    url: user?.hasImage ? user?.imageUrl : '/astro-3.png',
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
          <p className='text-sm text-white font-nunito'>{node?.data?.input}</p>
        </CoreNodeContent>
        <CoreNodeBottom>
          <CoreNodeAvatar image={image} label={user?.fullName || ''} />
          <div>
            <AiButton />
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
