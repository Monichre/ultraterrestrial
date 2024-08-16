'use client'

import { forwardRef, Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Bloom, TiltShift2 } from '@react-three/postprocessing'
import { mergeRefs } from 'react-merge-refs'
import { easing } from 'maath'

// useGLTF.preload('/assets/moon/moon.glb')
export const MoonScene = ({ offset = 0, ...props }: any) => {
  const meshRef: any = useRef()
  const light: any = useRef()
  // const moonRef = mergeRefs([meshRef, ref])

  const { nodes, materials }: any = useGLTF('/assets/moon/moon.glb')
  console.log('nodes: ', nodes)

  /* The commented out code block you provided is using the `useFrame` hook from `@react-three/fiber` to
update the rotation of the `meshRef` and `light` elements in the scene. */
  useFrame((state, delta) => {
    // easing.dampE(
    //   meshRef.current.rotation,
    //   [Math.PI / 2 + offset / 2, 3, Math.PI + offset],
    //   0.4,
    //   delta
    // )
    // easing.dampE(
    //   light.current.rotation,
    //   [1, offset * Math.PI * 3, offset],
    //   0.4,
    //   delta
    // )
    return (meshRef.current.rotation.y += delta / 10)
  })
  return (
    <group {...props} dispose={null}>
      <mesh
        ref={meshRef}
        geometry={nodes['Sphere001_Material_#39_0'].geometry}
        material={materials.Material_39}
        material-normalScale={1.5}
        scale={0.04}
      />
      <group ref={light}>
        <spotLight
          position={[10, 0, -10]}
          intensity={1.75}
          angle={0.15}
          penumbra={1}
        />
      </group>
    </group>
  )
}

export interface MoonProps {}

export const Moon: React.FC<MoonProps> = (props: MoonProps) => {
  // 1, 0, -0.25
  return (
    <Canvas gl={{ antialias: false }}>
      {/* <color attach='background' args={['#101015']} /> */}
      {/* <PerspectiveCamera makeDefault position={[0, -0.5, 5]} fov={50} /> */}
      <ambientLight intensity={0.01} />
      <directionalLight intensity={5} position={[1, 5, -2]} />
      <Suspense fallback={null}>
        <MoonScene />
      </Suspense>
      <EffectComposer enableNormalPass={false}>
        <Bloom mipmapBlur luminanceThreshold={0.5} />
        <TiltShift2 blur={0.35} />
      </EffectComposer>
    </Canvas>
  )
}
