'use client'

import { ROOT_NODES } from '@/utils/constants'
import * as d3 from 'd3'
interface DrawingBoardProps {
  models: any
}

type DrawingBoardNodeType = {
  id: string
  name: string
  summary: string
  photo: string
  date: string
  position: number
  children: DrawingBoardNodeType[]
}

const DrawingBoardNode = (models) => {
  const draw = (context, target) => {
    context.moveTo(10, 10) // move current point to ⟨10,10⟩
    context.lineTo(100, 10) // draw straight line to ⟨100,10⟩
    context.arcTo(150, 150, 300, 10, 40) // draw an arc, the turtle ends up at ⟨194.4,108.5⟩
    context.lineTo(300, 10) // draw straight line to ⟨300,10⟩
    // etc.
    return context // not mandatory, but will make it easier to chain operations
  }
}

export const DrawingBoard: React.FC<DrawingBoardProps> = ({ models }) => {
  const tree = d3.tree()
  const Node = d3.hierarchy.prototype.constructor
  const svg = d3.create('svg').attr('viewBox', [-10, -10, 1000, 1000])

  const root = new Node({
    name: 'ultraterrestrial',
    position: {
      x: 0,
      y: 0,
    },
  })
  const rootNodes = ROOT_NODES.map((name) =>
    Object.assign(new Node(), {
      name,
      id: name,
      parent: root,
      children: [],
    })
  )
  const links = []
  root.children = rootNodes

  rootNodes.forEach((node) => {
    links.push({ source: node?.parent, target: node })
  })

  const childNodes = [].concat(
    [],
    ...Object.keys(models).map((key: any) => {
      const parent = rootNodes.find((node) => node?.id === key)
      const childModels: any = models[key]
      const childModelNodes = childModels.map((model: any) =>
        Object.assign(new Node(), { parent: parent, children: [], ...model })
      )
      parent.children = childModelNodes
      return childModelNodes
    })
  )

  console.log('childNodes: ', childNodes)

  const nodes = [root, rootNodes, childNodes]

  tree(root)

  return svg.node()
}
