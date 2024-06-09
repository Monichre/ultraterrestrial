// 'use client'

// import { Spotlight } from '@/components/ui/animations/spotlight'
// import { DotGridBackground } from '@/components/ui/backgrounds'
// import { nodeTypes } from '@/features/xyflow/utils/node-types'
// import { useXYFlow } from '@/hooks/useXyFlow'
// import { useCallback, useEffect, useState } from 'react'
// import ReactFlow, {
//   addEdge,
//   Node,
//   Controls,
//   Edge,
//   applyNodeChanges,
//   applyEdgeChanges,
//   OnConnect,
//   Background,
//   Panel,
//   type NodeOrigin,
//   useEdgesState,
//   useNodesState,
//   useReactFlow,
// } from 'reactflow'
// import 'reactflow/dist/style.css'

// export function XyFlowGraph({ initialGraphData: allEntityGraphData }: any) {
//   const reactFlow = useReactFlow()
//   const { flowState, flowGraph, createRootNodeEdges }: any = useXYFlow({
//     allEntityGraphData,
//   })
//   const [nodes, setNodes, onNodesChange] = useNodesState(flowState.nodes)
//   const [edges, setEdges, onEdgesChange] = useEdgesState(flowState.edges)

//   const addRootNodeChildren = useCallback(
//     (type: any) => {
//       console.log('type: ', type)
//       const { nodes: incomingNodes }: any = flowGraph[type]
//       console.log('incomingNodes: ', incomingNodes)
//       const incomingEdges = createRootNodeEdges(incomingNodes)
//       console.log('incomingEdges: ', incomingEdges)

//       incomingNodes.forEach((childNode: Node<any> | Node<any>[]) =>
//         reactFlow.addNodes(childNode)
//       )
//       incomingEdges.forEach((childNodeEdge: Edge<any> | Edge<any>[]) =>
//         reactFlow.addEdges(childNodeEdge)
//       )
//     },
//     [createRootNodeEdges, flowGraph, reactFlow]
//   )

//   // const onConnect: OnConnect = useCallback(
//   //   (params: any) => setEdges((eds) => addEdge(params, eds)),
//   //   []
//   // )

//   useEffect(() => {
//     if (!nodes?.length && flowState.nodes?.length) {
//       setNodes(flowState.nodes)
//     }
//   }, [flowState.nodes, nodes, setNodes])

//   const nodeOrigin: NodeOrigin = [0.5, 0.5]
//   const edgeOptions = {
//     animated: true,
//     style: {
//       stroke: 'white',
//     },
//   }

//   const connectionLineStyle = { stroke: 'white' }

//   return (
//     <DotGridBackground>
//       <Spotlight
//         className='-top-40 left-0 md:left-60 md:-top-20'
//         fill='white'
//       />
//       <ReactFlow
//         nodeTypes={nodeTypes}
//         defaultEdgeOptions={edgeOptions}
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         fitView
//         nodeOrigin={nodeOrigin}
//         connectionLineStyle={connectionLineStyle}
//         // onConnect={onConnect}
//       >
//         <Background />
//         <Controls showInteractive={false} />
//         <Panel position='top-left'>React Flow Mind Map</Panel>
//       </ReactFlow>
//     </DotGridBackground>
//   )
// }

'use client'

import { Spotlight } from '@/components/ui/animations/spotlight'
import { DotGridBackground } from '@/components/ui/backgrounds'
import { nodeTypes } from '@/features/xyflow/utils/node-types'
import { useCallback, useEffect } from 'react'
import ReactFlow, {
  addEdge,
  Node,
  Controls,
  Edge,
  applyNodeChanges,
  applyEdgeChanges,
  OnConnect,
  Background,
  Panel,
  type NodeOrigin,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { GraphProvider, useGraph } from '@/contexts/xyflow/GraphContext'

function XyFlowGraphContent() {
  const { nodes: initialNodes, edges: initialEdges } = useGraph()

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  useEffect(() => {
    if (!nodes?.length && initialNodes.length) {
      setNodes(nodes)
    }
  }, [initialNodes.length, nodes, setNodes])

  const nodeOrigin: NodeOrigin = [0.5, 0.5]
  const edgeOptions = {
    animated: true,
    style: {
      stroke: 'white',
    },
  }

  const connectionLineStyle = { stroke: 'white' }

  return (
    <DotGridBackground>
      <Spotlight
        className='-top-40 left-0 md:left-60 md:-top-20'
        fill='white'
      />
      <ReactFlow
        nodeTypes={nodeTypes}
        defaultEdgeOptions={edgeOptions}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        nodeOrigin={nodeOrigin}
        connectionLineStyle={connectionLineStyle}
      >
        <Background />
        <Controls showInteractive={false} />
        <Panel position='top-left'>React Flow Mind Map</Panel>
      </ReactFlow>
    </DotGridBackground>
  )
}

export function XyFlowGraph({ initialGraphData: allEntityGraphData }: any) {
  return (
    <GraphProvider allEntityGraphData={allEntityGraphData}>
      <XyFlowGraphContent />
    </GraphProvider>
  )
}
