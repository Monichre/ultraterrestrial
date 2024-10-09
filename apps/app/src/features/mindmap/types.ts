type Position = 'top' | 'bottom' | 'left' | 'right'

interface Handle {
  type: 'source' | 'target'
  position: Position
  x: number
  y: number
  width: number
  height: number
}

interface NodeData {
  label: string
}

interface PositionCoordinates {
  x: number
  y: number
}

export interface xyFlowNode {
  id: string
  type: 'input' | 'output'
  data: NodeData
  position: PositionCoordinates
  size: { width: number; height: number }
  handles: Handle[]
}

export interface xyEdge {
  id: string
  source: xyFlowNode['id']
  target: xyFlowNode['id']

  animated: boolean
}
