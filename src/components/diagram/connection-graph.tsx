'use client'
import { useState, createRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Nodes, Node } from './nodes'

export const ConnectionGraph = (records) => {
  const [[root, topics, events, personnel, testimonies, organizations]]: any =
    useState(() => [...Array(5)].map(createRef))
  return (
    <Canvas orthographic camera={{ zoom: 80 }}>
      <Nodes>
        <Node
          ref={root}
          name='ultraterrestrial'
          color='#204090'
          position={[-2, 2, 0]}
          connectedTo={[topics, events, personnel, testimonies, organizations]}
        />
        <Node
          ref={topics}
          name='topics'
          color='#904020'
          position={[2, -3, 0]}
          connectedTo={[d, a]}
        />
        <Node
          ref={events}
          name='events'
          color='#209040'
          position={[-0.25, 0, 0]}
        />
        <Node
          ref={personnel}
          name='personnel'
          color='#204090'
          position={[0.5, -0.75, 0]}
        />
        <Node
          ref={testimonies}
          name='testimonies'
          color='#204090'
          position={[-0.5, -1, 0]}
        />
        <Node
          ref={organizations}
          name='organizations'
          color='#204090'
          position={[-0.5, -1, 0]}
        />
      </Nodes>
    </Canvas>
  )
}
