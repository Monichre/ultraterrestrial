'use client'

import { CardStackUI } from '@/features/mindmap/cards/card-stack/cards'

export const CardStack = ({ mindmapCards }: { mindmapCards: any }) => {
  const [root, ...rest] = mindmapCards
  console.log('mindmapCards: ', mindmapCards)
  const sanitizedCards = rest.map(({ position, id, type, ...rest }: any) => {
    const { data } = rest
    console.log('data: ', data)
    const title = data?.label
    return {
      id: `panel-${id}`,
      title,
      ...data,
    }
  })

  console.log('sanitizedCards: ', sanitizedCards)
  return <CardStackUI mindmapCards={sanitizedCards} />
}
