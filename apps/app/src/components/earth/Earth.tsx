'use client'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { memo, Suspense, useRef } from 'react'

import { motion } from 'framer-motion-3d'
import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

const RotatingComponent = memo( ( { spin, activeLocation }: any ) => {
  console.log( 'activeLocation: ', activeLocation )
  const earthRef: any = useRef<THREE.Mesh>( null! )

  useFrame( ( state, delta ) => {
    console.log( 'state: ', state )
    if ( spin ) {
      return ( earthRef.current.rotation.y += delta / 10 )
    }
  } )

  const [color, normal, aoMap] = useLoader( TextureLoader, [
    '/assets/earth2/color.jpg',
    '/assets/earth2/normal.png',
    '/assets/earth2/occlusion.jpg',
  ] )

  return (
    <motion.mesh scale={2.5} ref={earthRef} rotation-y={0.5}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap} />
    </motion.mesh>
  )
} )
RotatingComponent.displayName = 'RotatingComponent'

const E = ( { activeLocation, ref }: any ) => {
  return (
    <div ref={ref} className='h-full w-full'>

      <Suspense
        fallback={
          <img
            alt='earth2'
            src='/assets/earth2/placeholder.png'
            width={1000}
            height={1000}
          />
        }
      >
        <Canvas>
          <ambientLight intensity={0.1} />
          <directionalLight intensity={3.5} position={[1, 0, -0.25]} />

          <RotatingComponent spin activeLocation={activeLocation} />
        </Canvas>
      </Suspense>
    </div>
  )
}


export const Earth = memo( E )
export const EN = ( { ref, ...rest }: any ) => {
  // useFrame((state, delta) => {
  //   return (earthRef.current.rotation.y += delta / 10)
  // })

  const [color, normal, aoMap] = useLoader( TextureLoader, [
    '/8k_earth_nightmap.jpeg',
    // '/assets/earth/textures/lambert6_baseColor.png',
    // '/assets/earth/textures/phong1_baseColor.jpeg',
    // '/assets/earth/textures/phong1_emissive.jpeg',
    // '/assets/scenes/earth/textures/Material_50_baseColor.jpeg',
    // '/assets/scenes/earth/textures/Material_50_emissive.jpeg',
    // '/assets/scenes/earth/textures/Material_50_metallicRoughness.png',
    // '/assets/scenes/earth/textures/Material_50_normal.png',
    // '/assets/scenes/earth/textures/Material_62_baseColor.png',
    // '/assets/scenes/earth/textures/Material_62_emissive.jpeg',
  ] )

  return (
    <Canvas fallback={<img alt='earth2' src='/assets/earth2/placeholder.png' width={1000} height={1000} />} ref={ref}>
      <ambientLight intensity={0.1} />
      <directionalLight intensity={3.5} position={[1, 0, -0.25]} />

      <motion.mesh scale={2.5} ref={ref}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap} />
      </motion.mesh>
    </Canvas>
  )
}

export const EarthAtNight = memo( EN )
