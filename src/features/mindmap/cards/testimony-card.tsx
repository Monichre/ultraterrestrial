'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { CardHeader, Card, CardFooter } from '@/components/ui/card/card'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CardContent, CardTitle } from '@/components/ui/card'
import { BlurAppear } from '@/components/animated'
import { TextEffect } from '@/components/animated/text-effect'
import { ModelAvatar } from '@/features/mindmap/connection-list'
import { BlockQuote } from '@/components/blockquote'

type TestimonyCardProps = {
  data: {
    claim: string
    documentation: any[]
    witness: any
    event: any
    summary: any
    xata: {
      createdAt: string
      updatedAt: string
      version: number
    }
    color: string
    type: string
    fill: string
    parentId: string
  }
}

export function TestimonyCard({ data }: TestimonyCardProps) {
  return (
    <BlurAppear>
      <Card
        className={`shadow relative w-[450px] rounded-lg border border-white/60 dark:border-border/30 rounded-[calc(var(--radius))] bg-gray-900`}
      >
        <div className='border border-white/20 rounded-[calc(var(--radius)-2px)] relative p-2'>
          <CardHeader className='p-2'>
            <div className='text-neutral-200 m-2 text-center'>
              {data?.claim && data?.witness?.name && (
                <BlockQuote quote={data?.claim} author={data?.witness?.name} />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className='flex p-2 justify-start align-middle content-center items-center'>
              <ModelAvatar model={data?.witness} />
              <p className='ml-3'>{data?.witness?.name}</p>
            </div>
          </CardContent>
        </div>
      </Card>
    </BlurAppear>
  )
}
