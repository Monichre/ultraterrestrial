/* eslint-disable react/display-name */
'use client'
import { memo, useEffect, useState } from 'react'


import { KeyFiguresIcon } from '@/components/icons'
import { CoreNodeBottom, CoreNodeContainer, CoreNodeContent } from '@/features/mindmap/nodes/core-node-ui'
import { AiButton } from '@/features/mindmap/nodes/user-input-node'
import { useMindMap } from '@/providers'
import { Handle, Position } from '@xyflow/react'

const PersonnelGroupNode = memo( ( node: any ) => {
  const { handles, node: groupNode, hideChildren, showChildren, getClonePosition } = useGroupNode( { node: props } )

  console.log( "🚀 ~ file: group-results-node.tsx:51 ~ node:", node )

  useEffect( () => {
    console.log( "🚀 ~ file: group-results-node.tsx:53 ~ useEffect ~ getClonePosition:", getClonePosition )
    hideChildren()
  }, [getClonePosition, hideChildren] )



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
