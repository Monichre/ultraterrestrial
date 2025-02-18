'use client'
import { useMindMap } from '@/contexts/mindmap-context'
import { Panel, ReactFlow } from '@xyflow/react'

import { LocationVisualization } from '@/components/location-visualization'

import { edgeTypes } from '@/features/mindmap/config/edge-types'

import { nodeTypes } from '@/features/mindmap/config/index.config'

import {
  MindMapAnimatedClickMenu,
  MindMapSideMenu
} from '@/features/mindmap/components/menus'
import { MindMapBottomMenu } from '@/features/mindmap/components/menus/mindmap-bottom-menu'

import { useContextMenu } from '@/hooks/useContextMenu'
// import { useElkLayout } from '@/features/mindmap/layouts/algorithms/elk-layout'

// this helper function returns the intersection point
// of the line between the center of the intersectionNode and the target node
// const {nodes: layoutNodes, edges: layoutEdges} = layoutElementsTreeFlex({}, 'root', 'TB')
import { EllipsesScramble } from '@/components/animated/text-effect/text-scramble/ellipses-scramble'
import { Card } from '@/components/ui/card'
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
    onNodesDelete,
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



  return (


    <div
      className='relative h-[100vh] w-[100vw] bg-black bg-dot-white/[0.3] bg-repeat'
      style={{ backgroundSize: '16px 16px' }
      }>
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
        // initialViewport={{
        //   zoom: 0,
        //   x: 0,
        //   y: 0,
        // }}

        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesDelete={onNodesDelete}
        connectionMode='loose'
        // connectionLineComponent={FloatingConnectionLine}
        elevateNodesOnSelect={true}
        defaultViewport={{
          zoom: 0,
          x: 0,
          y: 0,
        }}
        // fitView
        onInit={updateMindMapInstance}
        style={{ backgroundColor: 'transparent' }}>
        <Panel position='top-left'>
          <div className='ml-2 mt-2'>
            <MindMapSideMenu />
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
          <MindMapBottomMenu />
        </Panel>



        {/* bg-gradient-to-r from-black/50 to-transparent  */}
      </ReactFlow>
      <div className="fixed top-0 right-0 w-[25vw] h-full animate-[slide-in_0.3s_ease-out]">
        <div className="p-4 animate-[fade-in-up_0.4s_ease-out] flex flex-col gap-4 justify-start items-center align-middle">

          <Card className="bg-black/30 border-[#adf0dd]/30 backdrop-blur-sm p-4 w-full font-mono text-sm pointer-events-auto">
            <div className="text-[#adf0dd] space-y-1">
              <div className="opacity-90">[System Log]</div>
              <EllipsesScramble className="opacity-70">{">"} Initializing Disclosure knowledge base</EllipsesScramble>
              <EllipsesScramble className="opacity-70">{">"} Initializing global knowledge base scan...</EllipsesScramble>
              <div className="pl-4 opacity-60">
                - Indexing core domain models...
              </div>
              <div className="pl-4 opacity-60">
                Sequencing records...
              </div>
              <div className="pl-4 opacity-60">
                - Syncronizing application state with knowledge base...
              </div>

              <div className="opacity-80">{">"} [System Status]: Knowledge Base Sequenced</div>
              <div className="opacity-75">{">"} Satellites: Online</div>
              <div className="opacity-90">{">"} Data streams active:</div>
              <div className="pl-4 opacity-60">
                - Sequenced data stream pipeline...
              </div>
              <div className="opacity-80">{">"} Analysis: In progress...</div>
            </div>
          </Card>
        </div>
      </div>

    </div>


  )
}
