'use client'
// components/Globe.js
import React, { useRef, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'

const EarthShader = {
  uniforms: {
    texture: { type: 't', value: null },
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec2 vUv;
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.05 );
      vNormal = normalize( normalMatrix * normal );
      vUv = uv;
    }
  `,
  fragmentShader: `
    uniform sampler2D texture;
    varying vec3 vNormal;
    varying vec2 vUv;
    void main() {
      vec3 diffuse = texture2D( texture, vUv ).xyz;
      float intensity = 1.05 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) );
      vec3 atmosphere = vec3( 0, 1.0, 1.0 ) * pow( intensity, 3.0 );
      gl_FragColor = vec4( diffuse + atmosphere, 0.3 );
    }
  `,
}

const AtmosphereShader = {
  uniforms: {},
  vertexShader: `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize( normalMatrix * normal );
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 0 );
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    void main() {
      float intensity = pow( 0.8 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 12.0 );
      gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 ) * intensity;
    }
  `,
}

function Globe() {
  const earthRef: any = useRef()
  const atmosphereRef: any = useRef()
  const texture = useLoader(
    THREE.TextureLoader,
    'https://cdn.rawgit.com/dataarts/webgl-globe/2d24ba30/globe/world.jpg'
  )

  useFrame(() => {
    if (earthRef.current && atmosphereRef.current) {
      earthRef.current.rotation.y += 0.005
      atmosphereRef.current.rotation.y += 0.005
    }
  })

  return (
    <>
      <mesh ref={earthRef}>
        <sphereBufferGeometry args={[200, 40, 30]} />
        <shaderMaterial
          uniforms={{ texture: { value: texture } }}
          vertexShader={EarthShader.vertexShader}
          fragmentShader={EarthShader.fragmentShader}
          transparent={true}
        />
      </mesh>
      <mesh ref={atmosphereRef} scale={[1.1, 1.1, 1.1]}>
        <sphereBufferGeometry args={[200, 40, 30]} />
        <shaderMaterial
          vertexShader={AtmosphereShader.vertexShader}
          fragmentShader={AtmosphereShader.fragmentShader}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          transparent={true}
        />
      </mesh>
    </>
  )
}

function colorFn(x: number) {
  const c = new THREE.Color()
  c.setHSL(0.441 + x / 2, 0.6, 0.75)
  return c
}

function Point({ position, scale, color }: any) {
  const meshRef: any = useRef()

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.lookAt(new THREE.Vector3(0, 0, 0))
    }
  }, [])

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxBufferGeometry args={[0.75, 0.75, 1]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}

function DataPoints({ data }: any) {
  return (
    <>
      {data.map(
        ([lat, lng, size]: any, index: React.Key | null | undefined) => {
          const phi = ((90 - lat) * Math.PI) / 180
          const theta = ((180 - lng) * Math.PI) / 180

          const x = 200 * Math.sin(phi) * Math.cos(theta)
          const y = 200 * Math.cos(phi)
          const z = 200 * Math.sin(phi) * Math.sin(theta)

          const position = [x, y, z]
          const scaleZ = Math.max(size * 200, 0.1)
          const color = colorFn(size)

          return (
            <Point
              position={position}
              scale={[1, 1, scaleZ]}
              color={color}
              key={index}
            />
          )
        }
      )}
    </>
  )
}

export function CodePenEarth() {
  const [data, setData]: any = useState(null)

  useEffect(() => {
    // Fetch data
    fetch(
      'https://cdn.rawgit.com/dataarts/webgl-globe/2d24ba30/globe/population909500.json'
    )
      .then((response) => response.json())
      .then((jsonData) => {
        // Process data
        const processedData: any = []
        jsonData.forEach((item: [any, any]) => {
          const [name, values] = item
          for (let i = 0; i < values.length; i += 3) {
            const lat = values[i]
            const lng = values[i + 1]
            const size = values[i + 2]
            processedData.push([lat, lng, size])
          }
        })
        setData(processedData)
      })
  }, [])

  return (
    <Canvas camera={{ position: [0, 0, 1000], fov: 30 }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <Globe />
        {data && <DataPoints data={data} />}
      </Suspense>
      <OrbitControls />
      <Stars />
    </Canvas>
  )
}
