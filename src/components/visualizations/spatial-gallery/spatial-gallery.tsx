'use client'

import * as THREE from 'three'
import { forwardRef, Suspense, useEffect, useRef, useState } from 'react'
import {
  Canvas,
  useFrame,
  extend,
  useLoader,
  useGraph,
} from '@react-three/fiber'
import {
  useCursor,
  MeshReflectorMaterial,
  Text,
  Environment,
  View,
  Html,
  useTexture,
  Image,
  Preload,
} from '@react-three/drei'
// import Image from 'next/image'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { easing, geometry } from 'maath'

extend(THREE)
extend(geometry)
extend({ RoundedPlaneGeometry: geometry.RoundedPlaneGeometry })

// import { View } from '@/components/3d/canvas/View'

extend({ RoundedPlaneGeometry: geometry.RoundedPlaneGeometry })

const GOLDENRATIO = 1.61803398875

export const SpatialGallery = ({ items }: any) => {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
      <Suspense fallback={null}>
        <color attach='background' args={['#191920']} />
        <fog attach='fog' args={['#191920', 0, 15]} />
        <group position={[0, -0.5, 0]}>
          <Frames items={items} />

          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              mirror={0.75}
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
        <Environment preset='city' />

        <Preload all />
      </Suspense>
    </Canvas>
  )
}

function Frames({
  items,
  q = new THREE.Quaternion(),
  p = new THREE.Vector3(),
}) {
  const ref: any = useRef()
  const clicked: any = useRef()

  // const [, params] = useRoute('/item/:id')
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    clicked.current = ref?.current?.getObjectByName(params?.id)
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true)
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25))
      clicked.current.parent.getWorldQuaternion(q)
    } else {
      p.set(0, 0, 5.5)
      q.identity()
    }
  })

  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.4, dt)
    easing.dampQ(state.camera.quaternion, q, 0.4, dt)
  })

  const handleClick = (e) => {
    e.stopPropagation()
    router.push(
      clicked.current === e.object ? '/history' : '/item/' + e.object.id
    )
  }
  const handleHistory = () => {
    router.push('/history')
  }

  return (
    <group ref={ref} onClick={handleClick} onPointerMissed={handleHistory}>
      {items?.length
        ? items.map(
            (item: any) => <Frame key={item.id} item={item}  /> /* prettier-ignore */
          )
        : null}
    </group>
  )
}

// const MyImage = ({ url, ...props }: any) => {
//   const texture: any = useTexture(url)
//   console.log('texture: ', texture)

//   // useFrame((state, delta) => (scene.rotation.y += delta))
//   return (
//     <View>
//       <primitive object={texture} position={[0, 0, 0.7]} {...props} />
//       {/* @ts-ignore */}
//       {/* <Image position={[0, 0, 0.7]} ref={ref} texture={texture} /> */}
//     </View>
//   )
// }

// extend({ MyImage })

function Frame({ item, c = new THREE.Color(), ...props }) {
  const { position, rotation, ...rest } = item
  const image = useRef()
  const frame: any = useRef()
  const params = useParams()
  // const { imageUrl } = useRemoteImage(item?.photo.url)
  // console.log('imageUrl: ', imageUrl)

  const [hovered, hover] = useState(false)
  const [rnd] = useState(() => Math.random())
  const name = item.name
  const isActive = params === item.id
  const proxyUrl = `/api/image?imageUrl=${item?.photo.url}`
  const texture: any = useTexture(proxyUrl)

  useFrame((state, dt) => {
    // image.current.material.zoom = 2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
    // easing.damp3(image.current.scale, [0.85 * (!isActive && hovered ? 0.85 : 1), 0.9 * (!isActive && hovered ? 0.905 : 1), 1], 0.1, dt)
    easing.dampC(
      frame.current.material.color,
      hovered ? 'orange' : 'white',
      0.1,
      dt
    )
  })

  // useCursor(hovered)
  /* The `useFrame` hook in the provided code snippet is used to perform animations and updates on each
 frame rendered by the Three.js scene. Let's break down the code inside the `useFrame` hook: */
  // useFrame((state, dt) => {
  //   console.log('state: ', state)
  //   console.log('image: ', image)
  //   if (image?.current && frame?.current) {
  //     image.current.material.zoom =
  //       2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
  //     easing.damp3(
  //       image.current.scale,
  //       [
  //         0.85 * (!isActive && hovered ? 0.85 : 1),
  //         0.9 * (!isActive && hovered ? 0.905 : 1),
  //         1,
  //       ],
  //       0.1,
  //       dt
  //     )
  //     easing.dampC(
  //       frame.current.material.color,
  //       hovered ? 'orange' : 'white',
  //       0.1,
  //       dt
  //     )
  //   }
  // })

  return (
    <group rotation={rotation} position={position}>
      <mesh
        name={item.id}
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
          ref={frame}
          raycast={() => null}
          scale={[0.9, 0.93, 0.9]}
          position={[0, 0, 0.2]}
        >
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Html
          transform
          position={[0, 0, 0.7]}
          raycast={() => null}
          scale={0.1}
          occlude='blending'
        >
          <img src={proxyUrl} alt='test' height={400} width={400} />
        </Html>
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
function base64toBlob(base64Data, contentType) {
  contentType = contentType || ''
  var sliceSize = 1024
  var byteCharacters = atob(base64Data)
  var bytesLength = byteCharacters.length
  var slicesCount = Math.ceil(bytesLength / sliceSize)
  var byteArrays = new Array(slicesCount)

  for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    var begin = sliceIndex * sliceSize
    var end = Math.min(begin + sliceSize, bytesLength)

    var bytes = new Array(end - begin)
    for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0)
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes)
  }
  return new Blob(byteArrays, { type: contentType })
}
