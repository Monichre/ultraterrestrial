/**
 * v0 by Vercel.
 * @see https://v0.dev/t/aLUPWlh
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { DoubleDonut, ThinTwinklyStar } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { OpenAILogo } from '@/components/ui/icons'
import { useMindMap } from '@/providers/mindmap-context'
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@radix-ui/react-tooltip'
import { PlusIcon } from 'lucide-react'
import type { JSX, SVGProps } from 'react'

export function Toolbar() {
  const {
    showLocationVisualization,
    locationsToVisualize,
    toggleLocationVisualization,
  } = useMindMap()
  return (
    // max-w-max m-auto
    <div className='flex flex-col shadow items-center justify-between rounded-full p-1  border border-white/80 dark:border-neutral-700/80 text-neutral-500 bg-gradient-to-b from-card/70 rounded-[calc(var(--radius)-2px)]'>
      <div className='flex flex-col'>
        <Button
          variant='ghost'
          size='icon'
          className='text-zinc-100 rounded-full hover:bg-gray-600 hover:text-zinc-100 m-2'
        >
          <MessageCircleIcon className='h-5 w-5 stroke-1' />
          <span className='sr-only'>Create a comment</span>
        </Button>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='text-zinc-100 rounded-full hover:bg-gray-600 hover:text-zinc-100 m-2'
              >
                <LayersIcon className='h-5 w-5 stroke-1' />
                <span className='sr-only'>Stack</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Keep opened cards on drawing board</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className='flex flex-col items-center '>
        <Button
          variant='ghost'
          size='icon'
          className='text-zinc-100  hover:bg-gray-600 hover:text-zinc-100 m-2'
        >
          <ThinTwinklyStar />

          <span className='sr-only'>Visualize Locations</span>
        </Button>
        <Button
          variant='ghost'
          size='icon'
          className='text-zinc-100 rounded-full hover:bg-gray-600 hover:text-zinc-100 m-2'
          onClick={toggleLocationVisualization}
        >
          <svg
            className='h-5 w-5 stroke-1'
            viewBox='0 0 107 111'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M105.3 51.4014L47 109.601C48.6 109.901 50.2 110.201 51.8 110.401L106 56.2014C105.9 54.6014 105.6 53.0014 105.3 51.4014Z'
              fill='#9D9D9D'
            />
            <path
              d='M101.9 41.3018L37 106.302C38.3 106.902 39.6 107.402 41 107.902L103.6 45.3018C103.1 44.0018 102.5 42.6018 101.9 41.3018Z'
              fill='#9D9D9D'
            />
            <path
              d='M92.1 27.2018C91.7 26.8018 91.2 26.4018 90.7 25.8018L21.5 95.0018C22 95.6018 22.5 96.0018 22.9 96.4018C23.3 96.8018 23.8 97.2018 24.3 97.8018L93.5 28.6017C92.9 28.0017 92.5 27.6018 92.1 27.2018Z'
              fill='#9D9D9D'
            />
            <path
              d='M92.1002 96.4015C96.6002 91.9015 100.1 86.8015 102.5 81.0015L76.7002 106.801C82.4002 104.401 87.6002 100.901 92.1002 96.4015Z'
              fill='#9D9D9D'
            />
            <path
              d='M65.5998 110.002L105.7 69.9017C106 67.8017 106.3 65.7017 106.3 63.7017L59.2998 110.702C61.4998 110.602 63.4998 110.402 65.5998 110.002Z'
              fill='#9D9D9D'
            />
            <path
              d='M73.8998 15.7012L11.2998 78.3011C11.7998 79.6011 12.2998 81.0011 12.8998 82.3011L77.7998 17.4012C76.5998 16.7012 75.2998 16.2012 73.8998 15.7012Z'
              fill='#9D9D9D'
            />
            <path
              d='M49.1998 13.4016L8.9998 53.5016C8.5998 55.8016 8.3998 58.0016 8.2998 60.2016L55.8998 12.6016C53.6998 12.8016 51.3998 13.0016 49.1998 13.4016Z'
              fill='#9D9D9D'
            />
            <path
              d='M22.7994 27.2018C18.2994 31.7018 14.7994 36.8017 12.3994 42.6017L38.1994 16.8018C32.4994 19.2018 27.2994 22.7018 22.7994 27.2018Z'
              fill='#9D9D9D'
            />
            <path
              d='M83.0002 20.002L15.7002 87.3019C16.4002 88.5019 17.2002 89.6019 17.9002 90.6019L86.3002 22.202C85.3002 21.502 84.2002 20.802 83.0002 20.002Z'
              fill='#9D9D9D'
            />
            <path
              d='M62.9998 13.2012L8.7998 67.4012C8.9998 69.0012 9.1998 70.6012 9.5998 72.2012L67.7998 14.0012C66.2998 13.6012 64.5998 13.4012 62.9998 13.2012Z'
              fill='#9D9D9D'
            />
            <path
              d='M96.9 32.9014L28.5 101.301C29.6 102.101 30.7 102.801 31.8 103.501L99.1 36.2014C98.5 35.1014 97.7 33.9014 96.9 32.9014Z'
              fill='#9D9D9D'
            />
            <path
              d='M96.9002 39.7021L38.7002 97.9022C40.3002 98.2022 41.9002 98.5021 43.5002 98.7021L97.7002 44.5021C97.5002 42.9021 97.2002 41.3021 96.9002 39.7021Z'
              fill='currentColor'
            />
            <path
              d='M96.9002 39.7021L38.7002 97.9022C40.3002 98.2022 41.9002 98.5021 43.5002 98.7021L97.7002 44.5021C97.5002 42.9021 97.2002 41.3021 96.9002 39.7021Z'
              fill='currentColor'
              fill-opacity='0.2'
            />
            <path
              d='M93.6002 29.6025L28.7002 94.5026C30.0002 95.1026 31.3002 95.6025 32.7002 96.1025L95.3002 33.5026C94.7002 32.2026 94.2002 30.9025 93.6002 29.6025Z'
              fill='currentColor'
            />
            <path
              d='M93.6002 29.6025L28.7002 94.5026C30.0002 95.1026 31.3002 95.6025 32.7002 96.1025L95.3002 33.5026C94.7002 32.2026 94.2002 30.9025 93.6002 29.6025Z'
              fill='currentColor'
              fill-opacity='0.2'
            />
            <path
              d='M83.6996 15.5026C83.2996 15.1026 82.7996 14.7025 82.2996 14.1025L13.0996 83.3026C13.5996 83.9026 14.0996 84.3026 14.4996 84.7026C14.8996 85.1026 15.3996 85.5025 15.8996 86.1025L85.0996 16.9026C84.4996 16.3026 84.0996 15.9026 83.6996 15.5026Z'
              fill='currentColor'
            />
            <path
              d='M83.6996 15.5026C83.2996 15.1026 82.7996 14.7025 82.2996 14.1025L13.0996 83.3026C13.5996 83.9026 14.0996 84.3026 14.4996 84.7026C14.8996 85.1026 15.3996 85.5025 15.8996 86.1025L85.0996 16.9026C84.4996 16.3026 84.0996 15.9026 83.6996 15.5026Z'
              fill='currentColor'
              fill-opacity='0.2'
            />
            <path
              d='M83.6998 84.7023C88.1998 80.2023 91.6998 75.1022 94.0998 69.3022L68.2998 95.1022C74.0998 92.7022 79.1998 89.2023 83.6998 84.7023Z'
              fill='currentColor'
            />
            <path
              d='M83.6998 84.7023C88.1998 80.2023 91.6998 75.1022 94.0998 69.3022L68.2998 95.1022C74.0998 92.7022 79.1998 89.2023 83.6998 84.7023Z'
              fill='currentColor'
              fill-opacity='0.2'
            />
            <path
              d='M57.2004 98.3019L97.3004 58.202C97.6004 56.102 97.9004 54.102 97.9004 52.002L50.9004 99.002C53.1004 98.902 55.2004 98.7019 57.2004 98.3019Z'
              fill='currentColor'
            />
            <path
              d='M57.2004 98.3019L97.3004 58.202C97.6004 56.102 97.9004 54.102 97.9004 52.002L50.9004 99.002C53.1004 98.902 55.2004 98.7019 57.2004 98.3019Z'
              fill='currentColor'
              fill-opacity='0.2'
            />
            <path
              d='M65.6 4.00195L3 66.6019C3.5 67.9019 4 69.3019 4.6 70.6019L69.5 5.70197C68.2 5.00197 66.9 4.50195 65.6 4.00195Z'
              fill='currentColor'
            />
            <path
              d='M65.6 4.00195L3 66.6019C3.5 67.9019 4 69.3019 4.6 70.6019L69.5 5.70197C68.2 5.00197 66.9 4.50195 65.6 4.00195Z'
              fill='currentColor'
              fill-opacity='0.2'
            />
            <path
              d='M40.8 1.70236L0.7 41.8023C0.3 44.1023 0.1 46.3023 0 48.5023L47.6 0.902344C45.3 1.10234 43 1.30236 40.8 1.70236Z'
              fill='currentColor'
            />
            <path
              d='M40.8 1.70236L0.7 41.8023C0.3 44.1023 0.1 46.3023 0 48.5023L47.6 0.902344C45.3 1.10234 43 1.30236 40.8 1.70236Z'
              fill='currentColor'
              fill-opacity='0.2'
            />
            <path
              d='M14.4996 15.5025C9.99961 20.0025 6.49961 25.1026 4.09961 30.9026L29.8996 5.10254C24.0996 7.50254 18.8996 11.0025 14.4996 15.5025Z'
              fill='currentColor'
            />
            <path
              d='M14.4996 15.5025C9.99961 20.0025 6.49961 25.1026 4.09961 30.9026L29.8996 5.10254C24.0996 7.50254 18.8996 11.0025 14.4996 15.5025Z'
              fill='currentColor'
              fill-opacity='0.2'
            />
            <path
              d='M74.5998 8.30273L7.2998 75.6027C7.9998 76.8027 8.7998 77.9028 9.4998 78.9028L77.9998 10.6027C76.8998 9.80272 75.7998 9.00273 74.5998 8.30273Z'
              fill='currentColor'
            />
            <path
              d='M74.5998 8.30273L7.2998 75.6027C7.9998 76.8027 8.7998 77.9028 9.4998 78.9028L77.9998 10.6027C76.8998 9.80272 75.7998 9.00273 74.5998 8.30273Z'
              fill='currentColor'
              fill-opacity='0.2'
            />
            <path
              d='M54.7 1.50195L0.5 55.702C0.7 57.302 1 58.902 1.3 60.502L59.5 2.30194C57.9 1.90194 56.3 1.60195 54.7 1.50195Z'
              fill='currentColor'
            />
            <path
              d='M54.7 1.50195L0.5 55.702C0.7 57.302 1 58.902 1.3 60.502L59.5 2.30194C57.9 1.90194 56.3 1.60195 54.7 1.50195Z'
              fill='currentColor'
              fill-opacity='0.2'
            />
            <path
              d='M88.6002 21.2021L20.2002 89.6021C21.3002 90.4021 22.4002 91.1021 23.5002 91.8021L90.8002 24.5021C90.1002 23.4021 89.4002 22.2021 88.6002 21.2021Z'
              fill='currentColor'
            />
            <path
              d='M88.6002 21.2021L20.2002 89.6021C21.3002 90.4021 22.4002 91.1021 23.5002 91.8021L90.8002 24.5021C90.1002 23.4021 89.4002 22.2021 88.6002 21.2021Z'
              fill='currentColor'
              fill-opacity='0.2'
            />
          </svg>
          <span className='sr-only'>Open menu</span>
        </Button>
      </div>
    </div>
  )
}

function InboxIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polyline points='22 12 16 12 14 15 10 15 8 12 2 12' />
      <path d='M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z' />
    </svg>
  )
}

function LayersIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z' />
      <path d='m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65' />
      <path d='m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65' />
    </svg>
  )
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line x1='4' x2='20' y1='12' y2='12' />
      <line x1='4' x2='20' y1='6' y2='6' />
      <line x1='4' x2='20' y1='18' y2='18' />
    </svg>
  )
}

function MessageCircleIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M7.9 20A9 9 0 1 0 4 16.1L2 22Z' />
    </svg>
  )
}

function ShareIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8' />
      <polyline points='16 6 12 2 8 6' />
      <line x1='12' x2='12' y1='2' y2='15' />
    </svg>
  )
}
