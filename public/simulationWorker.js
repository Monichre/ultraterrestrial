// public/simulationWorker.js

self.importScripts('https://d3js.org/d3-force.v3.min.js') // Import D3-force

self.onmessage = function (event) {
  const { nodes, edges } = event.data

  const simulationNodes = nodes.map((node) => ({
    ...node,
    x: node.position.x,
    y: node.position.y,
  }))

  const simulationEdges = edges.map((edge) => ({ ...edge }))

  const simulation = d3
    .forceSimulation(simulationNodes)
    .force(
      'link',
      d3
        .forceLink(simulationEdges)
        .id((d) => d.id)
        .distance(200)
        .strength(1)
    )
    .force('charge', d3.forceManyBody().strength(-500))
    .force('center', d3.forceCenter(0, 0))
    .force('collision', d3.forceCollide().radius(50))

  // Run the simulation synchronously
  const totalIterations = 300
  for (let i = 0; i < totalIterations; i++) {
    simulation.tick()
  }

  // Send the updated nodes back to the main thread
  self.postMessage(
    simulationNodes.map((node) => ({
      id: node.id,
      data: node.data,
      position: { x: node.x, y: node.y },
    }))
  )
}
