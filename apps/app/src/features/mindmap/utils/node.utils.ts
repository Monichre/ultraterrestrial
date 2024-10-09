// import { nextId } from './id'
import type { Reactflow } from '@/features/mindmap/layouts/types'
import { Edge, MarkerType, Node, Position } from '@xyflow/react'
// import dagre from 'dagre'
// import { PaletteElement, PaletteElementNodeStyles } from './types'

export const getNodeSize = (
  node: any,
  defaultSize = { width: 380, height: 280 }
) => {
  // const internalNode = getNode(node.id)
  const nodeWith = node?.width
  const nodeHeight = node?.height
  const hasDimension = [nodeWith, nodeHeight].every((e) => e != null)
  return {
    hasDimension,
    width: nodeWith,
    height: nodeHeight,
    widthWithDefault: nodeWith ?? defaultSize.width,
    heightWithDefault: nodeHeight ?? defaultSize.height,
  }
}

type IFixPosition = (pros: {
  x: number
  y: number
  width: number
  height: number
}) => {
  x: number
  y: number
}
export const getNodeLayouted = (props: {
  node: any
  position: { x: number; y: number }
  direction: any
  visibility: any
  fixPosition?: IFixPosition
}) => {
  const {
    node,
    position,
    direction,
    visibility,
    fixPosition = (p) => ({ x: p.x, y: p.y }),
  } = props
  const hidden = visibility !== 'visible'
  const isHorizontal = direction === 'horizontal'
  const { width, height, widthWithDefault, heightWithDefault } =
    getNodeSize(node)
  node.targetPosition = isHorizontal ? Position.Left : Position.Top
  node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom
  return {
    ...node,
    type: 'base',
    width,
    height,
    hidden,
    position: fixPosition({
      ...position,
      width: widthWithDefault,
      height: heightWithDefault,
    }),
    data: {
      ...node.data,
      label: node.id,
    },
    style: {
      ...node.style,
      opacity: hidden ? 0 : 1,
    },
  }
}

export const getEdgeLayouted = (props: { edge: any; visibility: any }) => {
  const { edge, visibility } = props
  const hidden = visibility !== 'visible'
  return {
    ...edge,
    hidden,
    type: 'base',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    style: {
      ...edge.style,
      opacity: hidden ? 0 : 1,
    },
  }
}

export function generateNodes(
  type: string,
  parentNode: Node,
  data: Array<any>
) {
  const parentWidth = parentNode.width!
  const elementsCount = data.length
  const space = 100
  const totalArea = elementsCount * parentWidth + space * (elementsCount - 1)
  const xStartPos = parentNode.position.x - totalArea / 2

  let y = 200
  let x = xStartPos - parentWidth

  return data.map(function (node) {
    x += space + parentWidth

    return {
      id: node.id,
      position: {
        x,
        y: parentNode.position.y + y,
      },
      data: node.data,
      type,
    }
  })
}

export const generateEdges = (parentId: string, childrens: Array<Node>) => {
  return childrens.map((childrenNode) => {
    return {
      id: childrenNode.id,
      source: parentId,
      target: childrenNode.id,
      animated: true,
      style: { stroke: '#1A192B' },
    }
  })
}

export const findLeafNodes = (nodes: Array<Node>, nodeId: string) => {
  const node = nodes.find((node) => node.id === nodeId)!

  let tree = [node]
  if (node.data.parentId) {
    tree = tree.concat(findLeafNodes(nodes, node.data.parentId))
  }

  return tree
}

export const getNodeColor = (depth: number, palette: any) => {
  const colors = palette.colors
  const index = depth % colors.length
  const color = colors[index]

  const style = palette.node.buildStyles(color)

  return { style, color }
}

export const getEdgeColor = (depth: number, palette: any) => {
  const colors = palette.colors
  const index = depth % colors.length
  const color = colors[index]

  const style = palette.edge.buildStyles(color)

  return { style, color }
}
export const getRootNode = (nodes: Reactflow['nodes']) => {
  return nodes.find((e) => e.type === 'start') ?? nodes[0]
}
