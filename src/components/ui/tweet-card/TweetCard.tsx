'use  client'
import * as React from 'react'
import Image from 'next/image'
import { cn } from '@/utils/cn'
import { Suspense } from 'react'

interface TwitterIconProps {
  className?: string
  [key: string]: any
}

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('bg-primary/10 animate-pulse rounded-md', className)}
      {...props}
    />
  )
}

export function MinimalConnectionCardSkeleton({
  className,
  ...props
}: {
  className?: string
  [key: string]: any
}) {
  return (
    <div
      className={cn(
        'flex size-full max-h-max min-w-72 flex-col gap-2 rounded-lg border p-4',
        className
      )}
      {...props}
    >
      <div className='flex flex-row gap-2'>
        <Skeleton className='size-10 shrink-0 rounded-full' />
        <Skeleton className='h-10 w-full' />
      </div>
      <Skeleton className='h-20 w-full' />
    </div>
  )
}

export function MinimalConnectionCardHeader({ connection }: any) {
  return (
    <div className='flex flex-row justify-between tracking-tight'>
      <div className='flex items-center space-x-2'>
        <span>
          <Image
            alt={`Profile picture of ${connection.name}`}
            height={48}
            width={48}
            src={connection.photo[0]?.signedUrl}
            className='overflow-hidden rounded-full border border-transparent'
          />
        </span>
        <div>
          <span className='flex items-center whitespace-nowrap font-semibold'>
            {connection.name}
          </span>
          <div className='flex items-center space-x-1'>
            <span className='text-sm text-gray-500 transition-all duration-75'>
              {connection?.date}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function MinimalConnectionCardBody({ content }: any) {
  return (
    <div className='break-words leading-normal tracking-tighter'>
      <span className='text-sm font-normal'>{content}</span>
    </div>
  )
}

export function MinimalConnectionCard({
  connection,
  components,
  className,
  ...props
}: any) {
  return (
    <div
      className={cn(
        'relative flex size-full max-w-lg flex-col gap-2 overflow-hidden rounded-lg border p-4 backdrop-blur-md',
        className
      )}
      {...props}
    >
      <MinimalConnectionCardHeader connection={connection} />
      <MinimalConnectionCardBody connection={connection} />
    </div>
  )
}
