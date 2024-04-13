// 'use client'

// import create from 'zustand'

// import { liveblocks } from '@liveblocks/zustand'
// import { rootNodes, rootEdges } from './initial'
// import { client } from '../../../../liveblocks.config'

// type FlowState = {
//   nodes: Node[]
//   edges: Edge[]
//   onNodesChange: OnNodesChange
//   onEdgesChange: OnEdgesChange
//   onConnect: OnConnect
// }

// type Storage = {
//   nodes: FlowState['nodes']
//   edges: FlowState['edges']
// }

// // Define your fully-typed Zustand store
// const useStore: any = create(
//   liveblocks(
//     (set: any, get: any) => ({
//       // Initial values for nodes and edges
//       nodes: rootNodes,
//       edges: rootEdges,
//       updateNodeLabel: (nodeId: string, label: string) => {
//         set({
//           nodes: get().nodes.map((node: any) => {
//             if (node.id === nodeId) {
//               // it's important to create a new object here, to inform React Flow about the changes
//               node.data = { ...node.data, label }
//             }

//             return node
//           }),
//         })
//       },
//       addChildNode: (parentNode: Node, position: XYPosition) => {
//         const newNode = {
//           id: 'new',
//           type: 'mindmap',
//           data: { label: 'New Node' },
//           position,
//           dragHandle: '.dragHandle',
//           parentNode: parentNode.id,
//         }

//         const newEdge = {
//           id: 'edge',
//           source: parentNode.id,
//           target: newNode.id,
//         }

//         set({
//           nodes: [...get().nodes, newNode],
//           edges: [...get().edges, newEdge],
//         })
//       },
//       // Apply changes to React Flow when the flowchart is interacted with
//       onNodesChange: (changes: NodeChange[]) => {
//         set({
//           nodes: applyNodeChanges(changes, get().nodes),
//         })
//       },
//       onEdgesChange: (changes: EdgeChange[]) => {
//         set({
//           edges: applyEdgeChanges(changes, get().edges),
//         })
//       },
//       onConnect: (connection: Connection) => {
//         set({
//           edges: addEdge(connection, get().edges),
//         })
//       },
//     }),
//     {
//       // Add Liveblocks client
//       client,

//       // Define the store properties that should be shared in real-time
//       storageMapping: {
//         nodes: true,
//         edges: true,
//       },
//     }
//   )
// )

// const store = create<any>({
//   nodes: rootNodes,
//   edges: rootEdges,
// })
// export default store
