'use client'
import { use3DGraph, type UseGraphProps } from '@/hooks/use3dGraph'
import { useState, useEffect } from 'react'
import type { Position } from 'reactflow'

const nodeSize = {
  height: 488,
  width: 260,
}

const createHandles = (node: {
  id: any
  type: string
  position: { x: number; y: number }
  data: any
}) => {
  const handles = [
    {
      type: 'source',
      position: 'bottom' as Position,
      x: nodeSize.width * 0.5,
      y: nodeSize.height,
      width: 1,
      height: 1,
    },
    {
      type: 'target',
      position: 'top' as Position,
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

const createRootNode = (node: any, index: number) => {
  const { id, label, name, fill, data } = node
  const title = label || name

  return {
    id,
    type: 'customRoot',
    position: {
      x: index * 100,
      y: 0,
    },
    data: {
      // @ts-ignore
      ...data,
      label: title,
      fill,
    },
  }
}

const createRootNodeChild = (node: any) => {
  const { id, label, name, fill, data } = node
  const title = label || name

  return {
    id,

    // position: {
    //   x: index * 100,
    //   y: 0,
    // },
    data: {
      // @ts-ignore
      ...data,
      label: title,
      fill,
    },
    parentId: `${data.type}-root-node`,
    extent: 'parent',
  }
}

export const useXYFlow = ({ allEntityGraphData }: UseGraphProps) => {
  console.log('allEntityGraphData: ', allEntityGraphData)
  const { graph } = use3DGraph({ allEntityGraphData })
  console.log('graph: ', graph)
  const [graphNodes, setGraphNodes] = useState()
  const [flowState, setFlowState]: any = useState({
    nodes: graph.root.nodes.map(createRootNode),
    edges: [],
  })

  useEffect(() => {
    const formattedGraphNodesObject: any = {}

    for (let key in graph) {
      // @ts-ignore
      const graphModel = graph[key]
      let tempNodes = graphModel.nodes.map(createRootNodeChild)
      let tempLinks = [].concat(
        [],
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
      graphModel.nodes = tempNodes
      graphModel.links = tempLinks
    }

    console.log('formattedGraphNodesObject: ', formattedGraphNodesObject)
    const initialNodes = graph.root.nodes.map(createRootNode)

    setFlowState((xyFlowState: any) => ({
      ...xyFlowState,
      nodes: initialNodes,
    }))
  }, [graph])

  const addChildRootNodes = (type: any) => {
    // createRootNodeChild
  }

  return {
    flowState,
  }
}
