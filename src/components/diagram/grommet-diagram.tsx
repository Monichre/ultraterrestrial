'use client'

import React, { useReducer, useEffect } from 'react'

import { Grommet, Box, Diagram as GrommetDiagram, Stack, Text } from 'grommet'

const connection = (
  fromTarget: string,
  toTarget: string,
  { ...rest } = {}
) => ({
  fromTarget,
  toTarget,
  anchor: 'vertical',
  color: 'accent-4',
  thickness: 'xsmall',
  round: true,
  type: 'curved',
  ...rest,
})

const DiamondContainer = ({
  carat,
  color,
  cut,
  align,
  id,
  name,
  textSize,
}: any) => (
  <Box
    align={align || 'center'}
    alignSelf='center'
    direction='row'
    gap='medium'
    key={id}
  >
    <Box align={align}>
      <Text size='medium' weight='bold'>
        {name}
      </Text>
      {carat && <Text size={textSize}> Carat: {carat} </Text>}
      {color && <Text size={textSize}> Color: {color} </Text>}
      {cut && <Text size={textSize}> Cut: {cut} </Text>}
    </Box>
  </Box>
)

const Container = ({ node, index }) => (
  <DiamondContainer
    carat={node.carat}
    color={node.color}
    cut={node.cut}
    id={index}
    key={node.name}
    name={node.name}
    textSize='small'
  />
)

export const Diagram = ({ data }) => {
  const reducer = (draw: any) => !draw

  const [draw, toogleDraw] = useReducer(reducer, true)

  useEffect(() => {
    const timer = setInterval(() => {
      toogleDraw()
    }, 2000)
    return () => clearInterval(timer)
  }, [toogleDraw])

  const connections: any = []

  if (draw) {
    connections.push(connection('4', '1', { anchor: 'vertical' }))
    connections.push(connection('4', '2', { anchor: 'vertical' }))
    connections.push(connection('4', '3', { anchor: 'vertical' }))
  }

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    <Grommet theme={{}}>
      <Box align='center'>
        <Box pad='large'>
          <Stack>
            <Box>
              <Box alignSelf='center' margin={{ bottom: 'large' }}>
                <Container node={data[0]} index={1} />
                <Box pad='small' />
                <Box
                  id='4'
                  width='xsmall'
                  margin={{ bottom: 'large', top: 'xlarge' }}
                />
              </Box>
              <Box direction='row' gap='xlarge'>
                {[2, 3].map((id) => (
                  <Container key={id} node={data[id - 1]} index={id} />
                ))}
              </Box>
            </Box>
            <GrommetDiagram
              animation={{ type: 'draw', duration: 3000 }}
              connections={connections}
            />
          </Stack>
        </Box>
      </Box>
    </Grommet>
  )
}
