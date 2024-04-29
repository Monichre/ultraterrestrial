'use client'

import { FC } from 'react'
import {
  ForceGraph2D,
  ForceGraph3D,
  ForceGraphVR,
  ForceGraphAR,
} from 'react-force-graph'
import { useModelNodes } from '../graph/useModelNodes'
interface Spherical3DGraphProps {
  models: any
}
function forceRadius(nodes: any, R = 1) {
  return () => {
    for (const n of nodes) {
      const r = Math.hypot(n.x, n.y, n.z)
      const u = Math.pow(r ? Math.sqrt(R / r) : 1, 0.05)
      n.x *= u
      n.y *= u
      n.z *= u
    }
  }
}

export const Spherical3DGraph: FC<Spherical3DGraphProps> = ({
  models,
}: any) => {
  const { nodes, edges } = useModelNodes({ models })
  console.log('edges: ', edges)

  // console.log('nodes: ', nodes)
  const data = {
    nodes,
    links: edges.map(({ source, target, id, ...rest }: any) => {
      console.log('rest: ', rest)
      return {
        source,
        target,
      }
    }),
  }
  const { links } = data
  console.log('links: ', links)
  return (
    <ForceGraph3D
      graphData={data}
      nodeLabel={(node) => `${node.label}`}
      // linkThreeObject={}
      // nodeThreeObjectExtend={true}
      // nodeThreeObject={(node) => {
      //   console.log('node: ', node)
      //   var geometry = new THREE.BoxGeometry()

      //   // Create a standard material
      //   var material = new THREE.MeshStandardMaterial({
      //     color: '#151515',
      //     metalness: 0.5,
      //     roughness: 0.5,
      //     envMapIntensity: 2,
      //   })

      //   // Create a mesh with the geometry and material
      //   var mesh = new THREE.Mesh(geometry, material)

      //   // Create a smaller box inside the first one
      //   var innerGeometry = new THREE.BoxGeometry()
      //   var innerMaterial = new THREE.MeshBasicMaterial({
      //     toneMapped: false,
      //     fog: false,
      //   })
      //   var innerMesh = new THREE.Mesh(innerGeometry, innerMaterial)
      //   innerMesh.scale.set(0.9, 0.93, 0.9)
      //   innerMesh.position.set(0, 0, 0.2)
      //   mesh.add(innerMesh)

      //   // Load an image texture
      //   var textureLoader = new THREE.TextureLoader()
      //   textureLoader.load(node, function (texture) {
      //     mesh.material.map = texture
      //     mesh.material.needsUpdate = true
      //   })
      //   var textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
      //   var textMesh = new THREE.Mesh(geometry, textMaterial)
      //   textMesh.position.set(0.55, 0, 0)
      //   return textMesh
      // }}
      // linkDirectionalParticles={1}
    />
  )
}
