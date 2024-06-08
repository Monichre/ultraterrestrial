import type { NetworkGraphPayload } from "@/lib/xata"
import { useState, useEffect } from "react"

type EntityGraphSchema = {
nodes: Node
}

export type GraphState = {
   root: {
      nodes: [],
      links: {},
    },
    events: {
      nodes: [],
      links: {},
    },
    testimonies: {
      nodes: [],
      links: {},
    },
    personnel: {
      nodes: [],
      links: {},
    },
    topics: {
      nodes: [],
      links: {},
    },
}

export type UseGraphProps = {
  allEntityGraphData: NetworkGraphPayload['graphData']
}

export const use3DGraph = ({allEntityGraphData}: UseGraphProps) => {
    const [graph, setGraph] = useState({
    root: {
      nodes: [],
      links: {},
    },
    events: {
      nodes: [],
      links: {},
    },
    testimonies: {
      nodes: [],
      links: {},
    },
    personnel: {
      nodes: [],
      links: {},
    },
    topics: {
      nodes: [],
      links: {},
    },
  })

  useEffect(() => {
    const data: any = {
      root: {
        nodes: [],
        links: {},
      },
      events: {
        nodes: [],
        links: {},
      },
      testimonies: {
        nodes: [],
        links: {},
      },
      personnel: {
        nodes: [],
        links: {},
      },
      topics: {
        nodes: [],
        links: {},
      },
    }
    if (allEntityGraphData.nodes?.length) {
      const rootNodes = allEntityGraphData.nodes.filter(
        (node: { id: string | string[] }) => node?.id.includes('root')
      )
      const restOfNodes = allEntityGraphData.nodes.filter(
        (node: any) => !rootNodes.includes(node)
      )

      rootNodes.forEach((rootNode: any) => {
        const childNodes = restOfNodes.filter(
          (node) => node.data.type === rootNode.data.type
        )

        const rootNodeWithLinks = {
          ...rootNode,
          childNodes,
          connectedTo: [],
        }
        data.root.nodes.push(rootNodeWithLinks)
        data.root.links[rootNode.id] = {
          connectedTo: childNodes,
        }
      })

      restOfNodes.forEach((node: any) => {
        let childNodes = allEntityGraphData.links.filter(
          (link: { source: any }) => link.source === node.id
        )
        let nodeWithLinks = {
          ...node,
          childNodes,
        }
        data[node.data.type].nodes.push(nodeWithLinks)

        data[node.data.type].links[node.id] = {
          connectedTo: childNodes,
        }
      })

      setGraph(data)
    }
  }, [allEntityGraphData.links, allEntityGraphData.nodes])

return {graph}
}