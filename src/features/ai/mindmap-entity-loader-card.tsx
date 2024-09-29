'use client'
import * as React from 'react'

import { Card } from '@/components/ui/card'
import { DotGridBackgroundBlack } from '@/components/backgrounds'
import {
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { NumberTicker } from '@/components/animated/number-ticker'
import { OpenAILogo } from '@/components/ui/icons'

import { cn, capitalize, nextTick } from '@/utils'

import { Button, ShinyButton } from '@/components/ui/button'
import '@/components/ui/card/cards.css'
import { Switch } from '@/components/ui/switch'
import { useNodesData } from '@xyflow/react'

import { useEffect, useState, useCallback, memo } from 'react'
import { Pin, Settings } from 'lucide-react'
import { searchTable } from '@/features/ai/search'
import { useMindMap } from '@/providers/mindmap-context'
import { SketchyGlobe } from '@/components/icons'

import { RootNodeToolbar } from '@/features/mindmap/cards/root-node-card/RootNodeToolbar'
import { InputWithVanishAnimation } from '@/features/mindmap/cards/root-node-card/InputWithVanishAnimation'

export const MindMapEntityLoaderCard = memo(({ type }: any) => {
  const { addChildNodesFromSearch, addDataToMindMap } = useMindMap()

  const [searchTerm, setSearchTerm]: any = useState('')

  const [searchResults, setSearchResults] = useState([])
  const updateSearchTerm = (event: any) => {
    const { value } = event.target

    setSearchTerm(value)
  }

  const runSearch = useCallback(async () => {
    const keyword = searchTerm
    const table = type

    const { results } = await searchTable({ table, keyword })

    addChildNodesFromSearch({
      type,
      searchResults: results,
      searchTerm: keyword.trim().replace(/ /g, ''),
    })
    setSearchTerm('')
  }, [searchTerm, type, addChildNodesFromSearch])

  const handleLoadingRecords = useCallback(async () => {
    await addDataToMindMap({ data: { type } })
  }, [type, addDataToMindMap])

  const interim = type.toLowerCase()
  const title =
    interim === 'personnel' ? 'Subject Matter Experts' : capitalize(interim)

  return (
    <Card
      className={cn(
        'w-[280px]',
        'relative',
        'overflow-hidden',
        // '!bg-transparent'
        `root-node`,
        'bg-dot-white/[0.2]'
      )}
    >
      <div className='absolute top-0 flex w-full justify-center'>
        <div className='left-0 h-[1px] animate-border-width rounded-full bg-gradient-to-r from-[rgba(17,17,17,0)] via-white to-[rgba(17,17,17,0)] transition-all duration-1000' />
      </div>
      <DotGridBackgroundBlack />
      <CardHeader
        className={`p-2 relative z-20 after:content-[''] after:absolute after:w-[20%] after:left-[8px] after:bottom-[-4px] after:h-[1px] after:bg-[#78efff]  `}
      >
        <div className='flex align-middle content-center items-center justify-between'>
          <h3 className={`!font-bebasNeuePro tracking-wider uppercase`}>
            {title}
          </h3>
        </div>

        {/* <CardDescription className='text-xs relative z-20'> */}
        {/* {nodeState?.data?.handles?.length ? (
            <LoadedStats
              length={nodeState?.data?.handles?.length}
              childCount={childCount}
              label={label}
            />
          ) : (
            <Description childCount={childCount} label={label} />
          )}
        </CardDescription> */}
      </CardHeader>

      <CardContent className='my-2'>
        <InputWithVanishAnimation
          onSubmit={runSearch}
          type={type}
          placeholders={['Roswell', 'USS Nimitz']}
        />
      </CardContent>

      <CardFooter className='p-2 flex justify-center align-middle items-center mt-2'>
        <ShinyButton
          onClick={handleLoadingRecords}
          className='load-records-button cursor-pointer'
        >
          Go
        </ShinyButton>
      </CardFooter>
    </Card>
  )
})
