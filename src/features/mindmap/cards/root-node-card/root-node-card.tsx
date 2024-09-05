import { Card } from '@/components/ui/card'
import { DotGridBackgroundBlack } from '@/components/ui/backgrounds'
import {
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { NumberTicker } from '@/components/animations/number-ticker'
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

const Description = memo(({ childCount, label }: any) => (
  <>
    There are <NumberTicker value={childCount} /> {capitalize(label)}
  </>
))
const LoadedStats = memo(({ length, childCount, label }: any) => (
  <>
    {/* @ts-ignore */}
    Loaded <NumberTicker value={length} /> of
    <NumberTicker value={childCount} /> {capitalize(label)}{' '}
  </>
))
export const RootNodeCard = memo(({ nodeData }: any) => {
  const {
    addChildNodesFromSearch,
    conciseViewActive,
    renderRootNodeConciseLayout,

    toggleLocationVisualization,
    onNodeClick,
  } = useMindMap()

  const nodeState: any = useNodesData(nodeData?.id)

  const type = nodeData?.data?.type

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

    addChildNodesFromSearch({ type, searchResults: results })
    setSearchTerm('')
  }, [searchTerm, type, addChildNodesFromSearch])
  const {
    data: { childCount, label },
    ...rest
  } = nodeData

  const nodeProps = {
    ...rest,
  }

  const handleLoadingRecords = useCallback(async () => {
    await onNodeClick(nodeData)
  }, [nodeData, onNodeClick])

  const interim = (label || type).toLowerCase()
  const title =
    interim === 'personnel' ? 'Subject Matter Experts' : capitalize(interim)

  return (
    <Card
      {...nodeProps}
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
          <h3 className={`!font-centimaSans tracking-wider uppercase`}>
            {title}
          </h3>
          <Button
            variant='ghost'
            size='icon'
            className='ml-auto'
            onClick={toggleLocationVisualization}
          >
            <SketchyGlobe className='stroke-1 h-5 w-5 block' fill='#78efff' />
          </Button>
        </div>

        <CardDescription className='text-xs relative z-20'>
          {nodeState?.data?.handles?.length ? (
            <LoadedStats
              length={nodeState?.data?.handles?.length}
              childCount={childCount}
              label={label}
            />
          ) : (
            <Description childCount={childCount} label={label} />
          )}
        </CardDescription>
      </CardHeader>

      <RootNodeToolbar
        onChange={updateSearchTerm}
        onSubmit={runSearch}
        type={type}
        value={searchTerm}
      />
      <CardFooter className='p-2 flex justify-center align-middle items-center mt-2'>
        <ShinyButton
          onClick={handleLoadingRecords}
          className='load-records-button cursor-pointer'
        >
          Load {capitalize(label)}
        </ShinyButton>
      </CardFooter>
    </Card>
  )
})
