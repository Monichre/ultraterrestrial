'use client'

import { Spotlight } from '@/components/animations/spotlight'
import {
  DotGridBackground,
  DotGridBackgroundBlack,
} from '@/components/ui/backgrounds'
import { nodeTypes } from '@/features/mindmap/utils/node-types'

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
import {
  MindmapSidebar,
  MindMapSidebarProvider,
} from '@/features/mindmap/mindmap-sidebar'
import { nextTick } from '@/utils'
import { CopilotPopUpUI } from '@/features/copilot/Copilot'

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
        const { childNodes } = getRootNodeChildren(node?.data.type)
        const childNode = childNodes[childNodes.length - 1]
        console.log('childNode: ', childNode)

        nextTick(10).then(() => {
          zoomOut({
            zoom: 0,
            duration: 500,
          })
        })
      }
    },
    [getRootNodeChildren, zoomOut]
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
        <div className='w-full absolute bottom-[40px] left-0 z-20 cursor-pointer flex justify-center'>
          <Toolbar />
        </div>
        <MindMapSidebarProvider>
          <MindmapSidebar />
          <ReactFlow
            colorMode='dark'
            nodeTypes={nodeTypes}
            // edgeTypes={{
            //   entityEdge: EntityEdge,

            defaultEdgeOptions={edgeOptions}
            nodes={nodes}
            edges={edges}
            defaultViewport={{ x: 0, y: 0, zoom: 0 }}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            onConnect={onConnect}
            fitView
          >
            <Background />
            <MiniMap />
          </ReactFlow>
        </MindMapSidebarProvider>
        <CopilotPopUpUI />
      </DotGridBackgroundBlack>
    </div>
  )
}
