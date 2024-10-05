import { quadtree } from 'd3-quadtree'

export function collide() {
  let nodes: { measured: { width: number }; x: number; y: number }[] = []
  let force: any = (alpha: number) => {
    const tree = quadtree(
      nodes,
      (d: { x: any }) => d.x,
      (d: { y: any }) => d.y
    )

    for (const node of nodes) {
      const r = node.measured.width / 2
      const nx1 = node.x - r
      const nx2 = node.x + r
      const ny1 = node.y - r
      const ny2 = node.y + r

      tree.visit(
        (quad: any, x1: number, y1: number, x2: number, y2: number) => {
          if (!quad.length) {
            do {
              if (quad?.data !== node) {
                const r = node.measured.width / 2 + quad.data.width / 2
                let x = node.x - quad.data.x
                let y = node.y - quad.data.y
                let l = Math.hypot(x, y)

                if (l < r) {
                  l = ((l - r) / l) * alpha
                  node.x -= x *= l
                  node.y -= y *= l
                  quad.data.x += x
                  quad.data.y += y
                }
              }
            } while ((quad = quad.next))
          }

          return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1
        }
      )
    }
  }

  force.initialize = (newNodes: never[]) => (nodes = newNodes)

  return force
}

export default collide
