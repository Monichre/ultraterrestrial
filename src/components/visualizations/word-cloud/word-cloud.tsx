'use client'
import * as THREE from 'three'
import { useRef, useState, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Billboard, Text, TrackballControls } from '@react-three/drei'
import { useRouter } from 'next/navigation'
// generate random words
function Word({ children, item, ...props }: any) {
  const router = useRouter()
  const color = new THREE.Color()

  const ref: any = useRef()
  const [hovered, setHovered] = useState(false)
  const over = (e: { stopPropagation: () => any }) => (
    e.stopPropagation(), setHovered(true)
  )
  const out = () => setHovered(false)
  // Change the mouse cursor on hover¨
  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = 'pointer'
    }
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [hovered])
  // Tie component to the render-loop
  useFrame(({ camera }) => {
    ref.current.material.color.lerp(
      color.set(hovered ? '#fa2720' : 'white'),
      0.1
    )
  })

  const goToPage = () => router.push(`/investigate/${item?.type}/${item?.id}`)

  const fontProps = {
    fontFamily: 'Inria Sans',
    fontSize: 1,
    letterSpacing: -0.05,
    lineHeight: 1,
  }
  return (
    <Billboard {...props}>
      <Text
        ref={ref}
        onPointerOver={over}
        onPointerOut={out}
        onClick={goToPage}
        {...fontProps}
        children={children}
      />
    </Billboard>
  )
}

function Cloud({ items, radius = 20 }) {
  const words = useMemo(() => {
    return items.map((item, idx) => {
      const phi = Math.acos(-1 + (2 * idx) / items.length)
      const theta = Math.sqrt(items.length * Math.PI) * phi
      return [
        new THREE.Vector3().setFromSpherical(
          new THREE.Spherical(radius, phi, theta)
        ),
        item.name,
      ]
    })
  }, [items, radius])

  return words.map(([pos, name], index) => (
    <Word key={index} position={pos} children={name} item={items[index]} />
  ))
}
export type WordCloudProps = {
  events: any[]
}
export const WordCloud = ({ records }: any) => {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 35], fov: 90 }}
      className='h-[100vh] wordcloud'
    >
      <fog attach='fog' args={['#202025', 0, 80]} />
      <Suspense fallback={null}>
        <group rotation={[10, 10.5, 10]}>
          <Cloud items={records} radius={30} />
        </group>
      </Suspense>
      <TrackballControls />
    </Canvas>
  )
}
