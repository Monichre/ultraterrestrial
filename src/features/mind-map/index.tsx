'use client'

import React, { useReducer, useEffect } from 'react'

import { rootNodes, rootEdges } from './store/initial'
import { Box, Diagram, Stack } from 'grommet'

const Node = ({ id, ...rest }: any) => (
  <Box
    id={id}
    basis='xxsmall'
    margin='small'
    pad='medium'
    round='small'
    background='dark-3'
    {...rest}
  />
)

// @ts-ignore
const connection = (
  fromTarget: string,
  toTarget: string,
  // @ts-ignore
  { color, ...rest } = {}
) => ({
  fromTarget,
  toTarget,
  anchor: 'vertical',
  color,
  thickness: 'xsmall',
  round: true,
  type: 'rectilinear',
  ...rest,
})

const fullTopRow = [1, 2, 3]

// import { useRouter } from 'next/navigation'
// import { usePathname, useSearchParams } from 'next/navigation'

export const MindMap = () => {
  const reducer = (topRow: any) => {
    const sliceEnd = topRow.length < fullTopRow.length ? topRow.length + 1 : 1
    return fullTopRow.slice(0, sliceEnd)
  }

  const [topRow, dispatch] = useReducer(reducer, fullTopRow.slice(0, 1))

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch()
    }, 3000)
    return () => clearInterval(timer)
  }, [dispatch])

  const connections = [connection('1', '5')]

  if (topRow.length >= 2) {
    // @ts-ignore
    connections.push(connection('1', '2', { anchor: 'horizontal' }))
  }

  if (topRow.length >= 3) {
    connections.push(
      connection('3', '5', {
        // @ts-ignore
        anchor: 'horizontal',
        animation: { type: 'pulse', duration: 500, size: 'small' },
        color: 'brand',
      })
    )
  }

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box align='start' pad='large'>
      <Stack>
        <Box>
          <Box direction='row'>
            {topRow.map((id) => (
              <Node key={id} id={id} />
            ))}
          </Box>
          <Box direction='row'>
            {[4, 5].map((id) => (
              <Node key={id} id={id} background='dark-2' />
            ))}
          </Box>
        </Box>
        <Diagram
          animation={{ type: 'draw', duration: 3000 }}
          // @ts-ignore
          connections={connections}
        />
      </Stack>
    </Box>
    // </Grommet>
  )
}
