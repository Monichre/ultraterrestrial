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

import { cn, capitalize, ROOT_NODE_POSITIONS } from '@/utils'

import { Button } from '@/components/ui/button'
import '@/components/ui/card/cards.css'
import { Switch } from '@/components/ui/switch'
import { useNodesData } from '@xyflow/react'
import { AnimatedSearchInput } from '@/components/search'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
import { useEffect, useState, useCallback, memo } from 'react'
import { Pin, Settings } from 'lucide-react'
import { searchTable } from '@/features/ai/search'
import { useMindMap } from '@/providers/mindmap-context'
import { SketchyGlobe } from '@/components/icons'
import { InputBorderSpotlight } from '@/features/mindmap/cards/root-node-card/search-input-spotlight'

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
  console.log('nodeData: ', nodeData)
  const {
    addChildNodesFromSearch,
    showLocationVisualization,
    locationsToVisualize,
    toggleLocationVisualization,
    onNodeClick,
  } = useMindMap()
  const nodeState = useNodesData(nodeData?.id)
  console.log('nodeState: ', nodeState)
  const type = nodeData?.data?.type

  const [searchTerm, setSearchTerm]: any = useState('')

  const [searchResults, setSearchResults] = useState([])
  const updateSearchTerm = (event: any) => {
    console.log('event: ', event)
    const { value } = event.target

    setSearchTerm(value)
  }

  const runSearch = useCallback(async () => {
    console.log('running search')
    const keyword = searchTerm
    const table = type

    const { results } = await searchTable({ table, keyword })
    console.log('results: ', results)
    addChildNodesFromSearch({ type, searchResults: results })
    setSearchTerm('')
    // setSearchResults((searchResults: any) => {
    //   const uniqueResults = results.filter((result: any) => {
    //     return !searchResults.some((existingResult: any) => {
    //       return existingResult.id === result.id
    //     })
    //   })
    //   return [...searchResults, ...uniqueResults]
    // })

    // Update the node data with the search results
    // nodeState.updateData({
    //   searchResults: {
    //     resultstotalCount,
    //     records,
    //   },
    // })
  }, [searchTerm, type, addChildNodesFromSearch])
  const {
    data: { childCount, label },
    ...rest
  } = nodeData

  const nodeProps = {
    ...rest,
    zIndex: 5000,
  }
  console.log('nodeProps: ', nodeProps)
  // 'bg-black',

  // const handleEnterKeyPress = (
  //   event: React.KeyboardEvent<HTMLInputElement>
  // ) => {
  //   if (event.key === 'Enter') {
  //     // Execute your function here
  //     console.log('Enter key pressed')
  //   }
  // }

  // useEffect(() => {
  //   if (searchResults.length > 0) {
  //     addChildNodesFromSearch({ type, searchResults })
  //   }
  // }, [addChildNodesFromSearch, searchResults, type])

  const handleLoadingRecords = () => {
    const res = onNodeClick(nodeData)
    console.log('res: ', res)
  }
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
            {capitalize(label) || capitalize(type)}
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
      <CardContent className='mt-2 p-2 w-full relative z-20'>
        {type === 'events' && (
          <p>
            Looking for something specific? Search our event records below.
            Otherwise {type} will be loaded in batches of 10 in chronological
            order from the present.
          </p>
        )}

        <InputBorderSpotlight
          onChange={updateSearchTerm}
          onSubmit={runSearch}
          type={type}
          value={searchTerm}
        />

        {/* <Command className='rounded-lg border shadow-md bg-black text-white cmd'>
          <CommandInput
            // @ts-ignore

            onSubmit={runSearch}
            className='text-xs text-white'
            placeholder='Filter Commands...'
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              <CommandItem className='text-xs text-white'>
                <span className='text-xs text-white'>Ask Party Martian</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem className='text-xs text-white'>
                <span className='text-xs text-white'>
                  Visualize Relevant Data Connections
                </span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem className='text-xs text-white'>
                <Settings className='mr-2 h-2 w-2' />
                <span className='text-xs text-white'>Ask AI</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command> */}
      </CardContent>
      <CardFooter className='p-2 relative z-20 flex justify-center align-middle items-center'>
        <Button
          onClick={handleLoadingRecords}
          className='load-records-button border rounded-lg border shadow-md bg-black text-white m-auto '
          variant='outline'
        >
          Load {capitalize(label)}
        </Button>
      </CardFooter>
    </Card>
  )
})
