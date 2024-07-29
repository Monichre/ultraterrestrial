import { Button } from '@/components/ui/button'
import {
  BookmarkFilledIcon,
  Pencil2Icon,
  Share1Icon,
} from '@radix-ui/react-icons'
import * as React from 'react'

function PlusIcon(props: any) {
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
      <path d='M5 12h14' />
      <path d='M12 5v14' />
    </svg>
  )
}

interface IconToolbarProps {}

export const IconToolbar: React.FC<IconToolbarProps> = ({
  vertical,
  stroke = '#fff',
}: any) => {
  const className = vertical ? 'flex flex-col gap-y-4' : 'flex flex-row gap-x-4'
  return (
    <div className={`${className} p-4`}>
      <Button variant='ghost' size='icon'>
        <BookmarkFilledIcon className='h-5 w-5 text-neutral-200' />
      </Button>
      <Button variant='ghost' size='icon'>
        <Pencil2Icon className='h-5 w-5 text-neutral-200' />
      </Button>
      <Button variant='ghost' size='icon'>
        <Share1Icon className='h-5 w-5 text-neutral-200' />
      </Button>
      <Button variant='ghost' size='icon'>
        <PlusIcon className='w-6 h-6' />
      </Button>
    </div>
  )
}

export const FrankenIconToolbar = ({ stroke, vertical }: any) => {
  const className = vertical ? 'flex flex-col gap-y-4' : 'flex flex-row gap-x-4'
  return (
    <ul className={`text-zinc-950 list-none ${className}`}>
      <li className='list-item border-2 border-zinc-200 border-solid rounded-md p-4 md:p-6  lg:p-10'>
        <ul className='flex-wrap flex gap-1'>
          <li className='list-item'>
            <a
              className='items-center gap-x-1 justify-center inline-flex w-9 h-9 rounded-md overflow-visible'
              href='#'
            >
              <svg
                className='cursor-pointer w-4 h-4'
                fill={stroke}
                height='16'
                viewBox='0 0 20 20'
              >
                <rect
                  className='w-0 h-4'
                  fill={stroke}
                  height='17'
                  x='9'
                  y='1'
                />
                <rect
                  className='w-4 h-0'
                  fill={stroke}
                  height='1'
                  x='1'
                  y='9'
                />
              </svg>
            </a>
          </li>

          <li className='list-item'>
            <a
              className='items-center gap-x-1 justify-center inline-flex w-9 h-9 rounded-md overflow-visible'
              href='#'
            >
              <svg
                className='cursor-pointer w-4 h-4'
                fill={stroke}
                height='16'
                viewBox='0 0 20 20'
              >
                <path
                  d='M18.65,1.68 C18.41,1.45 18.109,1.33 17.81,1.33 C17.499,1.33 17.209,1.45 16.98,1.68 L8.92,9.76 L8,12.33 L10.55,11.41 L18.651,3.34 C19.12,2.87 19.12,2.15 18.65,1.68 L18.65,1.68 L18.65,1.68 Z'
                  fill='none'
                  stroke={stroke}
                />
                <polyline
                  fill='none'
                  points='16.5 8.482 16.5 18.5 3.5 18.5 3.5 1.5 14.211 1.5'
                  stroke={stroke}
                />
              </svg>
            </a>
          </li>

          <li className='list-item'>
            <a
              className='items-center gap-x-1 justify-center inline-flex w-9 h-9 rounded-md overflow-visible'
              href='#'
            >
              <svg
                className='cursor-pointer w-4 h-4'
                fill={stroke}
                height='16'
                viewBox='0 0 20 20'
              >
                <rect
                  className='w-3 h-4'
                  fill='none'
                  height='16'
                  stroke={stroke}
                  x='3.5'
                  y='2.5'
                />
                <polyline
                  fill='none'
                  points='5 0.5 17.5 0.5 17.5 17'
                  stroke={stroke}
                />
              </svg>
            </a>
          </li>

          <li className='list-item'>
            <a
              className='items-center gap-x-1 justify-center inline-flex w-9 h-9 rounded-md'
              href='#'
            >
              <span className='cursor-pointer inline-flex overflow-visible'>
                <svg
                  className='w-4 h-4'
                  fill={stroke}
                  height='16'
                  viewBox='0 0 20 20'
                >
                  <path
                    d='M7.5,7.5V4A2.48,2.48,0,0,1,10,1.5,2.54,2.54,0,0,1,12.5,4V7.5'
                    fill='none'
                    stroke={stroke}
                  />
                  <polygon
                    fill='none'
                    points='16.5 7.5 3.5 7.5 2.5 18.5 17.5 18.5 16.5 7.5'
                    stroke={stroke}
                  />
                </svg>
              </span>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  )
}

export const IconNavToolbarVertical = () => {
  return (
    <li className='text-zinc-950 list-item border-2 border-zinc-200 border-solid rounded-md p-4 md:p-6  lg:p-10'>
      {' '}
      <ul className='flex-col flex-wrap flex list-none gap-1'>
        <li className='list-item'>
          <a
            className='items-center gap-x-1 justify-center inline-flex w-9 h-9 rounded-md overflow-visible'
            href='https://franken-ui.dev/#'
          >
            <svg
              className='cursor-pointer w-4 h-4'
              fill='rgb(9, 9, 11)'
              height='16'
              viewBox='0 0 20 20'
            >
              <rect
                className='w-0 h-4'
                fill='rgb(9, 9, 11)'
                height='17'
                x='9'
                y='1'
              />
              <rect
                className='w-4 h-0'
                fill='rgb(9, 9, 11)'
                height='1'
                x='1'
                y='9'
              />
            </svg>
          </a>
        </li>

        <li className='list-item'>
          <a
            className='items-center gap-x-1 justify-center inline-flex w-9 h-9 rounded-md overflow-visible'
            href='https://franken-ui.dev/#'
          >
            <svg
              className='cursor-pointer w-4 h-4'
              fill='rgb(9, 9, 11)'
              height='16'
              viewBox='0 0 20 20'
            >
              <path
                d='M18.65,1.68 C18.41,1.45 18.109,1.33 17.81,1.33 C17.499,1.33 17.209,1.45 16.98,1.68 L8.92,9.76 L8,12.33 L10.55,11.41 L18.651,3.34 C19.12,2.87 19.12,2.15 18.65,1.68 L18.65,1.68 L18.65,1.68 Z'
                fill='none'
                stroke='#09090b'
              />
              <polyline
                fill='none'
                points='16.5 8.482 16.5 18.5 3.5 18.5 3.5 1.5 14.211 1.5'
                stroke='#09090b'
              />
            </svg>
          </a>
        </li>

        <li className='list-item'>
          <a
            className='items-center gap-x-1 justify-center inline-flex w-9 h-9 rounded-md overflow-visible'
            href='https://franken-ui.dev/#'
          >
            <svg
              className='cursor-pointer w-4 h-4'
              fill='rgb(9, 9, 11)'
              height='16'
              viewBox='0 0 20 20'
            >
              <rect
                className='w-3 h-4'
                fill='none'
                height='16'
                stroke='#09090b'
                x='3.5'
                y='2.5'
              />
              <polyline
                fill='none'
                points='5 0.5 17.5 0.5 17.5 17'
                stroke='#09090b'
              />
            </svg>
          </a>
        </li>

        <li className='list-item'>
          <a
            className='items-center gap-x-1 justify-center inline-flex w-9 h-9 rounded-md'
            href='https://franken-ui.dev/#'
          >
            <span className='cursor-pointer inline-flex overflow-visible'>
              <svg
                className='w-4 h-4'
                fill='rgb(9, 9, 11)'
                height='16'
                viewBox='0 0 20 20'
              >
                <path
                  d='M7.5,7.5V4A2.48,2.48,0,0,1,10,1.5,2.54,2.54,0,0,1,12.5,4V7.5'
                  fill='none'
                  stroke='#09090b'
                />
                <polygon
                  fill='none'
                  points='16.5 7.5 3.5 7.5 2.5 18.5 17.5 18.5 16.5 7.5'
                  stroke='#09090b'
                />
              </svg>
            </span>
          </a>
        </li>
      </ul>{' '}
    </li>
  )
}
export const IconNavToolbar = () => {
  return (
    <li className='text-zinc-950 list-item border-2 border-zinc-200 border-solid rounded-md p-4 md:p-6  lg:p-10'>
      {' '}
      <ul className='flex-wrap flex list-none gap-1'>
        <li className='list-item'>
          <a
            className='items-center gap-x-1 justify-center inline-flex w-9 h-9 rounded-md overflow-visible'
            href='https://franken-ui.dev/#'
          >
            <svg
              className='cursor-pointer w-4 h-4'
              fill='rgb(9, 9, 11)'
              height='16'
              viewBox='0 0 20 20'
            >
              <rect
                className='w-0 h-4'
                fill='rgb(9, 9, 11)'
                height='17'
                x='9'
                y='1'
              />
              <rect
                className='w-4 h-0'
                fill='rgb(9, 9, 11)'
                height='1'
                x='1'
                y='9'
              />
            </svg>
          </a>
        </li>

        <li className='list-item'>
          <a
            className='items-center gap-x-1 justify-center inline-flex w-9 h-9 rounded-md overflow-visible'
            href='https://franken-ui.dev/#'
          >
            <svg
              className='cursor-pointer w-4 h-4'
              fill='rgb(9, 9, 11)'
              height='16'
              viewBox='0 0 20 20'
            >
              <path
                d='M18.65,1.68 C18.41,1.45 18.109,1.33 17.81,1.33 C17.499,1.33 17.209,1.45 16.98,1.68 L8.92,9.76 L8,12.33 L10.55,11.41 L18.651,3.34 C19.12,2.87 19.12,2.15 18.65,1.68 L18.65,1.68 L18.65,1.68 Z'
                fill='none'
                stroke='#09090b'
              />
              <polyline
                fill='none'
                points='16.5 8.482 16.5 18.5 3.5 18.5 3.5 1.5 14.211 1.5'
                stroke='#09090b'
              />
            </svg>
          </a>
        </li>

        <li className='list-item'>
          <a
            className='items-center gap-x-1 justify-center inline-flex w-9 h-9 rounded-md overflow-visible'
            href='https://franken-ui.dev/#'
          >
            <svg
              className='cursor-pointer w-4 h-4'
              fill='rgb(9, 9, 11)'
              height='16'
              viewBox='0 0 20 20'
            >
              <rect
                className='w-3 h-4'
                fill='none'
                height='16'
                stroke='#09090b'
                x='3.5'
                y='2.5'
              />
              <polyline
                fill='none'
                points='5 0.5 17.5 0.5 17.5 17'
                stroke='#09090b'
              />
            </svg>
          </a>
        </li>

        <li className='list-item'>
          <a
            className='items-center gap-x-1 justify-center inline-flex w-9 h-9 rounded-md'
            href='https://franken-ui.dev/#'
          >
            <span className='cursor-pointer inline-flex overflow-visible'>
              <svg
                className='w-4 h-4'
                fill='rgb(9, 9, 11)'
                height='16'
                viewBox='0 0 20 20'
              >
                <path
                  d='M7.5,7.5V4A2.48,2.48,0,0,1,10,1.5,2.54,2.54,0,0,1,12.5,4V7.5'
                  fill='none'
                  stroke='#09090b'
                />
                <polygon
                  fill='none'
                  points='16.5 7.5 3.5 7.5 2.5 18.5 17.5 18.5 16.5 7.5'
                  stroke='#09090b'
                />
              </svg>
            </span>
          </a>
        </li>
      </ul>{' '}
    </li>
  )
}
