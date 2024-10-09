'use client'

import { useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Bloom, EffectComposer, TiltShift2 } from '@react-three/postprocessing'
<<<<<<< HEAD
import { forwardRef, memo, Suspense, useRef } from 'react'
=======
import { forwardRef, Suspense, useRef } from 'react'
>>>>>>> 1219636dfb2904c7d119f46f33e4d907b2e045aa

// useGLTF.preload('/assets/moon/moon.glb')
export const MoonScene = ( { offset = 0, ...props }: any ) => {
  const meshRef: any = useRef()
  const light: any = useRef()
<<<<<<< HEAD


  const { nodes, materials }: any = useGLTF( '/assets/moon/moon.glb' )

=======
  // const moonRef = mergeRefs([meshRef, ref])

  const { nodes, materials }: any = useGLTF( '/assets/moon/moon.glb' )
  console.log( 'nodes: ', nodes )

  /* The commented out code block you provided is using the `useFrame` hook from `@react-three/fiber` to
update the rotation of the `meshRef` and `light` elements in the scene. */
>>>>>>> 1219636dfb2904c7d119f46f33e4d907b2e045aa
  useFrame( ( state, delta ) => {

    return ( meshRef.current.rotation.y += delta / 10 )
  } )
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

export interface MoonProps { }

// Start of Selection
<<<<<<< HEAD
export const Moon = memo( ( { ref, ...rest }: any ) => {
=======
export const Moon = forwardRef<HTMLCanvasElement, MoonProps>( ( props, ref ) => {
>>>>>>> 1219636dfb2904c7d119f46f33e4d907b2e045aa
  return (
    <div className='h-full w-full' ref={ref}>
      <Canvas gl={{ antialias: false }} >
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
    </div>
  )
} )
Moon.displayName = 'Moon'
