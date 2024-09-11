'use client'

import { Spotlight } from '@/components/animated/spotlight'
import {
  DotGridBackground,
  DotGridBackgroundBlack,
} from '@/components/backgrounds'

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
  SelectionMode,
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

import { Position, MarkerType } from '@xyflow/react'
import { FloatingConnectionLine } from '@/features/mindmap/edges/FloatingConnectionLine'

// this helper function returns the intersection point
// of the line between the center of the intersectionNode and the target node
function getNodeIntersection(
  intersectionNode: {
    measured: { width: any; height: any }
    internals: { positionAbsolute: any }
  },
  targetNode: {
    internals: { positionAbsolute: any }
    measured: { width: number; height: number }
  }
) {
  // https://math.stackexchange.com/questions/1724792/an-algorithm-for-finding-the-intersection-point-between-a-center-of-vision-and-a
  const { width: intersectionNodeWidth, height: intersectionNodeHeight } =
    intersectionNode.measured
  const intersectionNodePosition = intersectionNode.internals.positionAbsolute
  const targetPosition = targetNode.internals.positionAbsolute

  const w = intersectionNodeWidth / 2
  const h = intersectionNodeHeight / 2

  const x2 = intersectionNodePosition.x + w
  const y2 = intersectionNodePosition.y + h
  const x1 = targetPosition.x + targetNode.measured.width / 2
  const y1 = targetPosition.y + targetNode.measured.height / 2

  const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h)
  const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h)
  const a = 1 / (Math.abs(xx1) + Math.abs(yy1))
  const xx3 = a * xx1
  const yy3 = a * yy1
  const x = w * (xx3 + yy3) + x2
  const y = h * (-xx3 + yy3) + y2

  return { x, y }
}

// returns the position (top,right,bottom or right) passed node compared to the intersection point
function getEdgePosition(
  node: { internals: { positionAbsolute: any } },
  intersectionPoint: { x: any; y: any }
) {
  const n = { ...node.internals.positionAbsolute, ...node }
  const nx = Math.round(n.x)
  const ny = Math.round(n.y)
  const px = Math.round(intersectionPoint.x)
  const py = Math.round(intersectionPoint.y)

  if (px <= nx + 1) {
    return Position.Left
  }
  if (px >= nx + n.measured.width - 1) {
    return Position.Right
  }
  if (py <= ny + 1) {
    return Position.Top
  }
  if (py >= n.y + n.measured.height - 1) {
    return Position.Bottom
  }

  return Position.Top
}

// returns the parameters (sx, sy, tx, ty, sourcePos, targetPos) you need to create an edge
export function getEdgeParams(source: any, target: any) {
  const sourceIntersectionPoint = getNodeIntersection(source, target)
  const targetIntersectionPoint = getNodeIntersection(target, source)

  const sourcePos = getEdgePosition(source, sourceIntersectionPoint)
  const targetPos = getEdgePosition(target, targetIntersectionPoint)

  return {
    sx: sourceIntersectionPoint.x,
    sy: sourceIntersectionPoint.y,
    tx: targetIntersectionPoint.x,
    ty: targetIntersectionPoint.y,
    sourcePos,
    targetPos,
  }
}

export function createNodesAndEdges() {
  const nodes = []
  const edges = []
  const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 }

  nodes.push({ id: 'target', data: { label: 'Target' }, position: center })

  for (let i = 0; i < 8; i++) {
    const degrees = i * (360 / 8)
    const radians = degrees * (Math.PI / 180)
    const x = 250 * Math.cos(radians) + center.x
    const y = 250 * Math.sin(radians) + center.y

    nodes.push({ id: `${i}`, data: { label: 'Source' }, position: { x, y } })

    edges.push({
      id: `edge-${i}`,
      target: 'target',
      source: `${i}`,
      type: 'floating',
      markerEnd: {
        type: MarkerType.Arrow,
      },
    })
  }

  return { nodes, edges }
}

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

      <ReactFlow
        colorMode='dark'
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        // snapToGrid={true}
        defaultEdgeOptions={edgeOptions}
        nodes={nodes}
        edges={edges}
        defaultViewport={{ x: 0, y: 0, zoom: -1 }}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        panOnScroll
        selectionOnDrag
        panOnDrag
        zoomOnScroll={false}
        connectionLineComponent={FloatingConnectionLine}
        elevateNodesOnSelect={true}
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
