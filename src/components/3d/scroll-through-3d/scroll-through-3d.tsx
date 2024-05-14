'use client'

import React, { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'

import { Overlay } from './overlay'
import { Model } from './model'
import './scroll-through-3d.css'

export interface ThreeDScrollThroughProps {
  events: any
  years: string[]
  keyFigures: any
}

export const ScrollThrough3D: React.FC<ThreeDScrollThroughProps> = ({
  events,
  years,
  keyFigures,
}: ThreeDScrollThroughProps) => {
  const sourceRef: any = useRef()
  const overlay: any = useRef()
  const scroll: any = useRef(0)

  return (
    <div id='threeD-scroll-through' className='h-[100vh]' ref={sourceRef}>
      <Canvas shadows eventSource={sourceRef.current} eventPrefix='client'>
        <ambientLight intensity={1} />
        <Suspense fallback={null}>
          <Model scroll={scroll} />

          <Environment preset='city' />
        </Suspense>
      </Canvas>
      <Overlay ref={overlay} scroll={scroll} />
    </div>
  )
}
