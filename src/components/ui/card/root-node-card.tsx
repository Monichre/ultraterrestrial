import { Card } from '@/components/ui/card'
import { DotGridBackgroundBlack } from '@/components/ui/backgrounds'
import {
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { OpenAILogo } from '@/components/ui/icons'
import { CommandDemo } from '@/features/graph/nodes'

import { cn, capitalize } from '@/utils'
import { Switch } from '@radix-ui/react-switch'
import { Button } from '@/components/ui/button'
import './cards.css'

// animate='show'
// variants={container}
// initial='hidden'
export const RootNodeCard = ({ nodeData }: any) => {
  console.log('nodeData: ', nodeData)
  const {
    data: { childCount, label, type, fill, id },
    ...rest
  } = nodeData

  const nodeProps = {
    ...rest,
    zIndex: 5000,
  }
  // 'bg-black',

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
          <h3 className={`!font-source`}>
            {capitalize(label) || capitalize(type)}
          </h3>
          <div className='flex align-middle content-center items-center justify-between space-x-2 rounded-md border p-2'>
            <div className='flex align-middle content-center items-center justify-between space-x-2 '>
              <div className='h-4 w-4'>
                <OpenAILogo className='h-full w-full' />
              </div>
              <p className='text-xs font-source leading-none'>AI</p>
            </div>

            <Switch />
          </div>
        </div>

        <CardDescription className='text-xs relative z-20'>
          There are {childCount} {capitalize(label)}
        </CardDescription>
      </CardHeader>
      <CardContent className='p-2 relative z-20'>
        <CommandDemo />
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
