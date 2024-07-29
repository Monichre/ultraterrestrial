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
import './cards.css'
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
import { useEffect, useState, useCallback } from 'react'
import { Pin, Settings } from 'lucide-react'
import { searchTable } from '@/features/ai/search'
import { useMindMap } from '@/providers/mindmap-context'
import { SketchyGlobe } from '@/components/icons'

export const RootNodeCard = ({ nodeData }: any) => {
  const {
    addChildNodesFromSearch,
    showLocationVisualization,
    locationsToVisualize,
    toggleLocationVisualization,
  } = useMindMap()
  const nodeState = useNodesData(nodeData?.id)
  console.log('nodeState: ', nodeState)
  const type = nodeData?.data?.type

  const [searchTerm, setSearchTerm] = useState('')

  const [searchResults, setSearchResults] = useState([])
  const updateSearchTerm = (event: any) => {
    const { value } = event.target

    setSearchTerm(value)
  }

  const runSearch = useCallback(async () => {
    const keyword = searchTerm
    const table = type

    const { results } = await searchTable({ table, keyword })
    console.log('results: ', results)
    addChildNodesFromSearch({ type, searchResults: results })
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
  // 'bg-black',

  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      // Execute your function here
      console.log('Enter key pressed')
    }
  }

  // useEffect(() => {
  //   if (searchResults.length > 0) {
  //     addChildNodesFromSearch({ type, searchResults })
  //   }
  // }, [addChildNodesFromSearch, searchResults, type])

  const Description = () => (
    <>
      There are <NumberTicker value={childCount} /> {capitalize(label)}
    </>
  )
  const LoadedStats = () => (
    <>
      {/* @ts-ignore */}
      Loaded <NumberTicker value={nodeState?.data?.handles?.length} /> of{' '}
      <NumberTicker value={childCount} /> {capitalize(label)}{' '}
    </>
  )

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
      <DotGridBackgroundBlack />
      <CardHeader className='p-2 relative z-20'>
        <div className='flex align-middle content-center items-center justify-between'>
          <h3 className={`!font-centimaSans tracking-wider uppercase`}>
            {capitalize(label) || capitalize(type)}
          </h3>
          <div className='flex align-middle content-center items-center justify-between space-x-2 rounded-md border p-2'>
            <div className='flex align-middle content-center items-center justify-between space-x-2 '>
              <Pin className='h-4 w-4 stroke-2 text-white' />
            </div>

            <Switch />
          </div>
        </div>

        <CardDescription className='text-xs relative z-20'>
          {nodeState?.data?.handles?.length ? <LoadedStats /> : <Description />}
        </CardDescription>
      </CardHeader>
      <CardContent className='p-2 relative z-20'>
        {/* <AnimatedSearchInput
          onChange={updateSearchTerm}
          onSubmit={runSearch}
          placeholders={[
            'Find all records for USS Nimitz',
            'Search for Event ....',
          ]}
        /> */}
        <Command className='rounded-lg border shadow-md bg-black text-white cmd'>
          <CommandInput
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
        </Command>
        {type === 'events' && (
          <p className='flex align-middle items-center justify-between mt-2'>
            Visualize Locations
            <Button
              onClick={toggleLocationVisualization}
              variant='ghost'
              size='icon'
              className='text-zinc-100 rounded-full hover:bg-gray-600 hover:text-zinc-100'
            >
              <SketchyGlobe />
            </Button>
          </p>
        )}
      </CardContent>
      <CardFooter className='p-2 relative z-20'>
        <Button
          className='w-full load-records-button'
          // onClick={handleClick}
          size='sm'
          variant='ghost'
        >
          Load {capitalize(label)} Records
        </Button>
      </CardFooter>
    </Card>
  )
}
