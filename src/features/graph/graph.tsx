'use client'

import { Spotlight } from '@/components/ui/animations/spotlight'
import {
  DotGridBackground,
  DotGridBackgroundBlack,
} from '@/components/ui/backgrounds'
import { nodeTypes } from '@/features/graph/utils/node-types'

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  ReactFlow,
  Controls,
  Background,
  Panel,
  type NodeOrigin,
  useReactFlow,
  useStore,
  MiniMap,
} from '@xyflow/react'
import { getLayoutedElements } from '@/features/graph/layouts/algorithms/elk-layout.ts'
import '@xyflow/react/dist/style.css'

import * as d3 from 'd3'
import { ROOT_NODE_WIDTH } from '@/utils/constants/nodes'

import { collide } from '@/features/graph/utils/collide'
import { EntityEdge } from '@/features/graph/edges/entity-edge'
import { useExpandCollapse } from '@/features/graph/hooks/useExpandCollapse'
import { DevTools } from '@/features/graph/loggers/dev-tools'
import { useGraph } from '@/providers/graph-context'
import { useForceLayout } from '@/features/graph/hooks/useForceLayout'
import { useRootNodesHierarchy } from '@/features/graph/hooks/useRootNodesHierarchy'

import { nextTick } from '@/utils'
import { useAutoLayoutAlternative } from '@/features/graph/hooks/useAutoLayoutAlt'
import { defaultLayoutConfig } from './layouts/algorithms/index'
import { Toolbar } from '@/components/toolbar'

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
    addRootNodeChildren,
    onEdgesChange,
    setNodes,
    setEdges,
    onConnect,
    fitView,
    initialNodes,
    getRootNodeChildren,
  } = useGraph()
  const reactFlow = useReactFlow()

  console.log('nodes: ', nodes)
  const nodeOrigin: NodeOrigin = [0.5, 0.5]
  const edgeOptions = {
    animated: true,
    style: { stroke: 'white' },
  }

  const [childrenLoaded, setChildrenLoaded] = useState(false)

  const onNodeClick: any = useCallback(
    (event: any, node: any, ...rest: any) => {
      const { target } = event
      // Ignore any other clicks to the node that are not the load button
      if (target.classList.contains('load-records-button')) {
        getRootNodeChildren(node?.data.type)
      }
    },
    [getRootNodeChildren]
  )
  // useForceLayout(childrenLoaded)
  // #NOTE: This might be an interesting way to enhance, bypass or hack any trouble with edges as the node connections get more complex: https://magicui.design/docs/components/animated-beam
  return (
    <div className='relative h-[100vh] w-[100vw]'>
      <DotGridBackgroundBlack>
        <Spotlight
          className='-top-40 left-0 md:left-60 md:-top-20'
          fill='white'
        />
        <ReactFlow
          nodeTypes={nodeTypes}
          // edgeTypes={{
          //   entityEdge: EntityEdge,

          defaultEdgeOptions={edgeOptions}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onConnect={onConnect}
        >
          <div className='w-full absolute top-10 left-0 z-20 cursor-pointer flex justify-center'>
            <Toolbar />
          </div>
          <Background />
          <Controls showInteractive={false} />
          <DevTools />
          <MiniMap />
        </ReactFlow>
      </DotGridBackgroundBlack>
    </div>
  )
}
