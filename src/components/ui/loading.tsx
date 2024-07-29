'use client'

import * as React from 'react'

import { BackgroundGlobe } from './globe/background-globe'

export const Loading = () => (
  <div className='h-screen w-screen flex flex-col justify-center'>
    <BackgroundGlobe />
  </div>
)
