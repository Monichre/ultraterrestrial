import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  OrbitControls,
  PerspectiveCamera,
  SpotLight,
  Environment,
  MeshReflectorMaterial,
} from '@react-three/drei'
import { PLYLoader } from './loader'
import { MeshLambertMaterial } from 'three'

export const AngelModel = () => {
  const [model, setModel] = React.useState()

  React.useEffect(() => {
    // @ts-ignore
    const loader = new PLYLoader()
    // @ts-ignore
    loader.load('/threeJS/models/Lucy100k.ply', (geometry: any) => {
      geometry.scale(0.0024, 0.0024, 0.0024)
      geometry.computeVertexNormals()
      setModel(geometry)
    })
  }, [])

  return model ? (
    <mesh
      geometry={model}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0.8, 0]}
      castShadow
      receiveShadow
    >
      <MeshLambertMaterial />
    </mesh>
  ) : null
}

export const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.1} />
      <SpotLight
        position={[2.5, 5, 2.5]}
        angle={Math.PI / 6}
        penumbra={1}
        intensity={100}
        castShadow
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={10}
          depthScale={1.2}
          minDepthThreshold={0.4}
          color='#101010'
          metalness={0.5}
        />
      </mesh>
      <AngelModel />
    </>
  )
}

export const LightRoom = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [7, 4, 1], fov: 40 }}
      style={{ width: '100vw', height: '100vh' }}
    >
      <color attach='background' args={['black']} />
      <fog attach='fog' args={['white', 10, 20]} />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <OrbitControls
        minDistance={2}
        maxDistance={10}
        maxPolarAngle={Math.PI / 2}
      />
      <Environment preset='city' />
    </Canvas>
  )
}
