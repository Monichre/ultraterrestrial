'use client'

import { Spotlight } from '@/components/ui/animations/spotlight'
import {
  DotGridBackground,
  DotGridBackgroundBlack,
} from '@/components/ui/backgrounds'
import { nodeTypes } from '@/features/graph/utils/node-types'

import { useCallback, useEffect, useMemo, useRef } from 'react'
import {
  ReactFlow,
  Controls,
  Background,
  Panel,
  type NodeOrigin,
  useReactFlow,
  useStore,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useGraph } from '@/contexts/graph/GraphContext'
import * as d3 from 'd3'
import { ROOT_NODE_WIDTH } from '@/utils/constants/nodes'

import { collide } from '@/features/graph/utils/collide'
import { EntityEdge } from '@/features/graph/edges/entity-edge'
// import {
//   forceSimulation,
//   forceLink,
//   forceManyBody,
//   forceCenter,
//   forceX,
//   forceY,
// } from 'd3-force'
const simulation = d3
  .forceSimulation()
  .force('charge', d3.forceManyBody().strength(-1000))
  .force('center', d3.forceCenter())
  .force('collide', d3.forceCollide().radius(75))
  .stop()
// .force('center', forceCenter())
// .force('collide', collide())
// .force('y', forceY().y(0).strength(0.05))
// .force('x', forceX().x(0).strength(0.05))

// const simulation = d3
//   .forceSimulation(nodes)
//   .force(
//     'link',
//     d3.forceLink(edges).id((d: any) => d.id)
//   )
//   .force('charge', d3.forceManyBody().strength(-500))
//   .force(
//     'center',
//     d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2)
//   )
//   .force('collide', d3.forceCollide().radius(75))
//   .stop()

// export const useLayoutedElements = () => {
//   const { getNodes, setNodes, getEdges } = useGraph()

//    useEffect(() => {
//     let nodes = getNodes().map((node: { position: { x: any; y: any } }) => ({
//       ...node,
//       x: node.position.x,
//       y: node.position.y,
//     }))
//     let edges = getEdges().map((edge: any) => edge)
//     let running = false

//     // If React Flow hasn't initialised our nodes with a width and height yet, or
//     // if there are no nodes in the flow, then we can't run the simulation!

//     simulation.nodes(nodes).force(
//       'link',
//       forceLink(edges)
//         .id((d: { id: any }) => d.id)
//         .strength(0.05)
//         .distance(100)
//     )

//     // The tick function is called every animation frame while the simulation is
//     // running and progresses the simulation one step forward each time.
//     const tick = () => {
//       getNodes().forEach(
//         (
//           node: { id: any; position: { x: any; y: any } },
//           i: string | number
//         ) => {
//           const dragging = Boolean(
//             document.querySelector(`[data-id="${node.id}"].dragging`)
//           )

//           // Setting the fx/fy properties of a node tells the simulation to "fix"
//           // the node at that position and ignore any forces that would normally
//           // cause it to move.
//           // @ts-ignore
//           nodes[i].x = dragging ? node.position.x : null
//           // @ts-ignore
//           nodes[i].y = dragging ? node.position.y : null
//         }
//       )

//       simulation.tick()
//       setNodes(
//         nodes.map((node: { x: any; y: any }) => ({
//           ...node,
//           position: { x: node.x, y: node.y },
//         }))
//       )

//       window.requestAnimationFrame(() => {
//         // Give React and React Flow a chance to update and render the new node
//         // positions before we fit the viewport to the new layout.
//         // fitView()

//         // If the simulation hasn't be stopped, schedule another tick.
//         tick()
//       })
//     }

//     const toggle = () => {
//       running = !running
//       running && window.requestAnimationFrame(tick)
//     }

//     const isRunning = () => running

//     return { toggle }
//   }, [getEdges, getNodes, setNodes])
// }
export function Graph(props: any) {
  const {
    nodes,
    edges,
    onNodesChange,
    updateNodes,
    onEdgesChange,
    setNodes,
    onConnect,
    fitView,
  } = useGraph()

  const nodeOrigin: NodeOrigin = [0.5, 0.5]
  const edgeOptions = {
    animated: true,
    style: {
      stroke: 'white',
    },
  }

  // const simulationRef: any = useRef<d3.Simulation<any, undefined>>(null)

  // useEffect(() => {
  //   if (!simulationRef.current) {
  //     simulationRef.current = d3
  //       .forceSimulation(nodes)
  //       .force(
  //         'link',
  //         d3
  //           .forceLink(edges)
  //           .id((d: any) => d.id) // Cast to Node to access the 'id' property
  //           .distance(100)
  //       )
  //       .force('charge', d3.forceManyBody().strength(-500))
  //       .force(
  //         'center',
  //         d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2)
  //       )
  //       .force('collide', d3.forceCollide().radius(ROOT_NODE_WIDTH / 2))
  //       .on('tick', () => {
  //         setNodes((nodes: any) => [
  //           ...nodes.map((node: any) => ({
  //             ...node,
  //             position: {
  //               x: node.x - ROOT_NODE_WIDTH / 2,
  //               y: node.y + ROOT_NODE_WIDTH / 2,
  //             },
  //           })),
  //         ])
  //       })
  //   }

  //   // Optional: Update simulation with new nodes/edges if they change
  //   simulationRef.current.nodes(nodes)
  //   d3.forceLink(simulationRef.current.force('link')).links(edges)

  //   simulationRef.current.tick(150) // Pre-runs the simulation

  //   // Cleanup function to stop the simulation when the component unmounts
  //   return () => simulationRef.current?.stop()
  // }, [simulationRef, nodes, edges, setNodes])

  // useEffect(() => {
  //   const handleResize = () => {
  //     simulationRef.current.force(
  //       'center',
  //       d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2)
  //     )
  //     simulationRef.current.restart() // Restart simulation to apply the new force
  //   }

  //   window.addEventListener('resize', handleResize)

  //   return () => window.removeEventListener('resize', handleResize)
  // }, [])

  // useEffect(() => {
  //   const simulation: any = createForceDirectedSimulation(nodes, edges)
  //   if (simulation) {
  //     simulation.nodes(nodes).on('tick', () => {
  //       const forceDirectedNodes = nodes.map((forceDirectedNode: any) => {
  //         console.log('forceDirectedNode: ', forceDirectedNode)
  //         return {
  //           ...forceDirectedNode,
  //           position: {
  //             x: Math.round(forceDirectedNode.position.x),
  //             y: Math.round(forceDirectedNode.position.y),
  //           },
  //         }
  //       })
  //       setNodes(forceDirectedNodes)
  //     })

  //     simulation.force('link').links(edges)
  //   }

  //   return () => (simulation ? simulation.stop() : null)
  // }, [edges, nodes, setNodes])

  useEffect(() => {
    // If React Flow hasn't initialised our nodes with a width and height yet, or
    // if there are no nodes in the flow, then we can't run the simulation!

    simulation
      .nodes(nodes)
      .force(
        'link',
        d3
          .forceLink(edges)
          .id((d: any) => d.id)
          .strength(0.05)
          .distance(100)
      )
      .force('collide', collide())
      .on('tick', () => {
        setNodes((nodes: any) => [
          ...nodes.map((node: any, index: any) => ({
            ...node,
            position: {
              x: node.position.x - ROOT_NODE_WIDTH / 2,
              y:
                index === 0
                  ? node.position.y + ROOT_NODE_WIDTH / 2
                  : index * (node.position.y + ROOT_NODE_WIDTH / 2),
            },
          })),
        ])
      })
    // simulation.on('tick', () => {
    //   setNodes(
    //     nodes.map((node: { x: any; y: any }) => ({
    //       ...node,
    //       position: { x: node.x, y: node.y },
    //     }))
    //   )
    // })

    simulation.tick()

    // The tick function is called every animation frame while the simulation is
    // running and progresses the simulation one step forward each time.

    window.requestAnimationFrame(() => {
      // Give React and React Flow a chance to update and render the new node
      // positions before we fit the viewport to the new layout.
      fitView()

      // If the simulation hasn't be stopped, schedule another tick.
      simulation.tick()
    })

    // window.requestAnimationFrame(() => {
    //   // Give React and React Flow a chance to update and render the new node
    //   // positions before we fit the viewport to the new layout.
    //   // fitView()

    //   // If the simulation hasn't be stopped, schedule another tick.
    //   tick()
    // })
  }, [edges, fitView, nodes, setNodes])

  return (
    <div className='relative h-[100vh] w-[100vw]'>
      <DotGridBackgroundBlack>
        <Spotlight
          className='-top-40 left-0 md:left-60 md:-top-20'
          fill='white'
        />
        <ReactFlow
          nodeTypes={nodeTypes}
          edgeTypes={{
            entityEdge: EntityEdge,
          }}
          defaultViewport={{
            zoom: 0,
            x: 0,
            y: 0,
          }}
          defaultEdgeOptions={edgeOptions}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeOrigin={nodeOrigin}
          onConnect={onConnect}
          fitView
        >
          <Background />
          <Controls showInteractive={false} />
          <Panel position='top-left'>React Flow Mind Map</Panel>
        </ReactFlow>
      </DotGridBackgroundBlack>
    </div>
  )
}
