'use client'

import { Spotlight } from '@/components/animations/spotlight'
import {
  DotGridBackground,
  DotGridBackgroundBlack,
} from '@/components/ui/backgrounds'

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

import { edgeTypes } from '@/features/mindmap/config/edge-types'
import * as d3F from 'd3-force'
import collide from '@/features/mindmap/utils/collide'
import { nodeTypes, rootNodes } from '@/features/mindmap/config/index.config'
import { AiAssistedSearch } from '@/features/ai'
import { CardStack } from '@/features/mindmap/cards/card-stack/card-stack'
// import { useForceLayout } from '@/features/mindmap/hooks/useForceLayout'

export function Graph(props: any) {
  const {
    nodes,
    edges,
    onNodesChange,

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

  // const simRef = useForceLayout()

  // Enable drop effect on drag over
  // const onDragOver = useCallback((event) => {
  //   event.preventDefault();
  //   event.dataTransfer.dropEffect = "move";
  // }, []);

  // // Handle drop event to add a new node
  // const onDrop = useCallback(
  //   (event) => {
  //     event.preventDefault();

  //     const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
  //     const type = event.dataTransfer.getData("application/reactflow");

  //     if (typeof type === "undefined" || !type) {
  //       return;
  //     }

  //     const position = reactFlowInstance.project({
  //       x: event.clientX - reactFlowBounds.left,
  //       y: event.clientY - reactFlowBounds.top,
  //     });
  //     const newNode = {
  //       id: getId(),
  //       type,
  //       position,
  //       data: { label: `${type}` },
  //     };

  //     console.log("Node created: ", newNode);
  //     setNodes((nds) => nds.concat(newNode));
  //   },
  //   [reactFlowInstance]
  // );

  //   //node panel
  // const onDragStart = (event, nodeType) => {
  //   event.dataTransfer.setData("application/reactflow", nodeType);
  //   event.dataTransfer.effectAllowed = "move";
  // };

  //   <>
  //   <h3 className="text-xl mb-4 text-blue-900">Nodes Panel</h3>
  //   <div
  //     className="bg-white p-3 border-2 border-blue-500 rounded cursor-move flex justify-center items-center text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
  //     onDragStart={(event) => onDragStart(event, "textnode")}
  //     draggable
  //   >
  //     Message Node
  //   </div>
  // </>

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
        snapToGrid={true}
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
            <AiAssistedSearch />
          </div>
        </Panel>
        {/* <Panel
          position='bottom-left'
          className='absolute bottom-[40%] left-0  h-[680px] w-[250px] nodrag'
        >
          <CardStack mindmapCards={rootNodes} />
        </Panel> */}
      </ReactFlow>
    </div>
  )
}
