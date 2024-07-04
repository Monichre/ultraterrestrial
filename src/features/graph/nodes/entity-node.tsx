/* eslint-disable react/display-name */
'use client'
import * as React from 'react'
import { memo, useCallback, useEffect } from 'react'

import { ThreeDPinCard } from '@/features/3d/3d-pin'
import {
  Handle,
  Position,
  useHandleConnections,
  useNodesData,
  useUpdateNodeInternals,
} from '@xyflow/react'

import {
  DotGridBackground,
  DotGridBackgroundBlack,
} from '@/components/ui/backgrounds'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AnimatePresence, motion } from 'framer-motion'

interface Photo {
  id: string
  name: string
  mediaType: string
  enablePublicUrl: boolean
  signedUrlTimeout: number
  uploadUrlTimeout: number
  size: number
  version: number
  url: string
}

interface DinkyCardProps {
  data: {
    date: string
    description: string
    latitude: number
    location: string
    longitude: number
    photos: Photo[]
    name: string
    color: string
    type: string
    label: string
    fill: string
  }
}

const DinkyCard: React.FC<DinkyCardProps> = ({ data, ...rest }) => {
  const {
    date,
    description,
    latitude,
    location,
    longitude,
    photos,
    name,
    color,
    type,
    label,
    fill,
  } = data

  return (
    <Card
      className='bg-card relative overflow-hidden entity-node min-w-[400px] w-auto max-w-[600px]'
      style={{ borderColor: color }}
      {...rest}
    >
      <DotGridBackgroundBlack />
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 relative z-20'>
        {label}
      </CardHeader>
      <CardContent className='relative z-20'>
        <div className='text-2xl font-bold'>{name}</div>
        {/* <p className='text-xs text-muted-foreground text-white'>
          {description}
        </p> */}

        {/* <img src={photos[0].url} alt={photos[0].name} className='mt-2' /> */}

        <div className='mt-2'>
          <p>Date: {new Date(date).toLocaleDateString()}</p>
          <p>Location: {location}</p>
          <p>
            Coordinates: {latitude}, {longitude}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

const EN = memo((props: any) => {
  const updateNodeInternals = useUpdateNodeInternals()
  updateNodeInternals(props.id)
  return (
    <>
      <Handle type='target' position={Position.Top} />

      <DinkyCard {...props} key={props.id} />
    </>
  )
})

export const EntityNode = memo(EN)
