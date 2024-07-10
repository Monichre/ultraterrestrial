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

import '@xyflow/react/dist/style.css'

import { useGraph } from '@/providers/graph-context'

import { Toolbar } from '@/components/toolbar'

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
  // const reactFlow = useReactFlow()

  const edgeOptions = {
    animated: true,
    style: { stroke: 'white' },
  }

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
        <div className='w-full absolute top-10 left-0 z-20 cursor-pointer flex justify-center'>
          <Toolbar />
        </div>
        <ReactFlow
          colorMode='dark'
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
          <Background />
        </ReactFlow>
      </DotGridBackgroundBlack>
    </div>
  )
}
