import { DOMAIN_MODEL_COLORS } from '../../utils/constants/colors'

export type GraphLink = {
  source: string
  target: string
  id: string
  animated?: boolean
}

export type GraphNode = {
  id: string
  label: string
  fill?: string
  data?: any
}

export const createGraphRootEdge = ({ record, type = 'events' }: any) => {
  // @ts-ignore
  const color = DOMAIN_MODEL_COLORS[type]
  const edge = {
    color,
    source: type,
    target: record?.id,
    id: `${type}->${record.id}`,
  }
  return edge
}

export const createGraphLink = ({ id, targetNode, sourceNode }: any) => {
  // How to handle two way linking between nodes?
  const link = {
    id,
    source: sourceNode?.id,
    target: targetNode?.id,
  }
  return link
}

export const createGraphNode = ({ record, type }: any) => {
  const { id, name, label, ...rest } = record
  const title = name || label
  // @ts-ignore
  const color = DOMAIN_MODEL_COLORS[type]
  const node: GraphNode = {
    id,
    label: title,
    fill: color,
    data: {
      ...rest,
      name: title,
      label: title,
      color,
      type,
    },
  }
  return node
}
export const createGraphEdge = ({ targetNode, sourceNode }: any) => {
  // const color = DOMAIN_MODEL_COLORS[type]
  const edge = {
    // color,
    source: sourceNode?.id,
    target: targetNode?.id,
    id: `${sourceNode.id}->${targetNode.id}`,
  }
  return edge
}
