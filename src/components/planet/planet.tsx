'use client'

import { a, useSpring } from '@react-spring/three'
import { useTexture } from '@react-three/drei'
import { Shader } from '../shader'
import { useRef, useState, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

const Sphere = ({
  normal,
  map,
  reference,
  position,
  scale,
}: {
  normal: any
  map: any
  reference: any
  position: any
  scale: any
}) => (
  <a.mesh position={position} scale={scale} ref={reference}>
    <sphereGeometry args={[0.5, 128, 128]} />
    <meshStandardMaterial wireframe={false} normalMap={normal} map={map} />
  </a.mesh>
)

const PlanetModel = ({
  model,
  reference,
  position,
  rotation,
  scale,
}: {
  model: any
  reference: any
  position: any
  rotation: any
  scale: any
}) => (
  <a.mesh position={position} ref={reference} rotation={rotation} scale={scale}>
    <primitive object={model} />
  </a.mesh>
)

const Planet = ({
  position,
  scale,
  model,
  animate,
  reference,
  text,
  map,
  rotation,
  img,
}: {
  position: any
  scale: any
  model: any
  animate: any
  reference: any
  text: any
  map: any
  rotation: any
  img: any
}) => {
  const [normal, roughness] = useTexture([
    '/textures/normal.jpg',
    '/textures/roughness.png',
  ])

  const props = useSpring({ scale: animate ? scale : scale * 0.25 })

  // useFrame(() => {
  //   reference.current.rotation.y += text === 'Venus' ? -0.0009 : 0.0009
  // })

  return (
    <Sphere
      normal={normal}
      map={map}
      reference={reference}
      position={position}
      scale={props.scale}
    />
  )
}

/* <Shader reference={reference} position={position} img={img} /> */

// let content

// switch (text) {
//   case 'Saturn':
//     content = (
//       <PlanetModel
//         model={model}
//         reference={reference}
//         position={position}
//         rotation={rotation}
//         scale={props.scale}
//       />
//     )
//     break
//   case 'Pluto':
//     content = <Shader reference={reference} position={position} img={img} />
//     break
//   default:
//     const normalMap = text === 'Earth' ? normal : null
//     content = (
//       <Sphere
//         normal={normalMap}
//         map={map}
//         reference={reference}
//         position={position}
//         scale={props.scale}
//       />
//     )

//Return the actual

export const Earth = () => {
  const [earth, venus, mars] = useTexture([
    '/textures/earth.jpeg',
    '/textures/venus.png',

    '/textures/mars.jpeg',
  ])

  const earthProps: any = {
    id: 3,
    text: 'Earth',
    position: [30, 0, 0],
    scale: 3,
    rotation: [0, -20, 0],
    boundingBox: [0.3, 0.25, 0.5],
    para: "Earth—our home planet—is the only place we know of so far that's inhabited by living things. It's also the only planet in our solar system with liquid water on the surface.",
    lengthOfYear: '365.25 Earth Days',
    distanceFromSun: 1,
    numberOfMoon: 1,
    map: earth,
    img: '/earth.jpg',
  }
  return <Planet {...earthProps} />
}
