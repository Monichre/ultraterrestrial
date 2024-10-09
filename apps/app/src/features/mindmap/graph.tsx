'use client'
import { useMindMap } from '@/providers/mindmap-context'
import { Panel, ReactFlow } from '@xyflow/react'

import { LocationVisualization } from '@/components/location-visualization'

import { edgeTypes } from '@/features/mindmap/config/edge-types'

import { nodeTypes } from '@/features/mindmap/config/index.config'

import {
  MindMapAiChat,
  MindMapAnimatedClickMenu,
  MindMapSidebarQuickMenu,
} from '@/features/mindmap/components/menus'
import { MindMapCommandCenter } from '@/features/mindmap/components/menus/mindmap-command-center'

import { useContextMenu } from '@/hooks/useContextMenu'
// import { useElkLayout } from '@/features/mindmap/layouts/algorithms/elk-layout'

// this helper function returns the intersection point
// of the line between the center of the intersectionNode and the target node
// const {nodes: layoutNodes, edges: layoutEdges} = layoutElementsTreeFlex({}, 'root', 'TB')
import ELK from 'elkjs/lib/elk.bundled.js'
const elk = new ELK()

// Elk has a *huge* amount of options to configure. To see everything you can
// tweak check out:
//
// - https://www.eclipse.org/elk/reference/algorithms.html
// - https://www.eclipse.org/elk/reference/options.html
const elkOptions = {
  'elk.algorithm': 'layered',
  'elk.layered.spacing.nodeNodeBetweenLayers': '100',
  'elk.spacing.nodeNode': '80',
}

const getLayoutedElements = ( nodes: any[], edges: any, options = {} ) => {
  const isHorizontal = false
  const graph = {
    id: 'root',
    layoutOptions: options,
    children: nodes.map( ( node: any ) => ( {
      ...node,
      // Adjust the target and source handle positions based on the layout
      // direction.
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',

      // Hardcode a width and height for elk to use when layouting.
      width: 300,
      height: 300,
    } ) ),
    edges: edges,
  }

  return elk
    .layout( graph )
    .then( ( layoutedGraph: any ) => ( {
      nodes: layoutedGraph.children.map( ( node: any ) => ( {
        ...node,
        // React Flow expects a position property on the node instead of `x`
        // and `y` fields.
        position: { x: node.x, y: node.y },
      } ) ),

      edges: layoutedGraph.edges,
    } ) )
    .catch( console.error )
}

export function Graph( props: any ) {
  const {
    nodes,
    edges,
    onNodesChange,

    onEdgesChange,
    setNodes,
    setEdges,
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

  // const onLayout = useCallback(
  //   ({direction, useInitialNodes = false}) => {
  //     const opts = {'elk.direction': direction, ...elkOptions}
  //     const ns = nodes
  //     const es = edges

  //     getLayoutedElements(ns, es, opts).then(({nodes: layoutedNodes, edges: layoutedEdges}) => {
  //       setNodes(layoutedNodes)
  //       setEdges(layoutedEdges)

  //       window.requestAnimationFrame(() => fitView())
  //     })
  //   },
  //   [nodes, edges]
  // )

  // // Calculate the initial layout on mount.
  // useLayoutEffect(() => {
  //   onLayout({direction: 'DOWN', useInitialNodes: true})
  // }, [])

  return (
    <div
      className='relative h-[100vh] w-[100vw] bg-black bg-dot-white/[0.3] bg-repeat'
      style={{ backgroundSize: '20px 20px' }}>
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
        initialViewport={{
          zoom: 0,
          x: 0,
          y: 0,
        }}

        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionMode='loose'
        // connectionLineComponent={FloatingConnectionLine}
        elevateNodesOnSelect={true}
        fitView
        // onInit={updateMindMapInstance}
        style={{ backgroundColor: 'transparent' }}>
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
