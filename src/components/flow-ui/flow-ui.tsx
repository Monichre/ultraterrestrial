'use client'

import React, { useCallback } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from 'reactflow'

const CustomNode = React.memo(({ item, isConnectable }: any) => {
  return (
    <>
      <Handle
        type='target'
        position={Position.Left}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />

      <Handle
        type='source'
        position={Position.Right}
        id='a'
        style={{ top: 10, background: '#555' }}
        isConnectable={isConnectable}
      />
      <Handle
        type='source'
        position={Position.Right}
        id='b'
        style={{ bottom: 10, top: 'auto', background: '#555' }}
        isConnectable={isConnectable}
      />
    </>
  )
})

export interface FlowUiProps {
  data?: any
}

const FlowUi: React.FC<FlowUiProps> = ({ data }: FlowUiProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(data)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    []
  )

  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      ></ReactFlow>
    </ReactFlowProvider>
  )
}
export default FlowUi
