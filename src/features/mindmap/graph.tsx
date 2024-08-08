'use client'

import { Spotlight } from '@/components/animations/spotlight'
import {
  DotGridBackground,
  DotGridBackgroundBlack,
} from '@/components/ui/backgrounds'
import { nodeTypes } from '@/features/mindmap/utils/node-types'

import { useCallback } from 'react'
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

import { useMindMap } from '@/providers/mindmap-context'

import { Toolbar } from '@/components/toolbar'

import { nextTick } from '@/utils'
import { LocationVisualization } from '@/components/location-visualization'
import { Search } from '@/components/search'

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
  } = useMindMap()
  // const reactFlow = useReactFlow()

  const edgeOptions = {
    animated: true,
    style: { stroke: 'white' },
  }

  // const onNodeClick: any = useCallback(
  //   (event: any, node: any, ...rest: any) => {
  //     const { target } = event
  //     const {
  //       data: { type },
  //     } = node
  //     // Ignore any other clicks to the node that are not the load button
  //     if (target.classList.contains('load-records-button')) {
  //       const { childNodes } = getRootNodeChildren(node?.data.type)
  //       const childNode = childNodes[childNodes.length - 1]
  //       console.log('childNode: ', childNode)

  //       if (type === 'events') {
  //         addLocationsToVisualize(childNodes)
  //       }

  //       nextTick(10).then(() => {
  //         zoomOut({
  //           zoom: 0,
  //           duration: 500,
  //         })
  //       })
  //     } else {
  //       updateActiveNode(node)
  //     }
  //   },
  //   [addLocationsToVisualize, getRootNodeChildren, updateActiveNode, zoomOut]
  // )

  // useForceLayout(childrenLoaded)
  // #NOTE: This might be an interesting way to enhance, bypass or hack any trouble with edges as the node connections get more complex: https://magicui.design/docs/components/animated-beam
  return (
    <div className='relative h-[100vh] w-[100vw] bg-black bg-dot-white/[0.3] '>
      {/* <Spotlight
          className='-top-40 left-0 md:left-60 md:-top-20'
          fill='white'
        /> */}

      <div className='w-auto absolute top-[40px] left-[20px] z-20 cursor-pointer flex justify-center'>
        <Toolbar />
      </div>
      <LocationVisualization />
      <div className='w-full fixed bottom-[40px] left-0 z-50 cursor-pointer flex justify-center'>
        <Search />
      </div>

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
        // onNodeClick={onNodeClick}
        onConnect={onConnect}
        fitView
        style={{ backgroundColor: 'transparent' }}
      >
        {/* <Background /> */}
      </ReactFlow>
    </div>
  )
}
