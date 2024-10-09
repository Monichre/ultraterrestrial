'use client'
import { useMindMap } from '@/providers/mindmap-context'
import { Panel, ReactFlow } from '@xyflow/react'

import { LocationVisualization } from '@/components/location-visualization'

import { edgeTypes } from '@/features/mindmap/config/edge-types'

import { nodeTypes } from '@/features/mindmap/config/index.config'

import { FloatingConnectionLine } from '@/features/mindmap/components/edges/FloatingConnectionLine'

import {
  MindMapAiChat,
  MindMapAnimatedClickMenu,
  MindMapSidebarQuickMenu,
} from '@/features/mindmap/components/menus'
import { MindMapCommandCenter } from '@/features/mindmap/components/menus/mindmap-command-center'

import { useContextMenu } from '@/hooks/useContextMenu'

// this helper function returns the intersection point
// of the line between the center of the intersectionNode and the target node

export function Graph(props: any) {
  const {
    nodes,
    edges,
    onNodesChange,
    setNodes,
    onEdgesChange,
    // setNodes,
    // setEdges,
    onConnect,
    fitView,
    // initialNodes,
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

  const edgeOptions = {
    animated: true,
    style: { stroke: 'white' },
  }

  const { ref, clickPosition, attrs, isOpen, closeMenu } = useContextMenu()

  // const workerRef = useRef(null)

  // useEffect(() => {
  //   if (nodes.length === 0) return

  //   // Initialize the Web Worker
  //   if (!workerRef.current) {
  //     workerRef.current = new Worker('/simulationWorker.js')
  //   }

  //   const worker = workerRef.current

  //   worker.postMessage({ nodes, edges })

  //   worker.onmessage = (event) => {
  //     const updatedNodes = event.data
  //     setNodes(updatedNodes)
  //     fitView()
  //   }

  //   // Cleanup
  //   return () => {
  //     worker.terminate()
  //     workerRef.current = null
  //   }
  // }, [nodes.length, edges.length])

  const wrapperClass = `relative h-[100vh] w-[100vw] bg-black bg-dot-white/[0.3] bg-repeat`
  return (
    <div
      className='relative h-[100vh] w-[100vw] bg-black bg-dot-white/[0.3] bg-repeat'
      style={{ backgroundSize: '20px 20px' }}
    >
      {/* <div className='fixed top-0 left-0 z-0 w-full'>
        <GraphPaper />
      </div> */}
      {/* <Spotlight
        className='-top-40 left-0 md:left-60 md:-top-20'
        fill='white'
      /> */}

      <ReactFlow
        ref={ref}
        // {...attrs}
        colorMode='dark'
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        // snapToGrid={true}
        defaultEdgeOptions={edgeOptions}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineComponent={FloatingConnectionLine}
        elevateNodesOnSelect={true}
        fitView
        onInit={updateMindMapInstance}
        style={{ backgroundColor: 'transparent' }}
      >
        <Panel position='top-left'>
          <div className='ml-2 mt-2'>
            <MindMapSidebarQuickMenu />
          </div>
        </Panel>
        <Panel position='top-right'>
          <LocationVisualization />
        </Panel>

        <MindMapAnimatedClickMenu
          isOpen={isOpen}
          clickPosition={clickPosition}
          closeMenu={closeMenu}
        />

        <Panel position='bottom-center'>
          <MindMapCommandCenter />
        </Panel>

        <Panel position='bottom-right'>
          <MindMapAiChat />
        </Panel>
      </ReactFlow>
    </div>
  )
}
