'use client'
import * as THREE from 'three'
import { DOMAIN_MODEL_COLORS } from '@/utils/colors'
import { useEffect, useRef, useState } from 'react'
import { useModelNodes } from './useModelNodes'
import {
  GraphCanvas,
  GraphEdge,
  GraphNode,
  lightTheme,
  useSelection,
} from 'reagraph'

import { TopicPersonnelAndEventGraphDataPayload } from '@/lib/xata'
import {
  MeshReflectorMaterial,
  Image,
  Text,
  Environment,
} from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { easing } from 'maath'
// function Scene({ children, ...props }) {
//   const ref = useRef()
//   const scroll = useScroll()
//   const [hovered, hover] = useState(null)
//   useFrame((state, delta) => {
//     ref.current.rotation.y = -scroll.offset * (Math.PI * 2) // Rotate contents
//     state.events.update() // Raycasts every frame rather than on pointer-move
//     easing.damp3(state.camera.position, [-state.pointer.x * 2, state.pointer.y * 2 + 4.5, 9], 0.3, delta)
//     state.camera.lookAt(0, 0, 0)
//   })
//   return (
//     <group ref={ref} {...props}>
//       <Cards category="spring" from={0} len={Math.PI / 4} onPointerOver={hover} onPointerOut={hover} />
//       <Cards category="summer" from={Math.PI / 4} len={Math.PI / 2} position={[0, 0.4, 0]} onPointerOver={hover} onPointerOut={hover} />
//       <Cards category="autumn" from={Math.PI / 4 + Math.PI / 2} len={Math.PI / 2} onPointerOver={hover} onPointerOut={hover} />
//       <Cards category="winter" from={Math.PI * 1.25} len={Math.PI * 2 - Math.PI * 1.25} position={[0, -0.4, 0]} onPointerOver={hover} onPointerOut={hover} />
//       <ActiveCard hovered={hovered} />
//     </group>
//   )
// }

// function Cards({ category, data, from = 0, len = Math.PI * 2, radius = 5.25, onPointerOver, onPointerOut, ...props }) {
//   const [hovered, hover] = useState(null)
//   const amount = Math.round(len * 22)
//   const textPosition = from + (amount / 2 / amount) * len
//   return (
//     <group {...props}>
//       <Billboard position={[Math.sin(textPosition) * radius * 1.4, 0.5, Math.cos(textPosition) * radius * 1.4]}>
//         <Text font={suspend(inter).default} fontSize={0.25} anchorX="center" color="black">
//           {category}
//         </Text>
//       </Billboard>
//       {Array.from({ length: amount - 3 /* minus 3 images at the end, creates a gap */ }, (_, i) => {
//         const angle = from + (i / amount) * len
//         return (
//           <Card
//             key={angle}
//             onPointerOver={(e) => (e.stopPropagation(), hover(i), onPointerOver(i))}
//             onPointerOut={() => (hover(null), onPointerOut(null))}
//             position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]}
//             rotation={[0, Math.PI / 2 + angle, 0]}
//             active={hovered !== null}
//             hovered={hovered === i}
//             url={`/img${Math.floor(i % 10) + 1}.jpg`}
//           />
//         )
//       })}
//     </group>
//   )
// }

// function Card({ url, active, hovered, ...props }) {
//   const ref = useRef()
//   useFrame((state, delta) => {
//     const f = hovered ? 1.4 : active ? 1.25 : 1
//     easing.damp3(ref.current.position, [0, hovered ? 0.25 : 0, 0], 0.1, delta)
//     easing.damp3(ref.current.scale, [1.618 * f, 1 * f, 1], 0.15, delta)
//   })
//   return (
//     <group {...props}>
//       <Image ref={ref} url={url} scale={[1.618, 1, 1]} side={THREE.DoubleSide} />
//     </group>
//   )
// }

// function ActiveCard({ hovered, ...props }) {
//   const ref = useRef()
//   const name = useMemo(() => generate({ exactly: 2 }).join(' '), [hovered])
//   useLayoutEffect(() => void (ref.current.material.zoom = 0.8), [hovered])
//   useFrame((state, delta) => {
//     easing.damp(ref.current.material, 'zoom', 1, 0.5, delta)
//     easing.damp(ref.current.material, 'opacity', hovered !== null, 0.3, delta)
//   })
//   return (
//     <Billboard {...props}>
//       <Text font={suspend(inter).default} fontSize={0.5} position={[2.15, 3.85, 0]} anchorX="left" color="black">
//         {hovered !== null && `${name}\n${hovered}`}
//       </Text>
//       <Image ref={ref} transparent position={[0, 1.5, 0]} url={`/img${Math.floor(hovered % 10) + 1}.jpg`}>
//         <roundedPlaneGeometry parameters={{ width: 3.5, height: 1.618 * 3.5 }} args={[3.5, 1.618 * 3.5, 0.2]} />
//       </Image>
//     </Billboard>
//   )
// }
const GOLDENRATIO = 1.61803398875
export const GraphNodeImageCard = ({
  c = new THREE.Color(),
  node,
  ...props
}: any) => {
  const { id, data, fill, label } = node
  const url = data?.photos && data.photos?.length ? data.photos[0].url : ''
  console.log('url: ', url)

  const ref = useRef()

  const name = label

  // useFrame((state, dt) => {
  //   image.current.material.zoom =
  //     2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
  //   easing.damp3(
  //     image.current.scale,
  //     [
  //       0.85 * (!isActive && hovered ? 0.85 : 1),
  //       0.9 * (!isActive && hovered ? 0.905 : 1),
  //       1,
  //     ],
  //     0.1,
  //     dt
  //   )
  //   easing.dampC(
  //     frame.current.material.color,
  //     hovered ? 'orange' : 'white',
  //     0.1,
  //     dt
  //   )
  // })
  return (
    <group>
      <mesh>
        <boxGeometry />
        <meshStandardMaterial
          color='#151515'
          metalness={0.5}
          roughness={0.5}
          envMapIntensity={2}
        />
        <mesh scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image url={url} />
      </mesh>
      <Text
        maxWidth={0.1}
        anchorX='left'
        anchorY='top'
        position={[0.55, GOLDENRATIO, 0]}
        fontSize={0.025}
      >
        {name.split('-').join(' ')}
      </Text>
    </group>
  )
}

export interface GraphProps {
  models: TopicPersonnelAndEventGraphDataPayload
}

export const Graph: React.FC<GraphProps> = ({ models }) => {
  const { nodes, edges } = useModelNodes({ models })
  const ref: any = useRef()
  const {
    selections,
    actives,
    onNodeClick,
    onCanvasClick,
    onNodePointerOver,
    onNodePointerOut,
  } = useSelection({
    ref,
    nodes,
    edges,
    pathHoverType: 'all',
  })

  useEffect(() => {
    if (ref?.current) {
      console.log('ref?.current: ', ref?.current)
      // ref.current.theme.canvas.background = 'rgba(255,255,255, 0.1)'
    }
  }, [ref.current])

  if (
    window &&
    window?.document &&
    window.navigator &&
    nodes?.length &&
    edges?.length
  ) {
    return (
      <div id='graph-canvas'>
        {/* <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
    <color attach="background" args={['#191920']} />
    <fog attach="fog" args={['#191920', 0, 15]} />
    <group position={[0, -0.5, 0]}>
      <Frames images={images} />
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={80}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.5}
        />
      </mesh>
    </group>
    <Environment preset="city" /> */}

        <GraphCanvas
          ref={ref}
          theme={{
            ...lightTheme,
            canvas: {
              background: undefined,
              fog: lightTheme?.canvas?.fog,
            },
          }}
          sizingType='centrality'
          selections={selections}
          edgeArrowPosition='none'
          actives={actives}
          onNodePointerOver={onNodePointerOver}
          onNodePointerOut={onNodePointerOut}
          edgeInterpolation='curved'
          defaultNodeSize={10}
          nodes={nodes}
          edges={edges}
          clusterAttribute='type'
          draggable
          layoutType='forceDirected3d'
          renderNode={({ size, color, opacity }) => {
            return (
              <group>
                <mesh castShadow receiveShadow>
                  <sphereGeometry args={[20, 20, 20]} />
                  <meshStandardMaterial
                    attach='material'
                    color={color}
                    opacity={opacity}
                    transparent
                  />
                </mesh>
              </group>
            )

            // <GraphNodeImageCard {...props} />
          }}
          // clusterAttribute='type'
        >
          <directionalLight position={[0, 5, -4]} intensity={1} />
        </GraphCanvas>
      </div>
      // </Canvas>
    )
  } else {
    return null
  }
}
