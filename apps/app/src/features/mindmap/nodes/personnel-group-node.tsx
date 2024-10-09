/* eslint-disable react/display-name */
'use client'
import { memo, useEffect, useState } from 'react'


import { KeyFiguresIcon } from '@/components/icons'
import { CoreNodeBottom, CoreNodeContainer, CoreNodeContent } from '@/features/mindmap/nodes/core-node-ui'
import { AiButton } from '@/features/mindmap/nodes/user-input-node'
import { useMindMap } from '@/providers'
import { Handle, Position } from '@xyflow/react'

const PersonnelGroupNode = memo( ( node: any ) => {
  const { useUpdateNodeInternals, useNodesData, updateNode } = useMindMap()
  const updateNodeInternals = useUpdateNodeInternals()
  const [handles, setHandles]: any = useState( [] )
  const nodeData = useNodesData( node.id )
  console.log( 'nodeData: ', nodeData )
  const type = nodeData.id.split( '-' )[0]

  useEffect( () => {
    if ( node?.data?.handles && node.data?.handles.length ) {
      const { data } = node

      setHandles( data.handles )
      updateNodeInternals( node.id )
    }

    if ( node?.data?.concise ) {
      updateNodeInternals( node.id )
    }
  }, [node, updateNodeInternals, nodeData] )



  return (
    <>

      <CoreNodeContainer id={node.id} className='motion-scale-in-0 motion-opacity-in-0 h-full w-full' style={{
        minHeight: node?.initialHeight,
        minWidth: node?.initialWidth,
      }}>
        <CoreNodeContent>
          {/* <p className='text-sm text-white font-nunito'>{nodeData?.data?.input}</p> */}
          <p>|</p>
        </CoreNodeContent>
        <CoreNodeBottom>
          <KeyFiguresIcon />
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
    </>
  )
} )

PersonnelGroupNode.displayName = 'PersonnelGroupNode'
export { PersonnelGroupNode }
