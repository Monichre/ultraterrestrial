'use client'

import { CardStackUI } from '@/features/mindmap/cards/card-stack/cards'

export const formatNodesForCardDisplay = (nodes: any) => {
  console.log('nodes: ', nodes)
  return nodes.map((node) => {
    const { id, ...rest } = node
    const nodeData = node?.data || rest

    const data = {
      id,
      ...nodeData,
    }
    console.log('data: ', data)

    return data
  })
}

export const CardStack = ({
  mindmapCards,
  stacked,
  toggleStack,
}: {
  mindmapCards: any
  stacked: any
  toggleStack: any
}) => {
  return (
    <CardStackUI
      mindmapCards={mindmapCards}
      stacked={stacked}
      toggleStack={toggleStack}
    />
  )
}
