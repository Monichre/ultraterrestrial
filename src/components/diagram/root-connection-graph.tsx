'use client'
import * as THREE from 'three'
import { useState, createRef, useCallback, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Nodes, Node } from './nodes'
import { Scroll, ScrollControls } from '@react-three/drei/web/ScrollControls'
// import { MotionCanvas, LayoutCamera } from "framer-motion-3d"

function ScrollContainer({ scroll, children }: any) {
  const { viewport } = useThree()
  const group: any = useRef()
  useFrame((state, delta) => {
    group.current.position.y = THREE.MathUtils.damp(
      group.current.position.y,
      viewport.height * scroll.current,
      4,
      delta
    )
  })
  return <group ref={group}>{children}</group>
}

function Scene({ children }: any) {
  const viewport = useThree((state) => state.viewport)
  console.log('viewport: ', viewport)
  // position={[0, -viewport.height, 0]}
  return children
}

export const RootConnectionGraph = () => {
  const [[root, topics, events, personnel, testimonies, organizations]]: any =
    useState(() =>
      [
        'root',
        'topics',
        'events',
        'personnel',
        'testimonies',
        'organizations',
        'testimonies',
      ].map(createRef)
    )

  const [childNodes, setChildNodes]: any = useState({
    topics: [],
    events: [],
    personnel: [],
    testimonies: [],
    organizations: [],
  })
  const [rootRecords, setRootRecords]: any = useState(null)

  const calculatePosition = (index: any, length: any) => {
    const radius = 20
    const phi = Math.acos(-1 + (2 * index) / length)
    const theta = Math.sqrt(length * Math.PI) * phi
    return new THREE.Vector3().setFromSpherical(
      new THREE.Spherical(radius, phi, theta)
    )
  }

  const fetchRootRecords = useCallback(async (rootType: any) => {
    const { records } = await fetch(`/api/xata?type=${rootType}`).then((res) =>
      res.json()
    )
    console.log('fetchRootRecords records: ', records)
    // const newNodes = records.map(createRef)
    // console.log('newNodes: ', newNodes)
    return records
  }, [])

  // const populateRootRecords = useCallback(
  //   async (rootType: any) => {
  //     const  records  = await fetchRootRecords(rootType)
  //     // const newNodes = records.map(createRef)
  //     // console.log('newNodes: ', newNodes)

  //     setChildNodes((childNodes: any) => ({
  //       ...childNodes,
  //       [rootType]: records.map((record, index) => ({
  //         ...record,
  //         position: calculatePosition(index, records.length),
  //         ref: createRef(),
  //       })),
  //     }))
  //   },
  //   [childNodes]
  // )

  const populateRootRecords = useCallback(
    async (rootType: any, records) => {
      // const  records  = await fetchRootRecords(rootType)
      // const newNodes = records.map(createRef)
      // console.log('newNodes: ', newNodes)

      setChildNodes((childNodes: any) => ({
        ...childNodes,
        [rootType]: records.map((record, index) => ({
          ...record,
          position: calculatePosition(index, records.length),
          ref: createRef(),
        })),
      }))
    },
    [childNodes]
  )

  useEffect(() => {
    const getAllConnections = async () => {
      const events = await fetchRootRecords('events')
      const topics = await fetchRootRecords('topics')
      const personnel = await fetchRootRecords('personnel')
      const testimonies = await fetchRootRecords('testimonies')
      const organizations = await fetchRootRecords('organizations')
      const totalRecords = [
        ...events,
        ...topics,
        ...personnel,
        ...organizations,
        ...testimonies,
      ]
      setRootRecords(totalRecords)

      setChildNodes((childNodes: any) => ({
        ...childNodes,
        events: events.map((record, index) => ({
          ...record,
          position: calculatePosition(index, events.length),
          ref: createRef(),
        })),
        topics: topics.map((record, index) => ({
          ...record,
          position: calculatePosition(index, topics.length),
          ref: createRef(),
        })),
        organizations: organizations.map((record, index) => ({
          ...record,
          position: calculatePosition(index, organizations.length),
          ref: createRef(),
        })),
        personnel: personnel.map((record, index) => ({
          ...record,
          position: calculatePosition(index, personnel.length),
          ref: createRef(),
        })),
        testimonies: testimonies.map((record, index) => ({
          ...record,
          position: calculatePosition(index, testimonies.length),
          ref: createRef(),
        })),
      }))
    }
    getAllConnections()
  }, [])

  // const { viewport } = useThree()
  const pink = '#E393E6'
  const lightBlue = '#6EE3E6'

  const green = '#79ffe1'

  // className=' h-[100vh]'
  return (
    <div className='h-[100vh] connection-graph overflow-scroll'>
      <Canvas orthographic camera={{ zoom: 40 }}>
        <ScrollControls pages={2}>
          <Scroll>
            <Nodes>
              <Node
                ref={root}
                name='ultraterrestrial'
                color='#204090'
                position={[0, 0, 0]}
                connectedTo={[
                  topics,
                  events,
                  personnel,
                  testimonies,
                  organizations,
                ]}
              />
              <Node
                ref={topics}
                name='topics'
                // fetchConnections={fetchConnections}
                rootType='topics'
                id='root_topics'
                color={pink}
                position={[2, -3, 0]}
                connectedTo={[
                  ...new Set(childNodes.topics.map((node) => node?.ref)),
                ]}
                // connectedTo={[d, a]}
              />

              <Node
                ref={events}
                name='events'
                // // fetchConnections={fetchConnections}
                rootType='events'
                id='root_events'
                color={green}
                position={[-4, -3, 0]}
                connectedTo={[
                  ...new Set(childNodes.events.map((node) => node?.ref)),
                ]}
              />
              <Node
                ref={personnel}
                name='personnel'
                // // fetchConnections={fetchConnections}
                rootType='personnel'
                id='root_personnel'
                color={lightBlue}
                position={[0.5, -0.75, 0]}
                connectedTo={[
                  ...new Set(childNodes.personnel.map((node) => node?.ref)),
                ]}
              />
              <Node
                ref={testimonies}
                name='testimonies'
                // // fetchConnections={fetchConnections}
                rootType='testimonies'
                id='root_testimonies'
                color='#204090'
                position={[-0.5, -5, 0]}
                connectedTo={[
                  ...new Set(childNodes.testimonies.map((node) => node?.ref)),
                ]}
              />
              <Node
                ref={organizations}
                name='organizations'
                // // fetchConnections={fetchConnections}
                rootType='organizations'
                id='root_organizations'
                color='#204080'
                position={[1, -4, 0]}
                connectedTo={[
                  ...new Set(childNodes.organizations.map((node) => node?.ref)),
                ]}
              />

              {childNodes['events'].length &&
                childNodes['events'].map((node, idx) => {
                  return (
                    <Node
                      key={node?.id}
                      ref={node.ref}
                      name={node.name}
                      color={green}
                      child
                      position={node.position}
                    />
                  )
                })}

              {childNodes['topics'].length &&
                childNodes['topics'].map((node, idx) => {
                  return (
                    <Node
                      key={node?.id}
                      ref={node.ref}
                      name={node.name}
                      color={pink}
                      child
                      position={node.position}
                    />
                  )
                })}

              {childNodes['testimonies'].length &&
                childNodes['testimonies'].map((node, idx) => {
                  return (
                    <Node
                      key={node?.id}
                      ref={node.ref}
                      name={node.name}
                      color='#204090'
                      child
                      position={node.position}
                    />
                  )
                })}
              {childNodes['personnel'].length &&
                childNodes['personnel'].map((node, idx) => {
                  return (
                    <Node
                      key={node?.id}
                      ref={node.ref}
                      name={node.name}
                      color={lightBlue}
                      child
                      position={node.position}
                    />
                  )
                })}

              {childNodes['organizations'].length &&
                childNodes['organizations'].map((node, idx) => {
                  return (
                    <Node
                      key={node?.id}
                      ref={node.ref}
                      name={node.name}
                      color='#204080'
                      child
                      position={node.position}
                    />
                  )
                })}
            </Nodes>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  )
}
