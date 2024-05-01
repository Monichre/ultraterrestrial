'use client'

import * as THREE from 'three'
import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  useCursor,
  MeshReflectorMaterial,
  Image,
  Text,
  Environment,
} from '@react-three/drei'

import { easing } from 'maath'
import { usePathname, useRouter } from 'next/navigation'

const GOLDENRATIO = 1.61803398875

export const SpatialGallery = ({ items }: any) => {
  console.log('items: ', items)
  // Number of items
  const itemCount = 42

  // Radius of the circle
  const radius = 10
  const itemsWithSpatialLayout = items?.map((item: any, i: number) => {
    const angle = (i / itemCount) * Math.PI * 2
    // Position calculation for circular layout
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    // Each item faces towards the center (origin)
    const rotationY = angle + Math.PI
    const position = [x, 0, z]
    console.log('position: ', position)
    const rotation = [0, rotationY, 0]
    return {
      ...item,
      position,
      rotation,
    }
  })
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ fov: 70, position: [0, 2, 15] }}
      style={{ height: '100vh', width: '100vw' }}
    >
      <color attach='background' args={['#191920']} />
      <fog attach='fog' args={['#191920', 0, 15]} />
      <group position={[0, -0.5, 0]}>
        <Frames items={itemsWithSpatialLayout} />
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          {/* @ts-ignore */}
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={2048}
            mixBlur={1}
            mixStrength={80}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color='#050505'
            metalness={0.5}
          />
        </mesh>
      </group>
      {/* <Environment preset='city' /> */}
    </Canvas>
  )
}

// function Frames({
//   items,
//   q = new THREE.Quaternion(),
//   p = new THREE.Vector3(),
// }: any) {
//   console.log(items.length)
//   const middle = Math.floor(items.length / 2)
//   const [active, setActive] = useState(items[middle].id)
//   const ref: any = useRef()

//   const clicked: any = useRef()

//   const pathname = usePathname()
//   console.log('pathname: ', pathname)

//   const router = useRouter()
//   console.log('router: ', router)

//   useEffect(() => {
//     clicked.current = ref.current.getObjectByName(pathname)
//     console.log('clicked.current : ', clicked.current)
//     if (clicked.current) {
//       clicked.current.parent.updateWorldMatrix(true, true)
//       clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25))
//       clicked.current.parent.getWorldQuaternion(q)
//     } else {
//       p.set(0, 0, 5.5)
//       q.identity()
//     }
//   }, [clicked, ref])

//   useFrame((state, dt) => {
//     easing.damp3(state.camera.position, p, 0.4, dt)
//     easing.dampQ(state.camera.quaternion, q, 0.4, dt)
//   })
//   return (
//     <group
//       ref={ref}
//       onClick={(e) => {
//         e.stopPropagation()
//         console.log('e.object : ', e)
//         setActive(clicked.current === e.object ? '/' : '/item/' + e.object.id)
//       }}
//       onPointerMissed={() => setActive(items[middle].id)}
//     >
//       {items.map((item) => {
//         console.log('item: ', item)

//         return <Frame key={item.id} item={item} /> /* prettier-ignore */
//       })}
//     </group>
//   )
// }

function Frames({ items }: any) {
  const ref: any = useRef()
  const pathname = usePathname()
  console.log('pathname: ', pathname)
  const [active, setActive] = useState(items[Math.floor(items.length / 2)].id)

  const updateCameraPosition = (clickedItem: {
    parent: {
      updateWorldMatrix: (arg0: boolean, arg1: boolean) => void
      localToWorld: (arg0: THREE.Vector3) => void
      getWorldQuaternion: (arg0: THREE.Quaternion) => void
    }
  }) => {
    if (clickedItem) {
      const p = new THREE.Vector3(0, GOLDENRATIO / 2, 1.25)
      const q = new THREE.Quaternion()
      clickedItem.parent.updateWorldMatrix(true, true)
      clickedItem.parent.localToWorld(p)
      clickedItem.parent.getWorldQuaternion(q)
      return { position: p, quaternion: q }
    }
    return {
      position: new THREE.Vector3(0, 0, 5.5),
      quaternion: new THREE.Quaternion(),
    }
  }

  useFrame((state, dt) => {
    const { position, quaternion } = updateCameraPosition(
      ref.current.getObjectByName(pathname)
    )
    easing.damp3(state.camera.position, position, 0.4, dt)
    easing.dampQ(state.camera.quaternion, quaternion, 0.4, dt)
  })

  return (
    <group
      ref={ref}
      onClick={(e) => {
        e.stopPropagation()
        setActive(ref.current === e.object ? '/' : `/item/${e.object.id}`)
      }}
      onPointerMissed={() => setActive(items[Math.floor(items.length / 2)].id)}
    >
      {items.map((item: { id: any }) => (
        <Frame key={item.id} item={item} />
      ))}
    </group>
  )
}

// function Frame({ item }: any) {
//   console.log('item: ', item)

//   const { photo, name, position, rotation, ...rest }: any = item

//   const url = '/foofighters.webp' //photo?.signedUrl ||
//   console.log('url: ', url)
//   const image: any = useRef()
//   console.log('image: ', image)
//   const frame: any = useRef()

//   const [hovered, hover] = useState(false)
//   const [rnd] = useState(() => Math.random())

//   const pathname = usePathname()
//   const isActive = pathname === name

//   // useCursor(hovered)
//   // useFrame((state, dt) => {
//   //   image.current.material.zoom =
//   //     2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
//   //   easing.damp3(
//   //     image.current.scale,
//   //     [
//   //       0.85 * (!isActive && hovered ? 0.85 : 1),
//   //       0.9 * (!isActive && hovered ? 0.905 : 1),
//   //       1,
//   //     ],
//   //     0.1,
//   //     dt
//   //   )
//   //   easing.dampC(
//   //     frame.current.material.color,
//   //     hovered ? 'orange' : 'white',
//   //     0.1,
//   //     dt
//   //   )
//   // })
//   return (
//     <group position={position} rotation={rotation}>
//       <mesh
//         name={name}
//         ref={frame}
//         // onPointerOver={(e) => (e.stopPropagation(), hover(true))}
//         // onPointerOut={() => hover(false)}
//         scale={[1, GOLDENRATIO, 0.05]}
//         position={[0, GOLDENRATIO / 2, 0]}
//       >
//         <boxGeometry args={[2, 2, 2]} />
//         <meshBasicMaterial
//           color='#151515'
//           metalness={0.5}
//           roughness={0.5}
//           envMapIntensity={2}
//         />
//         <mesh
//           raycast={() => null}
//           scale={[0.9, 0.93, 0.9]}
//           position={[0, 0, 0.2]}
//         >
//           <boxGeometry />
//           <meshBasicMaterial toneMapped={false} fog={false} />
//         </mesh>
//         <Image
//           raycast={() => null}
//           ref={image}
//           position={[0, 0, 0.7]}
//           url={url}
//         />
//       </mesh>
//       <Text
//         maxWidth={0.1}
//         anchorX='left'
//         anchorY='top'
//         position={[0.55, GOLDENRATIO, 0]}
//         fontSize={0.025}
//       >
//         {name}
//       </Text>
//     </group>
//   )
// }

// function Frame({ item }: any) {
//   const { position, rotation, name, id } = item
//   const imageRef = useRef()
//   const frameRef = useRef()
//   const [hovered, setHovered] = useState(false)
//   const pathname = usePathname()
//   const isActive = pathname === name

//   useCursor(hovered)
//   return (
//     <group position={position} rotation={rotation}>
//       {/* Detailed implementation of Frame, such as mesh and hover effects, would go here */}
//       <Text
//         maxWidth={0.1}
//         anchorX='left'
//         anchorY='top'
//         position={[0.55, GOLDENRATIO, 0]}
//         fontSize={0.025}
//       >
//         {name}
//       </Text>
//     </group>
//   )
// }
function Frame({ item }) {
  const { position, rotation, name, id, photo } = item
  const imageRef = useRef()
  const frameRef = useRef()
  const [hovered, setHovered] = useState(false)
  const pathname = usePathname()
  const isActive = pathname === name

  // Change cursor on hover
  useCursor(hovered)

  // Event handlers
  const handlePointerOver = (e) => {
    e.stopPropagation()
    setHovered(true)
  }

  const handlePointerOut = () => {
    setHovered(false)
  }

  // Effect for hover interaction
  useFrame((state, dt) => {
    console.log('state: ', state)
    if (frameRef.current) {
      frameRef.current.scale.setScalar(hovered ? 1.05 : 1)
      frameRef.current.material.color.set(hovered ? '#f8f9fa' : '#151515')
    }
    if (imageRef.current) {
      imageRef.current.material.opacity = hovered ? 0.8 : 1
    }
  })

  return (
    <group position={position} rotation={rotation}>
      <mesh
        name={name}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[1, GOLDENRATIO, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}
      >
        <boxGeometry />
        <meshStandardMaterial
          color='#151515'
          metalness={0.5}
          roughness={0.5}
          envMapIntensity={2}
        />
        <mesh
          // ref={frameRef}
          raycast={() => null}
          scale={[0.9, 0.93, 0.9]}
          position={[0, 0, 0.2]}
        >
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image
          raycast={() => null}
          ref={imageRef}
          position={[0, 0, 0.7]}
          url={`https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`}
        />
      </mesh>
      {/* Text component for the name, with basic styling */}
      <Text
        maxWidth={1}
        anchorX='center'
        anchorY='middle'
        position={[0, -GOLDENRATIO / 2 - 0.1, 0.05]}
        fontSize={0.05}
        color='white'
        outlineColor='black'
        outlineWidth={0.005}
      >
        {name}
      </Text>
    </group>
  )
}
