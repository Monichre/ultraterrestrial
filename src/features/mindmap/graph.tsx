'use client'

import { Spotlight } from '@/components/animations/spotlight'
import {
  DotGridBackground,
  DotGridBackgroundBlack,
} from '@/components/ui/backgrounds'
import { nodeTypes } from '@/features/mindmap/utils/node-types'

import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ReactFlow,
  Controls,
  Background,
  Panel,
  type NodeOrigin,
  useReactFlow,
  useStore,
  MiniMap,
  useNodesInitialized,
} from '@xyflow/react'

import { useMindMap } from '@/providers/mindmap-context'

import { Toolbar } from '@/components/toolbar'

import { nextTick } from '@/utils'
import { LocationVisualization } from '@/components/location-visualization'
import { Search } from '@/components/search'
import { edgeTypes } from '@/features/mindmap/utils/edge-types'
import * as d3F from 'd3-force'
import collide from '@/features/mindmap/utils/collide'
const simulation = d3F
  .forceSimulation()
  .force('charge', d3F.forceManyBody().strength(-1000))
  .force('x', d3F.forceX().x(0).strength(0.05))
  .force('y', d3F.forceY().y(0).strength(0.05))
  .force('collide', collide())
  .alphaTarget(0.05)
  .stop()

export const useLayoutedElements = () => {
  const { getNodes, setNodes, getEdges, fitView } = useMindMap()
  const initialized = useNodesInitialized()
  const [running, setRunning] = useState(false)

  const tick = useCallback(() => {
    let nodes = getNodes()

    nodes.forEach((node, i) => {
      const dragging = Boolean(
        document.querySelector(`[data-id="${node.id}"].dragging`)
      )

      nodes[i].fx = dragging ? node.position.x : node.x
      nodes[i].fy = dragging ? node.position.y : node.y
    })

    simulation.tick()

    setNodes(
      nodes.map((node) => ({ ...node, position: { x: node.x, y: node.y } }))
    )

    window.requestAnimationFrame(() => {
      fitView()
      if (running) tick() // Continue the simulation if it's still running
    })
  }, [getNodes, setNodes, fitView, running])

  useEffect(() => {
    if (!initialized || getNodes().length === 0) {
      return
    }

    let nodes = getNodes().map((node) => ({
      ...node,
      x: node.position?.x || node.x,
      y: node.position?.y || node.y,
    }))

    let edges = getEdges().map((edge) => edge)

    simulation.nodes(nodes).force(
      'link',
      d3F
        .forceLink(edges)
        .id((d) => d.id)
        .strength(0.05)
        .distance(100)
    )

    if (running) {
      simulation.alpha(1).restart()
      window.requestAnimationFrame(tick)
    }

    return () => {
      simulation.stop() // Stop the simulation when the component unmounts or when dependencies change
    }
  }, [initialized, running, tick, getNodes, getEdges])

  const toggle = useCallback(() => {
    setRunning((prev) => !prev)
  }, [])

  const isRunning = useCallback(() => running, [running])

  return [true, { toggle, isRunning }]
}
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
    adjustViewport,
    zoomOut,
    addLocationsToVisualize,
    updateActiveNode,
    detectNodeOverlap,
    updateMindMapInstance,
    saveMindMap,
    restore,
  } = useMindMap()
  // const reactFlow = useReactFlow()
  useLayoutedElements()

  const edgeOptions = {
    animated: true,
    style: { stroke: 'white' },
  }

  useEffect(() => {
    saveMindMap()
  }, [nodes, edges, saveMindMap])

  // useForceLayout(childrenLoaded)
  // #NOTE: This might be an interesting way to enhance, bypass or hack any trouble with edges as the node connections get more complex: https://magicui.design/docs/components/animated-beam
  return (
    <div className='relative h-[100vh] w-[100vw] bg-black bg-dot-white/[0.3] '>
      <Spotlight
        className='-top-40 left-0 md:left-60 md:-top-20'
        fill='white'
      />

      {/* <div className='w-auto absolute top-[40px] left-[20px] z-20 cursor-pointer flex justify-center'>
        <Toolbar />
      </div>
      <LocationVisualization />
      <div className='w-full fixed bottom-[40px] left-0 z-50 cursor-pointer flex justify-center'>
        <Search />
      </div> */}

      <ReactFlow
        colorMode='dark'
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        // snapToGrid={true}
        defaultEdgeOptions={edgeOptions}
        nodes={nodes}
        edges={edges}
        defaultViewport={{ x: 0, y: 0, zoom: 0 }}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        onInit={updateMindMapInstance}
        style={{ backgroundColor: 'transparent' }}
      >
        <Panel position='top-left'>
          <div className='ml-2 mt-2'>
            <Toolbar />
          </div>
        </Panel>
        <Panel position='top-right'>
          <LocationVisualization />
        </Panel>
        <Panel position='bottom-center'>
          <div className='w-full fixed bottom-[40px] left-0 z-50 cursor-pointer flex justify-center'>
            <Search />
          </div>
        </Panel>
      </ReactFlow>
    </div>
  )
}
