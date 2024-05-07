'use client'

import React, { Suspense, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'

import { TimeOverlay } from './time-overlay'
import './3d-scroll-through.css'
import Model from '@/components/3d/3d-scroll-through/model'
export interface ThreeDScrollThroughProps {
  events: any
  years: string[]
  keyFigures: any
}

export const ThreeDScrollThrough: React.FC<ThreeDScrollThroughProps> = ({
  events,
  years,
  keyFigures,
}: ThreeDScrollThroughProps) => {
  const overlay: any = useRef()
  const caption: any = useRef()
  const scroll: any = useRef(0)
  const sourceRef: any = useRef()
  console.log('sourceRef: ', sourceRef)

  console.log({ scroll })

  useEffect(() => {
    if (document) {
      sourceRef.current = document.getElementById('threeD-scroll-through')
    }
  }, [])

  return (
    <div id='threeD-scroll-through' className='h-[100vh]'>
      <Canvas shadows eventSource={sourceRef} eventPrefix='client'>
        <ambientLight intensity={1} />
        <Suspense fallback={null}>
          <Model scroll={scroll} />
          <Environment preset='city' />
        </Suspense>
      </Canvas>
      <TimeOverlay ref={overlay} caption={caption} scroll={scroll} />
    </div>
  )
}
