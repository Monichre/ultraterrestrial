'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { use3DGraph, type UseGraphProps } from '@/hooks/use3dGraph'
import { type Node, type Edge, useReactFlow } from 'reactflow'

const GraphContext: any = createContext({
  nodes: [],
  setNodes: (nodes: any) => {},
  edges: [],
  setEdges: (edges: any) => {},
  flowGraph: [],
  createRootNodeEdges: (nodes: any) => {},
  addRootNodeChildren: (type: string) => {},
})

export const GraphProvider = ({
  children,
  allEntityGraphData,
}: {
  children: React.ReactNode
  allEntityGraphData: any
}) => {
  const reactFlow = useReactFlow()
  const { graph } = use3DGraph({ allEntityGraphData })
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [flowGraph, setFlowGraph] = useState({})

  const nodeSize = {
    height: 488,
    width: 260,
  }

  const createHandles = (node: Node) => {
    const handles = [
      {
        type: 'source',
        position: 'bottom',
        x: nodeSize.width * 0.5,
        y: nodeSize.height,
        width: 1,
        height: 1,
      },
      {
        type: 'target',
        position: 'top',
        x: nodeSize.width * 0.5,
        y: 0,
        width: 1,
        height: 1,
      },
    ]
    return {
      ...node,
      handles,
    }
  }

  const createRootNode = useCallback((node: any, index: number) => {
    const { id, label, name, fill, data } = node
    const title = label || name
    const childCount = node?.childNodes ? node?.childNodes?.length : 0
    return {
      id,
      type: 'customRoot',
      position: {
        x: index * 100,
        y: 0,
      },
      data: {
        childCount,
        ...data,
        label: title,
        fill,
      },
    }
  }, [])

  // TODO: Add position data on node by passing paretNode data and calculating spacing. See below
  /*
  export function generateNodes(type: string, parentNode: Node, data: Array<any>) {
	const parentWidth = parentNode.width!;
	const elementsCount = data.length;
	const space = 100;
	const totalArea = elementsCount * parentWidth + space * (elementsCount - 1);
	const xStartPos = parentNode.position.x - totalArea / 2;

	let y = 200;
	let x = xStartPos - parentWidth;

	return data.map(function (item) {
		x += space + parentWidth;

		return {
			id: nextId(),
			position: {
				x,
				y: parentNode.position.y + y,
			},
			data: item,
			type,
		};
	});
}
  */
  const createRootNodeChild = useCallback((node: any) => {
    const { id, label, name, fill, data } = node
    const title = label || name
    return {
      id,
      data: {
        ...data,
        label: title,
        fill,
      },
      parentId: `${data.type}-root-node`,
      extent: 'parent',
    }
  }, [])

  const createRootNodeEdge = (rootNodeChildNode: any) => {
    const { parentId: source, id: target, data } = rootNodeChildNode
    return {
      id: `${source}:${target}`,
      source,
      target,
      animated: true,
      data,
    }
  }

  const createRootNodeEdges = useCallback((rootNodeChildNodes: Node[]) => {
    const rootNodeEdges = rootNodeChildNodes.map(createRootNodeEdge)
    return rootNodeEdges
  }, [])

  const addRootNodeChildren = useCallback(
    (type: any) => {
      console.log('type: ', type)
      console.log('flowGraph: ', flowGraph)
      const { nodes: incomingNodes } = flowGraph[type]
      console.log('incomingNodes: ', incomingNodes)
      const incomingEdges = createRootNodeEdges(incomingNodes)

      incomingNodes.forEach((childNode: Node<any> | Node<any>[]) =>
        reactFlow.addNodes(childNode)
      )
      incomingEdges.forEach((childNodeEdge: Edge<any> | Edge<any>[]) =>
        reactFlow.addEdges(childNodeEdge)
      )
    },
    [createRootNodeEdges, flowGraph, reactFlow]
  )

  useEffect(() => {
    const formattedGraphNodesObject: any = {}

    for (let key in graph) {
      // @ts-ignore
      const graphModel = graph[key]
      let tempNodes = graphModel.nodes.map(createRootNodeChild)
      let tempLinks = [].concat(
        // @ts-ignore
        ...Object.keys(graphModel.links).map((key) => {
          const links = graphModel.links[key].connectedTo
          return [...links]
        })
      )
      formattedGraphNodesObject[key] = {
        nodes: tempNodes,
        edges: tempLinks,
      }

      setFlowGraph(formattedGraphNodesObject)
    }

    const initialNodes = graph.root.nodes.map(createRootNode)
    setNodes(initialNodes)
    setEdges([])
  }, [createRootNode, createRootNodeChild, graph])

  return (
    <GraphContext.Provider
      value={{
        nodes,
        addRootNodeChildren,
        setNodes,
        edges,
        setEdges,
        flowGraph,
        createRootNodeEdges,
      }}
    >
      {children}
    </GraphContext.Provider>
  )
}

export const useGraph: any = () => {
  const context = useContext(GraphContext)
  console.log('context: ', context)
  if (!context) {
    throw new Error('useGraph must be used within a GraphProvider')
  }
  return context
}
