/* eslint-disable react/display-name */
'use client'
import { memo, useEffect, useState } from 'react'

import { Handle, Position } from '@xyflow/react'

import { renderEntity } from '@/features/mindmap/components/cards/render-entity-card'
import { useMindMap } from '@/providers'
import { cn } from '@/utils'

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

const EntityNode = memo( ( node: any ) => {
  console.log( 'node: ', node )
  const { useUpdateNodeInternals, useNodesData } = useMindMap()
  const updateNodeInternals = useUpdateNodeInternals()
  const [handles, setHandles]: any = useState( [] )
  console.log( 'handles: ', handles )
  const nodeData = useNodesData( node.id )
  const type = node.data.type
  const component = renderEntity( {
    type: node.data.type,
    data: {
      ...node.data,
      id: node.id,
    },
  } )

  useEffect( () => {
    updateNodeInternals( node.id )
    if ( node?.data?.handles && node.data?.handles.length ) {
      const { data } = node
      updateNodeInternals( node.id )
      setHandles( data.handles )

    }

    // if (node?.data?.concise) {
    //   updateNodeInternals(node.id)
    // }
  }, [node, updateNodeInternals, nodeData] )
  // relative min-w-[300px] !w-[300px]
  {
    /* // <BlurAppear> */
  }
  return (
    <div className={cn( 'motion-scale-in-0 motion-opacity-in-0' )} id={node.id}>
      <Handle type='target' position={Position.Top} />

      {component}

      {handles && handles?.length
        ? handles.map( ( id: string, index: number ) => (
          <Handle
            key={`${id}-${index}`}
            type='source'
            position={Position.Bottom}
            id={id}
            isConnectable={true}
          />
        ) )
        : null}
    </div>
  )
} )

EntityNode.displayName = 'EntityNode'

export { EntityNode }
