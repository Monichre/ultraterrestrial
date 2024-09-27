'use client'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { forwardRef, Suspense, useRef } from 'react'

import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { motion } from 'framer-motion-3d'
import * as THREE from 'three'

const RotatingComponent = ({ spin }: any) => {
  const earthRef: any = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => {
    if (spin) {
      return (earthRef.current.rotation.y += delta / 10)
    }
  })

  const [color, normal, aoMap] = useLoader(TextureLoader, [
    '/assets/earth2/color.jpg',
    '/assets/earth2/normal.png',
    '/assets/earth2/occlusion.jpg',
  ])

  return (
    <motion.mesh scale={2.5} ref={earthRef} rotation-y={0.5}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap} />
    </motion.mesh>
  )
}
export const Earth = forwardRef((props: any, ref: any) => {
  return (
    <Canvas ref={ref}>
      <ambientLight intensity={0.1} />
      <directionalLight intensity={3.5} position={[1, 0, -0.25]} />
      <Suspense
        fallback={() => (
          <Image
            alt='earth2'
            src='/assets/earth2/placeholder.png'
            width={1000}
            height={1000}
          />
        )}
      >
        <RotatingComponent spin />
      </Suspense>
    </Canvas>
  )
})
