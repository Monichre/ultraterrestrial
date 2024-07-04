import {
  type ILayoutReactflow,
  layoutReactflow,
} from '@/features/graph/layouts'

import { useState } from 'react'
import { useReactFlow } from '@xyflow/react'
import { nextTick } from '@/utils'
import { getRootNode } from '@/features/graph/utils/node.utils'

export const useAutoLayout = () => {
  const reactFlow = useReactFlow()
  const layoutWithFlush = async (options: ILayoutReactflow) => {
    const layoutInitial: any = await layoutReactflow(options)
    reactFlow.setNodes(layoutInitial.nodes)
    reactFlow.setEdges(layoutInitial.edges)

    // Wait for render to complete
    await nextTick(10)
    const nodes = reactFlow.getNodes()
    const edges = reactFlow.getEdges()
    return { layout: layoutInitial, nodes, edges }
  }

  const [layouting, setLayouting] = useState(false)

  const layout = async (options: ILayoutReactflow) => {
    if (layouting || options.nodes.length < 1) {
      return
    }
    const isHorizontal = options.direction === 'horizontal'

    setLayouting(true)
    // Perform the first layout to acquire node sizes
    const firstLayout: any = await layoutWithFlush({
      ...options,
      visibility: 'hidden', // Hide layout during the first layout pass
    })
    // Perform the second layout using actual node sizes
    const secondLayout: any = await layoutWithFlush({
      visibility: 'visible',
      ...options,
      nodes: firstLayout.nodes ?? options.nodes,
      edges: firstLayout.edges ?? options.edges,
    })
    setLayouting(false)

    // Center the viewpoint to the position of the root node
    const root = getRootNode(secondLayout.layout.nodes)
    // Give it a little offset so it's visually centered
    const offset = isHorizontal
      ? {
          x: 0.2 * document.body.clientWidth,
          y: 0 * document.body.clientHeight,
        }
      : {
          x: 0 * document.body.clientHeight,
          y: 0.3 * document.body.clientHeight,
        }
    if (root) {
      reactFlow.setCenter(
        root.position.x + offset.x,
        root.position.y + offset.y,
        {
          zoom: 1,
        }
      )
    }
    return secondLayout.layout
  }

  return { layout, layouting }
}
