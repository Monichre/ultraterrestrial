'use client'

import { Spotlight } from '@/components/ui/animations/spotlight'
import { DotGridBackground } from '@/components/ui/backgrounds'
import { nodeTypes } from '@/features/xyflow/utils/node-types'
import { useCallback, useEffect, useState } from 'react'
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
} from 'reactflow'
import 'reactflow/dist/style.css'

export function XyFlowGraph({ nodes: initialNodes, edges: initialEdges }: any) {
  console.log('initialEdges: ', initialEdges)
  console.log('initialNodes: ', initialNodes)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  // const onConnect: OnConnect = useCallback(
  //   (params: any) => setEdges((eds) => addEdge(params, eds)),
  //   []
  // )

  useEffect(() => {
    if (!nodes?.length && initialNodes?.length) {
      setNodes(initialNodes)
    }
  }, [initialNodes, nodes, setNodes])

  const nodeOrigin: NodeOrigin = [0.5, 0.5]

  return (
    <DotGridBackground>
      <Spotlight
        className='-top-40 left-0 md:left-60 md:-top-20'
        fill='white'
      />
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        // onConnect={onConnect}
      >
        <Background />
        <Controls showInteractive={false} />
        <Panel position='top-left'>React Flow Mind Map</Panel>
      </ReactFlow>
    </DotGridBackground>
  )
}
