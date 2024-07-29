import * as React from 'react'

export function NotesCard({
  title,
  children,
}: {
  title?: string
  children?: React.ReactNode
}) {
  return (
    <div className='h-64 w-48 rounded-3xl border bg-[#fced99] p-4 font-sans text-zinc-950 shadow-sm'>
      <div className='text-lg font-bold tracking-wide'>{title}</div>
      <div className='mt-3 flex flex-col gap-3 text-sm'>{children}</div>
    </div>
  )
}
