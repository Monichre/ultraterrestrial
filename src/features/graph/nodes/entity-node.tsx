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
import { MindMapEntityCard } from '@/components/ui/card/entity-card'

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

const EN = memo((props: any) => {
  const updateNodeInternals = useUpdateNodeInternals()
  updateNodeInternals(props.id)
  return (
    <>
      <Handle type='target' position={Position.Top} />

      <MindMapEntityCard {...props} key={props.id} />
    </>
  )
})

export const EntityNode = memo(EN)
