'use client'
import { memo } from 'react'

function AN({ data }: any) {
  return (
    <>
      <div style={{ padding: 10, display: 'flex' }}>
        <div style={{ marginRight: 4 }}>{data.level}.</div>
        <div>{data.label}</div>
      </div>
      {data.arrowStyle && (
        <div className='arrow' style={data.arrowStyle}>
          ⤹
        </div>
      )}
    </>
  )
}
export const AnnotationNode = memo(AN)