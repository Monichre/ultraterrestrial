import ELK from 'elkjs/lib/elk.bundled.js'
const elk = new ELK()

const elkOptions = {
  'elk.algorithm': 'layered',
  'elk.layered.spacing.nodeNodeBetweenLayers': '100',
  'elk.spacing.nodeNode': '80',
  'elk.direction': 'RIGHT',
}

export const getLayoutedElements = (nodes, edges, options = {}) => {
  console.log('nodes: ', nodes)
  const graph = {
    id: 'root',
    layoutOptions: {
      ...elkOptions,
      ...options,
    },
    children: nodes.map((node) => ({
      ...node,
      // Adjust the target and source handle positions based on the layout
      // direction.
      targetPosition: 'top',
      sourcePosition: 'bottom',

      // Hardcode a width and height for elk to use when layouting.
      width: 300,
      height: 100,
    })),
    edges: edges,
  }

  return elk
    .layout(graph)
    .then((layoutedGraph: any) => {
      console.log('layoutedGraph: ', layoutedGraph)

      return {
        nodes: layoutedGraph.children.map((node) => ({
          ...node,
          // React Flow expects a position property on the node instead of `x`
          // and `y` fields.
          position: { x: node.x, y: node.y },
        })),

        edges: layoutedGraph.edges,
      }
    })
    .catch(console.error)
}
