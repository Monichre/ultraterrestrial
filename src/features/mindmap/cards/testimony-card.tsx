'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { CardHeader, Card } from '@/components/ui/card/card'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CardContent, CardTitle } from '@/components/ui/card'

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
  // useEffect(() => {
  //   const fetchWitnessData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `/api/personnel/query?=${data.witness.id}`
  //       )
  //       console.log('response: ', response)
  //       setWitness(response.data)
  //     } catch (error) {
  //       console.error('Error fetching witness data:', error)
  //     }
  //   }

  //   fetchWitnessData()
  // }, [data])

  const { claim } = data

  const [animatedClaim, setAnimatedClaim] = useState<string>('')
  // const [animatedDate, setAnimatedDate] = useState<string>('')
  const [titleFinished, setTitleFinished] = useState(false)
  const [t, setT] = useState<number>(0)
  const [i, setI] = useState<number>(0)

  useEffect(() => {
    const typingEffect = setInterval(() => {
      if (t < claim.length) {
        setAnimatedClaim(claim.substring(0, t + 1))
        setT(t + 1)
      } else {
        clearInterval(typingEffect)

        // setTitleFinished(true)
      }
    }, 100)

    return () => {
      clearInterval(typingEffect)
    }
  }, [claim, t])

  // useEffect(() => {
  //   const typingEffectTwo = setInterval(() => {
  //     if (titleFinished) {
  //       if (i < date.length) {
  //         setAnimatedDate(date.substring(0, i + 1))
  //         setI(i + 1)
  //       } else {
  //         clearInterval(typingEffectTwo)
  //       }
  //     }
  //   }, 100)

  //   return () => {
  //     clearInterval(typingEffectTwo)
  //   }
  // }, [date, date.length, i, name, t, titleFinished])

  return (
    <Card
      className={`entity-card shadow relative w-[450px] rounded-lg border border-white/60 dark:border-border/30 rounded-[calc(var(--radius))] bg-dot-white/[0.2]`}
    >
      <div className='border border-white/20 rounded-[calc(var(--radius)-2px)] relative p-2'>
        <CardHeader className='flex flex-row items-center align-center justify-between space-y-0 p-2'>
          <div className='flex p-2 justify-start align-middle content-center items-center'>
            <Avatar className='mr-2'>
              {/* @ts-ignore */}
              <AvatarImage src={data?.witness?.photo[0]?.signedUrl} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{data?.witness?.name}</p>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className='text-neutral-200 m-2'>{animatedClaim}</h3>
        </CardContent>
      </div>
    </Card>
  )
}