/* eslint-disable react/display-name */
'use client'
import * as React from 'react'
import { memo, useCallback, useEffect } from 'react'

import {
  Handle,
  Position,
  useHandleConnections,
  useNodesData,
  useUpdateNodeInternals,
  NodeToolbar,
} from '@xyflow/react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AnimatePresence, motion } from 'framer-motion'
import { MindMapEntityCard } from '@/components/ui/card/entity-card'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface Photo {
  id: string
  name: string
  mediaType: string
  enablePublicUrl: boolean
  signedUrlTimeout: number
  uploadUrlTimeout: number
  size: number
  version: number
  url: string
}

type Status = {
  value: string
  label: string
}

const statuses: Status[] = [
  {
    value: 'backlog',
    label: 'Backlog',
  },
  {
    value: 'todo',
    label: 'Todo',
  },
  {
    value: 'in progress',
    label: 'In Progress',
  },
  {
    value: 'done',
    label: 'Done',
  },
  {
    value: 'canceled',
    label: 'Canceled',
  },
]

function StatusList({
  setOpen,
  setSelectedStatus,
}: {
  setOpen: (open: boolean) => void
  setSelectedStatus: (status: Status | null) => void
}) {
  return (
    <Command>
      <CommandInput placeholder='Filter status...' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {statuses.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                setSelectedStatus(
                  statuses.find((priority) => priority.value === value) || null
                )
                setOpen(false)
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export function ComboBoxResponsive() {
  const [open, setOpen] = React.useState(false)

  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' className='w-[150px] justify-start'>
          {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0' align='start'>
        <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
      </PopoverContent>
    </Popover>
  )
}

const EN = memo((props: any) => {
  const updateNodeInternals = useUpdateNodeInternals()
  updateNodeInternals(props.id)
  return (
    <>
      <Handle type='target' position={Position.Top} />

      <MindMapEntityCard {...props} key={props.id} />
    </>
  )
})

export const EntityNode = memo(EN)
